"use client";
import { ReactNode } from "react";

const Div = ({
  className,
  children,
  onMouseOut,
}: {
  className: string;
  onMouseOut?: React.ReactEventHandler;
  children: ReactNode;
}) => {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {children}
    </div>
  );
};

export default Div;
