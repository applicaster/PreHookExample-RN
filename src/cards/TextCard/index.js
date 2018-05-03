import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Caption from '../components/Caption';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { styles } from '../style';

export default class TextCard extends Component {
  clickHandler() {
    // should open image screen
    // passed to CardContainer
  }

  render() {
    const { caption, eventId } = this.props;
    const backgroundColorStyle = { backgroundColor: this.context.backgroundColor };

    return (
      <CardContainer>
        <View style={[styles.eventContainer, backgroundColorStyle]}>
          <Header eventId={eventId} />
          <Caption caption={caption} />
          <Footer eventId={eventId} />
        </View>
      </CardContainer>);
  }
}

TextCard.propTypes = {
  caption: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
};

TextCard.contextTypes = {
  backgroundColor: PropTypes.string,
};