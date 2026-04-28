import React from 'react';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products/:id", element: <ProductDetailPage /> },
  { path: "/add-product", element: <AddProductPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
