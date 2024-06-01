import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
    return (
        <div className="">
          <Navbar/>
            <Outlet/>
            footer
        </div>
    );
};

export default Root;