import { StatuslineArg, File } from "./Types";

const saved = (a: string, b: boolean) => b ? a : a + ' [+]';

const getName = ({isSaved, name}: File) => {
   if (isSaved) {
      return ' ' + saved(name, isSaved) + ' ';
   } else {
      return `\x1b[31m ${saved(name, isSaved)} \x1b[0m`;
   }
}
// Take arguments: mode, buffer (name, isSaved), cursor (y), bufferLen
const Statusline = (e: StatuslineArg) => {
   const f = e.buffer;

   const mode = `\x1b[45m  ${e.mode.toUpperCase()} \x1b[0m`;
   const name = getName(f)
   const cursor = `${e.cursor}:${e.bufferLen}`;

   console.log(`${mode}${name}| ${cursor}`)
}

export default Statusline;
