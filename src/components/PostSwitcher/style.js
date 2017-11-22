import { StyleSheet } from 'react-native';

const optionSize = 33;
const iconSize = 25;

export const styles = StyleSheet.create({
  postSwitcherContainer: {
    flexDirection: 'row',
    borderRadius: 3,
    borderWidth: 1,
    marginRight: 11,
    height: optionSize,
    width: optionSize * 2,
  },
  facebookOption: {
    height: optionSize,
    width: optionSize,
  },
  facebookOptionImage: {
    height: iconSize,
    width: iconSize,
  },
  twitterOption: {
    height: optionSize,
    width: optionSize,
  },
  twitterOptionImage: {
    height: iconSize,
    width: iconSize,
  },
});
