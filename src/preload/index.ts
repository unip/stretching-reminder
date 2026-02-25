import { contextBridge, ipcRenderer } from 'electron';

export interface IElectronAPI {
  getVersion: () => Promise<string>;
}

contextBridge.exposeInMainWorld('electron', {
  getVersion: () => ipcRenderer.invoke('get-version'),
});
