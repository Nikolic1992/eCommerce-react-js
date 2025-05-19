import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppLayout from "./AppLayout.jsx";

// ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// REDUX
import { Provider } from "react-redux";
import store from "./store/store.js";
// CLERK
import { ClerkProvider } from "@clerk/clerk-react";
// PAGES
import HomePage from "./pages/HomePage.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/singleProduct/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </Provider>
  </StrictMode>
);
