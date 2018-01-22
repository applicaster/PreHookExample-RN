import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import GenericWebViewScreen from '../../src/components/GenericWebViewScreen/GenericWebViewScreen';

jest.mock('WebView', () => 'WebView');

describe('GenericWebViewScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <GenericWebViewScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
