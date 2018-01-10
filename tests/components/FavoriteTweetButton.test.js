import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FavoriteTweetButton from '../../src/components/RetweetButton';

jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');

describe('FavoriteTweetButton', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <FavoriteTweetButton eventId={'1'} favoriteCount={1} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
