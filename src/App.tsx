import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

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
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route index element={<Login />} />
      </Routes>
    </Router>
  );
}
