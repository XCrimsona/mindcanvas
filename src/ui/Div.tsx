"use client";
import { ReactNode } from "react";

const Div = ({
  className,
  children,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onStyle,
  ref,
}: {
  className: string;
  onMouseDown?: React.ReactEventHandler;
  onMouseMove?: React.ReactEventHandler;
  onMouseUp?: React.ReactEventHandler;
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
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};

export default Div;
