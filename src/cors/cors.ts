import { BrowserWindow } from "electron";

import '../global'

let cookie = '';

function SetupCORS(win: BrowserWindow) {
  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      let headers = details.requestHeaders;
      if (details.url.includes(':8000')) {
        console.log(details);
        headers['Origin'] = '*';
        headers['Cookie'] = cookie;
      }
      callback({ requestHeaders: headers });
    },
  );

  win.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      let headers = details.responseHeaders;
      if (details.url.includes(':8000')) {
        headers['Set-Cookie']?.[0].split(';').map((v) => {
          const [key, value] = v.split('=');
          if (key === '_univer') {
            cookie = `_univer=${value}`;
          }
        })

        const url = new URL(details.referrer);
        headers['Access-Control-Allow-Origin'] = [url.origin];
        headers['Access-Control-Allow-Headers'] = ['Content-Type'];
        headers['Access-Control-Allow-Credentials'] = ['true'];
      }
      callback({ responseHeaders: headers });
    },
  );
}

export default SetupCORS;