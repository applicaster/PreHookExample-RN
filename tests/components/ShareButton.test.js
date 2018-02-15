import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ShareButton from '../../src/components/ShareButton/ShareButton';

jest.mock('react-native-zapp-bridge', () => 'NativeZappBridge');

describe('ShareButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <ShareButton />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
