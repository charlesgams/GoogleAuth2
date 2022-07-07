import { createContext, useState } from "react";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  let signIn = (userId, userToken) => {
      setUser({
        userId: userId,
        token: userToken,
      });
    },
    signOut = () => {
      setUser(null);
    };

  let value = { signIn, signOut, user };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { AuthProvider, UserContext };
