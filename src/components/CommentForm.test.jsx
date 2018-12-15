import React from 'react';
import TestRenderer from 'react-test-renderer';

import CommentForm from './CommentForm';

describe('CommentForm component', () => {
  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<CommentForm />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
