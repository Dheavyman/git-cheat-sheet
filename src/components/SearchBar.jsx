import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleSearch } from '../actions/cheats';

const propTypes = {
  actions: PropTypes.shape({
    handleSearch: PropTypes.func.isRequired
  }).isRequired
};

/**
 * Search bar component
 *
 * @returns {object} React element
 */
export const SearchBar = ({ actions: { handleSearch } }) => (
  <div className="row search-bar">
    <form className="col s6 offset-s3">
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">search</i>
          <input
            id="search"
            type="text"
            className="center-align validate"
            onChange={event => event.target.value.length > 1
              ? handleSearch(event.target.value)
              : handleSearch('')}
          />
          <label htmlFor="search">THE AWESOME GIT CHEAT SHEET</label>
        </div>
      </div>
    </form>
  </div>
);

SearchBar.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ handleSearch }, dispatch)
});

export default connect(null, mapDispatchToProps)(SearchBar);
