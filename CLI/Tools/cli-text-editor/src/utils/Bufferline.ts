import { BufferlineArg } from "./Types";

const saved = (a: string, b: boolean) => b ? a : a + ' [+]';
//    openBuffer: number,
//    buffers: File[]
// take arguments: array or buffers and index of opened buffer
const Bufferline = (e: BufferlineArg) => {
   const buffers = e.buffers;

	const strBuffers = buffers.map((elem, index) => {
      if (index == e.openBuffer) {
         return ` \x1b[31m ${saved(elem.name, elem.isSaved)} \x1b[0m `
      } else {
         return ` ${saved(elem.name, elem.isSaved)} `
      }
   });

   console.log('\x1b[100m'+strBuffers.join('|'))+'\x1b[0m';
}

export default Bufferline;
