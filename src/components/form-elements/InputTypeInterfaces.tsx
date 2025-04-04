import React from "react";

interface InputProps {
  id: string;
  className: string;
}

export const InputEmail = ({ id, className }: InputProps) => {
  return <input type="email" id={id} className={className} name="email" />;
};

export const InputColor = ({ id, className }: InputProps) => {
  return <input type="color" id={id} className={className} name="color" />;
};

export const InputText = ({ id, className }: InputProps) => {
  return <input type="text" id={id} className={className} name="text" />;
};

export const InputDate = ({ id, className }: InputProps) => {
  return <input type="date" id={id} className={className} name="date" />;
};

export const InputSubmit = ({ id, className }: InputProps) => {
  return <input type="range" id={id} className={className} name="range" />;
};

export const InputPassword = ({ id, className }: InputProps) => {
  return (
    <input type="password" id={id} className={className} name="password" />
  );
};

export const InputRadio = ({ id, className }: InputProps) => {
  return <input type="radio" id={id} className={className} name="radio" />;
};

export const InputCheckBox = ({ id, className }: InputProps) => {
  return (
    <input type="checkbox" id={id} className={className} name="checkbox" />
  );
};

export const InputSearch = ({ id, className }: InputProps) => {
  return <input type="search" id={id} className={className} name="search" />;
};

export const InputFile = ({ id, className }: InputProps) => {
  return (
    <input type="file" id={id} className={className} name="file" multiple />
  );
};
