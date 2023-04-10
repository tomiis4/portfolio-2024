import { StatuslineArg, File } from "./Types";

const saved = (a: string, b: boolean) => b ? a : a + ' [+]';

const getName = ({isSaved, name}: File) => {
   if (isSaved) {
      return ' ' + saved(name, isSaved) + ' ';
   } else {
      return `\x1b[31m ${saved(name, isSaved)} \x1b[0m`;
   }
}

const Statusline = (e: StatuslineArg) => {
   const f = e.file;

   const mode = `\x1b[45m  ${e.mode.toUpperCase()} \x1b[0m`;
   const name = getName(f)
   const cursor = `${e.cursor}:${e.fileLen}`;

   console.log(`${mode}${name}| ${cursor}`)
}

export default Statusline;
