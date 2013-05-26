var testCase = require('nodeunit').testCase;
var jpeg = require('../lib/jpeg.js');
var buf = require('fs').readFileSync(__dirname + '/test.jpg');

module.exports = testCase({
	"test parseSections": function(test) {
		var expectedSections = [
			{ type: 216, offset: 2, len: 0 },
			{ type: 224, offset: 6, len: 14 },
			{ type: 226, offset: 24, len: 3158 },
			{ type: 225, offset: 3186, len: 200 },
			{ type: 225, offset: 3390, len: 374 },
			{ type: 219, offset: 3768, len: 65 },
			{ type: 219, offset: 3837, len: 65 },
			{ type: 192, offset: 3906, len: 15 },
			{ type: 196, offset: 3925, len: 29 },
			{ type: 196, offset: 3958, len: 179 },
			{ type: 196, offset: 4141, len: 29 },
			{ type: 196, offset: 4174, len: 179 },
			{ type: 218, offset: 4355, len: 0 }
		];
		var index = 0;
		jpeg.parseSections(buf, function(type, offset, len) {
			test.strictEqual(type, expectedSections[index].type);
			test.strictEqual(offset, expectedSections[index].offset);
			test.strictEqual(len, expectedSections[index].len);
			++index;
		});
		test.strictEqual(index, expectedSections.length, 'all sections should be passed to the iterator');
		test.done();	
	},
	"test getSizeFromSOFSection": function(test) {
		var size = jpeg.getSizeFromSOFSection(buf, 3906);
		test.strictEqual(size.width, 2);
		test.strictEqual(size.height, 1);
		test.done();
	},
	"test getSectionName": function(test) {
		test.deepEqual({name: 'SOI'}, jpeg.getSectionName(0xD8));
		test.deepEqual({name: 'APP', index: 2}, jpeg.getSectionName(0xE2));
		test.done();
	}
});