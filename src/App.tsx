import React from "react";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";

const Home = () => <div>Home page</div>;
const Profile = () => <div>Profile page</div>;

const Login: React.FC<{ auth: Function }> = ({auth}) => {
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
    const [isLogged, setIsLoggedIn] = React.useState<boolean>(((): boolean => {
            // if it has truthy value then return true else false
            return !!JSON.parse(localStorage.getItem('login')!);
        }
    )());

    const toggleLogin = () => {
        setIsLoggedIn(!isLogged);
        localStorage.setItem('login', JSON.stringify(!isLogged));
    };
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes isLoggedIn={isLogged}/>}>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/teams"} element={<Teams/>}/>
                </Route>

                <Route path={"/login"} element={<Login auth={toggleLogin}/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>

        </Router>
    )

}
