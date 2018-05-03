import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CloseButton from '../../src/buttons/CloseButton';

describe('CloseButton', () => {
  test('component renders correctly when it is not for modal', () => {
    const html = renderer.create(
      <CloseButton onPress={() => {}} isForModal={false} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is for modal', () => {
    const html = renderer.create(
      <CloseButton onPress={() => {}} isForModal />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
