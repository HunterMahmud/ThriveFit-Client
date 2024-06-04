import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Root from "../Layouts/Root";
import AllTrainers from "../pages/AllTrainers/AllTrainers";
import TrainerDetails from "../pages/AllTrainers/TrainerDetails";
import Classes from "../pages/Classes/Classes";
import AddNewClass from "../pages/Dashboard/AddNewClass/AddNewClass";
import AllNewsLetter from "../pages/Dashboard/AllNewsLetter/AllNewsLetter";
import AppliedTrainers from "../pages/Dashboard/AppliedTrainers/AppliedTrainers";
import Balance from "../pages/Dashboard/Balance/Balance";
import BeATrainer from "../pages/Dashboard/BeATrainer/BeATrainer";
import DashboardAllTrainers from "../pages/Dashboard/DashboardAllTrainers/DashboardAllTrainers";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound";
import Payment from "../pages/Payment/Payment";
import Register from "../pages/Register/Register";
import TrainerBooked from "../pages/TrainerBooked/TrainerBooked";
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
                path: '/trainer/:trainerId',
                element: <TrainerBooked/>
            },
            {
                path: '/classes',
                element: <Classes/>
            },
            {
                path: '/payment',
                element: <Payment/>
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
            {
                path: 'alltrainers',
                element: <DashboardAllTrainers/>
            },
            {
                path: 'balance',
                element: <Balance/>
            },
            {
                path: 'appliedtrainers',
                element: <AppliedTrainers/>
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