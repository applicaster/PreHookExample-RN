import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { event } from './testDataUtils';
import FeedScreen from '../../src/components/FeedScreen/FeedScreen';

jest.mock('react-native-zapp-bridge', () => ({
  sendAnalyticEvent: () => Promise.resolve(),
}));
jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');
jest.mock('NativeEventEmitter', () => class MockNativeEventEmitter {
  addListener = () => jest.fn();
  removeListener = () => jest.fn();
  removeAllListeners = () => jest.fn();
});
jest.mock('../../src/components/EventContainer', () => 'EventContainer');
jest.mock('../../src/components/ModalScreen', () => 'ModalScreen');
jest.mock('../../src/components/WritePostButton', () => 'WritePostButton');


describe('FeedScreen', () => {
  test('component renders correctly without events', () => {
    const tree = renderer.create(
      <FeedScreen
        fetchEvents={() => {}}
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
        fetchEvents={() => {}}
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
        fetchEvents={() => {}}
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
        fetchEvents={() => {}}
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
        fetchEvents={() => {}}
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

  test('component renders correctly with no write post button', () => {
    const tree = renderer.create(
      <FeedScreen
        fetchEvents={() => {}}
        setAccountId={() => {}}
        setTimelineId={() => {}}
        setTimezone={() => {}}
        setEnvironment={() => {}}
        loading
        socialEvents={[event(1), event(2)]}
        isFacebookAvailable={false}
        isTwitterAvailable={false}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly with write post button due to facebook availability', () => {
    const tree = renderer.create(
      <FeedScreen
        fetchEvents={() => {}}
        setAccountId={() => {}}
        setTimelineId={() => {}}
        setTimezone={() => {}}
        setEnvironment={() => {}}
        loading
        socialEvents={[event(1), event(2)]}
        isFacebookAvailable
        isTwitterAvailable={false}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly with write post button due to twitter availability', () => {
    const tree = renderer.create(
      <FeedScreen
        fetchEvents={() => {}}
        setAccountId={() => {}}
        setTimelineId={() => {}}
        setTimezone={() => {}}
        setEnvironment={() => {}}
        loading
        socialEvents={[event(1), event(2)]}
        isFacebookAvailable={false}
        isTwitterAvailable
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
