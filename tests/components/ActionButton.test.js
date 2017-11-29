import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ActionButton from '../../src/components/ActionButton';

describe('ActionButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <ActionButton label={'hi'} source={'some_image_uri'} onPress={() => {}} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
