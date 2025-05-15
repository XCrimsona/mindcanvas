"use client";
import { ReactNode } from "react";

const Div = ({
  className,
  children,
  onMouseDown,
  onStyle,
  ref,
}: {
  className: string;
  onMouseDown?: React.ReactEventHandler;
  children: ReactNode;
  onStyle?: any;
  ref?: any;
}) => {
  return (
    <div
      ref={ref}
      style={onStyle}
      className={className}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default Div;
