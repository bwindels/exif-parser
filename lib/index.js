var Parser = require('./parser');

function getGlobal() {
	return this;
}

module.exports = {
	create: function(buffer, global) {
		global = global || getGlobal();
		if(buffer instanceof global.ArrayBuffer) {
			var DOMBufferStream = require('./dom-bufferstream');
			return new Parser(new DOMBufferStream(buffer, 0, buffer.length, true, global));
		} else {
			var NodeBufferStream = require('./bufferstream');
			return new Parser(new NodeBufferStream(buffer, 0, buffer.length, true));
		}
	}
};