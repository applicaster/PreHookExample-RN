import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ShareButton from '../../src/components/ShareButton';

describe('ShareButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <ShareButton />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});