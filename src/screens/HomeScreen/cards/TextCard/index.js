import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Caption from '../components/Caption';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { styles } from '../style';
import { MAX_SUMMARY_LENGTH, BORDER_RADIUS } from '../../../../constants/measurements';

export default class TextCard extends Component {
  activateCard() {
    // should open image screen
    // passed to CardContainer
  }

  render() {
    const { caption, eventId } = this.props;
    const { backgroundColor, borderType } = this.context.styles;
    const backgroundColorStyle = { backgroundColor };

    return (
      <CardContainer>
        <View style={[styles.eventContainer, backgroundColorStyle, { borderRadius: BORDER_RADIUS(borderType) }]}>
          <Header eventId={eventId} overlay={false} />
          <Caption caption={caption} maxChar={MAX_SUMMARY_LENGTH * 4} />
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
  styles: PropTypes.object,
};
