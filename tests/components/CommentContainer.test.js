import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CommentContainer from '../../src/components/CommentContainer';
import { comment } from './testDataUtils';

describe('CommentContainer', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <CommentContainer comment={comment('someId', 'text')} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

