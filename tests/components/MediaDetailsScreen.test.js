import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MediaDetailsScreen from '../../src/components/MediaDetailsScreen/MediaDetailsScreen';

const props = ({ imageHeight, imageWidth, imageUrl }) => ({
  imageHeight,
  imageWidth,
  imageUrl,
});

describe('MediaDetailsScreen', () => {
  test('component renders correctly', () => {
    const tree = renderer.create(
      <MediaDetailsScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('image sizes', () => {
    test('component renders correctly with squared image', () => {
      const tree = renderer.create(
        <MediaDetailsScreen {...props({ imageHeight: 100, imageWidth: 100, imageUrl: 'squared' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('component renders correctly with landscape image', () => {
      const tree = renderer.create(
        <MediaDetailsScreen {...props({ imageHeight: 100, imageWidth: 200, imageUrl: 'lanscape' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('component renders correctly with vertical image with edge to edge width', () => {
      const tree = renderer.create(
        <MediaDetailsScreen {...props({ imageHeight: 200, imageWidth: 150, imageUrl: 'vertical' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('component renders correctly with vertical image that goes over the', () => {
      const tree = renderer.create(
        <MediaDetailsScreen {...props({ imageHeight: 5000, imageWidth: 200, imageUrl: 'supertall' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
