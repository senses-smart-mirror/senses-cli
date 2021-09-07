import execa = require('execa');

/**
 * provision widget zip file to target URL.
 * @param {String} target the source of the directory
 * @param {String} location the location where the files should be archived
 * @param {String} widgetName the location where the files should be archived
 * @return {ExecaReturnValue<string>} Returns a promise
 */
export default function importWidget(target: string, location: string, widgetName: string): any {
  const targetUrl = `http://${target}:7011/api/package`;
  return execa.command(`curl -s -F data=@${location}/${widgetName}.zip ${targetUrl}`);
}
