import React from "react";
import { Outlet, Route, Routes, Link, useNavigate, useLocation, Navigate } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  signin: function (callback: VoidFunction) {
    this.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout: function (callaback: VoidFunction) {
    this.isAuthenticated = false;
    setTimeout(callaback, 100);
  },
};

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

// This AuthProvide will provide signin, signout method to Public and Protected Route component without prop drilling
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);

  const signin = (user: string, cb: VoidFunction): void => {
    // set the user's value to true then cb()
    return fakeAuth.signin(() => {
      setUser(user);
      cb();
    });
  };

  const signout = (cb: VoidFunction): void => {
    // set the user's value to null then cb()
    return fakeAuth.signin(() => {
      setUser(null);
      cb();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  if (!auth) throw new Error("Auth has not been initialized");
  return auth;
}

function PublicPages() {
  return <h2>Public page</h2>;
}

function ProtectedPage() {
  return <h2>Protected Page</h2>;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  const auth = useAuth();
  const inputEl = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (inputEl.current) inputEl.current.focus();
    return () => {
      if (inputEl.current) inputEl.current = null;
    };
  }, []);

  let from = location.state?.from?.pathname || "/"; // to know which link user was coming from
  console.log("from: ", from);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;

    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input style={{ padding: "5px" }} name="username" type="text" ref={inputEl} />
        </label>
        <button
          style={{
            outline: "none",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            marginLeft: "4px",
            cursor: "pointer",
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  console.log("auth", auth, "location: ", location);

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <div style={{ textAlign: "center" }}>
        <AuthStatus />

        <ul style={{ listStyle: "none" }}>
          <li>
            <Link to="/">Public</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/protected">Protected</Link>
          </li>
        </ul>
        {/* Registering routes so that when routing manually/programmtically; it knows the right component to load */}
        <Outlet />
      </div>
      <Routes>
        <Route path="/" element={<PublicPages />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <div>Profile page</div>
            </RequireAuth>
          }
        />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
