const DefaultConfig = {
   global: {
      TAB_LEN: '3',
      EXIT_MODE: '\u001B',
   },
   commands: {
      EXIT: 'q',
      EXIT_SAVE: 'wq',
      SAVE: 'w',

   },
   insert: {

   },
   normal: {
      MOVE_LEFT: 'h',
      MOVE_DOWN: 'j',
      MOVE_UP: 'k',
      MOVE_RIGHT: 'l',

      DELETE_LINE: 'dd',

      MODE_INSERT: 'i',
   },
   visual: {
      DELETE_LINE: 'd'
   }
}

export default DefaultConfig;
