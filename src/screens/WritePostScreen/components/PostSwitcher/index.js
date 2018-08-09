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
    const { socialNetworkSelected, toggleNetworkSelected } = this.props;
    const { mainColor, textColor } = this.context.styles;
    const borderColorStyle = { borderColor: mainColor };
    const tintColorStyle = { tintColor: textColor };
    const twitterSelectedStyles = { backgroundColor: (socialNetworkSelected === 'twitter') ? mainColor : 'transparent' };
    const facebookSelectedStyles = { backgroundColor: (socialNetworkSelected === 'facebook') ? mainColor : 'transparent' };

    return (
      <View style={[styles.postSwitcherContainer, borderColorStyle]}>
        <TouchableWithoutFeedback onPress={toggleNetworkSelected}>
          <View style={[styles.facebookOption, facebookSelectedStyles]}>
            <Image style={[styles.facebookOptionImage, tintColorStyle]} source={{ uri: FB_POST_ICON }} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleNetworkSelected}>
          <View style={[styles.twitterOption, twitterSelectedStyles]}>
            <Image style={[styles.twitterOptionImage, tintColorStyle]} source={{ uri: TWITTER_POST_ICON }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

PostSwitcher.propTypes = {
  socialNetworkSelected: PropTypes.string,
  toggleNetworkSelected: PropTypes.func,
};

PostSwitcher.contextTypes = {
  styles: PropTypes.object,
};

export default PostSwitcher;
