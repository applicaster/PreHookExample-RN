import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View } from 'react-native';
import CardContainer from '../components/CardContainer';
import { styles } from '../style';
import { styles as placeholderStyles } from './style';
import { SCREEN_MARGIN, BORDER_RADIUS } from '../../../../constants/measurements';

const width = Dimensions.get('window').width;
const cardWidth = width - (2 * SCREEN_MARGIN);

export default class PlaceHolderCard extends Component {
  renderLine({ height, spacing, widthPercentage }) {
    const lineDimensionStyles = {
      backgroundColor: this.context.styles.secondaryTextColor,
      height,
      width: ((cardWidth - 30) * (widthPercentage / 100)),
      marginBottom: spacing,
    };

    return <View style={[placeholderStyles.ghostLine, lineDimensionStyles]} />;
  }

  render() {
    const { backgroundColor, secondaryTextColor, borderType } = this.context.styles;
    const backgroundColorStyle = { backgroundColor };
    const ghostBackgroundStyle = { backgroundColor: secondaryTextColor };

    return (
      <CardContainer clickable clickHandler={() => {}}>
        <View style={[styles.eventContainer, placeholderStyles.ghostCard, backgroundColorStyle, { borderRadius: BORDER_RADIUS(borderType) }]}>
          <View style={[placeholderStyles.ghostMedia, ghostBackgroundStyle]} />
          {this.renderLine({ height: 12, spacing: 7, widthPercentage: 40 })}
          {this.renderLine({ height: 18, spacing: 5, widthPercentage: 96 })}
          {this.renderLine({ height: 18, spacing: 12, widthPercentage: 65 })}
          {this.renderLine({ height: 10, spacing: 5, widthPercentage: 100 })}
          {this.renderLine({ height: 10, spacing: 45, widthPercentage: 98 })}
          <View style={[placeholderStyles.ghostShareButton, ghostBackgroundStyle]} />
        </View>
      </CardContainer>);
  }
}

PlaceHolderCard.contextTypes = {
  styles: PropTypes.object,
};
