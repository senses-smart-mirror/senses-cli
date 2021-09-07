import * as fs from 'fs';
import * as archiver from 'archiver';

/**
 * Archive a source of files to a destination in ZIP format
 * @param {String} source the source of the directory
 * @param {String} out the location where the files should be archived
 * @return {Promise} Returns a promise
 */
export function zip(source: string, out: string) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}
