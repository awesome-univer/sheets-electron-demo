# sheets-electron-demo

## Quick start

```shell
git clone https://github.com/awesome-univer/sheets-electron-demo.git
cd sheet-electron-demo
npm install
npm start
```

## Build

See: https://www.electronforge.io/cli

```shell
npm run package

# multi-platform
npm run package -- --platform win32,linux
```

## Open devtools

```shell
npm start -- -- --devtools

# binary
npm run package -- -- --devtools
${BINARY} --devtools
```