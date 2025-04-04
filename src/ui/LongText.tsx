"use client";
import { ReactNode } from "react";

interface LongTextProps {
  className: string;
  children: ReactNode;
}
const LongText = ({ className, children }: LongTextProps) => {
  return <p className={className}>{children}</p>;
};

export default LongText;
