import * as assert from "assert";
import * as fs from "fs";
import {BufferStream} from "../lib/BufferStream";
import {JpegParser} from "../lib/JpegParser";

describe('JpegParser', () => {
  const buf = fs.readFileSync(__dirname + '/assets/test.jpg');

  it('castDateValues', () => {
    const expectedSections = [
      {type: 216, offset: 2, len: 0},
      {type: 224, offset: 6, len: 14},
      {type: 226, offset: 24, len: 3158},
      {type: 225, offset: 3186, len: 200},
      {type: 225, offset: 3390, len: 374},
      {type: 219, offset: 3768, len: 65},
      {type: 219, offset: 3837, len: 65},
      {type: 192, offset: 3906, len: 15},
      {type: 196, offset: 3925, len: 29},
      {type: 196, offset: 3958, len: 179},
      {type: 196, offset: 4141, len: 29},
      {type: 196, offset: 4174, len: 179},
      {type: 218, offset: 4355, len: 0}
    ];
    let index = 0;
    const jpegStream = new BufferStream(buf), start = jpegStream.mark();
    JpegParser.parseSections(jpegStream, function (type, sectionStream) {
      assert.strictEqual(type, expectedSections[index].type);
      assert.strictEqual(sectionStream.offsetFrom(start), expectedSections[index].offset);
      assert.strictEqual(sectionStream.remainingLength(), expectedSections[index].len);
      ++index;
    });
    assert.strictEqual(index, expectedSections.length, 'all sections should be passed to the iterator');
  });
  it('getSizeFromSOFSection', () => {
    const size = JpegParser.getSizeFromSOFSection(new BufferStream(buf, 3906, 15, true));
    assert.strictEqual(size.width, 2);
    assert.strictEqual(size.height, 1);
  });
  it('getSectionName', () => {
    assert.deepStrictEqual({name: 'SOI'}, JpegParser.getSectionName(0xD8));
    assert.deepStrictEqual({name: 'APP', index: 15}, JpegParser.getSectionName(0xEF));
    assert.deepStrictEqual({name: 'DHT'}, JpegParser.getSectionName(0xC4));
  });
});
