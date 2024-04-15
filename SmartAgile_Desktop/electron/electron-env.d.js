// /// <reference types="vite-plugin-electron/electron-env" />

// declare namespace NodeJS {
//   interface ProcessEnv {
//     /**
//      * The built directory structure
//      *
//      * ```tree
//      * ├─┬─┬ dist
//      * │ │ └── index.html
//      * │ │
//      * │ ├─┬ dist-electron
//      * │ │ ├── main.js
//      * │ │ └── preload.js
//      * │
//      * ```
//      */
//     DIST: string
//     /** /dist/ or /public/ */
//     VITE_PUBLIC: string
//   }
// }

// // Used in Renderer process, expose in `preload.ts`
// interface Window {
//   ipcRenderer: import('electron').IpcRenderer
// }



/// <reference types="vite-plugin-electron/electron-env" />
import { ipcRenderer } from 'electron';

/**
 * @typedef {Object} ProcessEnv
 * @property {string} DIST
 * @property {string} VITE_PUBLIC
 */

/** @namespace NodeJS */
/** @property {ProcessEnv} ProcessEnv */




const ipcRenderer = require('electron').ipcRenderer;


export {};