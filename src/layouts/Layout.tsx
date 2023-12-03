import React, { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import NavBar from '../containers/navbar/NavBar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <Fragment>
      <NavBar />

      <Box component="main">
        <Outlet />
      </Box>

      <Footer />
    </Fragment>
  );
};

export default Layout;
