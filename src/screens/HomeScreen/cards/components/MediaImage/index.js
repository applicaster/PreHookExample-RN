import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import LinearGradient from '@applicaster/react-native-linear-gradient';
import { styles } from './style';
import { getMediaDimensions } from '../../../../../utils/size';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';

class MediaImage extends Component {
  render() {
    const { imageUrl, isZoomed, height, width } = this.props;

    return (
      <View>
        <Image
          style={getMediaDimensions({ height, width, screenMargin: SCREEN_MARGIN, isZoomed })}
          source={{ uri: imageUrl }}
        />
        <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
      </View>);
  }
}

MediaImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  isZoomed: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

MediaImage.defaultProps = {
  isZoomed: false,
};

export default MediaImage;
