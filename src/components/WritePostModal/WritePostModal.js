import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import WritePostScreen from '../WritePostScreen';

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
        animationType={'slide'}
        transparent={false}
        visible={isWritePostModalVisible}
        onRequestClose={toggleModal}
      >
        <WritePostScreen />
      </Modal>
    );
  }
}

WritePostModal.propTypes = {
  isWritePostModalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default WritePostModal;
