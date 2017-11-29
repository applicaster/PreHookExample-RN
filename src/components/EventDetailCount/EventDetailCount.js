import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './style';

class EventDetailCount extends Component {
  constructor(props) {
    super(props);
    this.navigateToComments = this.navigateToComments.bind(this);
    this.openUrl = this.openUrl.bind(this);
  }

  navigateToComments() {
    const { navigation } = this.context;
    const { eventId, setActiveEventId } = this.props;

    setActiveEventId(eventId);

    if (navigation.state.routeName !== 'Comments') {
      navigation.navigate('Comments');
    }
  }

  openUrl() {
    const { eventOriginUrl = '' } = this.props;
    Linking.canOpenURL(eventOriginUrl).then(supported => {
      if (!supported) {
        this.showUnableToOpenUrlAlert();
      } else {
        return Linking.openURL(eventOriginUrl);
      }
    }).catch(() => {
      this.showUnableToOpenUrlAlert();
    });
  }

  showUnableToOpenUrlAlert() {
    Alert.alert(
      'ERROR',
      'Unable to open item',
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    );
  }

  render() {
    const { label, count = 0, openOriginUrl = false } = this.props;
    const { textColor = '#FFFFFF' } = this.context;
    const textColorStyle = { color: `${textColor}99` };
    const onPress = (openOriginUrl) ? this.openUrl : this.navigateToComments;
    
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.eventDetailCount}>
          <Text key={'count'} style={[styles.count, textColorStyle]}>{count}</Text>
          <Text key={'label'} style={[styles.label, textColorStyle]}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

EventDetailCount.propTypes = {
  count: PropTypes.number,
  eventId: PropTypes.string,
  eventOriginUrl: PropTypes.string,
  label: PropTypes.string,
  openOriginUrl: PropTypes.bool,
  setActiveEventId: PropTypes.func,
};

EventDetailCount.contextTypes = {
  textColor: PropTypes.string,
  navigation: PropTypes.object,
};

export default EventDetailCount;
