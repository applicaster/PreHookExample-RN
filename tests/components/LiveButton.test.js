import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LiveButton from '../../src/components/LiveButton';

describe('LiveButton', () => {
  test('component renders correctly when it is not live', () => {
    const html = renderer.create(
      <LiveButton />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is live', () => {
    const html = renderer.create(
      <LiveButton isLive />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
