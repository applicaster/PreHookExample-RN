import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WritePostScreen from '../../src/components/WritePostScreen/WritePostScreen';

describe('WritePostScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <WritePostScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
