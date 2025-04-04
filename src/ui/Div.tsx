"use client";
import { ReactNode } from "react";

const Div = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};

export default Div;
