"use client";
import React, { ReactNode } from "react";

const Select = ({
  id,
  className,
  children,
  defaultValue,
  value,
  onChange,
}: {
  id: string;
  className: string;
  children: ReactNode;
  defaultValue: string;
  value: string;
  onChange: () => void;
}) => {
  return (
    <select
      id={id}
      className={className}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
