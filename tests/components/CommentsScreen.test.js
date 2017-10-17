import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { event } from './testDataUtils';
import CommentsScreen from '../../src/components/CommentsScreen/CommentsScreen';

jest.mock('../../src/components/EventContainer', () => 'EventContainer');
jest.mock('../../src/components/MediaDetailsModal', () => 'MediaDetailsModal');

const props = () => ({
  event: event('id'),
  navigation: {},
});

describe('CommentsScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <CommentsScreen
        {...props()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test('component renders correctly with modal on top', () => {
  //   const tree = renderer.create(
  //     <CommentsScreen
  //       {...props({ isMediaDetailsModalVisible: true })}
  //     />
  //   ).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
