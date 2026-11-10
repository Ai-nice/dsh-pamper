const { app, BrowserWindow, screen } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

const statePath = process.env.PAMPER_DESKTOP_STATE || path.join(__dirname, 'state.json');
let state = { pets: [] };
try { state = JSON.parse(fs.readFileSync(statePath, 'utf8')); } catch { app.quit(); }

app.whenReady().then(() => {
  const area = screen.getPrimaryDisplay().workArea;
  const window = new BrowserWindow({
    x: area.x, y: area.y, width: area.width, height: area.height,
    transparent: false, backgroundColor: '#00ff00',
    frame: false, resizable: false, movable: false, minimizable: false, maximizable: false,
    fullscreenable: false, skipTaskbar: true, alwaysOnTop: true, hasShadow: false, focusable: false, show: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false, webSecurity: false, backgroundThrottling: false, autoplayPolicy: 'no-user-gesture-required' }
  });
  window.setIgnoreMouseEvents(true, { forward: true });
  window.setAlwaysOnTop(true, 'screen-saver');
  window.loadFile(path.join(__dirname, 'index.html'), { query: { state: JSON.stringify(state) } });
  const show = () => { try { window.showInactive(); window.moveTop(); } catch {} };
  window.webContents.once('did-finish-load', show);
  window.once('ready-to-show', show);
  setTimeout(show, 1200);
});
app.on('window-all-closed', () => app.quit());
