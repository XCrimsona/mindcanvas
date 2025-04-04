"use client";
import Link from "next/link";
import NavLinkProps from "./Nav-Link-Interface";

const CustomNavLink = ({
  id,
  className,
  navigateTo,
  children,
}: NavLinkProps) => {
  return (
    <Link id={id} className={className} href={navigateTo}>
      {children}
    </Link>
  );
};

export default CustomNavLink;
