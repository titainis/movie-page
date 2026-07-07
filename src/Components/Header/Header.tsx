import { useState, useEffect } from "react";
import './Header.scss';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Logo from './Logo/Logo';
import SearchBar from './SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${showHeader ? "show" : "hide"}`}>
      <div className="header__burger-menu">
        <BurgerMenu />
      </div>

      <nav className='header__links-container'>
        <NavLink to='/movies' className='header__links'>Movies</NavLink>
        <NavLink to='/tv-series' className='header__links'>TV Series</NavLink>
        <NavLink to='/favorites' className='header__links'>Favorites</NavLink>
        <NavLink to='/account' className='header__links'>Account</NavLink>
      </nav> 

      <div className='header__search-bar'>
          <SearchBar isVisible={showHeader}/>
      </div>

      <div className="header__logo">
        <Logo />
      </div>
    </header>
  );
}

export default Header;
