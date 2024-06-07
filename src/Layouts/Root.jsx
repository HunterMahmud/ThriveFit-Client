import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from './../components/Footer/Footer';

const Root = () => {
    return (
        <div className="bg-white">
          <Navbar/>
           <div className="min-h-[calc(100vh-368.8px)]">
           <Outlet/>
           </div>
            <Footer/>
        </div>
    );
};

export default Root;