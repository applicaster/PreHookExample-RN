import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { event, comment } from './testDataUtils';
import CommentsScreen from '../../src/components/CommentsScreen/CommentsScreen';

jest.mock('../../src/components/EventContainer', () => 'EventContainer');
jest.mock('../../src/components/ModalScreen', () => 'ModalScreen');

const props = () => ({
  event: event('id'),
  navigation: {},
});

describe('CommentsScreen', () => {
  test('component renders correctly with no comments', () => {
    const tree = renderer.create(
      <CommentsScreen
        {...props()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly with comments', () => {
    const tree = renderer.create(
      <CommentsScreen
        {...props(1, 'image', 'instagram', 'applicaster', [comment(1), comment(2)])}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
