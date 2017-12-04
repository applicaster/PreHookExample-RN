import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WritePostModal from '../../src/components/WritePostModal/WritePostModal';

jest.mock('../../src/components/WritePostScreen', () => 'WritePostScreen');

describe('WritePostModal', () => {
  test('component renders correctly when it is visible', () => {
    const html = renderer.create(
      <WritePostModal isWritePostModalVisible />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is invisible', () => {
    const html = renderer.create(
      <WritePostModal isWritePostModalVisible={false} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
