/*jslint browser: true, devel: true, bitwise: false, debug: true, eqeq: false, es5: true, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: false, unparam: false, sloppy: true, stupid: false, sub: false, todo: true, lets: true, white: true */
import {simplify} from "./simplify";
import {JpegParser} from "./JpegParser";
import {ExifSectionParser, ExifSections} from "./ExifSectionParser";
import {Tags} from "./exif-tags";
import {ExifData} from "./ExifData";




export class ExifParser {
  flags = {
    readBinaryTags: false,
    resolveTagNames: true,
    simplifyValues: true,
    imageSize: true,
    hidePointers: true,
    returnTags: true
  };

  constructor(private stream) {
  }

  enableBinaryFields(enable: boolean) {
    this.flags.readBinaryTags = enable;
    return this;
  }

  enablePointers(enable: boolean) {
    this.flags.hidePointers = !enable;
    return this;
  }

  enableTagNames(enable: boolean) {
    this.flags.resolveTagNames = enable;
    return this;
  }

  enableImageSize(enable: boolean) {
    this.flags.imageSize = enable;
    return this;
  }

  enableReturnTags(enable: boolean) {
    this.flags.returnTags = enable;
    return this;
  }

  public enableSimpleValues(enable: boolean) {
    this.flags.simplifyValues = enable;
    return this;
  }

  parse(): ExifData {
    let start = this.stream.mark(),
      stream = start.openWithOffset(0),
      flags = this.flags,
      tags,
      imageSize,
      thumbnailOffset,
      thumbnailLength,
      thumbnailType,
      app1Offset,
      getTagValue, setTagValue;

    if (flags.resolveTagNames) {
      tags = {};
      getTagValue = function (t) {
        return tags[t.name];
      };
      setTagValue = function (t, value) {
        tags[t.name] = value;
      };
    } else {
      tags = [];
      getTagValue = function (t) {
        let i;
        for (i = 0; i < tags.length; ++i) {
          if (tags[i].type === t.type && tags[i].section === t.section) {
            return tags.value;
          }
        }
      };
      setTagValue = function (t, value) {
        let i;
        for (i = 0; i < tags.length; ++i) {
          if (tags[i].type === t.type && tags[i].section === t.section) {
            tags.value = value;
            return;
          }
        }
      };
    }

    JpegParser.parseSections(stream, function (sectionType, sectionStream) {
      let validExifHeaders, sectionOffset = sectionStream.offsetFrom(start);
      if (sectionType === 0xE1) {
        validExifHeaders = ExifSectionParser.parseTags(sectionStream, function (ifdSection, tagType, value, format) {
          //ignore binary fields if disabled
          if (!flags.readBinaryTags && format === 7) {
            return;
          }

          if (tagType === 0x0201) {
            thumbnailOffset = value[0];
            if (flags.hidePointers) {
              return;
            }
          } else if (tagType === 0x0202) {
            thumbnailLength = value[0];
            if (flags.hidePointers) {
              return;
            }
          } else if (tagType === 0x0103) {
            thumbnailType = value[0];
            if (flags.hidePointers) {
              return;
            }
          }
          //if flag is set to not store tags, return here after storing pointers
          if (!flags.returnTags) {
            return;
          }

          if (flags.simplifyValues) {
            value = simplify.simplifyValue(value, format);
          }
          if (flags.resolveTagNames) {
            let sectionTagNames = ifdSection === ExifSections.GPSIFD ? Tags.GPS : Tags.Exif;
            let name = sectionTagNames[tagType];
            if (!name) {
              name = Tags.Exif[tagType];
            }
            if (!tags.hasOwnProperty(name)) {
              tags[name] = value;
            }
          } else {
            tags.push({
              section: ifdSection,
              type: tagType,
              value: value
            });
          }
        });
        if (validExifHeaders) {
          app1Offset = sectionOffset;
        }
      }
      else if (flags.imageSize && JpegParser.getSectionName(sectionType).name === 'SOF') {
        imageSize = JpegParser.getSizeFromSOFSection(sectionStream);
      }
    });

    if (flags.simplifyValues) {
      simplify.castDegreeValues(getTagValue, setTagValue);
      simplify.castDateValues(getTagValue, setTagValue);
    }

    return new ExifData(start, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset);
  }
}
