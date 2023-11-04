import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import OrderPage from './pages/OrderPage'
import UserPage from './pages/UserPage'
import InventoryPage from './pages/InventoryPage'
import PaymentPage from './pages/PaymentPage'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/inventory' element={<InventoryPage />} />
        <Route path='/payment' element={<PaymentPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App