import React from "react";
import {Outlet} from "react-router-dom";


function PrivateRoutes() {
    console.log(`private route`);
    return <Outlet/>;
}

export default PrivateRoutes;
