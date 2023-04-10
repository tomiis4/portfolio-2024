import { Buffer } from '../Types';
import readFile from "./readFile";

const getBuffer = (names: string[]): Buffer[] => {
   let buffers: Buffer[] = [];

   for (let i=0; i < names.length; i++) {
      buffers.push({
         content: readFile(names[i]),
         name: names[i],
         isSaved: true
      });
   }

   return buffers;
}

export default getBuffer;
