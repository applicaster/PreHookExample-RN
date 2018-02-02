import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WritePostButton from '../../src/components/WritePostButton/WritePostButton';

jest.mock('@applicaster/react-native-zapp-bridge', () => 'NativeZappBridge');

describe('WritePostButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <WritePostButton />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
