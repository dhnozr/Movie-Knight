import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import movieKnight from '../assets/movieKnight.png';
import knight from '../assets/knight.svg';
import fontBold from '../assets/fontbolt.png';
import search from '../assets/icons8-search.svg';
import { AsideBar } from './AsideBar';
import { AnimatePresence, motion, steps } from 'framer-motion';
import { useStore } from '../store/store';
import { useGetUser, useSearchedMovies } from './request';
import profileImg from '../assets/profilepic.webp';

export const Navbar = () => {
  // storedan cekiyorum
  const isBurgerActive = useStore(state => state.burgerIsActive);
  // toggle storeden cektım cunkü sidebarı animasyonu route degisirken birden kapanıyordu onu da düzeltmek ıcın en iyi yontem buydu baya ustunden zaman gectı tam hatırlamadım ama storedan cekmek mantıklı zaten :)
  const toggleBurger = useStore(state => state.toggleBurger);

  // burada show tv butonuna tıkladıgımda home page tv showları maplayacam initial degeri false oldugu icin ilk once movieler maplanacak ama kullanıcı showtvShows butonuna tıkladiginda tvdekileri gösterecegim
  const toggleShowTvShows = useStore(state => state.toggleShowTvShows);

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
  console.log(user);

  return (
    <>
      <StyledNavbar>
        <Logo>
          <img src={fontBold} alt='' />
        </Logo>

        <UserName>{user && <p>{user.user_metadata.userName}</p>}</UserName>

        <ProfileWrapper>
          <Profile>
            {user && (
              <>
                <p>{user.user_metadata.userName}</p>

                <div>
                  <img src={profileImg} alt='' />
                </div>
              </>
            )}
          </Profile>
          <SearchBar>
            <input value={text} onChange={handleİnputChange} type='search' placeholder='Search Movies' />
            <img src={search} alt='' />
          </SearchBar>
        </ProfileWrapper>
        <RightSide>
          <div onClick={toggleBurger} className={`burger ${isBurgerActive && 'burgerActive'}`}></div>
        </RightSide>
        {/* sidebar navbar icinde cagiriyorum butona tiklandiginde acilsin */}
        {/* animate presence kullandım cunku burger animasyonu sadece burgerActive varsa kullanılıyor bu yuzden kapatınca false oldugu ıcın exit animasyonu calismiyor bunu düzeltmek icin animatePresence kullandım mode=wait ise exit animasyonunu beklemesini saglıyor ondan sonra asideBar DOM dan kaldırlıyor.  */}

        <AnimatePresence mode='wait'>{isBurgerActive && <AsideBar />}</AnimatePresence>
      </StyledNavbar>
    </>
  );
};

// Styles
const StyledNavbar = styled.nav`
  min-height: 90px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 5;
  background: #090909;
  padding: 0 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 80px;
    background: none;
    background: transparent;
    color: red;
  }
`;

const RightSide = styled.div`
  position: fixed;
  right: 0;
  width: 60px;
  height: 60px;
  background-color: #2b2d42;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  cursor: pointer;

  .burger {
    width: 100%;
    padding: 20px 0;

    &::after,
    &::before {
      content: '';
      display: block;
      width: 50%;
      background-color: white;
      height: 2px;
      margin: auto;
      position: relative;
      transition: all 0.3s;
    }

    &::after {
      top: -5px;
    }

    &::before {
      top: 5px;
    }
  }

  .burgerActive {
    &::after {
      top: -1px;
      transform: rotate(45deg);
    }

    &::before {
      top: 1px;
      transform: rotate(-45deg);
    }
  }

  @media (max-width: 1200px) {
    width: 45px;
    height: 45px;
  }
`;

const ProfileWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-right: 60px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  img {
    width: 40px;
  }
`;

// kullanıcı adını mobilde göster
const UserName = styled.div`
  margin-right: 35px;

  @media (min-width: 700px) {
    display: none;
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
