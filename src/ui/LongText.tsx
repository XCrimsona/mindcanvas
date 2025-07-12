"use client";
import { ReactNode } from "react";

interface LongTextProps {
  className: string;
  children: ReactNode;
  onDoubleClick?: () => void;
  onClick?: React.ReactEventHandler;
  onChange?: React.ReactEventHandler;
}
const LongText = ({
  className,
  children,
  onClick,
  onDoubleClick,
}: LongTextProps) => {
  return (
    <p className={className} onDoubleClick={onDoubleClick}>
      {children}
    </p>
  );
};

export default LongText;
