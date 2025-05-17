"use client";
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";

type TypeTextContext = true | false;
interface ITextContextType {
  textToggleState: TypeTextContext;
  toggleTextState: () => void;
  useInputCompref: RefObject<HTMLDivElement | null>;
}

const TextContext = createContext<ITextContextType | undefined>(undefined);

export const TextContextProvider = ({ children }: { children: ReactNode }) => {
  const [textToggleState, setTextToggleState] =
    useState<TypeTextContext>(false);

  const toggleTextState = () => {
    setTextToggleState((prev) => (prev === false ? true : false));
  };

  const useInputCompref = useRef<HTMLDivElement | null>(null);
  return (
    <TextContext.Provider
      value={{ textToggleState, toggleTextState, useInputCompref }}
    >
      {children}
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context)
    throw new Error(
      "useSharedUseState must be used inside TextContextProvider"
    );
  return context;
};
