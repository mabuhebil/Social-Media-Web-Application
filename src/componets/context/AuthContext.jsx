import { createContext, useEffect, useState } from "react";
import { jwt } from "zod";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [UserToken, setUserToken] = useState(() =>
    localStorage.getItem("user_token"),
  );

  const [userId, setUserId] = useState(null);

  function saveUserToken(token) {
    setUserToken(token);
    localStorage.setItem("user_token", token);
  }

  function removeToken() {
    setUserToken(null);
    localStorage.removeItem("user_token");
  }

  console.log(UserToken);

  function decodeUserToken() {
    const decodedToken = jwtDecode(UserToken);
    setUserId(decodedToken.user);
  }

  useEffect(() => {
    if (UserToken) {
      decodeUserToken();
    }
  }, [UserToken]);

  return (
    <AuthContext.Provider
      value={{
        UserToken,
        saveUserToken,
        removeToken,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
