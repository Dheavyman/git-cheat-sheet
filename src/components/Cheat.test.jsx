import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cheat from './Cheat';

describe('Cheat component', () => {
  const props = {
    cheat: {
      description: 'cheat description',
      command: 'cheat command',
    }
  };
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<Cheat {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
