import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MediaDetailsModal from '../../src/components/MediaDetailsModal/MediaDetailsModal';

jest.mock('@applicaster/react-native-transformable-image', () => 'TransformableImage');
jest.mock('../../src/components/MediaDetailsScreen', () => 'MediaDetailsScreen');

describe('MediaDetailsModal', () => {
  test('component renders correctly when it is visible', () => {
    const html = renderer.create(
      <MediaDetailsModal isMediaModalVisible />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when it is invisible', () => {
    const html = renderer.create(
      <MediaDetailsModal isMediaModalVisible={false} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
