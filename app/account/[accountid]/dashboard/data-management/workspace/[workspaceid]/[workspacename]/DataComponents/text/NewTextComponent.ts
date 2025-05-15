"use client";
import { useState } from "react";

export const useNewTextComponent = () => {
  const [newTextComponent, setNewTextComponent] = useState<any>({
    text: "",
  });
  return { newTextComponent, setNewTextComponent };
};

interface ITextComponent {
  id: string;
  text: string;
  position: { x: number; y: number };
}

//update text compononent data in db
// const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setNewTextComponent({
//     ...newTextComponent,
//     text: e.target.value,
//   });
// };
