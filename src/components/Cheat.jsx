import React from 'react';

/**
 * Cheat component
 *
 * @param {string} description - Cheat description
 * @param {string} command - Cheat command
 *
 * @returns {object} React element
 */
const Cheat = ({ cheat: { description, command } }) => (
  <div className='cheat'>
    <p className="cheat-description">{description}</p>
    <p className="cheat-command">$&nbsp;{command}</p>
  </div>
);

export default Cheat;
