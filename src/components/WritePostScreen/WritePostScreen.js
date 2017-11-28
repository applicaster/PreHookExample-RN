import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Dimensions,
  Keyboard,
  Platform,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import { styles, BAR_HEIGHT, STATUS_BAR_HEIGHT } from './style';
import CloseButton from '../CloseButton';
import CharacterCounter from '../CharacterCounter';
import PostSwitcher from '../PostSwitcher';

const window = Dimensions.get('window');
class WritePostScreen extends Component {
  constructor(props) {
    super(props);
    const { twitterScreenName } = props;
    this.state = {
      facebookText: '',
      twitterText: `@${twitterScreenName} `,
      keyboardHeight: 0,
      socialNetworkSelected: 'twitter',
    };
    
    this.closeModal = this.closeModal.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onPostPress = this.onPostPress.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.toggleNetworkSelected = this.toggleNetworkSelected.bind(this);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  onTextChange(text) {
    const { socialNetworkSelected } = this.state;
    if (socialNetworkSelected === 'facebook') {
      this.setState({ facebookText: text });
    } else if (socialNetworkSelected === 'twitter') {
      this.setState({ twitterText: text });
    }
  }

  onPostPress() {
    const { facebookText, twitterText, socialNetworkSelected } = this.state;

    if (socialNetworkSelected === 'twitter') {
      if (!twitterText.length) return;

      const { twitterScreenName } = this.props;
      FeedRNUtils.postTweet(`${twitterScreenName} ${twitterText}`)
        .then(() => this.closeModal())
        .catch(() => {
          Alert.alert(
            'Error',
            'Unable to post to Twitter',
            [{ text: 'OK', onPress: this.closeModal }],
            { cancelable: false }
          );
        });
    }

    if (socialNetworkSelected === 'facebook') {
      if (!facebookText.length) return;

      const { facebookPageId } = this.props;
      FeedRNUtils.postFacebook({ postText: facebookText, facebookPageId })
        .then(() => this.closeModal())
        .catch(() => {
          Alert.alert(
            'Error',
            'Unable to post to Facebook',
            [{ text: 'OK', onPress: this.closeModal }],
            { cancelable: false }
          );
        });
    }
  }

  keyboardWillShow(event) {
    this.setState({ keyboardHeight: Math.floor(event.endCoordinates.height) });
  }

  keyboardWillHide() {
    this.setState({ keyboardHeight: 0 });
  }

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'WritePostModal' });
  }
  
  toggleNetworkSelected() {
    const { socialNetworkSelected } = this.state;
    this.setState({ socialNetworkSelected: (socialNetworkSelected === 'twitter') ? 'facebook' : 'twitter' });
  }

  renderActionBar() {
    const { backgroundColor } = this.context;
    const { twitterText, socialNetworkSelected } = this.state;
    const { isFacebookAvailable, isTwitterAvailable } = this.props;
  
    const backgroundColorStyle = { backgroundColor };

    const characterCounter = (socialNetworkSelected === 'twitter')
      ? <CharacterCounter currentCharacters={twitterText.length} maxCharacters={280} />
      : null;

    const postSwitcher = (isFacebookAvailable && isTwitterAvailable)
    ? <PostSwitcher socialNetworkSelected={socialNetworkSelected} toggleNetworkSelected={this.toggleNetworkSelected} />
    : null;

    const selectedNetworkPostBarStyles = {
      justifyContent: (socialNetworkSelected === 'twitter') ? 'space-between' : 'flex-end',
    };

    return (
      <View style={[styles.postOptionsBar, backgroundColorStyle, selectedNetworkPostBarStyles]}>
        {characterCounter}
        {postSwitcher}
      </View>
    );
  }

  renderPostBar() {
    const { backgroundColor } = this.context;
    const backgroundColorStyle = { backgroundColor };

    return (
      <View style={[styles.postBar, backgroundColorStyle]}>
        <CloseButton style={styles.closeButton} onPress={this.closeModal} isForModal />
        {this.renderWritePostLabel()}
        {this.renderPostButton()}
      </View>
    );
  }

  renderWritePostLabel() {
    const { mainColor } = this.context;
    const textColorStyle = { color: mainColor };
    const { isTwitterAvailable, isFacebookAvailable } = this.props;

    const writeAPostLabel = (isTwitterAvailable && !isFacebookAvailable)
      ? 'Post a Tweet'
      : 'Write a Post';

    return <Text style={[styles.writePostLabel, textColorStyle]}>{writeAPostLabel}</Text>;
  }

  renderPostButton() {
    const { textColor } = this.context;
    const { isTwitterAvailable, isFacebookAvailable } = this.props;
    const textColorStyle = { color: textColor };

    const postButtonLabel = (isTwitterAvailable && !isFacebookAvailable)
      ? 'Tweet'
      : 'Post';

    return (
      <TouchableOpacity style={styles.postButton} onPress={this.onPostPress}>
        <Text style={[styles.postButtonLabel, textColorStyle]}>{postButtonLabel}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { backgroundColor } = this.context;
    const { keyboardHeight, facebookText, twitterText, socialNetworkSelected } = this.state;
    const text = (socialNetworkSelected === 'facebook') ? facebookText : twitterText;

    const screenBackgroundColor = { backgroundColor };
    const androidOffset = (Platform.OS !== 'ios') ? STATUS_BAR_HEIGHT : 0;
    const textInputHeight = (keyboardHeight)
    ? window.height - (2 * BAR_HEIGHT) - STATUS_BAR_HEIGHT - keyboardHeight - androidOffset
    : window.height - (2 * BAR_HEIGHT) - STATUS_BAR_HEIGHT - androidOffset;

    const textInputHeightStyle = { height: textInputHeight };

    return (
      <View style={[styles.writePostScreen, screenBackgroundColor]}>
        {this.renderPostBar()}
        <TextInput
          autoFocus
          multiline
          style={[styles.input, textInputHeightStyle]}
          placeholder="Write a post..."
          placeholderTextColor={'#BBBAC1'}
          selectionColor={'#3350EE'}
          onChangeText={this.onTextChange}
          value={text}
        />
        {this.renderActionBar()}
      </View>
    );
  }
}

WritePostScreen.propTypes = {
  isFacebookAvailable: PropTypes.bool,
  isTwitterAvailable: PropTypes.bool,
  facebookPageId: PropTypes.string,
  twitterScreenName: PropTypes.string,
  toggleModal: PropTypes.func,
};

WritePostScreen.contextTypes = {
  mainColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default WritePostScreen;
