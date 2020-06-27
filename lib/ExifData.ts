import {JpegParser} from './JpegParser';

export enum OrientationTypes {
  TOP_LEFT = 1, //this is hte normal
  TOP_RIGHT = 2,
  BOTTOM_RIGHT = 3,
  BOTTOM_LEFT = 4,
  LEFT_TOP = 5,
  RIGHT_TOP = 6,
  RIGHT_BOTTOM = 7,
  LEFT_BOTTOM = 8
}

export interface ExifTags {
  //TODO: fix types
  InteropIndex?: number;
  InteropVersion?: string;
  ProcessingSoftware?: string;
  SubfileType?: string;
  OldSubfileType?: string;
  ImageWidth?: number;
  ImageHeight?: number;
  BitsPerSample?: string;
  Compression?: string;
  PhotometricInterpretation?: string;
  Thresholding?: string;
  CellWidth?: string;
  CellLength?: string;
  FillOrder?: string;
  DocumentName?: string;
  ImageDescription?: string;
  Make?: string;
  Model?: string;
  StripOffsets?: string;
  Orientation?: OrientationTypes;
  SamplesPerPixel?: string;
  RowsPerStrip?: string;
  StripByteCounts?: string;
  MinSampleValue?: string;
  MaxSampleValue?: string;
  XResolution?: number;
  YResolution?: number;
  PlanarConfiguration?: string;
  PageName?: string;
  XPosition?: string;
  YPosition?: string;
  FreeOffsets?: string;
  FreeByteCounts?: string;
  GrayResponseUnit?: string;
  GrayResponseCurve?: string;
  T4Options?: string;
  T6Options?: string;
  ResolutionUnit?: number;
  PageNumber?: number;
  ColorResponseUnit?: string;
  TransferFunction?: string;
  Software?: string;
  ModifyDate?: number;
  Artist?: string;
  HostComputer?: string;
  Predictor?: string;
  WhitePoint?: string;
  PrimaryChromaticities?: string;
  ColorMap?: string;
  HalftoneHints?: string;
  TileWidth?: number;
  TileLength?: number;
  TileOffsets?: number;
  TileByteCounts?: number;
  BadFaxLines?: string;
  CleanFaxData?: string;
  ConsecutiveBadFaxLines?: string;
  SubIFD?: string;
  InkSet?: string;
  InkNames?: string;
  NumberofInks?: string;
  DotRange?: string;
  TargetPrinter?: string;
  ExtraSamples?: string;
  SampleFormat?: string;
  SMinSampleValue?: string;
  SMaxSampleValue?: string;
  TransferRange?: string;
  ClipPath?: string;
  XClipPathUnits?: string;
  YClipPathUnits?: string;
  Indexed?: string;
  JPEGTables?: string;
  OPIProxy?: string;
  GlobalParametersIFD?: string;
  ProfileType?: string;
  FaxProfile?: string;
  CodingMethods?: string;
  VersionYear?: string;
  ModeNumber?: string;
  Decode?: string;
  DefaultImageColor?: string;
  T82Options?: string;
  JPEGProc?: string;
  ThumbnailOffset?: string;
  ThumbnailLength?: string;
  JPEGRestartInterval?: string;
  JPEGLosslessPredictors?: string;
  JPEGPointTransforms?: string;
  JPEGQTables?: string;
  JPEGDCTables?: string;
  JPEGACTables?: string;
  YCbCrCoefficients?: string;
  YCbCrSubSampling?: string;
  YCbCrPositioning?: string;
  ReferenceBlackWhite?: string;
  StripRowCounts?: string;
  ApplicationNotes?: string;
  USPTOMiscellaneous?: string;
  RelatedImageFileFormat?: string;
  RelatedImageWidth?: number;
  RelatedImageHeight?: number;
  Rating?: string;
  XP_DIP_XML?: string;
  StitchInfo?: string;
  RatingPercent?: string;
  ImageID?: string;
  WangTag1?: string;
  WangAnnotation?: string;
  WangTag3?: string;
  WangTag4?: string;
  Matteing?: string;
  DataType?: string;
  ImageDepth?: string;
  TileDepth?: string;
  Model2?: string;
  CFARepeatPatternDim?: string;
  CFAPattern2?: string;
  BatteryLevel?: string;
  KodakIFD?: string;
  Copyright?: string;
  ExposureTime?: number;
  FNumber?: number;
  MDFileTag?: string;
  MDScalePixel?: string;
  MDColorTable?: string;
  MDLabName?: string;
  MDSampleInfo?: string;
  MDPrepDate?: number;
  MDPrepTime?: number;
  MDFileUnits?: string;
  PixelScale?: string;
  AdventScale?: string;
  AdventRevision?: string;
  UIC1Tag?: string;
  UIC2Tag?: string;
  UIC3Tag?: string;
  UIC4Tag?: string;
  'IPTC-NAA'?: string;
  IntergraphPacketData?: string;
  IntergraphFlagRegisters?: string;
  IntergraphMatrix?: string;
  INGRReserved?: string;
  ModelTiePoint?: string;
  Site?: string;
  ColorSequence?: string;
  IT8Header?: string;
  RasterPadding?: string;
  BitsPerRunLength?: string;
  BitsPerExtendedRunLength?: string;
  ColorTable?: string;
  ImageColorIndicator?: string;
  BackgroundColorIndicator?: string;
  ImageColorValue?: string;
  BackgroundColorValue?: string;
  PixelIntensityRange?: string;
  TransparencyIndicator?: string;
  ColorCharacterization?: string;
  HCUsage?: string;
  TrapIndicator?: string;
  CMYKEquivalent?: string;
  SEMInfo?: string;
  AFCP_IPTC?: string;
  PixelMagicJBIGOptions?: string;
  ModelTransform?: string;
  WB_GRGBLevels?: string;
  LeafData?: string;
  PhotoshopSettings?: string;
  ExifOffset?: string;
  ICC_Profile?: string;
  TIFF_FXExtensions?: string;
  MultiProfiles?: string;
  SharedData?: string;
  T88Options?: string;
  ImageLayer?: string;
  GeoTiffDirectory?: string;
  GeoTiffDoubleParams?: string;
  GeoTiffAsciiParams?: string;
  ExposureProgram?: string;
  SpectralSensitivity?: string;
  GPSInfo?: string;
  ISO?: number;
  'Opto-ElectricConvFactor'?: string;
  Interlace?: string;
  TimeZoneOffset?: string;
  SelfTimerMode?: string;
  SensitivityType?: string;
  StandardOutputSensitivity?: string;
  RecommendedExposureIndex?: string;
  ISOSpeed?: number;
  ISOSpeedLatitudeyyy?: string;
  ISOSpeedLatitudezzz?: string;
  FaxRecvParams?: string;
  FaxSubAddress?: string;
  FaxRecvTime?: string;
  LeafSubIFD?: string;
  ExifVersion?: string;
  DateTimeOriginal?: number;
  CreateDate?: number;
  ComponentsConfiguration?: string;
  CompressedBitsPerPixel?: string;
  ShutterSpeedValue?: string;
  ApertureValue?: string;
  BrightnessValue?: string;
  ExposureCompensation?: string;
  MaxApertureValue?: string;
  SubjectDistance?: string;
  MeteringMode?: string;
  LightSource?: string;
  Flash?: string;
  FocalLength?: number;
  SubjectArea?: string;
  'TIFF-EPStandardID'?: string;
  SensingMethod?: string;
  CIP3DataFile?: string;
  CIP3Sheet?: string;
  CIP3Side?: string;
  StoNits?: string;
  MakerNote?: string;
  UserComment?: string;
  SubSecTime?: string;
  SubSecTimeOriginal?: string;
  SubSecTimeDigitized?: string;
  MSDocumentText?: string;
  MSPropertySetStorage?: string;
  MSDocumentTextPosition?: string;
  ImageSourceData?: string;
  XPTitle?: string;
  XPComment?: string;
  XPAuthor?: string;
  XPKeywords?: string;
  XPSubject?: string;
  FlashpixVersion?: string;
  ColorSpace?: string;
  ExifImageWidth?: number;
  ExifImageHeight?: number;
  RelatedSoundFile?: string;
  InteropOffset?: string;
  FlashEnergy?: string;
  SpatialFrequencyResponse?: string;
  Noise?: string;
  FocalPlaneXResolution?: string;
  FocalPlaneYResolution?: string;
  FocalPlaneResolutionUnit?: string;
  ImageNumber?: string;
  SecurityClassification?: string;
  ImageHistory?: string;
  SubjectLocation?: string;
  ExposureIndex?: number;
  FileSource?: string;
  SceneType?: string;
  CFAPattern?: string;
  CustomRendered?: string;
  ExposureMode?: string;
  DigitalZoomRatio?: string;
  FocalLengthIn35mmFormat?: string;
  SceneCaptureType?: string;
  GainControl?: string;
  DeviceSettingDescription?: string;
  SubjectDistanceRange?: string;
  ImageUniqueID?: string;
  LensInfo?: string;
  LensMake?: string;
  LensModel?: string;
  LensSerialNumber?: string;
  GDALMetadata?: string;
  GDALNoData?: string;
  Gamma?: string;
  ExpandSoftware?: string;
  ExpandLens?: string;
  ExpandFilm?: string;
  ExpandFilterLens?: string;
  ExpandScanner?: string;
  ExpandFlashLamp?: string;
  PixelFormat?: string;
  Transformation?: string;
  Uncompressed?: string;
  ImageType?: string;
  WidthResolution?: number;
  HeightResolution?: number;
  ImageOffset?: number;
  ImageByteCount?: number;
  AlphaOffset?: string;
  AlphaByteCount?: string;
  ImageDataDiscard?: string;
  AlphaDataDiscard?: string;
  OceScanjobDesc?: string;
  OceApplicationSelector?: string;
  OceIDNumber?: string;
  OceImageLogic?: string;
  Annotations?: string;
  PrintIM?: string;
  USPTOOriginalContentType?: string;
  DNGVersion?: string;
  DNGBackwardVersion?: string;
  UniqueCameraModel?: string;
  LocalizedCameraModel?: string;
  CFAPlaneColor?: string;
  CFALayout?: string;
  LinearizationTable?: string;
  BlackLevelRepeatDim?: string;
  BlackLevel?: string;
  BlackLevelDeltaH?: string;
  BlackLevelDeltaV?: string;
  WhiteLevel?: string;
  DefaultScale?: string;
  DefaultCropOrigin?: string;
  DefaultCropSize?: string;
  ColorMatrix1?: string;
  ColorMatrix2?: string;
  CameraCalibration1?: string;
  CameraCalibration2?: string;
  ReductionMatrix1?: string;
  ReductionMatrix2?: string;
  AnalogBalance?: string;
  AsShotNeutral?: string;
  AsShotWhiteXY?: string;
  BaselineExposure?: string;
  BaselineNoise?: string;
  BaselineSharpness?: string;
  BayerGreenSplit?: string;
  LinearResponseLimit?: string;
  CameraSerialNumber?: string;
  DNGLensInfo?: string;
  ChromaBlurRadius?: string;
  AntiAliasStrength?: string;
  ShadowScale?: string;
  DNGPrivateData?: string;
  MakerNoteSafety?: string;
  RawImageSegmentation?: string;
  CalibrationIlluminant1?: string;
  CalibrationIlluminant2?: string;
  BestQualityScale?: string;
  RawDataUniqueID?: string;
  AliasLayerMetadata?: string;
  OriginalRawFileName?: string;
  OriginalRawFileData?: string;
  ActiveArea?: string;
  MaskedAreas?: string;
  AsShotICCProfile?: string;
  AsShotPreProfileMatrix?: string;
  CurrentICCProfile?: string;
  CurrentPreProfileMatrix?: string;
  ColorimetricReference?: string;
  PanasonicTitle?: string;
  PanasonicTitle2?: string;
  CameraCalibrationSig?: string;
  ProfileCalibrationSig?: string;
  ProfileIFD?: string;
  AsShotProfileName?: string;
  NoiseReductionApplied?: string;
  ProfileName?: string;
  ProfileHueSatMapDims?: string;
  ProfileHueSatMapData1?: string;
  ProfileHueSatMapData2?: string;
  ProfileToneCurve?: string;
  ProfileEmbedPolicy?: string;
  ProfileCopyright?: string;
  ForwardMatrix1?: string;
  ForwardMatrix2?: string;
  PreviewApplicationName?: string;
  PreviewApplicationVersion?: string;
  PreviewSettingsName?: string;
  PreviewSettingsDigest?: string;
  PreviewColorSpace?: string;
  PreviewDateTime?: string;
  RawImageDigest?: string;
  OriginalRawFileDigest?: string;
  SubTileBlockSize?: string;
  RowInterleaveFactor?: string;
  ProfileLookTableDims?: string;
  ProfileLookTableData?: string;
  OpcodeList1?: string;
  OpcodeList2?: string;
  OpcodeList3?: string;
  NoiseProfile?: string;
  TimeCodes?: string;
  FrameRate?: string;
  TStop?: string;
  ReelName?: string;
  OriginalDefaultFinalSize?: string;
  OriginalBestQualitySize?: string;
  OriginalDefaultCropSize?: string;
  CameraLabel?: string;
  ProfileHueSatMapEncoding?: string;
  ProfileLookTableEncoding?: string;
  BaselineExposureOffset?: string;
  DefaultBlackRender?: string;
  NewRawImageDigest?: string;
  RawToPreviewGain?: string;
  DefaultUserCrop?: string;
  Padding?: string;
  OffsetSchema?: string;
  OwnerName?: string;
  SerialNumber?: string;
  Lens?: string;
  KDC_IFD?: string;
  RawFile?: string;
  Converter?: string;
  WhiteBalance?: string;
  Exposure?: string;
  Shadows?: string;
  Brightness?: string;
  Contrast?: string;
  Saturation?: string;
  Sharpness?: string;
  Smoothness?: string;
  MoireFilter?: string;
  GPSVersionID?: string;
  GPSLatitudeRef?: string;
  GPSLatitude?: number;
  GPSLongitudeRef?: string;
  GPSLongitude?: number;
  GPSAltitudeRef?: string;
  GPSAltitude?: number;
  GPSTimeStamp?: string;
  GPSSatellites?: string;
  GPSStatus?: string;
  GPSMeasureMode?: string;
  GPSDOP?: string;
  GPSSpeedRef?: string;
  GPSSpeed?: string;
  GPSTrackRef?: string;
  GPSTrack?: string;
  GPSImgDirection?: string;
  GPSImgDirectionRef?: string;
  GPSMapDatum?: string;
  GPSDestLatitudeRef?: string;
  GPSDestLatitude?: string;
  GPSDestLongitudeRef?: string;
  GPSDestLongitude?: string;
  GPSDestBearingRef?: string;
  GPSDestBearing?: string;
  GPSDestDistanceRef?: string;
  GPSDestDistance?: string;
  GPSProcessingMethod?: string;
  GPSAreaInformation?: string;
  GPSDateStamp?: string;
  GPSDifferential?: string;
  GPSHPositioningError?: string;
}


export enum ThumbnailTypes {
  jpeg = 6,
  tiff = 1
}

export interface ImageSize {
  width: number;
  height: number;
}

export class ExifData {
  constructor(public startMarker?: any,
              public tags?: ExifTags,
              public imageSize?: ImageSize,
              public thumbnailOffset?: number,
              public thumbnailLength?: number,
              public thumbnailType?: ThumbnailTypes,
              public app1Offset?: number) {
  }

  hasThumbnail(mime): boolean {
    if (!this.thumbnailOffset || !this.thumbnailLength) {
      return false;
    }
    if (typeof mime !== 'string') {
      return true;
    }
    if (mime.toLowerCase().trim() === 'image/jpeg') {
      return this.thumbnailType === ThumbnailTypes.jpeg;
    }
    if (mime.toLowerCase().trim() === 'image/tiff') {
      return this.thumbnailType === ThumbnailTypes.tiff;
    }
    return false;
  }

  getThumbnailOffset(): number {
    return this.app1Offset + 6 + this.thumbnailOffset;
  }

  getThumbnailLength(): number  {
    return this.thumbnailLength;
  }

  getThumbnailBuffer(): ArrayBuffer  {
    return this.getThumbnailStream().nextBuffer(this.thumbnailLength);
  }

  private getThumbnailStream() {
    return this.startMarker.openWithOffset(this.getThumbnailOffset());
  }

  getImageSize() {
    return this.imageSize;
  }

  getThumbnailSize() {
    let stream = this.getThumbnailStream(), size;
    JpegParser.parseSections(stream, function (sectionType, sectionStream) {
      if (JpegParser.getSectionName(sectionType).name === 'SOF') {
        size = JpegParser.getSizeFromSOFSection(sectionStream);
      }
    });
    return size;
  }
}
