import { BrowserWindow, dialog, Menu } from 'electron'
import fs from 'fs'


function CreateMenu(mainWindow: BrowserWindow) {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click: () => {
            dialog.showOpenDialog({
              properties: ['openFile'],
            }).then((result) => {
              console.log(result)
              if (!result.canceled) {
                const filePath = result.filePaths[0]
                mainWindow.webContents.send('open-file', fs.readFileSync(filePath, 'utf-8'))
              }
            })
          }
        },
        {
          label: 'Save',
          click: () => {
            dialog.showSaveDialog({
              defaultPath: 'sheet.json',
              properties: ['showOverwriteConfirmation']
            }).then((result) => {
              console.log(result)
              if (!result.canceled) {
                mainWindow.webContents.send('save-file', result.filePath)
              }
            })
          }
        },
      ]
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

export default CreateMenu