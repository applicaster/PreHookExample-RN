import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WritePostButton from '../../src/components/WritePostButon';

describe('WritePostButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <WritePostButton />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
