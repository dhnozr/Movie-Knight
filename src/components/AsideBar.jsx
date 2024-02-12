import { AnimatePresence, motion as m } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { menuSlide, slideContainer, slide } from './animation';
import { useStore } from '../store/store';
import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';
import profileImg from '../assets/profilepic.webp';
import { useGetUser, useSearchedMovies } from './request';
import search from '../assets/icons8-search.svg';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const AsideBar = () => {
  const navigate = useNavigate();
  // searchbardan movieleri fetchleyecem
  const [text, setText] = useState('');
  const handleİnputChange = e => {
    setText(e.target.value);
  };

  // fetch basarılı homepage de gösterecem
  const {} = useSearchedMovies(text);

  // storedan kayıtlı kullanıcı bilgini cek
  const {} = useGetUser();
  const user = useStore(state => state.user);

  // bunu checkboxa vericem ki checkbox burdaki state ile esit olsun
  const isDarkThemeIsActive = useStore(state => state.isDarkThemeActive);
  // darkTheme toggle yapıcam storedan alıyorum
  const toggleDarkTheme = useStore(state => state.toggleDarkTheme);

  // route degisikliginde sidebar birden yok oluyordu o yüzden route degisince burger kapanması ıcın function cagırdım ve asagıda uyandırdım
  // zustand adamdır gerisi yalan
  const toggleBurger = useStore(state => state.toggleBurger);

  // sidebar curved görüntüsü vermek icin svg path olusturdum
  const initialPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

  // curved hale getiriyorum
  const targetPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;

  // path icin animasyon
  const pathAnimation = {
    hidden: {
      d: initialPath,
    },

    show: {
      d: targetPath,
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
    },

    exit: {
      d: initialPath,
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // nav items sonra map yapıcam
  const navItems = [
    {
      title: 'Home',
      path: '/',
    },

    {
      title: 'Auth',
      path: 'auth',
    },

    {
      title: 'Favorite Movies',
      path: 'rated',
    },
  ];

  // route degısınce sidebarı kapatsın diye
  const onRouteChange = () => {
    toggleBurger();
  };

  const clearUser = useStore(state => state.clearUser);

  const logOutButton = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      clearUser();
      console.log('cıkıs yapıldı');
      navigate('/');
    }
  };

  return (
    <SideBar variants={menuSlide} initial='hidden' animate='show' exit='exit'>
      <div className='sidebar-body'>
        <div className='nav-header'>
          <h2>Navigation</h2>
        </div>
        <div className='nav-list'>
          {/* container amacı cocuklari stagger etmek böylece her bir animasyon arasına zaman koyuyoruz */}
          <m.ul variants={slideContainer} initial='hidden' animate='show' exit='exit'>
            {navItems.map(item => (
              <m.li variants={slide} key={item.title}>
                <AnimatePresence mode='wait'>
                  <Link onClick={onRouteChange} to={item.path}>
                    {item.title}
                  </Link>
                </AnimatePresence>
              </m.li>
            ))}
          </m.ul>
          {/*  */}
        </div>
      </div>

      <ProfileWrapper>
        <Profile>
          {user && (
            <div>
              <p>{user.user_metadata.userName}</p>
              <button onClick={logOutButton}>Log Out</button>
            </div>
          )}
          {/*   <div>
            <img src={profileImg} alt='' />
          </div> */}
        </Profile>
        <SearchBar>
          <input value={text} onChange={handleİnputChange} type='search' placeholder='Search Movies' />
          <img src={search} alt='' />
        </SearchBar>
      </ProfileWrapper>

      <Footer variants={slideContainer} initial='hidden' animate='show' exit='exit'>
        <div>
          <m.li variants={slide}>
            <Link target='_blank' to={'https://github.com/dhnozr'}>
              gitHub
            </Link>
          </m.li>
          <m.li variants={slide}>
            <Link target='_blank' to={'https://www.linkedin.com/in/duhanozarslan'}>
              Linkedn
            </Link>
          </m.li>
        </div>
      </Footer>

      <DarkmodeSwitch>
        <input readOnly onClick={toggleDarkTheme} type='checkbox' id='toggle' checked={isDarkThemeIsActive} />
        <label htmlFor='toggle'>
          <img className='moon' src={moon} alt='' />
          <img className='sun' src={sun} alt='' />
        </label>
      </DarkmodeSwitch>

      <svg className='svgCurve'>
        <m.path variants={pathAnimation} initial='hidden' animate='show' exit='exit'></m.path>
      </svg>
    </SideBar>
  );
};

const SideBar = styled(m.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  background-color: rgb(41, 41, 41);
  height: 100vh;
  top: 0;
  color: white;
  width: 300px;
  padding: 40px 0;
  z-index: 2;

  .nav-header {
    border-bottom: 1px solid white;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 20px;
  }

  .sidebar-body {
    padding: 100px 10px;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 20px;
    font-weight: bold;
    font-size: 36px;
  }

  ul {
    list-style: none;
  }

  .svgCurve {
    position: absolute;
    top: 0;
    left: -99px;
    width: 110px;
    min-height: 100vh;
    fill: rgb(41, 41, 41);
    stroke: none;
  }
`;

const Footer = styled(m.footer)`
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  div {
    display: flex;
    gap: 16px;
    font-size: 14px;
  }
  li {
    list-style: none;
  }
`;

const DarkmodeSwitch = styled.div`
  label {
    display: block;
    width: 200px;
    height: 45px;
    position: relative;
    border-radius: 200px;
    /* iceriye dofru shadow verdım */
    box-shadow: inset 0px 5px 15px rgba(210, 201, 201, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 1s;
    background-color: #edede9;

    &::after {
      content: '';
      width: 42px;
      height: 42px;
      position: absolute;
      top: 2px;
      left: 6px;
      background: linear-gradient(180deg, #ffcc89, #d8860b);
      border-radius: 180px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
      transition: all 1s cubic-bezier(0.76, 0, 0.24, 1);
    }

    img {
      position: absolute;
      z-index: 10;
      top: 2px;
    }

    .sun {
      left: 6px;
      transition: 0.5s;
    }

    .moon {
      left: 152px;
      transition: 0.5s;
    }
  }

  input:checked + label {
    background-color: #242424;
  }

  input:checked + label::after {
    transform: translateX(144px);
    background: linear-gradient(180deg, #777, #333);
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }
`;

const ProfileWrapper = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;

  button {
    outline: none;
    border: none;
    background: none;
    color: #fff;
    font-size: 14px;
  }

  gap: 2rem;
  img {
    width: 40px;
  }
`;

const SearchBar = styled.div`
  background-color: white;
  display: flex;
  border-radius: 30px;
  align-items: center;
  justify-content: space-between;
  transition: all 0.8s;

  padding: 5px 10px;
  &:hover input {
    width: 130px;
  }

  input {
    border: none;
    outline: none;
    width: 0;
    background: transparent;
    transition: all 0.8s;

    &::placeholder {
      text-indent: 3px;
    }
  }

  img {
    width: 25px;
  }
`;
