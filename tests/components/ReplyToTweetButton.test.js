import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ReplyToTweetButton from '../../src/components/ReplyToTweetButton';

jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');

describe('ReplyToTweetButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <ReplyToTweetButton eventId={'1'} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
