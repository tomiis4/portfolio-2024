import { Buffer } from '../Types';
import readFile from "./readFile";

const getBuffers = (names: string[]): Buffer[] => {
   let buffers: Buffer[] = [];

   if (names.length == 0) {
      return [{
         content: [''],
         name: 'buffer-0',
         isSaved: false
      }];
   }

   for (let i=0; i < names.length; i++) {
      buffers.push({
         content: readFile(names[i]),
         name: names[i],
         isSaved: true
      });
   }

   return buffers;
}

export default getBuffers;
