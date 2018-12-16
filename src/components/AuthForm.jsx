import React from 'react';

/**
 * Authentication form component
 *
 * @param {boolean} forLogin - Type of authentication
 * @param {function} handleChange - Handle input change
 * @param {function} handleSubmit - Handle form submission
 * @param {function} handleToggleAuth - Handle toggling forLogin
 * @param {boolean} isLoading - Form submit status
 */
const AuthForm = ({ forLogin, handleChange, handleSubmit,
  handleToggleAuth, isLoading, errorMessage }) => (
  <div className="row">
    <form className="col s12" onSubmit={handleSubmit}>
      <div className="row">
        <div className="input-field col s12">
          <input
            id="username"
            name="username"
            type="text"
            className="validate"
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field col s12">
          <input
            id="password"
            name="password"
            type="password"
            className="validate"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        {errorMessage &&
        <div className="row center-align red-text">{errorMessage}</div>
        }
        <div className="row center-align">
          <button
            type="submit"
            className="waves-effect waves-light btn"
            disabled={isLoading}
          >
            {forLogin ? 'Login' : 'Register'}
          </button>
        </div>
        <div className="row center-align">
          {forLogin
          ? 'Don\'t have an account? '
          : 'Already have an account? '}
          <a
            href="#!"
            className="cursor-pointer blue-text"
            onClick={handleToggleAuth}
            >
              {forLogin ? 'Register' : 'Login'}
          </a>
        </div>
      </div>
    </form>
  </div>
);

export default AuthForm;
