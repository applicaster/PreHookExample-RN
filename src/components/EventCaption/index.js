import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking, Text } from 'react-native';
import reactStringReplace from 'react-string-replace';
import { styles } from './style';

class EventCaption extends Component {
  constructor(props) {
    super(props);
    this.openLink = this.openLink.bind(this);
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
      (<Text onPress={() => this.openLink(match)} key={`${i}-link`} style={linkStyle}>{match}</Text>);

    return reactStringReplace(caption, regex, matchCallback);
  }

  openLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    }).catch();
  }
  
  render() {
    const { caption } = this.props;
    const captionColor = { color: this.context.textColor };
    return (caption)
    ? <Text style={[styles.eventCaption, captionColor]}>
      {this.processCaption(caption)}
    </Text>
    : <Text />;
  }
}

EventCaption.propTypes = {
  caption: PropTypes.string,
};

EventCaption.contextTypes = {
  mainColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default EventCaption;
