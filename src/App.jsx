import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import { LoginForm, SignUpForm } from "./components/Form/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import AuthProvider from "./context/AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import Layout from "./ui/Layout/Layout";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import Workouts from "./pages/Workouts/Workouts";
import Workout from "./pages/Workout/Workout";
import PasswordRecoveryForm from "./features/user/PasswordRecoveryForm";
import ExerciseDetails from "./features/exercises/ExerciseDetails/ExerciseDetails";
import WorkoutProvider from "./context/WorkoutProvider";
import Test from "./components/Test";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

function App() {
  const routes = createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          path: "/",
          loader: () => redirect("/welcome/login"),
        },
        {
          path: "/welcome",
          element: <Welcome />,
          children: [
            {
              index: true,
              loader: () => redirect("/welcome/login"),
            },
            {
              path: "signup",
              element: <SignUpForm />,
            },
            {
              path: "login",
              element: <LoginForm />,
            },
            {
              path: "forgot-password",
              element: <PasswordRecoveryForm />,
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/test",
              element: <Test />,
            },

            {
              path: "/confirm-email",
              element: <ConfirmEmail />,
            },
            {
              path: "/password-reset",
              element: <PasswordReset />,
            },
            {
              path: "/dashboard",
              element: <Layout />,
              children: [
                {
                  path: "home",
                  element: <Home />,
                },
                {
                  path: "update-user",
                  element: <UpdateUser />,
                },
                {
                  path: "workouts",
                  element: <Workouts />,
                },

                {
                  element: <WorkoutProvider />,
                  children: [
                    {
                      path: "workouts/:id",
                      element: <Workout />,
                    },
                    {
                      path: "workouts/:id/:exerciseId",
                      element: <ExerciseDetails />,
                    },
                  ],
                },

                {
                  path: "workout-calendar",
                  element: <About />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  const toastOptions = {
    duration: 1500,
    position: "top-right",
    style: {
      background: "#fff", // Background color
      color: "#484f69", // Text color
      borderRadius: "8px", // Border radius
      padding: "12px 16px", // Padding
      fontSize: "16px", // Font size
      width: "max-content", // Width
    },
    success: {
      iconTheme: {
        primary: "#4caf50", // Success icon color
        secondary: "#fff", // Success icon background
      },
    },
    error: {
      iconTheme: {
        primary: "#f44336", // Error icon color
        secondary: "#fff", // Error icon background
      },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster toastOptions={toastOptions} />
    </QueryClientProvider>
  );
}

export default App;
