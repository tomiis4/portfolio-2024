const stdin = process.stdin;
const argv = process.argv;
// import fs from "fs"

// extern files
// import getFile from './uilts/getFile';
// import settingsData from './uilts/parseSettings';

// types
import { Cursor, Mode, Buffer } from "./utils/Types";

// ui
import Bufferline from "./utils/Bufferline";
import Statusline from "./utils/Statusline";

// functions
import getBuffers from "./utils/file/getBuffers";

// input settings
// stdin.setRawMode(true);
// stdin.resume();
// stdin.setEncoding('utf-8');

// data
let buffersNames: string[] = [];

let buffers: Buffer[] = getBuffers(buffersNames);
let buffer = 0;

let mode: Mode = 'normal';
let cursor: Cursor= {
   row: 1,
   column: 0
};

// FUNCTIONS

const displayUI = () => {
   Bufferline({
      openBuffer: buffer,
      buffers: buffers
   });

   Statusline({
      mode: mode,
      buffer: {
         isSaved: buffers[buffer].isSaved,
         name: buffers[buffer].name,
      },
      cursor: cursor.row,
      bufferLen: buffers[buffer].content.length
   });
}

const loadBuffers = () => {
   if (argv.length >= 2) {
      for (let i=2; i < argv.length; i++) {
         buffersNames.push(argv[i]);
      }
   }
}

function main() {
   loadBuffers();
   displayUI();
}
main();
