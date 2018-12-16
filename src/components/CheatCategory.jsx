import React from 'react';

import Cheat from './Cheat';

/**
 * Cheat category component
 *
 * @param {string} category - Cheat category
 * @param {string} cheats - Cheats in a category
 *
 * @returns {object} React element
 */
const CheatCategory = ({ category, cheats}) => {
  return (
    <div className="category-card">
      <h6 className="category">{category}</h6>
        {cheats.map(cheat => (
          <Cheat key={cheat._id} cheat={cheat} />
        ))}
    </div>
  );
}

export default CheatCategory;
