/* eslint-disable no-console */
import { Command, flags } from '@oclif/command';
import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as debugBase from 'debug';
import Listr = require('listr');
import { prompt } from 'enquirer';
import { Ping } from '@rdalogic/ping';

import importWidget from '../../helpers/import-widget';
import axios from 'axios';

export default class WidgetImport extends Command {
  static description = 'Provision (import) a widget to Senses - Smart Mirror.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-w, --widget=VALUE)
    widget: flags.string({ char: 'w', description: 'specify the widget it should be build' }),
    // flag with a value (-t, --target=VALUE)
    target: flags.string({ char: 't', description: 'specify the target to where it should import' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  };

  static args = [
    { name: 'widget', description: 'The widget that should be imported.' },
    { name: 'target', description: 'Target IP address.' },
  ];

  debug = debugBase('widget:import');

  async run() {
    const { args, flags } = this.parse(WidgetImport);

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
        title: 'Check if widget can be find',
        task: () => {
          if (!fs.existsSync(location)) {
            throw new Error(`Location ${widgetName} is not correct, cannot find widget.`);
          }

          if (fs.existsSync(path.resolve(location, widgetName))) {
            throw new Error(`Widget ${widgetName} not found.`);
          }
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
        title: 'Check if widget already exists',
        skip: () => flags.force,
        task: async () => {
          const url = `http://${target}:7011/api/allwidgets`;
          const result = await axios.get(url);

          if (result && result.data && Array.isArray(result.data)) {
            const widget = result.data.filter(item => item.name === widgetName);

            if (widget && widget.length > 0) {
              const version = widget[0].version.length > 0 ? `with version: ${widget[0].version} installed` : '';
              throw new Error(`Widget: ${widgetName} already exits ${version}. Use if -f or --force if you want to override the widget or provide a different name.`);
            }
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

    this.log(chalk.green(`All done. Widget ${widgetName} successfully imported.`));
  }
}
