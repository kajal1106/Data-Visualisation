
import React from 'react';

import './AppNavBar.scss';


const AppNavBar : React.FC = props => {
  return (
    <div className="AppNavBar">
      <div className="AppNavBarInner">
        <a href="/" className="AppNavBarLogoLink">
          <h1>Intellisense Test</h1>
        </a>
      </div>
    </div>
  );
}

export default AppNavBar;