import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventCaption from '../../src/components/EventCaption';

jest.mock('react-native-zapp-bridge', () => 'NativeZappBridge');

describe('EventCaption', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <EventCaption caption={'hola'} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly with no caption', () => {
    const html = renderer.create(
      <EventCaption caption={null} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly with complex caption with users and hashtags', () => {
    const html = renderer.create(
      <EventCaption caption={'hola @cpinto7 #wowow #test_ @applicaster more stuff yeiah'} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
