import React from "react";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";

const Home = () => <div>Home page</div>;
const Profile = () => <div>Profile page</div>;

const Login: React.FC<{ isLoggedIn: boolean, auth: Function }> = ({isLoggedIn, auth}) => {
    const {pathname} = useLocation();

    React.useEffect(() => {
        if(pathname === '/login' && isLoggedIn) {
            navigate('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn,  pathname])

    const navigate = useNavigate();
    const authenticate = () => {
        auth();
        navigate("/profile");
    }

    return (
        <div>
            <h1>Login page</h1>
            <button onClick={authenticate}>authenticate</button>
        </div>
    )
};
const Teams = () => <div>Teams page</div>;
const NotFound = () => <div>404 error</div>;


const PrivateRoutes: React.FC<{ isLoggedIn: boolean }> = ({isLoggedIn}) => {
    return isLoggedIn ? <Outlet/> : <Navigate to={"/login"}/>
}


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(((): boolean => {
            // if it has truthy value then return true else false
            return !!JSON.parse(localStorage.getItem('login')!);
        }
    )());

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
        localStorage.setItem('login', JSON.stringify(!isLoggedIn));
    };
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes isLoggedIn={isLoggedIn}/>}>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/teams"} element={<Teams/>}/>
                </Route>
                <Route path={"/login"} element={<Login isLoggedIn={isLoggedIn} auth={toggleLogin}/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>

        </Router>
    )

}
