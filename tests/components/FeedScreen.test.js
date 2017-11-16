import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { event } from './testDataUtils';
import FeedScreen from '../../src/components/FeedScreen/FeedScreen';

jest.mock('../../src/components/EventContainer', () => 'EventContainer');
jest.mock('../../src/components/MediaDetailsModal', () => 'MediaDetailsModal');
jest.mock('../../src/components/WritePostButton', () => 'WritePostButton');

describe('FeedScreen', () => {
  test('component renders correctly without events', () => {
    const tree = renderer.create(
      <FeedScreen
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
      <FeedScreen
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
      <FeedScreen
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
      <FeedScreen
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

  test('component renders correctly with modal on top', () => {
    const tree = renderer.create(
      <FeedScreen
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
