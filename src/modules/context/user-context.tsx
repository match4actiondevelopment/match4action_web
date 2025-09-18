import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UserI } from "../types/types";

interface UserContextInterface {
  user: UserI | null;
  isLogged: boolean;
  setUser: Dispatch<SetStateAction<UserI | null>>;
}

const UserContext = createContext<UserContextInterface | null>(null);

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const initialRender = useRef(true);
  const [user, setUser] = useState<UserI | null>(null);

  // fetch data
  useEffect(() => {
    const value = localStorage.getItem("match4action@user");
    const user = value && value !== "undefined" ? JSON.parse(value) : null;
    setUser(user);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem("match4action@user", JSON.stringify(user));
  }, [user]);

  const isLogged = useMemo(
    () => (user && Object.keys(user).length > 0 ? true : false),
    [user]
  );

  return (
    <UserContext.Provider value={{ user, setUser, isLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
