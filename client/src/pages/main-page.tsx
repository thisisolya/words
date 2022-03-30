import React from 'react';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

import { ModalProvider } from '../context/modal-context';
import { AlertProvider } from '../context/alert-context';

import CardsList from './cards-list';
import CreateCard from './create-card';
import CreateUser from './create-user';
import NavBar from '../components/nav-bar';
import Settings from './settings';
import UsersList from './users-list';
import UserMenu from './user-menu';

const Wrapper = styled(Stack)`
  height: 100%;
  min-height: 100vh;
  padding: 10vh 0;
  overflow: hidden;
  align-items: center;
`;

function MainPage() {
  return (
    <Wrapper>
      <NavBar />
      <AlertProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/user/:id" element={<UserMenu />} />
            <Route path="/cards/:id" element={<CardsList />} />
            <Route path="/cards/create" element={<CreateCard />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/user/settings" element={<Settings />} />
          </Routes>
        </ModalProvider>
      </AlertProvider>
    </Wrapper>
  );
}

export default MainPage;
