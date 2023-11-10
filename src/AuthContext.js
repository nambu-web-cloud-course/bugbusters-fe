// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // localStorage version
  // localStorage.setItem('user', JSON.stringify({ userid, token }));
  // setUser({ userid, token });

  // const logout = () => {
  //   // Remove user data and token from local storage on logout
  //   localStorage.removeItem('user');
  //   setUser(null);
  // };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/sign-in",
        userData,
        { withCredentials: true }
      );
      setUser(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
