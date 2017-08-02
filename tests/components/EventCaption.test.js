import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventCaption from '../../src/components/EventCaption';

describe('EventCaption', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <EventCaption caption={{ text: 'hola' }} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly with no caption', () => {
    const html = renderer.create(
      <EventCaption caption={null} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly with no caption text', () => {
    const html = renderer.create(
      <EventCaption caption={{ text: null }} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly with complex caption with users and hashtags', () => {
    const html = renderer.create(
      <EventCaption caption={{ text: 'hola @cpinto7 #wowow #test_ @applicaster more stuff yeiah' }} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
