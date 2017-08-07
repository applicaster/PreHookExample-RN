import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventMedia from '../../src/components/EventMedia';

const eventMediaProps = (height, width) => ({
  imageUrl: 'someurl',
  height,
  width,
});

describe('EventMedia', () => {
  test('component renders correctly for squared images', () => {
    const html = renderer.create(
      <EventMedia {...eventMediaProps(300, 300)} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for non symmetric aspect ratios images', () => {
    const html = renderer.create(
      <EventMedia {...eventMediaProps(300, 100)} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
