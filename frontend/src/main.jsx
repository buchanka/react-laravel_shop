import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { StrictMode } from 'react';
//контекст AuthProvider
import { AuthProvider } from './contexts/AuthContext';
//контекст меню
import { MenuProvider } from './contexts/BurgerMenuContext/MenuContext';
//компоненты
import Layout from './Layout/Layout';
import AdminDashLayout from './Layout/AdminDashLayout';
//уведомления
import { Toaster } from 'sonner';
//страницы
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Catalog from './pages/Catalog';
import ProductCards from './pages/ProductCard';
import FAQ from './pages/FAQ';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import UserProfile from './pages/UserProfile';
import AdminDash from './pages/AdminDash';
import Checkout from './pages/Checkout';
import DashProducts from './pages/DashProducts';
import DashOrders from './pages/DashOrders';
import AdminLogin from './pages/AdminLogin';
import AddProduct from './pages/AddProduct';
import DashUsers from './pages/DashUsers';
import AddUser from './pages/AddUser';
import Orders from './pages/Orders';
import EditProfile from './pages/EditProfile';
import AddCollection from './pages/AddCollection';
import DashCollections from './pages/DashCollections';
import EditCollection from './pages/EditCollections';
import AddCategory from './pages/AddCategory';
import DashCategories from './pages/DashCategories';
import EditCategories from './pages/EditCategories';
import EditProducts from './pages/EditProducts';
import EditUser from './pages/EditUser';

const router = createBrowserRouter([

  {
    path: "/",
    element: (<Layout><Home/></Layout>),
    errorElement: <ErrorPage/>
  },
  
  {
    path: "/catalog",
    element: (<Layout><Catalog/></Layout>),
    errorElement: <ErrorPage/>
  },

  {
    path: "/product_card/:id",
    element: (<Layout><ProductCards/></Layout>),
    errorElement: <ErrorPage/>
  },

  {
    path: "/faq",
    element: (<Layout><FAQ/></Layout>),
    errorElement: <ErrorPage/>
  },

  {
    path: "/cart",
    element: <Layout><Cart /></Layout>,
    errorElement: <ErrorPage />,
  },

  {
    path: "/orders",
    element: <Layout><Orders /></Layout>,
    errorElement: <ErrorPage />
  },

  {
    path: "/favorites",
    element: (<Layout><Favorites/></Layout>),
    errorElement: <ErrorPage/>
  },

  {
    path: "/user_profile",
    element: (<Layout><UserProfile/></Layout>),
    errorElement: <ErrorPage/>
  },

  {
    path: "/user_profile/edit",
    element: (<Layout><EditProfile/></Layout>),
    errorElement: <ErrorPage/>
  },

  {
    path: "/error",
    element: <ErrorPage/>
  },

  {
    path: "/checkout",
    element: (<Layout><Checkout/></Layout>),
    errorElement: <ErrorPage/>
  },

  {
    path: "/admin",
    element: <AdminLogin />,
  },

  {
    path: "/admin_dash",
    element: <AdminDashLayout/>,
    errorElement: <ErrorPage/>,
    children: [ 
      {
        index: true,
        element: <AdminDash/> 
      },
      {
        path: "products", 
        element: <DashProducts/> 
      },
      {
        path: "orders", 
        element: <DashOrders/> 
      },
      {
        path: "add_product",
        element: <AddProduct/>,
      },
      {
        path: "users",
        element: <DashUsers/>,
      },
      {
        path: "add_user",
        element: <AddUser/>,
      },
      {
        path: "users/edit/:id",
        element: <EditUser/>,
      },
      {
        path: "add_collection",
        element: <AddCollection/>,
      },
      {
        path: "collections",
        element: <DashCollections/>,
      },

      {
        path: "collections/edit/:id",
        element: <EditCollection/>,
      },

      {
        path: "add_category",
        element: <AddCategory/>,
      },

      {
        path: "categories",
        element: <DashCategories/>,
      },

      {
        path: "categories/edit/:id",
        element: <EditCategories/>,
      },

      {
        path: "products/edit/:id",
        element: <EditProducts/>,
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MenuProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </MenuProvider>
    </AuthProvider>
  </StrictMode>
);
