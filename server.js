const path = require('path');
const os = require('os');
const fs = require('fs');
const glob = require('glob');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const NVALT_PATH = path.join(os.homedir(), 'Dropbox', 'nvalt');

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNote() {
  return new Promise((resolve, reject) => {
    glob(path.join(NVALT_PATH, '*.txt'), (err, files) => {
      if (err) reject(err);
      const choice = randomChoice(files);
      const title = path.basename(choice, '.txt');
      fs.readFile(choice, 'utf8', (e, content) => {
        if (e) reject(err);
        resolve({ content, title });
      });
    });
  });
}

app.get('/', (req, res) => {
  randomNote()
    .then(({ content, title }) => {
      res.json({ content, title });
    });
});

app.listen(4444, () => {
  console.log('App listening on port 4444!'); // eslint-disable-line
});
