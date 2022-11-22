import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Context } from "../Context/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Transaction } from "../pages/Transation";


export function Routes() {

    const { authenticated } = useContext(Context);

    const privateRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/transactions",
                    element: <Transaction />,
                },
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "*",
                    element: <Dashboard />,
                }
            ],
        },
        {
            path: "*",
            element: <h1>404</h1>,
        },
        {
            path: "/login",
            element: <Login />,
        },
    ]);

    const routes = createBrowserRouter([
        {
            path: "*",
            element: <Login />,
        },
    ]);

    return <>
        <RouterProvider router={authenticated ? privateRoutes : routes} />
    </>
}