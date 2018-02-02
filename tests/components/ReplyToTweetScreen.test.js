import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ReplyToTweetScreen from '../../src/components/ReplyToTweetScreen/ReplyToTweetScreen';

jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');
jest.mock('@applicaster/react-native-zapp-bridge', () => 'NativeZappBridge');

describe('ReplyToTweetScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <ReplyToTweetScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
