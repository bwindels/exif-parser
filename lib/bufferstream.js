function BufferStream(buffer, offset, length, bigEndian) {
	this.buffer = buffer;
	this.offset = offset;
	this.endPosition = this.offset + length;
	this.setBigEndian(bigEndian);
}

BufferStream.prototype = {
	setBigEndian: function(bigEndian) {
		this.bigEndian = !!bigEndian;
	},
	nextUInt8: function() {
		var value = this.buffer.readUInt8(this.offset);
		this.offset += 1;
		return value;
	},
	nextInt8: function() {
		var value = this.buffer.readInt8(this.offset);
		this.offset += 1;
		return value;
	},
	nextUInt16: function() {
		var value = this.bigEndian ? this.buffer.readUInt16BE(this.offset) : this.buffer.readUInt16LE(this.offset);
		this.offset += 2;
		return value;
	},
	nextUInt32: function() {
		var value = this.bigEndian ? this.buffer.readUInt32BE(this.offset) : this.buffer.readUInt32LE(this.offset);
		this.offset += 4;
		return value;
	},
	nextInt16: function() {
		var value = this.bigEndian ? this.buffer.readInt16BE(this.offset) : this.buffer.readInt16LE(this.offset);
		this.offset += 2;
		return value;
	},
	nextInt32: function() {
		var value = this.bigEndian ? this.buffer.readInt32BE(this.offset) : this.buffer.readInt32LE(this.offset);
		this.offset += 4;
		return value;
	},
	nextFloat: function() {
		var value = this.bigEndian ? this.buffer.readFloatBE(this.offset) : this.buffer.readFloatLE(this.offset);
		this.offset += 4;
		return value;
	},
	nextDouble: function() {
		var value = this.bigEndian ? this.buffer.readDoubleBE(this.offset) : this.buffer.readDoubleLE(this.offset);
		this.offset += 8;
		return value;
	},
	nextBuffer: function(length) {
		var value = this.buffer.slice(this.offset, this.offset + length);
		this.offset += length;
		return value;
	},
	remainingLength: function() {
		return this.endPosition - this.offset;
	},
	nextString: function(length) {
		var value = this.buffer.toString('ascii', this.offset, this.offset + length);
		this.offset += length;
		return value;
	},
	mark: function() {
		var markedOffset = this.offset, self = this;
		return {
			openWithOffset: function(offset) {
				offset = (offset || 0) + markedOffset;
				return new BufferStream(self.buffer, offset, self.endPosition - offset, self.bigEndian);
			}
		};
	},
	skip: function(amount) {
		this.offset += amount;
	}
};

module.exports = BufferStream;