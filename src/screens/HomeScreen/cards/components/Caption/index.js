import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import reactStringReplace from 'react-string-replace';
import { sendAnalyticEvent } from 'react-native-zapp-bridge';
import { OPEN_WEBVIEW_FROM_EVENT_CAPTION } from '../../../../../constants/analyticEvents';
import ExpandText from '../ExpandText';

import { styles } from './style';

class Caption extends Component {
  constructor(props) {
    super(props);
    this.navigateToWebview = this.navigateToWebview.bind(this);
  }

  processCaption() {
    let { caption } = this.props;
    caption = this.highlightHashtagsAndUsers(caption);
    caption = this.highlightLinks(caption);
    return caption;
  }

  highlightHashtagsAndUsers(caption) {
    const highlightColor = { color: this.context.mainColor };
    const regex = /([@|#][\w](?:(?:[\w]|(?:\.(?!\.))){0,28}(?:[\w]))?)/g;
    const matchCallback = (match, i) => (<Text key={i} style={highlightColor}>{match}</Text>);
    return reactStringReplace(caption, regex, matchCallback);
  }

  highlightLinks(caption) {
    const linkStyle = { color: this.context.mainColor, textDecorationLine: 'underline' };
    const regex = /([(https|http)]*:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    const matchCallback = (match, i) =>
      (<Text onPress={() => this.navigateToWebview(match)} key={`${i}-link`} style={linkStyle}>{match}</Text>);

    return reactStringReplace(caption, regex, matchCallback);
  }

  navigateToWebview(url) {
    const { navigation } = this.context;
    sendAnalyticEvent(OPEN_WEBVIEW_FROM_EVENT_CAPTION, { url }).then().catch();
    navigation.navigate('GenericWebView', { headerTitle: 'web', url });
  }

  render() {
    const { caption, maxChar } = this.props;
    const captionColor = { color: this.context.textColor || '#FFFFFF' };
    const content = this.processCaption(caption);
    return (caption)
      ? <ExpandText
        content={content}
        maxChar={maxChar}
        textStyle={[styles.eventCaption, captionColor]}
      />
      : <Text />;
  }
}

Caption.propTypes = {
  caption: PropTypes.string.isRequired,
  maxChar: PropTypes.number,
};

Caption.contextTypes = {
  mainColor: PropTypes.string,
  navigation: PropTypes.object,
  textColor: PropTypes.string,
};

export default Caption;
