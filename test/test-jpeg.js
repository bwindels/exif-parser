var testCase = require('nodeunit').testCase;
var jpeg = require('../lib/jpeg.js');
var buf = require('fs').readFileSync(__dirname + '/test.jpg');

module.exports = testCase({
	"read test image": function(test) {
		jpeg.parseSections(buf, function(type, offset, len) {
			var name = jpeg.getSectionName(type);
			if(name.name === 'SOF') {
				console.log(jpeg.getSizeFromSOFSection(buf, offset));
			}
			console.log(name.name, name.index, offset, len);
		});
		test.done();	
	}
});