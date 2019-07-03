import React from 'react';
import { NavLink } from 'react-router-dom';

import { SideBarDisplayContext } from './contexts';
import { getPath } from './route';

import './css/Sidebar.scss';

class Sidebar extends React.Component {
  render() {
    const { isMobileShow } = this.context;
    return (
      <div className={`sidebar ${(isMobileShow) ? 'show' : ''}`}>
        <ul>
          <NavLink
            exact
            to={`${getPath('/')}`}
            className="sidebar__item"
            activeClassName="sidebar__item--selected"
          >
            <li>總覽</li>
          </NavLink>
          <NavLink to={`${getPath('/record')}`} className="sidebar__item" activeClassName="sidebar__item--selected">
            <li>帳目記錄</li>
          </NavLink>
        </ul>
      </div>
    );
  }
}

Sidebar.contextType = SideBarDisplayContext;

export default Sidebar;