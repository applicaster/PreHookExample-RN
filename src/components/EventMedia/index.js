import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  image: {
    height: screenWidth,
    width: screenWidth,
  },
  headerVisor: {
    height: 130,
  },
});

class EventMedia extends Component {
  render() {
    const { imageUrl, width, height } = this.props;
    let imageStyles = styles.image;
    if (width !== height) {
      const aspectRatio = (width / height);
      imageStyles = {
        height: (screenWidth / aspectRatio),
        width: screenWidth,
      };
    }

    return (
      <ImageBackground
        style={ imageStyles }
        source={{ uri: imageUrl }}
      >
        <LinearGradient style={ styles.headerVisor } colors={['rgba(0,0,0,0.7)', 'transparent']} />
      </ImageBackground>
    );
  }
}

EventMedia.propTypes = {
  imageUrl: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default EventMedia;
