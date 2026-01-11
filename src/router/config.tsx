
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

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
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/property-selection',
    element: <PropertySelection />,
  },
  {
    path: '/industry-selection',
    element: <IndustrySelection />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
