import { FUniver } from '@univerjs/core'

export {}

declare global {
  var univerApi: FUniver

  var electronAPI: {
    onSaveFile: (callback: (filePath: string)=>void) => void
    onOpenFile: (callback: (data: string)=>void) => void

    saveFile: (filePath: string, data: string) => void
  }

  var _cookie: string
}
