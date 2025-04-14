"use client";
import Header from "@/src/components/Header";
import CustomNavLink from "@/src/components/nav/Nav-Link";
import { useState } from "react";
import Div from "@/src/ui/Div";
import { useParams } from "next/navigation";
import RouteLink from "@/src/components/ProductSection/RouteLink";
const PageHeader = () => {
  const params = useParams<{ accountid: string }>();
  const [sideBarState, setSideBarState] = useState<Boolean>(false);
  const handleSideBarState = () => {
    setSideBarState(!sideBarState);
  };

  return (
    <Header id="home-header" className="home-header">
      {/* <Div className="nav-list"> */}
      {/* <RouteLink href={"/account"} className="">Back</RouteLink> */}
      {/* </Div> */}
      incomplete header
    </Header>
  );
};

export default PageHeader;
