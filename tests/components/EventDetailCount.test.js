import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventDetailCount from '../../src/components/EventDetailCount/EventDetailCount';

describe('EventDetailCount', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <EventDetailCount count={1} label={'Likes'} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly with null data', () => {
    const html = renderer.create(
      <EventDetailCount count={null} label={null} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
