import { Keymap } from "./Types";

const DefaultKeys: Keymap = {
   TAB_LEN: '3',

   EXIT_MODE: '\u001B',
   EXIT: 'q',
   EXIT_SAVE: 'wq',
   SAVE: 'w',

   MOVE_LEFT: 'h',
   MOVE_DOWN: 'j',
   MOVE_UP: 'k',
   MOVE_RIGHT: 'l',

   DELETE_LINE: 'dd',

   MODE_INSERT: 'i',
}

export default DefaultKeys;
