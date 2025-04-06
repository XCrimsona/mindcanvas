"use client";
import Link from "next/link";
import { ReactNode } from "react";

const RouteLink = ({
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

export default RouteLink;
