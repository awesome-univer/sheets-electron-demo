/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import './app'
import './global'

console.log('Hello from renderer.ts')

globalThis.electronAPI.onSaveFile((filePath: string) => {
  const data = globalThis.univerApi.getActiveWorkbook().save();
  const j = JSON.stringify(data, null, 2)
  console.log(j)
  console.log(filePath)

  globalThis.electronAPI.saveFile(filePath, j)
})

globalThis.electronAPI.onOpenFile((data: string) => { 
  console.log('open file')
  console.log(data)
  const dataObj = JSON.parse(data)
  globalThis.univerApi.disposeUnit(globalThis.univerApi.getActiveWorkbook().getId());
  globalThis.univerApi.createUniverSheet(dataObj);
})
