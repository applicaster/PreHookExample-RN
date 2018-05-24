import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    color: '#000000',
  },
  summary: {
    fontSize: 18,
    lineHeight: 23,
    color: '#353333',
    marginTop: 6,
    marginBottom: 0,
  },
  author: {
    fontSize: 15.2,
    color: '#353333',
    fontWeight: '600',
    marginTop: 8,
  },
  timestamp: {
    // TODO: 
  },
  closeButton: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 3,
  },
});
