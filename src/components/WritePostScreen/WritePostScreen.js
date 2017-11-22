import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FeedRNUtils from '@applicaster/feed-rn-utils';
import { styles } from './style';
import CloseButton from '../CloseButton';
import CharacterCounter from '../CharacterCounter';

class WritePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      numberOfCharacters: 0,
      socialNetworkSelected: 'twitter',
    };
    this.closeModal = this.closeModal.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onPostPress = this.onPostPress.bind(this);
  }

  onTextChange(text) {
    this.setState({ text });
    this.setState({ numberOfCharacters: text.length });
  }

  onPostPress() {
    const { numberOfCharacters, text, socialNetworkSelected } = this.state;
    if (!numberOfCharacters) return;
    

    if (socialNetworkSelected === 'twitter') {
      const twitterUserName = '@ArnauMarin9';
      FeedRNUtils.postTweet(`${twitterUserName} ${text}`)
        .then(() => this.closeModal())
        .catch(error => {
          Alert.alert(
            'Error',
            'Unable to post to Twitter',
            [{ text: 'OK', onPress: this.closeModal }],
            { cancelable: false }
          );
        });
    }

    if (socialNetworkSelected === 'facebook') {
      const facebookPageId = '';
      FeedRNUtils.postFacebook({ text, facebookPageId })
        .then(() => this.closeModal())
        .catch(error => {
          Alert.alert(
            'Error',
            'Unable to post to Facebook',
            [{ text: 'OK', onPress: this.closeModal }],
            { cancelable: false }
          );
        });
    }
  }

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'WritePostModal' });
  }

  renderActionBar() {
    const { backgroundColor } = this.context;
    const { socialNetworkSelected } = this.state;

    const backgroundColorStyle = { backgroundColor };
    const { numberOfCharacters } = this.state;
    const characterCounter = (socialNetworkSelected === 'twitter')
      ? <CharacterCounter currentCharacters={numberOfCharacters} maxCharacters={280} />
      : null;

    return (
      <View style={[styles.postOptionsBar, backgroundColorStyle]}>
        {characterCounter}
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
    const screenBackgroundColor = { backgroundColor };
    
    return (
      <View style={[styles.writePostScreen, screenBackgroundColor]}>
        
        {this.renderPostBar()}
        <KeyboardAvoidingView
          behavior="padding"
        >
          <TextInput
            autoFocus
            multiline
            style={styles.input}
            placeholder="Write a post..."
            onChangeText={this.onTextChange}
            value={this.state.text}
          />
          {this.renderActionBar()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

WritePostScreen.propTypes = {
  isFacebookAvailable: PropTypes.bool,
  isTwitterAvailable: PropTypes.bool,
  toggleModal: PropTypes.func,
};

WritePostScreen.contextTypes = {
  mainColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default WritePostScreen;
