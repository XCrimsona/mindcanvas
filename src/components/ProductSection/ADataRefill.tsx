"use client";
import Link from "next/link";
import { ReactNode } from "react";

export const ARefill = ({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};
