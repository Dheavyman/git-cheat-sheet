import React from 'react';
import TestRenderer from 'react-test-renderer';

import AuthForm from './AuthForm';

describe('AuthForm component', () => {
  let props;

  beforeEach(() => {
    props = {
      forLogin: true,
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      handleToggleAuth: jest.fn(),
      isLoading: false,
    };
  });

  it('should render successfully', () => {
    const renderer = TestRenderer.create(<AuthForm {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render with register button', () => {
    props = {
      ...props,
      forLogin: false,
    };
    const renderer = TestRenderer.create(<AuthForm {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should call handleChange when username input changes', () => {
    const renderer = TestRenderer.create(<AuthForm {...props} />);

    renderer.root.findAllByType('input')[0].props.onChange();
    expect(props.handleChange).toHaveBeenCalled();
  });

  it('should call handleChange when password input changes', () => {
    const renderer = TestRenderer.create(<AuthForm {...props} />);

    renderer.root.findAllByType('input')[1].props.onChange();
    expect(props.handleChange).toHaveBeenCalled();
  });

  it('should call handleToggleAuth when changing form', () => {
    const renderer = TestRenderer.create(<AuthForm {...props} />);

    renderer.root.findAllByType('a')[0].props.onClick();
    expect(props.handleToggleAuth).toHaveBeenCalled();
  });

  it('should disable submit button when loading', () => {
    props = {
      ...props,
      isLoading: true,
    };
    const renderer = TestRenderer.create(<AuthForm {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
