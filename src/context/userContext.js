import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("");
  function login({ email, password }) {
    console.log("login", { email, password });
  }

  return (
    <UserContext.Provider value={{ userType, setUserType ,login}}>
      {children}
    </UserContext.Provider>
  );
};
