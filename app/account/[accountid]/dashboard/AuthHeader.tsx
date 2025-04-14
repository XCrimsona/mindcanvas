"use client";
import Header from "@/src/components/Header";
import Div from "@/src/ui/Div";
// import { useState } from "react";
import { useParams } from "next/navigation";
import RouteLink from "@/src/components/ProductSection/RouteLink";
const AuthHeader = () => {
  const params = useParams<{ accountid: string }>();
  // const [sideBarState, setSideBarState] = useState<Boolean>(false);
  // const handleSideBarState = () => {
  //   setSideBarState(!sideBarState);
  // };

  return (
    <Header id="home-header" className="home-header">
      <Div className="auth-nav">
        <RouteLink
          href={`/account/${params.accountid}/dashboard`}
          className="auth-go-back-route"
        >
          Back
        </RouteLink>
      </Div>
    </Header>
  );
};

export default AuthHeader;
