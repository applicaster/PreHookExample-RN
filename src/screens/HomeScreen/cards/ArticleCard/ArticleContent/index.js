import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View } from 'react-native';
import HtmlView from 'react-native-render-html';
import { timeFromNow } from '../../../../../utils/time';
import { styles as articleStyles } from '../style';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';

const TEXT_HORIZONTAL_PADDING = 13;

export default class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = { articleContentHeight: 0, isHeightCalculated: false };

    this.setArticleContentHeight = this.setArticleContentHeight.bind(this);
  }

  setArticleContentHeight(event) {
    const { isHeightCalculated } = this.state;

    if (!isHeightCalculated) {
      this.setState({
        articleContentHeight: event.nativeEvent.layout.height,
        isHeightCalculated: true,
      });
    }
  }

  getTitleColor() {
    const COLOR_CHANGE_TRESHHOLD = 0x999999;
    const { backgroundColor } = this.context;
    const backgroundColorValue = parseInt(backgroundColor.substring(1), 16);
    if (backgroundColorValue < COLOR_CHANGE_TRESHHOLD) {
      return '#FFFFFF';
    }

    return '#000000';
  }

  renderCopyOffScreen() {
    const { isHeightCalculated } = this.state;
    if (isHeightCalculated) return null;

    const offScreenStyles = {
      position: 'absolute',
      bottom: -2000,
    };

    const copy = (
      <View key={'clone'} style={offScreenStyles} onLayout={this.setArticleContentHeight}>
        {this.renderContent()}
      </View>
    );

    return copy;
  }

  renderContent() {
    const { author, body, summary, timestamp } = this.props;
    const dynamicTextColor = this.getTitleColor();

    const summaryInArticleStyles = {
      color: dynamicTextColor,
      fontWeight: '700',
      marginTop: 8,
      marginBottom: 2,
      fontSize: 17,
    };

    const baseFontStyle = {
      color: this.context.textColor,
      fontSize: 17,
      lineHeight: 21,
    };
    
    return ([
      !!author && <Text style={[articleStyles.author, { color: dynamicTextColor }]} key={'author'}>{author}</Text>,
      <Text style={[articleStyles.timestamp, { color: dynamicTextColor }]} key={'timestamp'}>{timeFromNow(timestamp)}</Text>,
      <Text style={[articleStyles.summary, summaryInArticleStyles]} key={'summary'}>{summary}</Text>,
      !!body && <HtmlView
        baseFontStyle={baseFontStyle}
        html={body}
        key={'body'}
        onLinkPress={() => {}} // TODO: open webview?
        textSelectable={false}
      />]);
  }

  render() {
    const { articleContentHeight } = this.state;
    const { animationValue } = this.props;
    const bodyContainerStyles = {
      opacity: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      paddingHorizontal: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN, TEXT_HORIZONTAL_PADDING],
      }),
      height: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [articleContentHeight, 0],
      }),
    };

    return ([
      <Animated.View key={'article'} style={[bodyContainerStyles]}>
        {this.renderContent()}
      </Animated.View>,
      this.renderCopyOffScreen(),
    ]);
  }
}

ArticleContent.propTypes = {
  author: PropTypes.string.isRequired,
  animationValue: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

ArticleContent.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
