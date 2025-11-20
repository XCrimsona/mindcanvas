import { createContext, ReactNode, useContext, useState } from "react";

//for toggling
type TypeSharedUseStateContext = true | false;
interface IComponentHubContextType {
  sharedToggleState: TypeSharedUseStateContext;
  toggleSharedState: React.ReactEventHandler;
}

// Context for managing shared state across components
const ComponentHubContext = createContext<IComponentHubContextType | undefined>(
  undefined
);

export const ComponentHubProvider = ({ children }: { children: ReactNode }) => {
  const [sharedToggleState, setSharedToggleState] =
    useState<TypeSharedUseStateContext>(false);
  const toggleSharedState = () => {
    setSharedToggleState((prev) => (prev === false ? true : false));
  };

  return (
    <ComponentHubContext.Provider
      value={{ sharedToggleState, toggleSharedState }}
    >
      {children}
    </ComponentHubContext.Provider>
  );
};

export const useComponentHub = () => {
  const context = useContext(ComponentHubContext);
  if (!context) {
    throw new Error(
      "ComponentHubContext must be used within ComponentHubProvider "
    );
  }
  return context;
};
