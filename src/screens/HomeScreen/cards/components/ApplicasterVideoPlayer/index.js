import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import { APVideoPlayer } from 'react-native-zapp-bridge';

const ApplicasterVideoPlayer = (props) => {
  const { title, videoUrl, imageUrl, id } = props;

  const style = {
    backgroundColor: '#000',
  };

  const src = {
    type: Platform.OS === 'android' ? 'vod' : 'url',
    object: {
      id,
      name: title,
      thumbnail_url: imageUrl,
      stream_url: videoUrl,
    },
    player_configuration: {
      inline_player_should_auto_mute: false,
    },
  };
  
  return (
    <View>
      <APVideoPlayer {...{ src, style }} />
    </View>
  );
};

ApplicasterVideoPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

ApplicasterVideoPlayer.contextTypes = {
  backgroundColor: PropTypes.string,
};

export default ApplicasterVideoPlayer;
