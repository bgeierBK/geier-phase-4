import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './components/Homepage.jsx'
import Userprofile from './components/Userprofile.jsx'
import Marketplace from './components/Marketplace.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import App from './components/App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const routes = [{
  path: '/',
  element: <App />,
  children: [
    {
      index: true,
      element: <Homepage />
    },
    {
      path: 'userprofile',
      element: <Userprofile />
    },
    {
      path: 'marketplace',
      element: <Marketplace />
    },
    {
      path: 'cart',
      element: <Cart />
    },
    {
      path: 'checkout',
      element: <Checkout />
    }
  ]
}]

const router =createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
