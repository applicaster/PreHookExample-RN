import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
 } from 'react-native';
import EventDetailCount from '../EventDetailCount';

const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    height: 30,
    paddingHorizontal: 7,
    paddingBottom: 10,
  },
  instagramBar: {
    marginLeft: 3,
  },
});

class ActionBar extends Component {
  renderInstagramBar() {
    const { likesCount, commentsCount } = this.props;
    return (
      <View style={[styles.buttonBar, styles.instagramBar]}>
        <EventDetailCount key={'likes'} count={likesCount} label={'Likes'} />
        <EventDetailCount key={'comments'} count={commentsCount} label={'Comments'} />
      </View>
    );
  }

  render() {
    let actionBar;
    switch (this.props.socialNetwork) {
      case 'instagram':
        actionBar = this.renderInstagramBar();
        break;
      default:
        actionBar = null;
        break;
    }
    return actionBar;
  }
}

ActionBar.propTypes = {
  socialNetwork: PropTypes.string,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
};

export default ActionBar;
