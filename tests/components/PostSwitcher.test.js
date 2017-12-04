import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PostSwitcher from '../../src/components/PostSwitcher';

describe('PostSwitcher', () => {
  test('component renders correctly when facebook is selected', () => {
    const html = renderer.create(
      <PostSwitcher socialNetworkSelected={'facebook'} toggleNetworkSelected={() => {}} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when twitter is selected', () => {
    const html = renderer.create(
      <PostSwitcher socialNetworkSelected={'twitter'} toggleNetworkSelected={() => {}} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
