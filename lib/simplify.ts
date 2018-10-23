import {ExifSections} from './ExifSectionParser';
import {DateUtil} from './DateUtil';

export module simplify {

  const degreeTags = [{
    section: ExifSections.GPSIFD,
    type: 0x0002,
    name: 'GPSLatitude',
    refType: 0x0001,
    refName: 'GPSLatitudeRef',
    posVal: 'N'
  },
    {
      section: ExifSections.GPSIFD,
      type: 0x0004,
      name: 'GPSLongitude',
      refType: 0x0003,
      refName: 'GPSLongitudeRef',
      posVal: 'E'
    }];
  const dateTags: any[] = [{
    section: ExifSections.SubIFD,
    type: 0x0132,
    name: 'ModifyDate'
  },
    {
      section: ExifSections.SubIFD,
      type: 0x9003,
      name: 'DateTimeOriginal'
    },
    {
      section: ExifSections.SubIFD,
      type: 0x9004,
      name: 'CreateDate'
    },
    {
      section: ExifSections.SubIFD,
      type: 0x0132,
      name: 'ModifyDate',
    }];

  export function castDegreeValues(getTagValue, setTagValue) {
    degreeTags.forEach(function (t) {
      let degreeVal = getTagValue(t);
      if (degreeVal) {
        let degreeRef = getTagValue({section: t.section, type: t.refType, name: t.refName});
        let degreeNumRef = degreeRef === t.posVal ? 1 : -1;
        let degree = (degreeVal[0] + (degreeVal[1] / 60) + (degreeVal[2] / 3600)) * degreeNumRef;
        setTagValue(t, degree);
      }
    });
  }

  export function castDateValues(getTagValue, setTagValue) {
    dateTags.forEach(function (t) {
      let dateStrVal = getTagValue(t);
      if (dateStrVal) {
        //some easy checks to determine two common date formats
        let timestamp = DateUtil.parseExifDate(dateStrVal);
        if (typeof timestamp !== 'undefined') {
          setTagValue(t, timestamp);
        }
      }
    });
  }

  export function simplifyValue(values, format) {
    if (Array.isArray(values)) {
      values = values.map(function (value) {
        if (format === 10 || format === 5) {
          return value[0] / value[1];
        }
        return value;
      });
      if (values.length === 1) {
        values = values[0];
      }
    }
    return values;
  }
}
