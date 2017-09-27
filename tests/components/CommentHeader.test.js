import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CommentHeader from '../../src/components/CommentHeader';
import { comment } from './testDataUtils';

describe('CommentHeader', () => {
  test('component renders correctly', () => {
    const someComment = comment(1);
    const html = renderer.create(
      <CommentHeader
        avatarImageUrl={someComment.user.avatarImageUrl}
        createdAt={someComment.createdAt}
        name={someComment.name}
        userName={someComment.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for Twitter or Instagram comment', () => {
    const someComment = comment(1, 'image', 'twitter', 'applicaster');
    const html = renderer.create(
      <CommentHeader
        avatarImageUrl={someComment.user.avatarImageUrl}
        createdAt={someComment.createdAt}
        name={someComment.name}
        userName={someComment.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for Facebook comment', () => {
    const someComment = comment(1, 'image', 'facebook', null);
    const html = renderer.create(
      <CommentHeader
        avatarImageUrl={someComment.user.avatarImageUrl}
        createdAt={someComment.createdAt}
        name={someComment.name}
        userName={someComment.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
