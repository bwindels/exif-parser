exif-parser
========
exif-parser is a parser for image metadata in the exif format, the most popular metadata format for jpeg and tiff images. It is written in pure javascript and has no external dependencies. It can also get the size of jpeg images and the size of the jpeg thumbnail embedded in the exif data. It can also extract the embedded thumbnail image.

###Creating a parser
To start parsing exif data, create a new parser like below. Note that the buffer you pass does not have to be the buffer for the full jpeg file. The exif section of a jpeg file has a maximum size of 65535 bytes and the section seems to always occur within the first 100 bytes of the file. So it is safe to only fetch the first 65635 bytes of a jpeg file and pass those to the parser.

The buffer you pass to create can be a node buffer or a DOM ArrayBuffer.

```
var parser = require('exif-parser').create(buffer);
var result = parser.parse();
```

###Setting the flags

Before calling parse, you can set a number of flags on the parser, telling it how to behave while parsing.
    
    parser.enableBinaryFields([boolean]), default false;

Needs to be documented.

    parser.enablePointers([boolean]), default false;

Needs to be documented.

    parser.enableTagNames([boolean]), default true;

Needs to be documented.

    parser.enableImageSize([boolean]), default true;

Needs to be documented.

    parser.enableReturnTags([boolean]), default true;

Needs to be documented.

    parser.enableSimpleValues([boolean]), default true;

###working with the result

####Getting the tags
the tags that were found while parsing are stored in ```result.tags``` unless you set ```parser.enableReturnTags(false)```. If ```parser.enableTagNames``` is set to true, ```result.tags``` will be an object with the key being the tag name and the value being the tag value. If ```parser.enableTagNames``` is set to false, ```result.tags``` will be an array of objects containing section, type and value properties.

####Getting the image size
If ```parser.enableImageSize``` is set to true, ```result.getImageSize()``` will give you the image size as an object with width and height properties.

####Getting the thumbnail

You can check if there is a thumbnail present in the exif data with ```result.hasThumbnail()```. Exif supports thumbnails is jpeg and tiff format, though most are in jpeg format. You can check if there is a thumbnail present in a give format by passing the mime type: ```result.hasThumbnail("image/jpeg")```.

You can also get the image size of the thumbnail as an object with width and height properties: ```result.getThumbnailSize()```.

To get the node buffer or arraybuffer containing just the thumbnail, call ```result.getThumbnailBuffer()```