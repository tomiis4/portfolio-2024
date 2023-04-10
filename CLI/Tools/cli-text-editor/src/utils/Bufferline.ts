import { BufferlineArg } from "./Types";

const saved = (a: string, b: boolean) => b ? a : a + ' [+]';

const Bufferline = (e: BufferlineArg) => {
   const buffers = e.buffers;

	const strBuffers = buffers.map((elem, index) => {
      if (index == e.openBuffer) {
         return ` \x1b[31m ${saved(elem.name, elem.isSaved)} \x1b[0m `
      } else {
         return ` ${saved(elem.name, elem.isSaved)} `
      }
   });

   console.log(strBuffers.join('|'));
}

export default Bufferline;
