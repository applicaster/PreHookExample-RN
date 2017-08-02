import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventContainer from '../../src/components/EventContainer';

const event = (id, text) => ({
  id,
  images: {
    standard_resolution: {
      url: 'url',
    },
    caption: {
      text,
    },
  },
});

describe('EventContainer', () => {
  test('component renders correctly with an event', () => {
    const tree = renderer.create(
      <EventContainer event={event(1)} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

