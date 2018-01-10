import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import InstagramActionButtons from '../../src/components/InstagramActionButtons';

jest.mock('../../src/components/CommentButton', () => 'CommentButton');
jest.mock('../../src/components/HeartButton', () => 'HeartButton');

describe('InstagramActionButtons', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <InstagramActionButtons />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
