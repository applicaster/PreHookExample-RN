import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LikeButton from '../../src/components/LikeButton/LikeButton';

describe('LikeButton', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <LikeButton likesCount={3} eventId={1} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
