import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { CheatCategories } from './CheatCategories';

describe('CheatCategories component', () => {
  const key1 = 'cheat category';
  const key2 = 'another category';
  const value1 = [{
    _id: 'cheat id',
    description: 'cheat description',
    command: 'cheat command',
  }];
  const value2 = [{
    _id: 'another cheat id',
    description: 'another cheat description',
    command: 'another cheat command',
  }]
  const categorizedCheats = new Map()
  categorizedCheats.set(key1, value1);
  categorizedCheats.set(key2, value2);
  const props = {
    categorizedCheats
  };
  it('should render component successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<CheatCategories {...props} />);
    const result = renderer.getRenderOutput()

    expect(result).toMatchSnapshot();
  });
});
