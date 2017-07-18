export class BufferStream {
  endPosition;

  constructor(private buffer,
              public offset:number = 0,
              private length: number = buffer.length,
              private bigEndian?: boolean) {
    this.endPosition = this.offset + length;
    this.setBigEndian(bigEndian);
  }

  setBigEndian(bigEndian) {
    this.bigEndian = !!bigEndian;
  }

  nextUInt8() {
    let value = this.buffer.readUInt8(this.offset);
    this.offset += 1;
    return value;
  }

  nextInt8() {
    let value = this.buffer.readInt8(this.offset);
    this.offset += 1;
    return value;
  }

  nextUInt16() {
    let value = this.bigEndian ? this.buffer.readUInt16BE(this.offset) : this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
    return value;
  }

  nextUInt32() {
    let value = this.bigEndian ? this.buffer.readUInt32BE(this.offset) : this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  nextInt16() {
    let value = this.bigEndian ? this.buffer.readInt16BE(this.offset) : this.buffer.readInt16LE(this.offset);
    this.offset += 2;
    return value;
  }

  nextInt32() {
    let value = this.bigEndian ? this.buffer.readInt32BE(this.offset) : this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  nextFloat() {
    let value = this.bigEndian ? this.buffer.readFloatBE(this.offset) : this.buffer.readFloatLE(this.offset);
    this.offset += 4;
    return value;
  }

  nextDouble() {
    let value = this.bigEndian ? this.buffer.readDoubleBE(this.offset) : this.buffer.readDoubleLE(this.offset);
    this.offset += 8;
    return value;
  }

  nextBuffer(length) {
    let value = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return value;
  }

  remainingLength() {
    return this.endPosition - this.offset;
  }

  nextString(length) {
    let value = this.buffer.toString('utf8', this.offset, this.offset + length);
    this.offset += length;
    return value;
  }

  mark() {
    let self = this;
    return {
      openWithOffset(offset) {
        offset = (offset || 0) + this.offset;
        return new BufferStream(self.buffer, offset, self.endPosition - offset, self.bigEndian);
      },
      offset: this.offset
    };
  }

  offsetFrom(marker) {
    return this.offset - marker.offset;
  }

  skip(amount) {
    this.offset += amount;
  }

  branch(offset, length) {
    length = typeof length === 'number' ? length : this.endPosition - (this.offset + offset);
    return new BufferStream(this.buffer, this.offset + offset, length, this.bigEndian);
  }
}
