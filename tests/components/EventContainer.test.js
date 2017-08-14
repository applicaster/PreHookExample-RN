import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventContainer from '../../src/components/EventContainer';
import { event } from './eventTestDataUtils';

describe('EventContainer', () => {
  test('component renders correctly with an image event', () => {
    const tree = renderer.create(
      <EventContainer event={event(1, 'image')} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly with a text event', () => {
    const tree = renderer.create(
      <EventContainer event={event(1, 'text')} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

