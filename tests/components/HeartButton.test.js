import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HeartButton from '../../src/components/HeartButton/HeartButton';

describe('HeartButton', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <HeartButton likesCount={3} eventId={1} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});