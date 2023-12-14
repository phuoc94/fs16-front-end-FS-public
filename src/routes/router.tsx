import { createBrowserRouter } from 'react-router-dom';

import Layout from '../layouts/Layout';
import HomePage from '../pages';
import CartPage from '../pages/CartPage';
import ErrorPage from '../pages/ErrorPage';
import LoansPage from '../pages/LoansPage';
import CreateProductPage from '../pages/products/CreateProductPage';
import ProductPage from '../pages/products/ProductPage';
import ProductsPage from '../pages/products/ProductsPage';
import ProfilePage from '../pages/ProfilePage';
import SignIn from '../pages/SignIn';
import AdminRoutes from './AdminRoutes';
import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: ':productId',
            element: <ProductPage />,
          },
        ],
      },
      {
        path: 'create-product',
        element: <AdminRoutes />,
        children: [
          {
            index: true,
            element: <CreateProductPage />,
          },
        ],
      },
      {
        path: '/profile',
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '/loans',
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <LoansPage />,
          },
        ],
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
