import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { event } from './eventTestDataUtils';
import CommentsScreen from '../../src/components/CommentsScreen/CommentsScreen';

jest.mock('../../src/components/EventContainer', () => 'EventContainer');
jest.mock('../../src/components/MediaDetailsScreen', () => 'MediaDetailsScreen');

const props = ({ isMediaDetailsModalVisible }) => ({
  event,
  navigation: {},
  isMediaDetailsModalVisible,
  toggleModal: () => {},
});

describe('CommentsScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <CommentsScreen
        {...props({ isMediaDetailsModalVisible: false })}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('component renders correctly with modal on top', () => {
    const tree = renderer.create(
      <CommentsScreen
        {...props({ isMediaDetailsModalVisible: true })}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
