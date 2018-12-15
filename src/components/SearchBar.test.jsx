import React from 'react';
import TestRenderer from 'react-test-renderer';

import { SearchBar } from './SearchBar';

describe('SearchBar component', () => {
  const props = {
    actions: {
      handleSearch: jest.fn()
    }
  };
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<SearchBar {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
