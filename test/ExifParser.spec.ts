import * as fs from "fs";
import {ExifParserFactory} from "../lib/ExifParserFactory";
import * as assert from "assert";

describe('ExifParser', () => {

  it('Should parse image', () => {

    const buf = fs.readFileSync(__dirname + '/assets/image2.jpg');
    const actual = ExifParserFactory.create(buf).parse();
    const expected = require(__dirname + '/assets/expected-image2.json');
    delete actual.imageSize;
    delete actual.startMarker.openWithOffset;
    assert.deepEqual(actual, expected);

  });
});
