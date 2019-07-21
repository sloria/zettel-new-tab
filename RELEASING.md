# Releasing

* Bump the version in `manifest.json`.
* Run `npm run build:firefox`. This will create a build in `web-ext-artifacts`.
* Go to https://addons.mozilla.org/en-US/developers/addon/zettel/versions/submit/,
  Upload the file, then sign the submission.
* Download the signed xpi file then drag and drop it into Firefox to update.
