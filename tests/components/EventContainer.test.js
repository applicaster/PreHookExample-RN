import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventContainer from '../../src/components/EventContainer';
import { event } from './eventTestDataUtils';

describe('EventContainer', () => {
  test('component renders correctly with an event', () => {
    const tree = renderer.create(
      <EventContainer event={event(1)} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

