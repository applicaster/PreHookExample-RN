import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './style';

const FB_POST_ICON = 'feed_rn_fb_post_icon';
const TWITTER_POST_ICON = 'feed_rn_twitter_post_icon';

class PostSwitcher extends Component {
  render() {
    const { selectedOption } = this.props;
    const { backgroundColor, mainColor, textColor } = this.context;

    const selectedTintColor = { tintColor: textColor };
    const unSelectedTintColor = { tintColor: textColor };

    const selectedBackgroundColor = { backgroundColor: mainColor };
    const unSelectedBackgroundColor = { backgroundColor };

    const borderColorStyle = { borderColor: mainColor };

    return (
      <View style={[styles.postSwitcherContainer, borderColorStyle]}>
        <TouchableWithoutFeedback style={[styles.facebookOption]}>
          <Image style={styles.facebookOptionImage} source={{ uri: FB_POST_ICON }} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={[styles.twitterOption]}>
          <Image style={styles.twitterOptionImage} source={{ uri: TWITTER_POST_ICON }} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

PostSwitcher.propTypes = {
  selectedOption: PropTypes.string,
};

PostSwitcher.contextTypes = {
  backgroundColor: PropTypes.string,
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default PostSwitcher;
