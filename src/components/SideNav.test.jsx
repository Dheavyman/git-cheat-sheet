import React from 'react';
import TestRenderer from 'react-test-renderer';

import { SideNav } from './SideNav';

describe('SideNav component', () => {
  let props;

  beforeEach(() => {
    props = {
      isLoading: false,
      isLoggedIn: false,
      user: {
        username: 'username',
      },
      authenticate: jest.fn(() => Promise.resolve()),
      logout: jest.fn()
    }
  });

  it('should render component successfully', () => {
    const renderer = TestRenderer.create(<SideNav {...props} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should show login form when user clicks to login', () => {
    const renderer = TestRenderer.create(<SideNav {...props} />);
    const handleShowFormSpy = jest.spyOn(renderer.getInstance(),
    'handleShowForm');

    renderer.update(<SideNav />);

    expect(renderer.root.instance.state.showForm).toBe(false);

    renderer.root.findByProps({className:"cursor-pointer blue-text"})
      .props.onClick();
    expect(handleShowFormSpy).toBeCalled();
    expect(renderer.root.instance.state.showForm).toBe(true);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should call handle change when input value changes', () => {
    const renderer = TestRenderer.create(<SideNav {...props} />);
    const handleChangeSpy = jest.spyOn(renderer.getInstance(), 'handleChange');

    renderer.update(<SideNav />);

    expect(renderer.root.instance.state.username).toBe('');
    expect(renderer.root.instance.state.password).toBe('');

    renderer.root.findByProps({className:"cursor-pointer blue-text"})
      .props.onClick();
    renderer.root.findByProps({name:"username"}).props.onChange(
      { target: { name: 'username', value: 'Mathew'}});
    renderer.root.findByProps({name:"password"}).props.onChange(
      { target: { name: 'password', value: 'secret'}});

    expect(handleChangeSpy).toBeCalled();
    expect(renderer.root.instance.state.username).toBe('Mathew');
    expect(renderer.root.instance.state.password).toBe('secret');
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should call handleToggleAuth to show login or register', () => {
    const renderer = TestRenderer.create(<SideNav {...props} />);
    const handleToggleAuthSpy = jest.spyOn(renderer.getInstance(),
    'handleToggleAuth');

    renderer.update(<SideNav />);

    expect(renderer.root.instance.state.forLogin).toBe(true);

    renderer.root.findByProps({className:"cursor-pointer blue-text"})
      .props.onClick();
    renderer.root.findByType('a').props.onClick();

    expect(handleToggleAuthSpy).toBeCalled();
    expect(renderer.root.instance.state.forLogin).toBe(false);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should call handleSubmit for login event', () => {
    const renderer = TestRenderer.create(<SideNav {...props} />);
    const handleSubmitSpy = jest.spyOn(renderer.getInstance(), 'handleSubmit');

    renderer.update(<SideNav {...props} />);
    renderer.root.findByProps({className:"cursor-pointer blue-text"})
      .props.onClick();

    expect(renderer.root.findByType('button').props.type).toEqual('submit');
    expect(renderer.root.findByType('button').props.children).toEqual('Login');
    expect(renderer.root.instance.state.forLogin).toBe(true)

    renderer.root.instance.state.username = 'Anonymous';
    renderer.root.instance.state.password = 'password';
    renderer.root.findByType('form').props
      .onSubmit({ preventDefault: jest.fn() });

    props = {...props, isLoggedIn: true}
    renderer.update(<SideNav {...props} />)

    expect(handleSubmitSpy).toBeCalled();
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should call handleSubmit for register event', () => {
    const renderer = TestRenderer.create(<SideNav {...props} />);
    const handleSubmitSpy = jest.spyOn(renderer.getInstance(), 'handleSubmit');

    renderer.update(<SideNav {...props} />);
    renderer.root.findByProps({className:"cursor-pointer blue-text"})
      .props.onClick();
    renderer.root.findByType('a').props.onClick();

    expect(renderer.root.findByType('button').props.type).toEqual('submit');
    expect(renderer.root.findByType('button').props.children).toEqual('Register');
    expect(renderer.root.instance.state.forLogin).toBe(false)

    renderer.root.instance.state.username = 'Anonymous1';
    renderer.root.instance.state.password = 'password1';
    renderer.root.findByType('form').props
      .onSubmit({ preventDefault: jest.fn() });

      props = {...props, isLoggedIn: true}
      renderer.update(<SideNav {...props} />)

    expect(handleSubmitSpy).toBeCalled();
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should call handleLogout for logout event', () => {
    props = {
      ...props,
      isLoggedIn: true,
    };
    const renderer = TestRenderer.create(<SideNav {...props} />);
    const handleLogoutSpy = jest.spyOn(renderer.getInstance(), 'handleLogout');

    renderer.update(<SideNav {...props} />);

    renderer.root.findByProps({className:"logout"}).props.onClick();

    expect(handleLogoutSpy).toBeCalled();
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
