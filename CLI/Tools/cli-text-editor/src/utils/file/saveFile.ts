import fs from "fs"
import { SaveFileArg } from "../Types"

const saveFile = async (e: SaveFileArg) => {
   fs.writeFile(e.path, e.content.join('\n'), (err => {
      if (err) {
         console.error(err);
      }
   }));
}

export default saveFile;
