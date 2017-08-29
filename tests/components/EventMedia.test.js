import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventMedia from '../../src/components/EventMedia/EventMedia';

const eventMediaProps = (height, width, videoUrl) => ({
  imageUrl: 'someurl',
  height,
  width,
  videoUrl,
  showMediaDetailsModal: () => {},
});

jest.mock('react-native-video', () => 'Video');

describe('EventMedia', () => {
  test('component renders correctly for squared images', () => {
    const html = renderer.create(
      <EventMedia {...eventMediaProps(300, 300)} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for squared images', () => {
    const html = renderer.create(
      <EventMedia {...eventMediaProps(300, 300)} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for media items with video', () => {
    const html = renderer.create(
      <EventMedia {...eventMediaProps(300, 100, 'someurl')} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
