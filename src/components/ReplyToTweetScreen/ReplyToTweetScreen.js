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

const window = Dimensions.get('window');
class ReplyToTweetScreen extends Component {
  constructor(props) {
    super(props);
    const { twitterScreenName } = props;
    this.state = {
      twitterText: `@${twitterScreenName} `,
      keyboardHeight: 0,
    };
    
    this.closeModal = this.closeModal.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onPostPress = this.onPostPress.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
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
    this.setState({ twitterText: text });
  }

  onPostPress() {
    const { errorTitle, errorMessage, eventId, okButtonText } = this.props;
    const { twitterText } = this.state;
    
    if (!twitterText.length) return;

    FeedRNUtils.replyToTweet({ tweetText: `${twitterText}`, originalTweetId: eventId })
      .then(() => this.closeModal())
      .catch(() => {
        Alert.alert(
          errorTitle,
          errorMessage,
          [{ text: okButtonText, onPress: this.closeModal }],
          { cancelable: false }
        );
      });
  }

  keyboardWillShow(event) {
    this.setState({ keyboardHeight: Math.floor(event.endCoordinates.height) });
  }

  keyboardWillHide() {
    this.setState({ keyboardHeight: 0 });
  }

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'ReplyToTweetModal' });
  }

  renderActionBar() {
    const { backgroundColor } = this.context;
    const { twitterText } = this.state;
    const backgroundColorStyle = { backgroundColor };

    return (
      <View style={[styles.postOptionsBar, backgroundColorStyle]}>
        <CharacterCounter currentCharacters={twitterText.length} maxCharacters={280} />
      </View>
    );
  }

  renderPostBar() {
    const { postButtonText, screenTitle } = this.props;
    const { backgroundColor, mainColor, textColor } = this.context;
    const backgroundColorStyle = { backgroundColor };
    const textColorStyle = { color: mainColor };
    const postTextColorStyle = { color: textColor };

    return (
      <View style={[styles.postBar, backgroundColorStyle]}>
        <CloseButton style={styles.closeButton} onPress={this.closeModal} isForModal />
        <Text style={[styles.writePostLabel, textColorStyle]}>{screenTitle}</Text>
        <TouchableOpacity style={styles.postButton} onPress={this.onPostPress}>
          <Text style={[styles.postButtonLabel, postTextColorStyle]}>{postButtonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { replyPlaceholderText } = this.props;
    const { backgroundColor } = this.context;
    const { keyboardHeight, twitterText } = this.state;

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
          placeholder={replyPlaceholderText}
          placeholderTextColor={'#BBBAC1'}
          selectionColor={'#3350EE'}
          onChangeText={this.onTextChange}
          value={twitterText}
        />
        {this.renderActionBar()}
      </View>
    );
  }
}

ReplyToTweetScreen.propTypes = {
  okButtonText: PropTypes.string,
  errorTitle: PropTypes.string,
  errorMessage: PropTypes.string,
  eventId: PropTypes.string,
  postButtonText: PropTypes.string,
  replyPlaceholderText: PropTypes.string,
  screenTitle: PropTypes.string,
  toggleModal: PropTypes.func,
  twitterScreenName: PropTypes.string,
};

ReplyToTweetScreen.contextTypes = {
  mainColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default ReplyToTweetScreen;
