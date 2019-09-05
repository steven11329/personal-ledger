import React, { useRef, useState, useEffect } from 'react';
import PropsTypes from 'prop-types';

import './css/Header.scss';

function Header(props) {
  const headerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const sticky = headerRef.current.offsetTop;
    window.onscroll = () => {
      if (window.pageYOffset > sticky) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    return () => { window.onscroll = null };
  }, []);

  console.log(isSticky);

  return (
    <div className={`header${(isSticky) ? ' header--sticky' : ''}`} ref={headerRef}>
      <h1>個人記帳</h1>
      <nav className="header__menu">
        <div className="header__mobile-menu-button" onClick={props.onMenuClick}>
          <i className="fas fa-bars fa-2x"></i>
        </div>
      </nav>
    </div>
  );
}

Header.propsTypes = {
  onMenuClick: PropsTypes.func.isRequired,
}

export default Header;