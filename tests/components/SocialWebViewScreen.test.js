import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SocialWebViewScreen from '../../src/components/SocialWebViewScreen/SocialWebViewScreen';

jest.mock('WebView', () => 'WebView');

describe('SocialWebViewScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <SocialWebViewScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
