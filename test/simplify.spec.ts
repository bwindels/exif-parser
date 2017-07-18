import {simplify} from "../lib/simplify";
import * as assert from "assert";

describe('simplify', () => {
  it('test castDateValues', () => {
    const values = {
      'DateTimeOriginal': '1970:01:01 00:00:00',
      'CreateDate': '1970-01-01T00:00:00-05:00',
      'ModifyDate': '1970-01-01T00:00:00-05:00'
    };
    const setValues: any = {};

    function getTagValue(tag) {
      return values[tag.name];
    }

    function setTagValue(tag, value) {
      setValues[tag.name] = value;
    }

    simplify.castDateValues(getTagValue, setTagValue);
    assert.strictEqual(Object.keys(setValues).length, 3);
    assert.strictEqual(setValues.DateTimeOriginal, 0);
    assert.strictEqual(setValues.CreateDate, 5 * 3600);
    assert.strictEqual(setValues.ModifyDate, 5 * 3600);
  });
});
