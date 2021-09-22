import * as fs from 'fs';
import * as path from 'path';
import * as execa from 'execa';

/**
 * Remove old dependencies from the Widget
 *
 * @param {String} widgetName The name of the Widget
 * @param {String} location The location of the widget
 */
export function cleanupOldDependencies(widgetName: string, location: string) {
  // Check & remove ZIP file
  if (fs.existsSync(path.join(location, `${widgetName}.zip`))) {
    fs.unlinkSync(path.join(location, `${widgetName}.zip`));
  }

  // Check & remove dist folder
  if (fs.existsSync(path.join(location, 'dist'))) {
    fs.rmdirSync(path.join(location, 'dist', '/'), { recursive: true });
  }
}

/**
 * Build the Server files and copy them to the dist location
 *
 * @return {Promise<[execa.ExecaReturnValue<string>, execa.ExecaReturnValue<string>]>} Returns a Promise
 */
export async function buildServerFiles() {
  await execa.command('npm run bundle');
  const cpyCmd = execa.command('cp -R dist ../dist');
  return Promise.all([cpyCmd]);
}

/**
 * Build the GUI and copy the files to the dist folder
 *
 * @param {String} widgetName The name of the widget
 * @return {Promise<[execa.ExecaReturnValue<string>, execa.ExecaReturnValue<string>]>} Returns a Promise
 */
export async function buildGUIFiles(widgetName: string) {
  await execa.command(
    `npm run build -- --prod --silent --verbose --target lib --formats umd-min --name ${widgetName}.[chunkhash] src/components/${widgetName}.vue`
  );
  const cpyCmd = execa.command('cp -R dist/ ../dist');
  return Promise.all([cpyCmd]);
}
