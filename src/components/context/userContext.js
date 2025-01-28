// this file use to transform user information to all files
import { createContext, useState } from "react";
import Cookies from "universal-cookie";

export const User = createContext({});
const cookie = new Cookies();

export default function UserContext({ children }) {
  const [token, setToken] = useState(cookie.get("Bearer"));
  return <User.Provider value={{ token, setToken }}>{children}</User.Provider>;
}
