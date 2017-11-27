import { StyleSheet } from 'react-native';

const optionSize = 30;
const iconSize = 18;

export const styles = StyleSheet.create({
  postSwitcherContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 11,
    height: optionSize,
    width: optionSize * 2,
  },
  facebookOption: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitterOption: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookOptionImage: {
    height: iconSize,
    width: iconSize,
  },
  twitterOptionImage: {
    height: iconSize,
    width: iconSize,
  },
});
