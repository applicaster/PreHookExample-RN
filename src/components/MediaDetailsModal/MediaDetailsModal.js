import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-native';
import MediaDetailsScreen from '../MediaDetailsScreen';

class MediaDetailsModal extends Component {
  render() {
    const { isMediaModalVisible, toggleModal } = this.props;
    return (
      <Modal
        animationType={'fade'}
        transparent={false}
        visible={isMediaModalVisible}
        onRequestClose={toggleModal}
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
