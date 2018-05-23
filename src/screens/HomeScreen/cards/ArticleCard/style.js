import { StyleSheet } from 'react-native';

const HORIZONTAL_PADDING = 13;
export const styles = StyleSheet.create({
  category: {
    fontSize: 14,
    color: '#4A4A4A',
    opacity: 0.75,
    fontWeight: 'bold',
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 16,
  },
  title: {
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '800',
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 6,
    color: '#000000',
  },
  summary: {
    fontSize: 18,
    lineHeight: 23,
    color: '#353333',
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 6,
    marginBottom: 0,
  },
  body: {
    marginHorizontal: HORIZONTAL_PADDING,
  },
});
