"use client";
import Header from "@/src/components/Header";
import Div from "@/src/ui/Div";
// import { useState } from "react";
import { useParams } from "next/navigation";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import authHeader from "@/app/style-files/auth-workspaceheader.module.scss";
import SVG from "@/src/SVG";

const AuthHeader = () => {
  const params = useParams<{ accountid: string }>();
  return (
    <Header id="auth-header" className={authHeader["auth-header"]}>
      <Div className={authHeader["auth-route"]}>
        <RouteLink
          href={`/account/${params.accountid}/dashboard/workspace-management`}
          className={authHeader["auth-go-back-route"]}
        >
          Workspace Dashboard
          <i className={authHeader["auth-route-icon"]}>
            <SVG
              src={"/backwards-solid.svg"}
              className={authHeader["backward-icon"]}
              alt="backward-icon"
            />
          </i>
        </RouteLink>
      </Div>
    </Header>
  );
};

export default AuthHeader;
