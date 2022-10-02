import { createContext, useContext, useState } from "react";
import Modals from "../components/Modals";

export const ModalsManagerContext = createContext(null);

const ModalsManager = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");

  const values = { activeModal, setActiveModal };

  return (
    <ModalsManagerContext.Provider value={values}>
      {children}
      <Modals />
    </ModalsManagerContext.Provider>
  );
};

const useModalsManager = () => useContext(ModalsManagerContext);

export { useModalsManager, ModalsManager };
