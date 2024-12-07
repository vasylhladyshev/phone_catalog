import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./shared/Header/Header";
import HomePage from "./modules/HomePage/HomePage";
import FavoritesPage from "./modules/FavoritesPage/FavoritesPage";
import CartPage from "./modules/CartPage/CartPage";
import Footer from "./shared/Footer/Footer";
import ProductsPage from "./modules/ProductsPage/ProductsPage";
import phones from "./api/phones.json";
import tablets from "./api/tablets.json";
import accessories from "./api/accessories.json";
import ProductPage from "./shared/ProductPage/ProductPage";
import { CartProvider } from "./context/CartContext/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext/FavoriteContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/phone_catalog">
      <CartProvider>
        <FavoriteProvider>
          <div className="app_container">
            <div className="main-content">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/phones"
                  element={<ProductsPage products={phones} />}
                />
                <Route
                  path="/tablets"
                  element={<ProductsPage products={tablets} />}
                />
                <Route
                  path="/accessories"
                  element={<ProductsPage products={accessories} />}
                />
                <Route
                  path="/:productspage/:productpage"
                  element={<ProductPage />}
                />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </FavoriteProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
