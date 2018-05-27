import { StyleSheet } from 'react-native';
import { SCREEN_MARGIN } from '../../../../constants/measurements';
import { getMediaDimensions } from '../../../../utils/size';

const BORDER_RADIUS_FOR_GHOSTS = 5;
const ghostMediaDimensions = getMediaDimensions({ height: 9, width: 16, screeMargin: SCREEN_MARGIN });
export const styles = StyleSheet.create({
  ghostCard: {
    opacity: 0.3,
    paddingHorizontal: 15,
  },
  ghostMedia: {
    borderRadius: BORDER_RADIUS_FOR_GHOSTS,
    height: ghostMediaDimensions.height,
    marginBottom: 8,
    marginTop: 15,
  },
  ghostLine: {
    borderRadius: BORDER_RADIUS_FOR_GHOSTS,
  },
  ghostShareButton: {
    borderRadius: BORDER_RADIUS_FOR_GHOSTS,
    bottom: 10,
    height: 25,
    position: 'absolute',
    right: 15,
    width: 25,
  },
});
