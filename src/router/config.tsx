import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const LandingPage = lazy(() => import('../pages/page'));
const Home = lazy(() => import('../pages/home/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/login/page'));
const PropertySelection = lazy(() => import('../pages/property-selection/page'));
const IndustrySelection = lazy(() => import('../pages/industry-selection/page'));
const Dashboard = lazy(() => import('../pages/dashboard/page'));
const Settings = lazy(() => import('../pages/settings/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/property-selection',
    element: (
      <ProtectedRoute>
        <PropertySelection />
      </ProtectedRoute>
    ),
  },
  {
    path: '/industry-selection',
    element: (
      <ProtectedRoute>
        <IndustrySelection />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
