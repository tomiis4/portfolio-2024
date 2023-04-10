import { Keymap } from "../Types";
import readFile from "./readFile";

const defaultPath = './init.tes';

const getConfig = (): Keymap => {
   const data = readFile(defaultPath);
   const keymaps: Keymap = {};

   data.map(elem => {
      if (elem.startsWith('#')) return

      if (elem.startsWith('var')) {
         const type = elem.match(/<(.*?)>/g)![0].replace(/<|>/g, '');
         const key = elem.match(/("|'|`)(.*?)("|'|`)/g)![0].replace(/'|"|`/g, '');

         keymaps[type] = key;
      }
   })

   return keymaps
}
