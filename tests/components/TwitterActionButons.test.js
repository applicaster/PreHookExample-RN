import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TwitterActionButtons from '../../src/components/TwitterActionButtons';

jest.mock('../../src/components/EventDetailCount', () => 'EventDetailCount');

describe('TwitterActionButtons', () => {
  test('component renders correctly', () => {
    const html = renderer.create(
      <TwitterActionButtons />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
