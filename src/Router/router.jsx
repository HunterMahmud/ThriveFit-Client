import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Root from "../Layouts/Root";
import AllNewsLetter from "../pages/Dashboard/AllNewsLetter/AllNewsLetter";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <NotFound/>,
        children:[
            {
                path: '/',
                element: <Home/>
            },
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/register',
                element: <Register/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <Dashboard/> </PrivateRoute>,
        children:[
            //admin related paths
            {
                path:'allnewsletter',
                element: <AllNewsLetter/>
            }
        ]
    }
])

export default router;