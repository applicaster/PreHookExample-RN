import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MediaDetailsScreen from '../../src/components/MediaDetailsScreen/MediaDetailsScreen';

describe('MediaDetailsScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <MediaDetailsScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
