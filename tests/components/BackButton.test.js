import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BackButton from '../../src/components/BackButton';

describe('BackButton', () => {
  test('component renders correctly when it is not live', () => {
    const html = renderer.create(
      <BackButton onPress={() => {}} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
