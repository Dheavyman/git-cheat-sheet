import React from 'react';

import Cheat from './Cheat';

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
