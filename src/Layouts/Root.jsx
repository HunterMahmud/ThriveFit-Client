import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
    return (
        <div>
          <Navbar/>
            <Outlet/>
            footer
        </div>
    );
};

export default Root;