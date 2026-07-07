import { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            setUser({ token });
        }

        setLoading(false);

    }, []);

    const loginUser = async (data) => {

        const response = await login(data);

        localStorage.setItem("token", response.token);

        setUser(response.user);

        return response;

    };

    const registerUser = async (data) => {

        const response = await register(data);

        localStorage.setItem("token", response.token);

        setUser(response.user);

        return response;

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login: loginUser,
                register: registerUser,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;