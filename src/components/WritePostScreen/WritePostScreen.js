import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { styles } from './style';
import CloseButton from '../CloseButton';

class WritePostScreen extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'WritePostModal' });
  }

  render() {
    const { backgroundColor } = this.context;
    const screenBackgroundColor = { backgroundColor, flex: 1 };
    
    return (
      <View style={[styles.writePostScreen, screenBackgroundColor]}>
        <CloseButton onPress={this.closeModal} isForModal />
      </View>
    );
  }
}

WritePostScreen.propTypes = {
  toggleModal: PropTypes.func,
};

WritePostScreen.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default WritePostScreen;
