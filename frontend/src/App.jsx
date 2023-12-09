import React from "react";
import { Routes, Route } from "react-router-dom";

// require
import Chart from "chart.js/auto";

import MainLayout from "./layouts/MainLayout";
import {
   LoginPage,
   DashboardPage,
   NotFoundPage,
   CategoryPage,
   ProductPage,
   OrderPage,
   UserPage,
   InventoryPage,
   PaymentPage,
   InventoryDetailPage,
   StatisticsPage,
} from "./pages";

const App = () => {
   return (
      <Routes>
         <Route path="/login" element={<LoginPage />} />
         <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory-detail" element={<InventoryDetailPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/statistic" element={<StatisticsPage />} />

            <Route path="*" element={<NotFoundPage />} />
         </Route>
      </Routes>
   );
};

export default App;
