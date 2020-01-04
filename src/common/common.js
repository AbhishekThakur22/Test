import { Dimensions, PixelRatio } from 'react-native';
import * as Fonts from './fontFamily';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = {
  deviceHeight,
  deviceWidth,

  // Color and backgroundColor
  lightGrey: '#929292',
  whiteColor: '#fff',
  blackColor: '#000',
  greyColor: '#5a5a5a',
  textGreyColor: '#525252',
  darkColor: '#202020',
  moreDarkColor: '#131313',
  appThemeColor: '#3d95ae',
  boxColor: '#c9c9c9',
  lineColor: '#ededed',
  appColor: '#0bbcd8',
  sliderBg: '#0896ae',
  redColor: '#e81f01',
  lightBlue: '#4dbbd1',
  yellowColor: '#edbc10',
  whereToTextColor: '#535760',
  vesselTextColor: '#232323',
  greenColor: '#24bb7c',
  borderRedColor: '#ff0909',
  orangeColor: '#ff8533',
  // size
  backButtonIconSize: 25,
  mainTextFontSize: 17,
  TitleText: 23,
  whiteTransparent: 'rgba(255, 255, 255, 0.8)',


  // fonts size
  
  smallModalHeight() {
    if (PixelRatio.get() <= 1) {
      return PixelRatio.get() * 44
    }
    else if (PixelRatio.get() > 1 && PixelRatio.get() < 1.5) {
      return PixelRatio.get() * 35
    }
    else if (PixelRatio.get() >= 1.5 && PixelRatio.get() < 2) {
      return PixelRatio.get() * 30
    }
    else if (PixelRatio.get() >= 2 && PixelRatio.get() < 2.5) {
      return PixelRatio.get() * 20
    }
    else if (PixelRatio.get() >= 2.5 && PixelRatio.get() < 3) {
      return PixelRatio.get() * 15
    }
    else if (PixelRatio.get() >= 3 && PixelRatio.get() <= 3.5) {
      return PixelRatio.get() * 10
    }
    else {
      return PixelRatio.get() * 22
    }
  },

  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  fontSizeSmallest: deviceWidth / 35,
  fontSizeSmall: deviceWidth / 30,
  fontSizeMedium: deviceWidth / 25,
  fontSizeLarge: deviceWidth / 20,
  fontSizeLargest: deviceWidth / 16,
  fontSizeGiant: deviceWidth / 10,




  // fonts
  AVENIR_HEAVY: Fonts.AVENIR_HEAVY,
  AVENIR_MEDIUM: Fonts.AVENIR_MEDIUM,
  AVENIR_LIGHT: Fonts.AVENIR_LIGHT,
  AVENIR_BOOK: Fonts.AVENIR_BOOK,
  AVENIRLTS_BOOK: Fonts.AVENIRLTS_BOOK,
  AVENIRLTS_LIGHT: Fonts.AVENIRLTS_LIGHT,
  AVENIRLTS_ROMAN: Fonts.AVENIRLTS_ROMAN,
  AVENIR_ROMAN: Fonts.AVENIR_ROMAN,
  JURA_MEDIUM: Fonts.JURA_MEDIUM,
  JURA_REGULAR: Fonts.JURA_REGULAR,
  JURA_SEMIBOLD: Fonts.JURA_SEMIBOLD,
  JURA_LIGHT: Fonts.JURA_LIGHT,

  // fontWeight
  bold: '500',
  medium: '300',
};
