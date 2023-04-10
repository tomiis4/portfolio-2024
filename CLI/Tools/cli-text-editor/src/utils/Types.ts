type Mode = 'normal' | 'insert' | 'command' | 'visual';

type File = {
   isSaved: boolean,
   name: string
}

type StatuslineArg = {
   mode: Mode,
   file: File,
   cursor: number,
   fileLen: number
}

type Buffer = {
   content: string[],
   name: string,
   isSaved: boolean
}

type BufferlineArg = {
   openBuffer: number,
   buffers: File[]
}

export type { Mode, StatuslineArg, BufferlineArg, File, Buffer };
