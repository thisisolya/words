import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { ModalProvider } from '../context/ModalContext';
import { AlertProvider } from '../context/AlertContext';
import useLogout from '../hooks/useLogout';

import AppWrapper from '../components/AppWrapper';
import CardsGallery from '../containers/CardsGallery';
import CreateCard from './create-card';
import CreateUser from './create-user';
import NavBar from '../components/Navbar';
import PagesWrapper from '../components/PagesWrapper';
import Settings from './settings';
import UsersList from './users-list';
import UserMenu from './user-menu';

function MainPage() {
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <NavBar handleHomeClick={() => navigate('/')} handleLogout={logout} />
      <AlertProvider>
        <ModalProvider>
          <PagesWrapper>
            <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/user/:id" element={<UserMenu />} />
              <Route path="/user/:id/cards" element={<CardsGallery />} />
              <Route path="/user/:id/cards/create" element={<CreateCard />} />
              <Route path="/user/create" element={<CreateUser />} />
              <Route path="/user/:id/settings" element={<Settings />} />
            </Routes>
          </PagesWrapper>
        </ModalProvider>
      </AlertProvider>
    </AppWrapper>
  );
}

export default MainPage;
