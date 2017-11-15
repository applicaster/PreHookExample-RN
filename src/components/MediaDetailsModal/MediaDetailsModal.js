import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-native';
import MediaDetailsScreen from '../MediaDetailsScreen';

class MediaDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal({ modal: 'MediaModal' });
  }

  render() {
    const { isMediaModalVisible } = this.props;
    return (
      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isMediaModalVisible}
        onRequestClose={this.closeModal}
      >
        <MediaDetailsScreen />
      </Modal>
    );
  }
}

MediaDetailsModal.propTypes = {
  isMediaModalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default MediaDetailsModal;
