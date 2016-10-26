# Zettel New Tab Page


## Installation

1. Install dependencies.

```
npm install
```

2. In Chrome, go to Extensions then click "Load unpacked extension". Choose this directory.
3. Symlink the plist file.

```
ln -s /Users/sloria/projects/web-projects/zettel/org.sloria.zettel.plist ~/Library/LaunchAgents/org.sloria.zettel.plist
```

4. Run the service

```
launchctl load ~/Library/LaunchAgents/org.sloria.zettel.plist
launchctl start org.sloria.zettel.plist
```

Or, with lunchy:

```
lunchy start zettel
```
