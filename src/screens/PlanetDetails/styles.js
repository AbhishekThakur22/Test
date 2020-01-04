import { StyleSheet } from 'react-native';
import {commonStyles} from 'common/styles';
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  heading: {
    ...commonStyles.heading, ...{
      marginTop: 72
    }
  }
});