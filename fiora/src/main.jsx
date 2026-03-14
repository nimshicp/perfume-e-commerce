import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="849764160450-506j3qom5anr1j9b30k1j3o2c0g4dtig.apps.googleusercontent.com">
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
    </GoogleOAuthProvider>
  </StrictMode>
);