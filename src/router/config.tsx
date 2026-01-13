import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { motion } from 'framer-motion';

const Login = lazy(() => import('../pages/login/page'));
const PropertySelection = lazy(() => import('../pages/property-selection/page'));
const IndustrySelection = lazy(() => import('../pages/industry-selection/page'));
const Dashboard = lazy(() => import('../pages/dashboard/page'));
const Settings = lazy(() => import('../pages/settings/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <i className="ri-loader-4-line text-4xl text-teal-600"></i>
    </motion.div>
  </div>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/property-selection',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <PropertySelection />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/industry-selection',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <IndustrySelection />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
          <Settings />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
