import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MediaDetailsScreen from '../../src/components/MediaDetailsScreen/MediaDetailsScreen';

const event = ({ width = 100, height = 100, url = 'someUrl' }) => ({
  id: 'someId',
  images: {
    default: {
      width,
      height,
      url,
    },
  },
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
        <MediaDetailsScreen activeEvent={event({ height: 100, width: 100, url: 'squared' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('component renders correctly with landscape image', () => {
      const tree = renderer.create(
        <MediaDetailsScreen activeEvent={event({ height: 100, width: 200, url: 'lanscape' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('component renders correctly with vertical image with edge to edge width', () => {
      const tree = renderer.create(
        <MediaDetailsScreen activeEvent={event({ height: 200, width: 150, url: 'vertical' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('component renders correctly with vertical image that goes over the', () => {
      const tree = renderer.create(
        <MediaDetailsScreen activeEvent={event({ imageHeight: 5000, imageWidth: 200, imageUrl: 'supertall' })} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
