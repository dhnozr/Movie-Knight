import React from 'react';
import { Route, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';
import { GlobalStyles } from '../GlobalStyles';
import { Navbar } from './Navbar';
import { useStore } from '../store/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';
import { darkTheme } from './theme';
import { getLocalTheme } from '../store/store';

export const Layout = () => {
  const isDarkThemeIsActive = useStore(state => state.isDarkThemeActive);
  return (
    <>
      <ThemeProvider theme={isDarkThemeIsActive ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </>
  );
};
