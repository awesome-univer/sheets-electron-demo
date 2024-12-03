// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  onSaveFile: (callback: (filePath: string)=>void) => ipcRenderer.on('save-file', (_event, value) => callback(value)),
  onOpenFile: (callback: (data: string)=>void) => ipcRenderer.on('open-file', (_event, data) => callback(data)),

  saveFile: (filePath: string, data: string) => ipcRenderer.send('save-file', filePath, data),
})
