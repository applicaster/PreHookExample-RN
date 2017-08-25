import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LiveButton from '../../src/components/LiveButton';

describe('LiveButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <LiveButton />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
