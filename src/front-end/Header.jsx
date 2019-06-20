import React from 'react';
import PropsTypes from 'prop-types';

import './css/Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    this.props.onMenuClick();
  }

  render() {
    return (
      <div className="header">
        <h1>個人記帳</h1>
        <nav className="header__menu">
          <div className="header__mobile-menu-button" onClick={this.handleMenuClick}>
            <i className="fas fa-bars fa-3x"></i>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propsTypes = {
  onMenuClick: PropsTypes.func.isRequired,
}

export default Header;