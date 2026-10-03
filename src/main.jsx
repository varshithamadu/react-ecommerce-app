import React from 'react';
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx';
import WishlistProvider from './context/WishlistContext.jsx';
import ProductProvider from './context/ProductContext';

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>,
)
