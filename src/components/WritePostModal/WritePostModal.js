import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Text } from 'react-native';

class WritePostModal extends Component {
  render() {
    const { isWritePostModalVisible, toggleModal } = this.props;
    return (
      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isWritePostModalVisible}
        onRequestClose={toggleModal}
      >
        <Text>Hi</Text>
      </Modal>
    );
  }
}

WritePostModal.propTypes = {
  isWritePostModalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default WritePostModal;
