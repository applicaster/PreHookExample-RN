import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CommentButton from '../../src/components/CommentButton/CommentButton';

jest.mock('react-native-zapp-bridge', () => 'NativeZappBridge');

describe('CommentButton', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <CommentButton commentsCount={3} eventId={1} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
