import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Feed from '../../src/components/Feed/Feed';
import { event } from './eventTestDataUtils';

describe('Feed', () => {
  test('component renders correctly without events', () => {
    const tree = renderer.create(
      <Feed
        fetchSocialEvents={() => {}}
        setAccountId={() => {}}
        setTimelineId={() => {}}
        setTimezone={() => {}}
        setEnvironment={() => {}}
        loading={false}
        socialEvents={[]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly with events', () => {
    const tree = renderer.create(
      <Feed
        fetchSocialEvents={() => {}}
        setAccountId={() => {}}
        setTimelineId={() => {}}
        setTimezone={() => {}}
        setEnvironment={() => {}}
        loading={false}
        socialEvents={[event(1), event(2)]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly while loading', () => {
    const tree = renderer.create(
      <Feed
        fetchSocialEvents={() => {}}
        setAccountId={() => {}}
        setTimelineId={() => {}}
        setTimezone={() => {}}
        setEnvironment={() => {}}
        loading
        socialEvents={[]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly while loading with events', () => {
    const tree = renderer.create(
      <Feed
        fetchSocialEvents={() => {}}
        setAccountId={() => {}}
        setTimelineId={() => {}}
        setTimezone={() => {}}
        setEnvironment={() => {}}
        loading
        socialEvents={[event(1), event(2)]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
