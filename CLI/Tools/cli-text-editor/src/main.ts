const stdin = process.stdin;
const argv = process.argv;

// types
import { Cursor, Mode, Buffer } from './utils/Types';

// ui
import Bufferline from './utils/Bufferline';
import Statusline from './utils/Statusline';

// functions
import saveFile from './utils/file/saveFile'
import getBuffers from './utils/file/getBuffers';
import getConfig from './utils/file/getConfig';
import DefaultConfig from './utils/DefaultConfig';


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
      if (i == cursor.row && line != '') {
         let lineArr = line.split('');
         
         if (lineArr[cursor.column]) {
            lineArr[cursor.column] = `\x1b[100m\x1b[4m${lineArr[cursor.column]}\x1b[0m`;
         } else {
            lineArr.push(`\x1b[100m\x1b[4m \x1b[0m`);
         }

         console.log(`${i+1}  ${lineArr.join('')}`);
      } else if (i == cursor.row && line == '') {
            console.log(`${i+1}  \x1b[100m\x1b[4m \x1b[0m`);
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

   console.log(commandBuffer)

//    console.log(keys);
}

// let keys = []
const moveCursor = (key: string, canHLKJ: boolean): boolean => {
   let contiune = true;
//    keys.push(key.toString())

   // if you can move
   const canUp = cursor.row > 0
   const canDown = cursor.row < buffers[buffer].content.length-1
   const canLeft = cursor.column > 0
   const canRight = cursor.column < buffers[buffer].content[cursor.row].length;

   const [ArrowL, ArrowU, ArrowR, ArrowD] = ['\x1B[D', '\x1B[A', '\x1B[C', '\x1B[B']; 
   let [H,L,K,J] = ['h', 'l', 'k', 'j']; 

   if (!canHLKJ) {
      [H,L,K,J] = [ArrowL, ArrowR, ArrowU, ArrowD]
   }

   if ((key == L || key == ArrowR) && canRight) { // right
      cursor.column++;
   } else if ((key == K || key == ArrowU) && canUp) { // up
      cursor.row--;
   } else if ((key == H || key == ArrowL) && canLeft) { // left
      cursor.column--;
   } else if ((key == J || key == ArrowD) && canDown) { // down
      cursor.row++ 
   } else if (![ArrowL, ArrowD, ArrowR, ArrowU].includes(key)) {
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

   buffers[buffer].isSaved = false;

   // delete
   if (key == '\b' && line.length > 0 && cursor.column > 0) {
      line.splice(cursor.column-1, 1);
      cursor.column--
      buffers[buffer].content[cursor.row] = line.join('');

      return;
   }

   // enter
   if (key == '\r' || key == '\n') {
      buffers[buffer].content.splice(cursor.row+1, 0, '')
      cursor = {row: cursor.row += 1, column: 0}

      return;
   }

  	line.splice(cursor.column, 0, key);
	cursor.column++;

   buffers[buffer].content[cursor.row] = line.join('');
}

const processCommand = (command: string) => {
   const arg = command.split(' ');

   switch (arg[0]) {
      case ':q':
         process.exit();
      case ':w':
         let cBuffer = buffers[buffer]
         let fName = arg[1] ?? cBuffer.name;

         saveFile({
            content: cBuffer.content,
            path: fName
         })

         buffers[buffer].isSaved = true;

         break;
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
         commandBuffer = ''
         displayUI();

         return;
      }

      // DEFAULT
      const canHLKJ = mode == 'normal' || mode == 'visual' ? true : false;
      if (moveCursor(key, canHLKJ)) {
         canInsert = false;
      } else {
         canInsert = true;
      }

      // COMMAND
       if (key == ':' && mode != 'insert') {
         mode = 'command';
      }

      if (mode == 'command') {
         // if you enter command
         if (key == '\u000d') {
            processCommand(commandBuffer)
            commandBuffer = '';
         } else {
            commandBuffer += key;
         }
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
            case 'O':
               buffers[buffer].content.splice(cursor.row, 0, '')
               cursor = {row: cursor.row++, column: 0}

               mode = 'insert'
               break;
            case 'o':
               buffers[buffer].content.splice(cursor.row+1, 0, '')
               cursor = {row: cursor.row += 1, column: 0}

               mode = 'insert'
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
