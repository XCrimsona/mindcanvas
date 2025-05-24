"use client";
import { ReactNode } from "react";

const Div = ({
  id,
  className,
  children,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onStyle,
  ref,
  onClick,
}: {
  id?: string;
  className: string;
  onMouseDown?: React.ReactEventHandler;
  onMouseMove?: React.ReactEventHandler;
  onMouseUp?: React.ReactEventHandler;
  children: ReactNode;
  onStyle?: any;
  ref?: any;
  onClick?: React.ReactEventHandler;
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
