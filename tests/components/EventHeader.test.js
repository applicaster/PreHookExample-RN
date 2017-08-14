import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EventHeader from '../../src/components/EventHeader';
import { event } from './eventTestDataUtils';

describe('EventHeader', () => {
  test('component renders correctly', () => {
    const someEvent = event(1);
    const html = renderer.create(
      <EventHeader
        avatarImageUrl={someEvent.user.avatarImageUrl}
        createdAt={someEvent.createdAt}
        name={someEvent.name}
        overlay={false}
        type={someEvent.type}
        userName={someEvent.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when overlayed', () => {
    const someEvent = event(1);
    const html = renderer.create(
      <EventHeader
        avatarImageUrl={someEvent.user.avatarImageUrl}
        createdAt={someEvent.createdAt}
        name={someEvent.name}
        overlay
        type={someEvent.type}
        userName={someEvent.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for Instagram event', () => {
    const someEvent = event(1, 'image', 'instagram', 'applicaster');
    const html = renderer.create(
      <EventHeader
        avatarImageUrl={someEvent.user.avatarImageUrl}
        createdAt={someEvent.createdAt}
        name={someEvent.name}
        overlay
        type={someEvent.type}
        userName={someEvent.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for Twitter event', () => {
    const someEvent = event(1, 'image', 'twitter', 'applicaster');
    const html = renderer.create(
      <EventHeader
        avatarImageUrl={someEvent.user.avatarImageUrl}
        createdAt={someEvent.createdAt}
        name={someEvent.name}
        overlay
        type={someEvent.type}
        userName={someEvent.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly for Facebook event', () => {
    const someEvent = event(1, 'image', 'facebook', null);
    const html = renderer.create(
      <EventHeader
        avatarImageUrl={someEvent.user.avatarImageUrl}
        createdAt={someEvent.createdAt}
        name={someEvent.name}
        overlay
        type={someEvent.type}
        userName={someEvent.user.userName}
      />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
