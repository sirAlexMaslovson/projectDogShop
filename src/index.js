import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import { FormRegistration } from './components/FormRegistration/FormRegistration'
import { FormAuthorization } from './components/FormAuthorization/FormAuthorization'
import { Main } from './components/Main/Main'
import { UserInfo } from './components/UserInfo/UserInfo'
import { store } from './redux/store'
import { CartPage } from './components/CartPage/CartPage'
import { DetailCardPage } from './components/DetailCardPage/DetailCardPage'
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage'
// import { SearchPage } from './components/Search/Search'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'signup/',
        element: <FormRegistration />,
      },
      {
        path: 'signin/',
        element: <FormAuthorization />,
      },
      {
        path: 'user/',
        element: <UserInfo />,
      },
      {
        path: 'cart/:id',
        element: <CartPage />,
      },
      {
        path: 'favorites/',
        element: <FavoritesPage />,
      },
      {
        path: 'products/:id',
        element: <DetailCardPage />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
