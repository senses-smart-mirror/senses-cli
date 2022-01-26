import { Command, flags } from '@oclif/command';
import chalk = require('chalk');
import Listr = require('listr');
import * as debugBase from 'debug';
import * as fs from 'fs';
import path = require('path');
import execa = require('execa');

export default class SensesRun extends Command {
  static description = 'Run the Senses - Smart Mirror software';

  static aliases = ['run', 'r'];

  debug = debugBase('run');

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    const tasks = new Listr([
      {
        title: 'Check if Senses - Smart Mirror is installed in current folder.',
        task: () => {
          const folder = path.join(process.cwd());

          if (!fs.existsSync(folder + '/package.json')) {
            this.error("It seems like Smart Mirror is not installed.", {
              code: "SENSES_ERR_NOT_INSTALLED",
              suggestions: ["Are you in the correct folder? Run this command from the 'smart-mirror' folder or install the Senses - Smart Mirror."],
            });
          }

          const json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
          const version = json.version;

          this.log('Current installed version:', version);
        },
      },
      {
        title: 'Verify if configuration file is present',
        task: () => {
          const folder = path.join(process.cwd(), 'config');

          if (!fs.existsSync(folder + '/default-config.json')) {
            this.error("It seems like the default configuration file is not present.", {
              code: "SENSES_ERR_NOT_INSTALLED",
              suggestions: ["Re-install the Senses - Smart Mirror."],
            });
          }
        },
      },
      {
        title: 'Starting Senses - Smart Mirror...',
        task: () => {
          execa.command('npm run start');
        },
      },
    ]);

    await tasks.run();

    this.log(chalk.green('All done.'));
  }
}
