import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WebViewScreen from '../../src/components/WebViewScreen/WebViewScreen';

jest.mock('WebView', () => 'WebView');

describe('WebViewScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <WebViewScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
