import { BrowserWindow, ipcMain } from "electron";

import fs from "fs";

function IPCMainSetup(win: BrowserWindow) {
  ipcMain.on("save-file", (_event, filePath, data) => {
    console.log(filePath);
    console.log(data);

    fs.writeFileSync(filePath, data);
  })
}

export default IPCMainSetup;
