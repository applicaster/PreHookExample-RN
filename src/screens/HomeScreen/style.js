import { Platform, StyleSheet } from 'react-native';
import { TOP_CARD_LIST_PADDING } from '../../constants/measurements';

export const styles = StyleSheet.create({
  feedListContent: {
    backgroundColor: 'transparent',
    paddingTop: TOP_CARD_LIST_PADDING,
    paddingBottom: Platform.OS === 'android' ? 40 : 0,
  },
  feedList: {
    backgroundColor: 'transparent',
    paddingBottom: 5,
  },
});
