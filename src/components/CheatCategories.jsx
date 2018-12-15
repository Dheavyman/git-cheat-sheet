import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Masonry from 'react-masonry-component';

import { fetchCheats } from '../actions/cheats';
import CheatCategory from './CheatCategory';

class CheatCategories extends Component{
  render() {
    const { categorizedCheats } = this.props;

    return (
      <div>
        <Masonry>
          {[...categorizedCheats].map(([category, cheats]) => (
            <CheatCategory key={category} category={category} cheats={cheats} />
          ))}
        </Masonry>
      </div>
    );
  }
};

const mapStateToProps = ({ cheatsReducer: { cheats, searchResult, keywords } }) => {
  const cheatsToDisplay = keywords ? searchResult : cheats;
  const categorizedCheats = [...cheatsToDisplay].reduce((accumulator, cheat) => {
    const category = cheat['category'];
    const categoryCheats = accumulator.get(category) || []

    categoryCheats.push(cheat)
    return accumulator.set(category, categoryCheats)
  }, new Map());
  return ({
    categorizedCheats
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchCheats }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CheatCategories);
