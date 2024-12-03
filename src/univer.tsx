import { createUniver, defaultTheme, LocaleType, Tools } from '@univerjs/presets'
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreEnUS from '@univerjs/presets/preset-sheets-core/locales/en-US'

import './univer.css'
import '@univerjs/presets/lib/styles/preset-sheets-core.css'

import { useEffect } from 'react'
import './global'


function Univer() {
  useEffect(() => {
    const { univerAPI } = createUniver({
      locale: LocaleType.EN_US,
      locales: {
        enUS: Tools.deepMerge(
          {},
          sheetsCoreEnUS,
        ),
      },
      theme: defaultTheme,
      presets: [
        UniverSheetsCorePreset(),
      ],
    })
    
    univerAPI.createUniverSheet({ name: 'Test Sheet' })

    globalThis.univerApi = univerAPI

    console.log('Create univer success')
    }, [])

  return <div id="app" />
}

export default Univer