import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';
import * as debugBase from 'debug';
import * as execa from 'execa';
import * as Listr from 'listr';
import * as chalk from 'chalk';
import { prompt } from 'enquirer';
const copy = require('copy-template-dir');

export default class WidgetCreate extends Command {
  static description = 'Scaffold a widget for the Senses - Smart Mirror.';

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: 'name to widget' }),
    location: flags.string({ char: 'l', description: 'location where to create the widget' }),
    force: flags.boolean({ char: 'f' }),
  };

  debug = debugBase('widget:create');

  static args = [
    { name: 'name', description: 'The name of the Widget' },
    { name: 'location', description: 'Location where the widget should be created' },
  ];

  async run() {
    const { args, flags } = this.parse(WidgetCreate);

    this.debug('parsing args', args);

    if (typeof flags.name === 'undefined' && typeof args.name === 'undefined') {
      const answer: { name: string } = await prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the widget',
      });
      flags.name = answer.name;
    }

    if (typeof flags.location === 'undefined' && typeof args.location === 'undefined') {
      const answer: { location: string } = await prompt({
        type: 'input',
        name: 'location',
        message: 'Location where should the widget be created',
      });
      flags.location = answer.location;
    }
    const name = (args.name || flags.name).trim();
    const simpleName = name.replace(/[^\w\s]/gi, '');
    const location = args.location || flags.location;

    const tasks = new Listr([
      {
        title: 'Check if package exists',
        task: () => {
          if (fs.existsSync(path.resolve(location, name))) {
            // this.error(`Widget with name (${name}) already found. Choose a different name or remove the folder first.`);
            throw new Error(
              `Widget with name (${name}) already found. Choose a different name or remove the folder first.`
            );
          }
        },
      },
      {
        title: 'Create config & server files',
        task: async (ctx) => {
          const vars = { name, simpleName };
          const inDir = path.resolve(__dirname, '../../../src/templates/widget');
          const outDir = path.join(process.cwd(), location, name);
          ctx.widgetDirectory = outDir;

          return new Promise((resolve, reject) => {
            copy(inDir, outDir, vars, async (err: Error) => {
              if (err) {
                reject(new Error(err.message));
              }

              resolve(true);
            });
          });
        },
      },
      {
        title: 'Install Server dependencies',
        task: async (ctx) => {
          process.chdir(path.join(ctx.widgetDirectory, 'server'));
          await execa('npm', ['install', '--quiet', '--no-progress']);
        },
      },
      {
        title: 'Create the project GUI',
        task: async (ctx) => {
          process.chdir(ctx.widgetDirectory);
          const preset = path.resolve(__dirname, '../../../src/templates/preset/smart-mirror-preset.json');
          await execa.command(`vue create gui --bare --skipGetStarted --preset ${preset}`);
        },
      },
      {
        title: 'Create the widget component',
        task: async (ctx) => {
          process.chdir(path.join(ctx.widgetDirectory, 'gui', 'src'));
          await fs.mkdir('components', (err) => {
            if (err) {
              throw new Error(err.message);
            }
          });

          const vars = { name, 'module.settings.header': '{{module.settings.header}}'};
          const inDir = path.resolve(__dirname, '../../../src/templates/components');
          const outDir = path.join(process.cwd(), 'components');

          return new Promise((resolve, reject) => {
            copy(inDir, outDir, vars, async (err: Error) => {
              if (err) {
                reject(new Error(err.message));
              }

              resolve(true);
            });
          });
        },
      },
    ]);

    await tasks.run();

    this.log(chalk.green('All done. Happy coding!'));
  }
}
