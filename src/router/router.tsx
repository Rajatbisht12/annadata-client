import AuthLayout from "@/_auth/AuthLayout";
import SignIn from "@/_auth/forms/SignIn";
import SignUp from "@/_auth/forms/SignUp";
import RootLayout from "@/_root/RootLayout";
import EntryScreen from "@/components/EntryScreen";
import ErrorPage from "@/error-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  // public routes
  {
    element: <EntryScreen />,
    errorElement: <ErrorPage />,
    path: "/",
  },
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
      },
      {
        path: "/hotspot-areas",
      },
      {
        path: "/profile",
      },
    ],
  },
  // public routes
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
    ],
  },
]);
