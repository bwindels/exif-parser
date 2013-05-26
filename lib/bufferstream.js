function BufferStream(buffer, offset, length) {
	this.buffer = buffer;
	this.offset = offset;
	this.length = length;
}

BufferStream.prototype = {
	setBigEndian: function(bigEndian) {

	},
	nextShort: function() {
		
	},
	jump: function() {

	},
	skip: function() {
		
	}
};

module.exports = BufferStream;