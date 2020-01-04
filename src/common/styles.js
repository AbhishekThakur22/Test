import colors from 'assets/colors';
import Common from './common';
export const commonStyles = {
  heading: {
    color: colors.title,
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    color: colors.text,
    fontSize: 17,
    textAlign: 'center'
  },
  container: {
    height: Common.deviceHeight,
    backgroundColor: Common.whiteColor
},
headerContainerStyle: {
    backgroundColor: Common.appColor,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderColor: Common.appThemeColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    alignSelf: 'stretch',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
},
hamburgerStyle: {
    height: 15,
    width: 8
},
textTileStyle: {
    color: Common.whiteColor,
    fontFamily: Common.JURA_SEMIBOLD,
    fontSize: 20
},
};