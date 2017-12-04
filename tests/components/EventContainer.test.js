import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventContainer from '../../src/components/EventContainer';
import { event } from './testDataUtils';

jest.mock('../../src/components/EventMedia', () => 'EventMedia');
jest.mock('../../src/components/EventDetailCount', () => 'EventDetailCount');
jest.mock('@applicaster/feed-rn-utils', () => 'FeedRNUtils');

describe('EventContainer', () => {
  test('component renders correctly with an image event', () => {
    const tree = renderer.create(
      <EventContainer event={event('someId', 'image')} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly with a text event', () => {
    const tree = renderer.create(
      <EventContainer event={event('someId', 'text')} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

