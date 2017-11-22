import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CharacterCounter from '../../src/components/CharacterCounter';

describe('CharacterCounter', () => {
  test('component renders correctly when number of characters is within limit', () => {
    const html = renderer.create(
      <CharacterCounter maxCharacters={10} currentCharacters={1} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when number of characters is over limit', () => {
    const html = renderer.create(
      <CharacterCounter maxCharacters={10} currentCharacters={11} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });

  test('component renders correctly when number of characters is over 3 digits', () => {
    const html = renderer.create(
      <CharacterCounter maxCharacters={10} currentCharacters={1000} />
    ).toJSON();
    expect(html).toMatchSnapshot();
  });
});
