import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import EventTimestamp from '../../src/components/EventTimestamp';

sinon.useFakeTimers(new Date(1533370943000));

describe('EventTimestamp', () => {
  test('component renders correctly for a timestamp within a week', () => {
    const html = renderer.create(
      <EventTimestamp timestamp={1501833150} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for a timestamp within a year', () => {
    const html = renderer.create(
      <EventTimestamp timestamp={1512373948} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for a timestamp over a year', () => {
    const html = renderer.create(
      <EventTimestamp timestamp={1480837948} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
