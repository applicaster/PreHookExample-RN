import { StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../constants/measurements';

const TEXT_HORIZONTAL_PADDING = 13 + SCREEN_MARGIN;
export const styles = StyleSheet.create({
  articleContent: {
    paddingHorizontal: TEXT_HORIZONTAL_PADDING,
    paddingBottom: 100,
  },
  category: {
    fontSize: 14,
    color: '#4A4A4A',
    opacity: 0.75,
    fontWeight: '700',
    marginTop: 16,
  },
  title: {
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 40,
    color: '#000000',
  },
  summary: {
    color: '#353333',
    lineHeight: 23,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
  },
  author: {
    fontSize: 15.2,
    color: '#353333',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 13,
    marginBottom: 2,
  },
  closeButton: {
    height: 38,
    position: 'absolute',
    right: 15,
    top: 15,
    width: 38,
    zIndex: 3,
  },
});
