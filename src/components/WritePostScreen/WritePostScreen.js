import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from './style';
import CloseButton from '../CloseButton';

class WritePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      numberOfCharacters: 0,
      postSelection: 'twitter',
    };
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(text) {
    this.setState({ text });
    this.setState({ numberOfCharacters: text.length });
  }

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'WritePostModal' });
  }

  renderActionBar() {
    const { backgroundColor } = this.context;
    const backgroundColorStyle = { backgroundColor };

    return (
      <View style={[styles.postOptionsBar, backgroundColorStyle]}></View>
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

    return <Text style={[styles.writePostLabel, textColorStyle]}>Write a Post</Text>;
  }

  renderPostButton() {
    const { textColor } = this.context;
    const textColorStyle = { color: textColor };

    return (
      <TouchableOpacity style={styles.postButton} onPress={() => {} }>
        <Text style={[styles.postButtonLabel, textColorStyle]}>Post</Text>
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
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          {this.renderActionBar()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

WritePostScreen.propTypes = {
  toggleModal: PropTypes.func,
};

WritePostScreen.contextTypes = {
  mainColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default WritePostScreen;
