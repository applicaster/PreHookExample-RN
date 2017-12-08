import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FacebookActionButtons from '../../src/components/FacebookActionButtons';

jest.mock('../../src/components/CommentButton', () => 'CommentButton');
jest.mock('../../src/components/EventDetailCount', () => 'EventDetailCount');

describe('FacebookActionButtons', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <FacebookActionButtons />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
