import { StyleSheet } from 'react-native';

const ICON_SIZE = 30;

export const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    marginRight: 7,
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginRight: 1,
  },
  label: {
    fontSize: 12,
  },
});
