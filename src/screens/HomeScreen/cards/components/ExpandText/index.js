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

    const trimContent = content.length > maxChar;

    const expandTextButton = (
      <Text style={[styles.expandText, { color: `${this.context.textColor}BF` }]}>
        {expandLabel}
      </Text>
    );

    const showContent = () => {
      if (trimContent && !isContentExpanded) {
        return `${content.substring(0, maxChar)}... `;
      }
      return content;
    };

    return (
      <Text style={textStyle} onPress={this.expandContent}>
        {showContent()}
        {trimContent && !isContentExpanded && expandTextButton}
      </Text>
    );
  }
}

ExpandText.propTypes = {
  content: PropTypes.string.isRequired,
  expandLabel: PropTypes.string.isRequired,
  textStyle: PropTypes.array.isRequired,
  maxChar: PropTypes.number.isRequired,
};

ExpandText.contextTypes = {
  textColor: PropTypes.string,
};

export default ExpandText;