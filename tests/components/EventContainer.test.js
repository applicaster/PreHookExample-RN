import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventContainer from '../../src/components/EventContainer';

const event = (id, text) => ({
  id,
  user: {
    full_name: 'Carlos Pinto',
    username: 'cpinto7',
    profile_picture: 'url',
  },
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

