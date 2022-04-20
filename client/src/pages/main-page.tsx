import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ModalProvider } from '../context/modal-context';
import { AlertProvider } from '../context/alert-context';

import CardsCarousel from './cards-carousel';
import CreateCard from './create-card';
import CreateUser from './create-user';
import NavBar from '../components/nav-bar';
import Settings from './settings';
import UsersList from './users-list';
import UserMenu from './user-menu';
import Wrapper from '../components/wrapper';

function MainPage() {
  return (
    <Wrapper>
      <NavBar />
      <AlertProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/user/:id" element={<UserMenu />} />
            <Route path="/user/:id/cards" element={<CardsCarousel />} />
            <Route path="/user/:id/cards/create" element={<CreateCard />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/user/:id/settings" element={<Settings />} />
          </Routes>
        </ModalProvider>
      </AlertProvider>
    </Wrapper>
  );
}

export default MainPage;
