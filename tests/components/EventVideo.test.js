import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventVideo from '../../src/components/EventVideo/EventVideo';

jest.mock('react-native-video', () => 'Video');

const eventVideoProps = (height, width, videoUrl) => ({
  height,
  width,
  videoUrl,
});

describe('EventVideo', () => {
  test('component renders correctly with no video url', () => {
    const html = renderer.create(
      <EventVideo />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly', () => {
    const html = renderer.create(
      <EventVideo {...eventVideoProps(100, 100, 'url')} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
