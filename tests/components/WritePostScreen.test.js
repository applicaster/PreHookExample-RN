import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WritePostScreen from '../../src/components/WritePostScreen/WritePostScreen';

jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');
jest.mock('react-native-zapp-bridge', () => 'NativeZappBridge');

describe('WritePostScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <WritePostScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly when only twitter is available', () => {
    const tree = renderer.create(
      <WritePostScreen isTwitterAvailable isFacebookAvailable={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly when only facebook is available', () => {
    const tree = renderer.create(
      <WritePostScreen isTwitterAvailable={false} isFacebookAvailable />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
