import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Text } from 'react-native';
import CloseButton from '../CloseButton';

class WritePostModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }
  
  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'MediaModal' });
  }

  render() {
    const { isWritePostModalVisible, toggleModal } = this.props;
    return (
      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isWritePostModalVisible}
        onRequestClose={toggleModal}
      >
        <Text>Write Post Screen Goes Here</Text>
        <CloseButton onPress={this.closeModal} isForModal />
      </Modal>
    );
  }
}

WritePostModal.propTypes = {
  isWritePostModalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default WritePostModal;
