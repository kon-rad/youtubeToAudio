const fs = require('fs');
let	ffmpeg = require('fluent-ffmpeg');
let youtubedl = require('youtube-dl');
let path = require('path');

/**
 * Post audio
 * @param req
 * @param res
 * @returns void
 *
 * test url:
 * https://www.youtube.com/watch?v=Lo3769VtgHM
 */
export function postAudio(req, res) {
  const url = req.body.post.url.trim();
  let filename = url.split('watch?v=')[1] + '.mp3';
  const file = path.join(__dirname, '..', 'tmp');

  youtubedl.exec(url,
    ['-x', '--audio-format', 'mp3', '-o', `${file}/%(id)s.%(ext)s`, '--prefer-ffmpeg'],
    {},
    function exec(err, output) {
      'use strict';
      if (err) {
        res.send('error, please try again');
        throw err;
      }
      console.log(output.join('\n'));

      res.send({ downloadLink: `${filename}` });
  });
}

/**
 * download sends download of mp3 file
 * @param req
 * @param res
 * @returns void
 */
export function download(req, res) {
  const fileId = req.params.id.trim();
  const file = path.join(__dirname, '..', 'tmp', fileId);

  fs.exists(file, (exists) => {
    if (exists) {
      res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
      res.setHeader('Content-Type', 'application/audio/mpeg3')
      let rstream = fs.createReadStream(file);
      rstream.pipe(res).on('finish', function() {
        fs.unlink(file);
      });
    } else {
      res.send('error, please try again');
      res.end();
    }
  })
}
