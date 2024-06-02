import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Root from "../Layouts/Root";
import AllTrainers from "../pages/AllTrainers/AllTrainers";
import TrainerDetails from "../pages/AllTrainers/TrainerDetails";
import Classes from "../pages/Classes/Classes";
import AddNewClass from "../pages/Dashboard/AddNewClass/AddNewClass";
import AllNewsLetter from "../pages/Dashboard/AllNewsLetter/AllNewsLetter";
import BeATrainer from "../pages/Dashboard/BeATrainer/BeATrainer";
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
                path: '/alltrainers',
                element: <AllTrainers/>
            },
            {
                path: '/trainers/:id',
                element: <TrainerDetails/>
            },
            {
                path: '/classes',
                element: <Classes/>
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
            },
            {
                path: 'addnewclass',
                element: <AddNewClass/>
            },
            /// trainer related paths


            /// member related paths
            {
                path:'beatrainer',
                element: <BeATrainer/>
            }
        ]
    }
])

export default router;