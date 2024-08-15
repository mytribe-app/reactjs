import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import BlankLayout from 'src/layouts/blank/BlankLayout';
import Landingpage from 'src/views/pages/landingpage/Landingpage';
import Login from 'src/views/auth/Login';
import Register from 'src/views/auth/Register';
import ForgotPassword from 'src/views/auth/AuthForgotPassword';
import Feed from 'src/views/apps/feed/Feed';
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));

const Router = [

  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/landingpage" /> },
      { path: '/', element: <Navigate to="/apps/chats" /> },
      { path: '/apps/chats', element: <Chats /> },
      { path: '/apps/contacts', element: <Contacts /> },
      { path: '/apps/feed', element: <Feed /> },

    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/landingpage', element: <Landingpage /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
    ]
  },
];

export default Router;
