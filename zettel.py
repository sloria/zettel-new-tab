from pathlib import Path
import random

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NVALT_PATH = Path.home() / 'Dropbox' / 'nvalt'


@app.route('/')
def index():
    content, title = get_random_note()
    return jsonify({'content': content, 'title': title})

def get_random_note():
    all_notes = list(NVALT_PATH.glob('*.txt'))
    note = random.choice(all_notes)
    with note.open('r') as fp:
        content = fp.read()
    title = note.stem
    return content, note.stem

if __name__ == "__main__":
    app.run(port=4444)
