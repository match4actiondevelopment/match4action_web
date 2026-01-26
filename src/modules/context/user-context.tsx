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
import { fetchProfile } from "../services";
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
    const storedUser = value && value !== "undefined" ? JSON.parse(value) : null;
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Try to fetch current user if no stored user
      fetchProfile().then((fetchedUser) => {
        if (fetchedUser && typeof fetchedUser === 'object' && '_id' in fetchedUser) {
          setUser(fetchedUser);
        }
      }).catch(() => {
        // Ignore errors, user is not logged in
      });
    }
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
