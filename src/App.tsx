import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import MainRoutes from "./routes";

const Login = () => {
  return <div>Login</div>;
};

const Profile = () => {
  return <div>profile</div>;
};

const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  const currentUser = true;
  return currentUser ? children : <Navigate to="/" />;
};

export default function App() {
  return <MainRoutes />;
}
