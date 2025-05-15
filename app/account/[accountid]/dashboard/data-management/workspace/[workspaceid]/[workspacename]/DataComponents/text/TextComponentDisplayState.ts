"use client";
import { useState } from "react";

export const useTextComponentDisplayState = () => {
  //dynamic data components
  const [textComponentDisplayState, setTextComponentDisplayState] =
    useState<boolean>(false);

  return { textComponentDisplayState, setTextComponentDisplayState };
};
