# Zettel New Tab Page

## WARNING

This isn't for public use. Use at your own risk.


![](https://dl.dropboxusercontent.com/u/1693233/github/zettel-new-tab-dark.png)


## Installation

* `cd` to this repo.
* Install dependencies.

```
npm install
```

* Create a ``.env`` file that specifies where your text files are.

```
ZETTEL_PATH='/Users/sloria/Dropbox/nvalt'
```

## Chrome

* In Chrome, go to Extensions then click "Load unpacked extension". Choose this directory.
* Open a new tab in Chrome.


## Firefox

Install from https://addons.mozilla.org/en-US/developers/addon/zettel/versions


### Using launchd to run the server in the background and on system startup (Mac OSX)

* Symlink the plist file.


```
ln -s /Users/sloria/projects/web-projects/zettel/org.sloria.zettel.plist ~/Library/LaunchAgents/org.sloria.zettel.plist
```

* Run the service.

```
launchctl load ~/Library/LaunchAgents/org.sloria.zettel.plist
launchctl start org.sloria.zettel.plist
```

Or, with lunchy:

```
lunchy start zettel
```


## License

[MIT Licensed](https://sloria.mit-license.org/)
