import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { styles } from './styles';

class ExpandText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContentExpanded: false,
    };

    this.expandContent = this.expandContent.bind(this);
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
      <Text style={[styles.expandText, { color: `${this.context.textColor}BF` }]}>
        {expandLabel}
      </Text>
    );

    const showContent = () => {
      let textCounter = 0;
      const counterLimit = textCounter >= maxChar;

      const charLimit = (item) => item.length > maxChar || textCounter + item.length > maxChar;
      const isContentString = (item) => typeof item === 'string';

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

      const symbolItem = (item) => {
        const availableChars = maxChar - textCounter;

        if (isContentExpanded) {
          return item;
        }

        if (!counterLimit) {
          charLimit(item.props.children) ? textCounter = maxChar : textCounter += item.props.children.length;
          return (
            <Text {...item.props}>
              {isContentExpanded ? item.props.children : item.props.children.substring(0, availableChars)}
            </Text>
          );
        }

        return null;
      };

      if (isContentString(content)) {
        return isContentExpanded ? content : `${content.substring(0, maxChar)}`;
      }

      const mixContent = content.map(item => isContentString(item) ? stringItem(item) : symbolItem(item));
      return mixContent;
    };

    return (
      <Text style={textStyle} onPress={this.expandContent}>
        {showContent()}{!isContentExpanded && expandTextButton}
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
