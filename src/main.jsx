import React from 'react';
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx';
import WishlistProvider from './context/WishlistContext.jsx';
import ProductProvider from './context/ProductContext';
import OrderProvider from './context/OrderContext.jsx';
import RecentlyViewedProvider from './context/RecentlyViewedContext.jsx';
import ReviewProvider from './context/ReviewContext.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <ProductProvider>
          <OrderProvider>
            <RecentlyViewedProvider>
              <ReviewProvider>
                <App />
              </ReviewProvider>
            </RecentlyViewedProvider>          
          </OrderProvider>
        </ProductProvider>
      </WishlistProvider>
    </CartProvider>
  </BrowserRouter>,
)
