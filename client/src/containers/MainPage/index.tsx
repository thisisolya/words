import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { AlertProvider } from '../../context/AlertContext';
import { ModalProvider } from '../../context/ModalContext';

import useLogout from '../../hooks/useLogout';

import AppWrapper from '../../components/AppWrapper';
import CardsGallery from '../CardsGallery';
import CreateCard from '../CreateCard';
import CreateUser from '../CreateUser';
import NavBar from '../../components/Navbar';
import Settings from '../Settings';
import PagesWrapper from '../../components/PagesWrapper';
import UserMenu from '../UserMenu';
import UsersList from '../UsersGallery';

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
