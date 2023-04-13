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
import DefaultConfig from "./utils/DefaultConfig";

// input settings
stdin.setRawMode(true); // show text
stdin.resume();
stdin.setEncoding('utf-8');

// data
const defaultConfig = DefaultConfig;
const userConfig = getConfig();

let buffersNames: string[] = [];

let commandBuffer = '';
let buffers: Buffer[] = [];
let buffer = 0;

let mode: Mode = 'normal';
let cursor: Cursor= {
   row: 0,
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
   let cBuffer = buffers[buffer].content;
   for (let i=0; i < cBuffer.length; i++) {
      const line = cBuffer[i];

      // selected line
      if (i == cursor.row && line != "") {
         let lineArr = line.split('');
         
         if (lineArr[cursor.column]) {
            lineArr[cursor.column] = `\x1b[100m\x1b[4m${lineArr[cursor.column]}\x1b[0m`;
         } else {
            lineArr.push(`\x1b[100m\x1b[4m \x1b[0m`);
         }

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
      cursor: cursor.row+1,
      bufferLen: buffers[buffer].content.length
   });

   console.log(cursor);
//    console.log(keys);
}

// let keys = []
const moveCursor = (key: string, canKeys?: boolean): boolean => {
   let contiune = true;
//    keys.push(key.toString())

   // if you can move
   const canUp = cursor.row > 0
   const canDown = cursor.row < buffers[buffer].content.length-1
   const canLeft = cursor.column > 0
   const canRight = cursor.column < buffers[buffer].content[cursor.row].length;

   if ((key == 'l' ||key == '\x1B[D') && canRight) { // right
      cursor.column++;
   } else if ((key == 'k' || key == '\x1B[A') && canUp) { // up
      cursor.row--;
   } else if ((key == 'h' || key == '\x1B[C') && canLeft) { // left
      cursor.column--;
   } else if ((key == 'j' || key == '\x1B[B') && canDown) { // down
      cursor.row++ 
   } else {
      contiune = false;
   }

   return contiune
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

const insertKey = (key: string) => {
	let line = buffers[buffer].content[cursor.row].split('');

  	line.splice(cursor.column, 0, key);
	cursor.column++;

   buffers[buffer].content[cursor.row] = line.join('');
}

const processCommand = (command: string) => {
   switch (command) {
      case 'q':
         process.exit();
      default: break;
   }
}

// TAB = \u0009 \u000B
const loadKeys = () => {
   let canInsert = true;

   stdin.on('data', (key: string) => {
      // exit from visual/insert/commant mode when pressed ECS
      if (key == '\u001B') {
         mode = 'normal';
         displayUI();

         return;
      }

      // DEFAULT
      if (moveCursor(key)) {
         canInsert = false;
      } else {
         canInsert = true;
      }

      // COMMAND
      if (mode == 'command') {
         // if you enter command
         if (key == '\u000d') {
            processCommand(commandBuffer)
            commandBuffer = '';
         } else {
            commandBuffer += key;
         }
      }
      if (key == ':') {
         mode = 'command';
      }

      // INSERT mode
      if (mode == 'insert') {
         if (canInsert) {
            insertKey(key);
         }
      }

      // NORMAL mode
      if (mode == 'normal') {
         switch (key) {
            case userConfig.MODE_INSERT || defaultConfig.normal.MODE_INSERT:
               mode = 'insert'
               break;
            case 'o':
               buffers[buffer].content.push('')
               cursor.row++;
               cursor.column = 0;
               break;
            default:
               break;
         }
      }


      displayUI();
   })
}


function main() {
   loadBuffers();
   loadKeys();
   displayUI();
}
main();
