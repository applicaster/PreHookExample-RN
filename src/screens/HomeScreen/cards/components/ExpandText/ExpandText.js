import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { v4 as uuid } from 'uuid';
import { styles } from './styles';

class ExpandText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContentExpanded: false,
    };

    this.shouldExpand = this.shouldExpand.bind(this);
    this.expandContent = this.expandContent.bind(this);
  }

  shouldExpand(content) {
    const { maxChar } = this.props;
    const isContentString = (item) => typeof item === 'string';

    let counter = 0;

    if (isContentString(content)) {
      counter += content.length;
    } else {
      content.forEach((element) => {
        const elementLength = isContentString(element) ? element.length : element.props.children.length;
        counter += elementLength;
      });
    }
    return counter > maxChar;
  }

  expandContent() {
    this.setState({
      isContentExpanded: true,
    });
  }

  render() {
    const { content, expandLabel, textStyle, maxChar } = this.props;
    const { isContentExpanded } = this.state;
    const expandTextButton = (
      <Text key={uuid()} style={[styles.expandText, { color: `${this.context.textColor}BF` }]}>
        {expandLabel}
      </Text>
    );

    const showContent = () => {
      let textCounter = 0;
      const counterLimit = textCounter >= maxChar;

      const charLimit = (item) => item.length > maxChar || textCounter + item.length > maxChar;
      const isContentString = (item) => typeof item === 'string';

      const expandButton = this.shouldExpand(content) && !isContentExpanded ? ['... ', expandTextButton] : [];

      const stringItem = (item) => {
        const availableChars = maxChar - textCounter;

        if (isContentExpanded) {
          return item;
        }

        if (!counterLimit) {
          charLimit(item) ? textCounter = maxChar : textCounter += item.length;
          return isContentExpanded ? item : `${item.substring(0, availableChars)}`;
        }

        return null;
      };

      const symbolItem = (item, i) => {
        const availableChars = maxChar - textCounter;

        if (isContentExpanded) {
          return item;
        }

        if (!counterLimit) {
          textCounter = charLimit(item.props.children) ? maxChar : textCounter + item.props.children.length;
          return (
            <Text {...item.props} key={i}>
              {isContentExpanded ? item.props.children : item.props.children.substring(0, availableChars)}
            </Text>
          );
        }

        return null;
      };

      if (isContentString(content)) {
        return isContentExpanded ? content : [`${content.substring(0, maxChar)}`, ...expandButton];
      }

      const mixContent = content.map((item, i) => isContentString(item) ? stringItem(item) : symbolItem(item, i));
      return [...mixContent, ...expandButton];
    };

    return (
      <Text style={textStyle} onPress={this.expandContent}>
        {showContent()}
      </Text>
    );
  }
}

ExpandText.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  expandLabel: PropTypes.string.isRequired,
  textStyle: PropTypes.array.isRequired,
  maxChar: PropTypes.number.isRequired,
};

ExpandText.contextTypes = {
  textColor: PropTypes.string,
};

export default ExpandText;
