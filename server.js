const path = require('path');
const fs = require('fs');
const glob = require('glob');
const express = require('express');
const cors = require('cors');
const env = require('node-env-file');

const app = express();
app.use(cors());


env(path.join(__dirname, '.env'));

if (!process.env.ZETTEL_PATH) {
  throw new Error('The ZETTEL_PATH environment variable must be specified');
}
const ZETTEL_PATH = process.env.ZETTEL_PATH;
const PORT = 4444;

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNote() {
  return new Promise((resolve, reject) => {
    glob(path.join(ZETTEL_PATH, '*.txt'), (err, files) => {
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
  const filepath = path.join(ZETTEL_PATH, `${title}.txt`);
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
  const noteTitle = decodeURI(req.params.title);
  getNote(noteTitle)
    .then(({ content, title }) => {
      res.json({ content, title });
    })
    .catch(() => {
      res.status(500).json({ message: 'Something broke.' });
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
