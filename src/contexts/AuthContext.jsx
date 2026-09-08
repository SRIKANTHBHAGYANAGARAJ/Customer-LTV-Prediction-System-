import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("cm-session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const signup = (username, email, password) => {
    const newUser = { username, email, password };
    localStorage.setItem("cm-user", JSON.stringify(newUser));
  };

  const signin = (email, password) => {
    const registeredUser = JSON.parse(localStorage.getItem("cm-user"));

    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      localStorage.setItem("cm-session", JSON.stringify(registeredUser));
      setUser(registeredUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cm-session");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
