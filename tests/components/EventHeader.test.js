import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventHeader from '../../src/components/EventHeader';

const event = () => ({
  id: 1,
  user: {
    full_name: 'Carlos Pinto',
    username: 'cpinto7',
    profile_picture: 'url',
  },
  timestamp: 1501876350,
  images: {
    standard_resolution: {
      url: 'url',
    },
    caption: {
      text: 'blah',
    },
  },
});

describe('EventHeader', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <EventHeader event={event()} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when overlayed styles are applied', () => {
    const html = renderer.create(
      <EventHeader event={event()} overlay />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
