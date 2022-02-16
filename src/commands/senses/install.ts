import { Command, flags } from '@oclif/command';
import chalk = require('chalk');
import Listr = require('listr');
import * as debugBase from 'debug';
import * as fs from 'fs';
import path = require('path');
import execa = require('execa');

const PACKAGE_URL =
  'https://github.com/senses-smart-mirror/senses-smartmirror/releases/latest/download/senses-smartmirror.zip?raw=true';

export default class SensesInstall extends Command {
  static description = 'Install the Senses - Smart Mirror software.';

  static aliases = ['install', 'i'];

  debug = debugBase('install');

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    const location = path.resolve();

    const tasks = new Listr([
      {
        title: 'Check if Senses - Smart Mirror is not already installed.',
        task: () => {
          if (fs.existsSync(path.join(process.cwd(), 'senses-smartmirror'))) {
            throw new Error(
              'Senses - Smart Mirror is already installed. You should consider updating from the Senses - Smart Mirror App. Or delete the folder and try again.'
            );
          }
        },
      },
      {
        title: 'Download the Senses - Smart Mirror software package',
        task: async () => {
          await execa.command(`curl ${PACKAGE_URL} -O -J -L -o senses-smartmirror.zip
          `);

          if (!fs.existsSync(path.resolve('senses-smartmirror.zip'))) {
            throw new Error('Download failed, .zip file not found.');
          }
        },
      },
      {
        title: 'Upzip Package.',
        task: async () => {
          await execa.command('unzip -q senses-smartmirror.zip');

          if (!fs.existsSync(path.resolve('senses-smartmirror'))) {
            throw new Error('Unzip failed.');
          }
        },
      },
      {
        title: 'Installing Launcher functionality.',
        task: async () => {
          process.chdir('senses-smartmirror');
          await execa('npm', ['install', '--quiet', '--no-progress']);
        },
      },
      {
        title: 'Installing Server functionality.',
        task: async () => {
          process.chdir('server');
          await execa('npm', ['install', '--quiet', '--no-progress']);
        },
      },
      {
        title: 'Cleaning up.',
        task: async () => {
          fs.unlinkSync(path.join(location, 'senses-smartmirror.zip'));
          fs.rmdirSync(path.join(location, 'senses-smartmirror', 'app'), { recursive: true });
        },
      },
    ]);

    await tasks.run();

    this.log(chalk.green('All done. Senses - Smart Mirror successfully installed.'));
  }
}
