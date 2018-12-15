import React from 'react';

import CheatCategory from './CheatCategories';
import SideNav from './SideNav';
import Header from './Header';

/**
 * App component
 *
 * @returns {object} React element
 */
const App = () => (
  <div className="row">
    <SideNav />
    <Header />
    <div className="container">
      <CheatCategory />
    </div>
  </div>
);

export default App;
