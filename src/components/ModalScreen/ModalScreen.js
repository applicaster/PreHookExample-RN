import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import MediaDetailsScreen from '../MediaDetailsScreen';
import WritePostScreen from '../WritePostScreen';

class ModalScreen extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  getAnimationType() {
    const { modalName } = this.props;
    switch (modalName) {
      case 'MediaModal':
        return 'fade';
      case 'ReplyToTweetModal':
      case 'WritePostModal':
      default:
        return 'slide';
    }
  }

  closeModal() {
    const { modalName, toggleModal } = this.props;
    toggleModal({ modal: modalName });
  }

  renderModalContent() {
    const { isVisible, modalName } = this.props;
    if (!isVisible) return null;

    switch (modalName) {
      case 'WritePostModal':
        return <WritePostScreen />;
      case 'MediaModal':
        return <MediaDetailsScreen />;
      default:
        return null;
    }
  }

  render() {
    const { isVisible } = this.props;
    
    return (
      <Modal
        animationType={this.getAnimationType()}
        transparent={false}
        visible={isVisible}
        onRequestClose={this.closeModal}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}

ModalScreen.propTypes = {
  modalName: PropTypes.string,
  toggleModal: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default ModalScreen;
