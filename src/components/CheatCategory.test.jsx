import React from 'react';
import TestRenderer from 'react-test-renderer';

import CheatCategory from './CheatCategory';

describe('CheatCategory component', () => {
  const props = {
    category: 'cheat category',
    cheats: [{
      _id: 'cheat id',
      description: 'cheat description',
      command: 'cheat command',
    }, {
      _id: 'another cheat id',
      description: 'another cheat description',
      command: 'another cheat command',
    }]
  };
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<CheatCategory {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
