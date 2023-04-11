const stdin = process.stdin;
const argv = process.argv;

// types
import { Cursor, Mode, Buffer } from "./utils/Types";

// ui
import Bufferline from "./utils/Bufferline";
import Statusline from "./utils/Statusline";

// functions
import getBuffers from "./utils/file/getBuffers";
import getConfig from './utils/file/getConfig';

// input settings
stdin.setRawMode(true); // show text
stdin.resume();
stdin.setEncoding('utf-8');

// data
const config = getConfig();

let buffersNames: string[] = [];

let buffers: Buffer[] = [];
let buffer = 0;

let mode: Mode = 'normal';
let cursor: Cursor= {
   row: 15,
   column: 0
};

// FUNCTIONS

const displayUI = () => {
   // reset
   console.clear();

   Bufferline({
      openBuffer: buffer,
      buffers: buffers
   });

   // load content
   const cBuffer = buffers[buffer].content;
   for (let i=0; i < cBuffer.length; i++) {
      const line = cBuffer[i];

      // selected line
      if (i+1 == cursor.row) {
         let lineArr = line.split('');
         lineArr[cursor.column] = `\x1b[100m\x1b[4m${lineArr[cursor.column]}\x1b[0m`;

         console.log(`${i+1}  ${lineArr.join('')}`);
      } else {
         console.log(` ${i+1} ${line}`);
      }
   }

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

      buffers = getBuffers(buffersNames);
   } else {
      buffers = [{
         content: [''],
         name: 'buffer-0',
         isSaved: false
      }];
   }
}

const loadKeys = () => {
   stdin.on('data', (key: string) => {
      // exit from visual/insert/commant mode when pressed ECS
      if (key == '\u001B') {
         mode = 'normal';
         displayUI();

         return;
      }

      // NORMAL mode
      if (mode == 'normal') {
         switch (key) {
            case 'x':
               
               break;

            default:
               break;
         }
      }
   })
}


function main() {
   loadBuffers();
   loadKeys();
   displayUI();
}
main();
