import React, { useContext } from "react";
import App from "./store";

const AppContext = React.createContext<App | null>(null);

export const AppStore: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppContext.Provider value={new App()}>{children}</AppContext.Provider>
  );
};

export const useAppStore = () => useContext(AppContext);
