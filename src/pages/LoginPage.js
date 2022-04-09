import * as React from "react";
import {
    Link,
    Routes,
    Route,
    useNavigate,
    Navigate,
    useLocation
} from "react-router-dom";
import Home from "./Home";
import useAuth from "../useAuth";
import "../App.css";
import styled from "styled-components";
import Title from "../component/Title";

const Landing = () => <h1>Please Login Mew🐾</h1>;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    const handleLogin = () => {
        login().then(() => {
            navigate(state?.path || "/dashboard");
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Log in</button>
        </div>
    );
};

function Nav() {
    const { authed, logout } = useAuth();
    const navigate = useNavigate();

    const StyledLink = styled(Link)`
      color: palevioletred;
      font-weight: bold;
    `;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <Title />
            <nav>
                <ul>
                    <li>
                        <StyledLink to="/dashboard">Wanna see my facts? Login here</StyledLink>
                    </li>
                </ul>
                {authed && <button onClick={handleLogout}>Logout</button>}
            </nav>
        </>
    );
}

function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}

export default function LoginPage() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}
