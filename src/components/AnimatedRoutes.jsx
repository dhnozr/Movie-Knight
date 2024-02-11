import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './Layout';
import { Rated } from '../pages/ratedPage/Rated';
import { Home } from '../pages/homePage/Home';
import { MovieDetail } from '../pages/movieDetail/MovieDetail';
import { Auth } from '../pages/authPage/Auth';

export const AnimatedRoutes = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='movie/:id' element={<MovieDetail />} />
          <Route path='auth' element={<Auth />} />

          <Route path='rated' element={<Rated />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
