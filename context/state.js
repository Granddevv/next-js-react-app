import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [title, updateTitle] = useState("Photo Gallery");
  const [desc, updateDesc] = useState(
    "A selection of the latest photos from our restaurant and some of our favorite dishes"
  );

  return (
    <AppContext.Provider
      value={{
        title,
        desc,
        updateTitle,
        updateDesc,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
