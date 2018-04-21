import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SocialActionBar from '../../src/components/SocialActionBar';

jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');
jest.mock('../../src/components/TwitterActionButtons', () => 'TwitterActionButtons');
jest.mock('../../src/components/FacebookActionButtons', () => 'FacebookActionButtons');
jest.mock('../../src/components/InstagramActionButtons', () => 'InstagramActionButtons');
jest.mock('../../src/components/ShareButton', () => 'ShareButton');

describe('ActionBar', () => {
  test('component renders correctly for instagram', () => {
    const html = renderer.create(
      <SocialActionBar socialNetwork={'instagram'} likesCount={1} commentsCount={3} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
  
  test('component renders correctly for facebook', () => {
    const html = renderer.create(
      <SocialActionBar socialNetwork={'instagram'} likesCount={1} commentsCount={3} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for twitter', () => {
    const html = renderer.create(
      <SocialActionBar socialNetwork={'instagram'} likesCount={1} commentsCount={3} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for no social network', () => {
    const html = renderer.create(
      <SocialActionBar socialNetwork={null} likesCount={null} commentsCount={null} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
