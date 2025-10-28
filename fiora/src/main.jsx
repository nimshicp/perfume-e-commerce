import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <ShopProvider>
          <WishlistProvider>
            <OrderProvider>
              <App />
              <Toaster position="top-right" reverseOrder={false} />
            </OrderProvider>
          </WishlistProvider>
        </ShopProvider>
      </UserProvider>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
