const { app, BrowserWindow, screen } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const statePath = process.env.PAMPER_DESKTOP_STATE || path.join(__dirname, 'state.json');
const logPath = path.join(path.dirname(statePath), 'helper.log');
const log = (...args) => {
  try { fs.appendFileSync(logPath, new Date().toISOString() + ' ' + args.map(String).join(' ') + '\n'); } catch {}
};
let state = { pets: [] };
try {
  state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  log('state loaded', state.pets.length, 'pets');
} catch (error) {
  log('state read failed', error && error.message);
  app.quit();
}

app.whenReady().then(() => {
  const display = screen.getPrimaryDisplay();
  const area = display.workArea;
  log('workArea', JSON.stringify(area));
  const window = new BrowserWindow({
    x: area.x,
    y: area.y,
    width: area.width,
    height: area.height,
    transparent: true,
    frame: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    hasShadow: false,
    focusable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      backgroundThrottling: false
    }
  });
  window.setIgnoreMouseEvents(true, { forward: true });
  window.setAlwaysOnTop(true, 'screen-saver');
  window.webContents.on('console-message', (event) => {
    log('renderer', event.message || '');
  });
  window.loadFile(path.join(__dirname, 'index.html'), { query: { state: JSON.stringify(state) } }).then(() => log('loadFile resolved')).catch((error) => log('loadFile failed', error && error.message));
  const show = () => {
    try {
      window.showInactive();
      window.moveTop();
      log('showInactive done');
    } catch (error) {
      log('show failed', error && error.message);
    }
  };
  window.webContents.once('did-finish-load', show);
  window.once('ready-to-show', show);
  setTimeout(show, 1500);
});

app.on('window-all-closed', () => app.quit());
