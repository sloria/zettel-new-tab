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

function getNote(title) {
  const filepath = path.join(NVALT_PATH, `${title}.txt`);
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, content) => {
      if (err) reject(err);
      resolve({ content, title });
    });
  });
}

app.get('/', (req, res) => {
  randomNote()
    .then(({ content, title }) => {
      res.json({ content, title });
    });
});

app.get('/notes/:title', (req, res) => {
  getNote(req.params.title)
    .then(({ content, title }) => {
      res.json({ content, title });
    })
    .catch(() => {
      res.status(500).json({ message: 'Something broke.' });
    });
});

app.listen(4444, () => {
  console.log('App listening on port 4444!'); // eslint-disable-line
});
