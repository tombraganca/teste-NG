import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";


export function Routes() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Home />,

        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "*",
            element: <h1>404</h1>,
        },
    ]);

    return <>
        <RouterProvider router={routes} />
    </>
}