"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type TypeSharedUseStateContext = true | false;
interface ISharedUseStateContextType {
  sharedToggleState: TypeSharedUseStateContext;
  toggleSharedState: React.ReactEventHandler;
}
const SharedUseStateContext = createContext<
  ISharedUseStateContextType | undefined
>(undefined);
export const ComponentHubStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sharedToggleState, setSharedToggleState] =
    useState<TypeSharedUseStateContext>(false);
  const toggleSharedState = () => {
    setSharedToggleState((prev) => (prev === false ? true : false));
  };

  return (
    <SharedUseStateContext.Provider
      value={{ sharedToggleState, toggleSharedState }}
    >
      {children}
    </SharedUseStateContext.Provider>
  );
};

export const useComponentHubState = () => {
  const context = useContext(SharedUseStateContext);
  if (!context) {
    throw new Error(
      "useSharedUseState must be used within SharedUseStateProvider "
    );
  }
  return context;
};
