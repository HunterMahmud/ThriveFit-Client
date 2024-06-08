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
import ManageSlots from './../pages/Dashboard/ManageSlots/ManageSlots';
import AddNewSlot from "../pages/Dashboard/AddNewSlot/AddNewSlot";
import AddNewForum from './../pages/Dashboard/AddNewForum/AddNewForum';
import UserProfile from './../pages/Dashboard/UserProfile/UserProfile';
import ActivityLog from './../pages/Dashboard/ActivityLog/ActivityLog';
import ForumPage from './../pages/ForumPage/ForumPage';
import ForumDetails from './../pages/ForumPage/ForumDetails';
import WelcomeDashboard from "../pages/Dashboard/WelcomeDashboard";
import RecommendedClasses from "../pages/Dashboard/RecommendedClasses/RecommendedClasses";
import AdminOrTrainerRoute from "./AdminOrTrainerRoute";
import TrainerRoute from './TrainerRoute';
import AdminRoute from "./AdminRoute";
import MemberRoute from './MemberRoute';


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
                element: <PrivateRoute><TrainerBooked/></PrivateRoute>
            },
            {
                path: '/classes',
                element: <Classes/>
            },
            {
                path: '/payment',
                element: <PrivateRoute><Payment/></PrivateRoute>
            },
            {
                path: '/forums',
                element: <ForumPage/>
            },
            {
                path: '/forum/:id',
                element: <ForumDetails/>
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
            {
                index: true,
                element: <PrivateRoute><WelcomeDashboard/></PrivateRoute>
            },
            
            //admin related paths
            {
                path:'allnewsletter',
                element: <AdminRoute><AllNewsLetter/></AdminRoute>
            },
            {
                path: 'addnewclass',
                element: <AdminRoute><AddNewClass/></AdminRoute>
            },
            {
                path: 'alltrainers',
                element: <AdminRoute><DashboardAllTrainers/></AdminRoute>
            },
            {
                path: 'balance',
                element: <AdminRoute><Balance/></AdminRoute>
            },
            {
                path: 'appliedtrainers',
                element: <AdminRoute><AppliedTrainers/></AdminRoute>
            },

            /// trainer related paths
            {
                path: 'manageslot',
                element: <TrainerRoute><ManageSlots/></TrainerRoute>
            },
            {
                path: 'addnewslot',
                element: <TrainerRoute><AddNewSlot/></TrainerRoute>
            },

            ///admin and trainer common route
            {
                path: 'addnewforum',
                element: <AdminOrTrainerRoute><AddNewForum/></AdminOrTrainerRoute>
            },


            /// member related paths
            {
                path:'beatrainer',
                element: <MemberRoute><BeATrainer/></MemberRoute>
            },
            {
                path:'userprofile',
                element: <MemberRoute><UserProfile/></MemberRoute>
            },
            {
                path:'activitylog',
                element: <MemberRoute><ActivityLog/></MemberRoute>
            },
            {
                path: 'recommendedclasses',
                element: <MemberRoute><RecommendedClasses/></MemberRoute>
            }
        ]
    }
])

export default router;