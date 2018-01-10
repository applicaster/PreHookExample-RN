import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ModalScreen from '../../src/components/ModalScreen/ModalScreen';

jest.mock('../../src/components/WritePostScreen', () => 'WritePostScreen');
jest.mock('../../src/components/ReplyToTweetScreen', () => 'ReplyToTweetScreen');
jest.mock('../../src/components/MediaDetailsScreen', () => 'MediaDetailsScreen');

describe('ModalScreen', () => {
  test('component renders correctly when it is visible', () => {
    const html = renderer.create(
      <ModalScreen isVisible />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is invisible', () => {
    const html = renderer.create(
      <ModalScreen isVisible={false} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is showing MediaScreen', () => {
    const html = renderer.create(
      <ModalScreen isVisible={false} modalName={'MediaModal'} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is showing WritePostScreen', () => {
    const html = renderer.create(
      <ModalScreen isVisible={false} modalName={'WritePostScreen'} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is showing ReplyToTweetScreen', () => {
    const html = renderer.create(
      <ModalScreen isVisible={false} modalName={'ReplyToTweetScreen'} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
