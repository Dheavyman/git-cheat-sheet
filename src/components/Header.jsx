import React from 'react';

import SearchBar from './SearchBar';

/**
 * Header component
 *
 * @returns {object} React element
 */
const Header = () => (
  <div className="row header">
    <div className="col s1 push-s11">
      <a href="#!" data-target="slide-out" className="sidenav-trigger">
        <i className="material-icons">menu</i>
      </a>
    </div>
    <div className="col s11 pull-s1">
      <SearchBar />
    </div>
  </div>
);

export default Header;
