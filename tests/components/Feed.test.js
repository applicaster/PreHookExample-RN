import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Feed from '../../src/components/Feed/Feed';

const event = (id) => ({
  id,
  images: {
    low_resolution: {
      url: 'url',
    },
    caption: 'caption',
  },
});

test('Feed component renders correctly without events', () => {
  const tree = renderer.create(
    <Feed
      fetchSocialEvents={() => {}}
      setAccountId={() => {}}
      setTimelineId={() => {}}
      setTimezone={() => {}}
      setEnvironment={() => {}}
      loading={false}
      socialPosts={[]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Feed component renders correctly with events', () => {
  const tree = renderer.create(
    <Feed
      fetchSocialEvents={() => {}}
      setAccountId={() => {}}
      setTimelineId={() => {}}
      setTimezone={() => {}}
      setEnvironment={() => {}}
      loading={false}
      socialPosts={[event(1), event(2)]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Feed component renders correctly while loading', () => {
  const tree = renderer.create(
    <Feed
      fetchSocialEvents={() => {}}
      setAccountId={() => {}}
      setTimelineId={() => {}}
      setTimezone={() => {}}
      setEnvironment={() => {}}
      loading={true}
      socialPosts={[]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Feed component renders correctly while loading with events', () => {
  const tree = renderer.create(
    <Feed
      fetchSocialEvents={() => {}}
      setAccountId={() => {}}
      setTimelineId={() => {}}
      setTimezone={() => {}}
      setEnvironment={() => {}}
      loading={true}
      socialPosts={[event(1), event(2)]}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
