import {
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';

const iOS = 'ios';
const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  commentHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  commentHeaderInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 10,
    height: 43,
    width,
  },
  commentHeaderInfoWithoutUserName: {
    justifyContent: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
  },
  name: {
    fontSize: 14,
    marginTop: (Platform.OS === iOS) ? -3 : -4,
    marginBottom: -2,
    fontWeight: '600',
  },
  userName: {
    fontSize: 10,
  },
});
