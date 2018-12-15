import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import AuthForm from './AuthForm';
import CommentForm from './CommentForm';
import { authenticate, logout } from '../actions/users';

/**
 * SideNav component
 *
 * @className SideNav
 * @extends {Component}
 */
export class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forLogin: true,
      username: '',
      password: '',
      showForm: false,
    }
    this.initializeSidenav = this.initializeSidenav.bind(this);
    this.handleToggleAuth = this.handleToggleAuth.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.initializeSidenav()
  }

  componentDidUpdate() {
    this.initializeSidenav();
  }

  initializeSidenav() {
    document.addEventListener('DOMContentLoaded', () => {
      // eslint-disable-next-line no-undef
      M.Sidenav.init(document.querySelectorAll('.sidenav'), {
        edge: 'right',
      });
    });
  }

  /**
   * Handle display of login or register button
   *
   * @memberof SideNav
   */
  handleToggleAuth() {
    this.setState({
      forLogin: !this.state.forLogin
    })
  }

  /**
   * Handle display of form component
   *
   * @memberof SideNav
   */
  handleShowForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  /**
   * Handle form input change
   *
   * @param {object} event - Event object
   * @memberof SideNav
   */
  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    })
  }

  /**
   * Handle submitting login or register event
   *
   * @param {object} event - event object
   * @memberof SideNav
   */
  handleSubmit(event) {
    event.preventDefault();
    const { forLogin, username, password } = this.state;
    const { authenticate } = this.props;

    if (forLogin) {
      authenticate({ username, password }, 'Login')
        .then(() => {
          if (this.props.isLoggedIn) {
            this.setState({
              showForm: !this.state.showForm
            })
          }
        })
    } else {
      authenticate({ username, password }, 'Register')
        .then(() => {
          if (this.props.isLoggedIn) {
            this.setState({
              showForm: !this.state.showForm
            })
          }
        })
    }
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    const { forLogin, showForm } = this.state;
    const { isLoading, isLoggedIn, user } = this.props;

    return (
      <Fragment>
        <ul id="slide-out" className="sidenav">
          <li className="git-logo">
            {isLoggedIn &&
            <a
              href="#!"
              className="logout"
              onClick={this.handleLogout}
            >
              Logout
            </a>}
            <img
              src="https://res.cloudinary.com/heavyman/image/upload/v1544835375/Git-Icon-Black_b2dvxp.png"
              alt="" className="logo-img"
            />
            <p>The awesome git cheat sheet</p>
          </li>
          {isLoggedIn && (
            <li className="user">
              <p className="username">
                Hi <span>{user && user.username}</span>
              </p>
            </li>
          )}
          <li><div className="divider"></div></li>
          {showForm
          ? <AuthForm
              forLogin={forLogin}
              isLoading={isLoading}
              handleToggleAuth={this.handleToggleAuth}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          : <li className="info-text">
            <p>Whether you are new to git or just needing a refresher,
              this cheat sheet will help you discover or remember useful
              git commands.
            </p>
            {!isLoggedIn && (
            <p className="center-align">
              Click <a
                href="#!"
                className="cursor-pointer blue-text"
                onClick={this.handleShowForm}
                >here </a>
                for more privilege.
            </p>
            )}
          </li>
          }
          {isLoggedIn && <CommentForm />}
        </ul>
      </Fragment>
    );
  }
};

export default connect(({ userReducer: { isLoading, isLoggedIn, user } }) => ({
  isLoading: isLoading,
  isLoggedIn: isLoggedIn,
  user: user
}), {authenticate, logout})(SideNav);
