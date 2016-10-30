# Zettel New Tab Page


## Installation

* Install dependencies.

```
npm install
```

* Create a ``.env`` file that specifies where your text files are.

```
ZETTEL_PATH='/Users/sloria/Dropbox/nvalt'
```

* In Chrome, go to Extensions then click "Load unpacked extension". Choose this directory.
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
