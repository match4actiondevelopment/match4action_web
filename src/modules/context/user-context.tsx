"use client";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getCurrentAccount } from "../services/account";
import { UserI } from "../types/types";
interface UserContextInterface {
  user: UserI | null;
  isLogged: boolean;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<UserI | null>>;
}
const UserContext = createContext<UserContextInterface | null>(null);
const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    getCurrentAccount(controller.signal)
      .then((account) => {
        if (!controller.signal.aborted) setUser(account);
      })
      .catch(() => {
        if (!controller.signal.aborted) setUser(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (isLoading) return;
    try {
      if (user) localStorage.setItem("match4action@user", JSON.stringify(user));
      else localStorage.removeItem("match4action@user");
    } catch {
      /* Storage is optional; authentication uses the API session. */
    }
  }, [user, isLoading]);
  return (
    <UserContext.Provider
      value={{ user, setUser, isLogged: !!user, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };