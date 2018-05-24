import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View } from 'react-native';
import HtmlView from 'react-native-render-html';
import { styles as articleStyles } from '../style';
import { SCREEN_MARGIN } from '../../../../../constants/measurements';
import { CARD_ACTIVATE_ANIMATION_DURATION } from '../../../../../constants/animations';

const TEXT_HORIZONTAL_PADDING = 13;

/*
      On Card Activate:
        - build article container to have:
          - DONE author
          - timestamp
          - DONE summary
          - DONE article body
    */

export default class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = { articleContentHeight: 0 };

    this.setArticleContentHeight = this.setArticleContentHeight.bind(this);
    this.articleExpandAnimationValue = new Animated.Value(1);
  }
  
  componentDidMount() {
    Animated.timing(this.articleExpandAnimationValue, {
      toValue: 0,
      duration: 0,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    const { isExpanded: nextIsExpanded } = nextProps;
    const { isExpanded } = this.props;

    if (nextIsExpanded !== isExpanded) {
      Animated.timing(this.articleExpandAnimationValue, {
        toValue: (nextIsExpanded) ? 1 : 0,
        duration: CARD_ACTIVATE_ANIMATION_DURATION,
      }).start();
    }
  }

  setArticleContentHeight(event) {
    this.setState({
      articleContentHeight: event.nativeEvent.layout.height,
    });
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

  render() {
    const { articleContentHeight } = this.state;
    const { author, body, summary } = this.props;
    const dynamicTextColor = this.getTitleColor();

    const bodyContainerStyles = {
      opacity: this.articleExpandAnimationValue,
      paddingHorizontal: this.articleExpandAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [TEXT_HORIZONTAL_PADDING, TEXT_HORIZONTAL_PADDING + SCREEN_MARGIN],
      }),
      height: this.articleExpandAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 600],
      }),
    };

    const summaryInArticleStyles = {
      color: dynamicTextColor,
      fontWeight: '700',
      marginTop: 8,
    };

    const baseFontStyle = {
      color: this.context.textColor,
      fontSize: 17,
      lineHeight: 21,
    };
    
    return (
      <Animated.View style={[bodyContainerStyles]}>
        <View onLayout={this.setArticleContentHeight}>
          {!!author && <Text style={[articleStyles.author, { color: dynamicTextColor }]}>{author}</Text>}
          <Text style={[articleStyles.summary, summaryInArticleStyles]}>{summary}</Text>
          <HtmlView
            html={body}
            onLinkPress={() => {}} // TODO: open webview?
            baseFontStyle={baseFontStyle}
            textSelectable={false}
          />
        </View>
      </Animated.View>
    );
  }
}

ArticleContent.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  summary: PropTypes.string.isRequired,
};

ArticleContent.contextTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

ArticleContent.defaultProps = {
  isExpanded: false,
};
