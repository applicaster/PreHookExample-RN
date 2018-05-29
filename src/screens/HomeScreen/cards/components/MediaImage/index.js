import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View } from 'react-native';
import LinearGradient from '@applicaster/react-native-linear-gradient';
import { styles } from './style';
import { getMediaDimensions } from '../../../../../utils/size';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';
import { CARD_ACTIVATE_ANIMATION_DURATION, CARD_DEACTIVATE_ANIMATION_DURATION } from '../../../../../constants/animations';

class MediaImage extends Component {
  constructor(props) {
    super(props);

    const { shouldAnimate } = props;
    this.imageAnimatedValue = new Animated.Value(shouldAnimate ? 1 : 0);
    this.grandientAnimatedValue = new Animated.Value(shouldAnimate ? 1 : 0);
  }
  
  componentWillReceiveProps(nextProps) {
    const { isExpanded: nextIsExpanded } = nextProps;
    const { isExpanded, shouldAnimate } = this.props;
    
    if (!shouldAnimate) return;

    const gradientAnimationDuration = (nextIsExpanded) ? 200 : 1000;
    const imageAnimationDuration = (nextIsExpanded)
      ? CARD_ACTIVATE_ANIMATION_DURATION
      : CARD_DEACTIVATE_ANIMATION_DURATION;
  

    if (nextIsExpanded !== isExpanded) {
      Animated.parallel([
        Animated.timing(
          this.imageAnimatedValue,
          {
            toValue: (nextIsExpanded) ? 0 : 1,
            duration: imageAnimationDuration,
          }),
        Animated.timing(
          this.grandientAnimatedValue,
          {
            toValue: (nextIsExpanded) ? 0 : 1,
            duration: gradientAnimationDuration,
          }),
      ]).start();
    }
  }

  getImageStyles() {
    const { isZoomed, height, width } = this.props;
    const imageDimensions = getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN, isZoomed });
    const leftValueWhenZoomed = this.imageAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -SCREEN_MARGIN],
    });

    return {
      height: imageDimensions.height,
      width: imageDimensions.width,
      left: (isZoomed) ? leftValueWhenZoomed : 0,
    };
  }

  render() {
    const { imageUrl, shouldAnimate } = this.props;
    const imageStyles = this.getImageStyles();
    const headerVisorContainerStyles = {
      opacity: shouldAnimate ? this.grandientAnimatedValue : 0,
    };

    return (
      <View>
        <Animated.Image
          style={imageStyles}
          source={{ uri: imageUrl }}
        />
        <Animated.View style={[styles.headerVisor, headerVisorContainerStyles]}>
          <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
        </Animated.View>
      </View>);
  }
}

MediaImage.propTypes = {
  shouldAnimate: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  isZoomed: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

MediaImage.defaultProps = {
  isZoomed: false,
  isExpanded: false,
  shouldAnimate: true,
};

export default MediaImage;
