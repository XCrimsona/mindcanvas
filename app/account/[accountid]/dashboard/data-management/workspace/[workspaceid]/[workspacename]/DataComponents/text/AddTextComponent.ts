"use client";

import { useTextComponentDisplayState } from "./TextComponentDisplayState";
import { useNewTextComponent } from "../NewTextComponent";

const { setTextComponentDisplayState } = useTextComponentDisplayState();
const { newTextComponent, setNewTextComponent } = useNewTextComponent();

//create a new Text Component
export const addTextComponent = () => {
  return { addTextComponent };
};
