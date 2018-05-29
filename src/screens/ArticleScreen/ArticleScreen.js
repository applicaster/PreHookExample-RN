import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';
import HtmlView from 'react-native-render-html';
import { styles } from './style';
import MediaImage from '../HomeScreen/cards/components/MediaImage';
import MediaVideo from '../HomeScreen/cards/components/MediaVideo';
import CloseButton from '../../buttons/CloseButton';
import { timeFromNow } from '../../utils/time';

class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.closeArticle = this.closeArticle.bind(this);
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

  closeArticle() {
    this.context.navigation.goBack();
  }

  renderContent() {
    const { author, body, category, summary, timestamp, title } = this.props;
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

    const textColorStyle = { color: this.context.textColor || '#FFFFFF' };
    const titleColorStyle = { color: this.getTitleColor() };
    
    return ([
      <Text style={[styles.category, textColorStyle]} key={'category'}>{category.toUpperCase()}</Text>,
      <Text style={[styles.title, titleColorStyle]} key={'title'}>{title}</Text>,
      !!author && <Text style={[styles.author, { color: dynamicTextColor }]} key={'author'}>{author}</Text>,
      <Text style={[styles.timestamp, { color: dynamicTextColor }]} key={'timestamp'}>{timeFromNow(timestamp)}</Text>,
      <Text style={[styles.summary, summaryInArticleStyles]} key={'summary'}>{summary}</Text>,
      !!body && <HtmlView
        baseFontStyle={baseFontStyle}
        html={body}
        key={'body'}
        onLinkPress={() => {}} // TODO: open webview?
        textSelectable={false}
      />]);
  }

  renderMedia() {
    const { eventId, imageHeight, imageWidth, imageUrl, videoUrl } = this.props;
    if (videoUrl) {
      return (
        <MediaVideo
          eventId={eventId}
          height={imageHeight}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          width={imageWidth}
          isExpanded
          isZoomed
        />
      );
    }

    return (
      <MediaImage
        shouldAnimate={false}
        height={imageHeight}
        imageUrl={imageUrl}
        width={imageWidth}
        isExpanded
        isZoomed
      />
    );
  }

  render() {
    const { backgroundColor } = this.context;
    const screenBackgroundColorStyles = { backgroundColor, flex: 1 };
    
    return (
      <View style={[styles.articleScreen, screenBackgroundColorStyles]}>
        <CloseButton onPress={this.closeArticle} style={styles.closeButton} />
        <ScrollView>
          {this.renderMedia()}
          <View style={styles.articleContent}>
            {this.renderContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

ArticleScreen.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
};

ArticleScreen.contextTypes = {
  backgroundColor: PropTypes.string,
  navigation: PropTypes.object,
  textColor: PropTypes.string,
};

export default ArticleScreen;
