import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CityList from "./components/CityList";
import CountyList from "./components/CountyList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./Contexts/CititesContecxt";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import AppLayout from "./pages/AppLayout";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-d5bc8787.css   31.94 kB │ gzip:   5.29 kB
// dist/assets/index-4a2160b2.js   531.86 kB │ gzip: 150.33 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />

              <Route path="product" element={<Product />} />

              <Route path="pricing" element={<Pricing />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {" "}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountyList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="login" element={<Login />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
