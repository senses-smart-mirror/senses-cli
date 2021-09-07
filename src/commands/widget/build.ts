import { Command, flags } from '@oclif/command';
import * as path from 'path';
import * as fs from 'fs';
import * as debugBase from 'debug';
import * as execa from 'execa';
import * as Listr from 'listr';
import * as chalk from 'chalk';
import { prompt } from 'enquirer';
import { zip } from '../../helpers/archive';

export default class WidgetBuild extends Command {
  static description = 'Build (and zip) widget so widget is for the Senses - Smart Mirror.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    widget: flags.string({ char: 'w', description: 'specify the widget it should be build' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'widget', description: 'The widget that should be build' }];

  debug = debugBase('widget:build');

  async run() {
    const { args, flags } = this.parse(WidgetBuild);

    if (!flags.widget && !args.widget) {
      const answer: { widget: string } = await prompt({
        type: 'input',
        name: 'widget',
        message: 'What is the widget you want to build?',
      });

      flags.widget = answer.widget;
    }

    const widget = args.widget || flags.widget;
    const widgetName = widget.split(path.sep).pop();
    const location = path.resolve(widget);

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
    ]);

    await tasks.run();

    this.log(chalk.green(`All done. Widget ${widgetName} build & packaged`));
  }
}
