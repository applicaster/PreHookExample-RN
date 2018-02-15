import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RetweetButton from '../../src/components/RetweetButton';

jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');
jest.mock('react-native-zapp-bridge', () => 'NativeZappBridge');

describe('RetweetButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <RetweetButton eventId={'1'} retweetCount={1} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
