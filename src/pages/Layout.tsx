import {NavLink, Outlet} from "react-router-dom";

//  by using the <Outlet /> it simply registers the child routes so now when any of child routes clicked
// it would which page to load

const Layout = () => {
    return (
        <>
            <h1>React Router v6</h1>
            <ul>
                <li><NavLink to="/" style={({isActive}) => {
                    return {backgroundColor: isActive ? 'red' : ''}
                }}>Home</NavLink></li>
                <li><NavLink to="/about" style={({isActive}) => {
                    return {backgroundColor: isActive ? 'red' : ''}
                }}>About</NavLink></li>
                <li><NavLink to="/contact" style={({isActive}) => {
                    return {backgroundColor: isActive ? 'red' : ''}
                }}>Contact</NavLink></li>
                <li><NavLink to="/post" style={({isActive}) => {
                    return {backgroundColor: isActive ? 'red' : ''}
                }}>Post</NavLink></li>
            </ul>
            <Outlet/>
        </>
    );
};

export default Layout;
