import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27DA86',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  subTitle: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    opacity: 0.85,
  },
});

class Feed extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        'John',
        'Joel',
        'James',
        'Jimmy',
        'Jackson',
        'Jillian',
        'Julie',
        'Devin',
      ]),
    };
  }

  componentWillMount() {
    this.props.setAccountId('595de7ac8a7c43000914c5a5');
    this.props.setTimelineId('595df85282e4a41a3e37374b');
    this.props.setTimezone('3600');
    this.props.setEnvironment('production');
    this.props.fetchSocialEvents();
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.title}>{rowData}</Text>}
        />
        <Text style={styles.subTitle}>
          by Applicaster
        </Text>
      </View>
    );
  }
}

Feed.propTypes = {
  events: PropTypes.array,
  fetchSocialEvents: PropTypes.func,
  setAccountId: PropTypes.func,
  setTimelineId: PropTypes.func,
  setTimezone: PropTypes.func,
  setEnvironment: PropTypes.func,
};

export default Feed;
