import { Command, flags } from '@oclif/command';
import * as path from 'path';
import * as fs from 'fs';
import * as debugBase from 'debug';
import * as execa from 'execa';
import * as Listr from 'listr';
import * as chalk from 'chalk';
import { prompt } from 'enquirer';
import { zip } from '../../helpers/archive';
import importWidget from '../../helpers/import-widget';
import { Ping } from '@rdalogic/ping';

export default class WidgetBuildImport extends Command {
  static description = 'Build & Provision (import) a widget for the Smart Mirror.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    widget: flags.string({ char: 'w', description: 'specify the widget it should be build' }),
    // flag with a value (-t, --target=VALUE)
    target: flags.string({ char: 't', description: 'specify the target to where it should import' }),
  };

  static args = [
    { name: 'widget', description: 'The widget that should be build' },
    { name: 'target', description: 'Target IP address.' },
  ];

  debug = debugBase('widget:build');

  async run() {
    const { args, flags } = this.parse(WidgetBuildImport);

    if (!flags.widget && !args.widget) {
      const answer: { widget: string } = await prompt({
        type: 'input',
        name: 'widget',
        message: 'What is the widget you want to provision?',
      });

      flags.widget = answer.widget;
    }

    if (!flags.target && !args.target) {
      const answer: { target: string } = await prompt({
        type: 'input',
        name: 'target',
        message: 'What is the target to where you want to import?',
      });

      flags.target = answer.target;
    }

    const widget = args.widget || flags.widget;
    const widgetName = widget.split(path.sep).pop();
    const location = path.resolve(widget);
    const target = flags.target || '';

    const tasks = new Listr([
      {
        title: 'Check if widget exists',
        task: () => {
          if (!fs.existsSync(location)) {
            throw new Error(`Widget ${widgetName} does not exist`);
          }
        },
      },
      {
        title: 'Cleanup old dependencies',
        task: () => {
          process.chdir(location);
          // Check & remove ZIP file
          if (fs.existsSync(path.join(location, `${widgetName}.zip`))) {
            fs.unlinkSync(path.join(location, `${widgetName}.zip`));
          }

          // Check & remove dist folder
          if (fs.existsSync(path.join(location, 'dist'))) {
            fs.rmdirSync(path.join(location, 'dist', '/'), { recursive: true });
          }
        },
      },
      {
        title: 'Build the server',
        task: async () => {
          process.chdir(path.join(location, 'server'));
          await execa.command('npm run bundle');
          await execa.command('cp -R dist ../dist');
        },
      },
      {
        title: 'Build the GUI',
        task: async () => {
          process.chdir(path.join(location, 'gui'));
          if (!fs.existsSync(path.resolve('package.json'))) {
            throw new Error('No package.json found');
          }
          await execa.command(
            `npm run build -- --prod --silent --verbose --target lib --formats umd-min --name ${widgetName}.[chunkhash] src/components/${widgetName}.vue`
          );

          await execa.command('cp -R dist/ ../dist');
        },
      },
      {
        title: 'Package the files',
        task: async () => {
          process.chdir(location);

          await zip(path.join(location, 'dist'), `${widgetName}.zip`);
        },
      },
      {
        title: 'Check if target is live and response',
        task: async () => {
          const result = await Ping.probe(target);

          if (result && !result.alive) {
            throw new Error(`Target ${target}:7011 is not reachable and might be down. Check if the Smart Mirror is running correctly.`);
          }
        },
      },
      {
        title: 'Import the widget',
        task: async () => {
          await importWidget(target, location, widgetName);
        },
      },
    ]);

    await tasks.run();

    this.log(chalk.green(`All done. Widget ${widgetName} build & packaged`));
  }
}
