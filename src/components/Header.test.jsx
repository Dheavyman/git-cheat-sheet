import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';


import Header from './Header';

describe('Header component', () => {
  it('should render component successfully', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<Header />);
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot();
  });
});
