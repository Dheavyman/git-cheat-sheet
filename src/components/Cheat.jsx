import React from 'react';

const Cheat = ({ cheat: { description, command } }) => (
  <div className='cheat'>
    <p className="cheat-description">{description}</p>
    <p className="cheat-command">$&nbsp;{command}</p>
  </div>
);

export default Cheat;
