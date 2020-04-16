import {ExifParser} from './ExifParser';

function getGlobal() {
  return (1, eval)('this');
}

export class ExifParserFactory {
  public static create(buffer: Buffer, global?: any) {
    global = global || getGlobal();
    if (buffer instanceof global.ArrayBuffer) {
      const DOMBufferStream = require('./DOMBufferStream').DOMBufferStream;
      return new ExifParser(new DOMBufferStream(buffer, 0, buffer.byteLength, true, global));
    } else {
      const NodeBufferStream = require('./BufferStream').BufferStream;
      return new ExifParser(new NodeBufferStream(buffer, 0, buffer.length, true));
    }
  }
}
