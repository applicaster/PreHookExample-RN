import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Comment from '../../src/components/Comment';

describe('Comment', () => {
  test('component renders correctly with plain text', () => {
    const html = renderer.create(
      <Comment caption="Hola Carlos Pinto, great picture." />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly with hashtags and usertags', () => {
    const html = renderer.create(
      <Comment caption="Hola @cpinto7, #great #picture" />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
