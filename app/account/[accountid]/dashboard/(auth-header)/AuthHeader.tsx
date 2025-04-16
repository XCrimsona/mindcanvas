"use client";
import Header from "@/src/components/Header";
import Div from "@/src/ui/Div";
// import { useState } from "react";
import { useParams } from "next/navigation";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import authHeader from "@/app/account/[accountid]/dashboard/(auth-header)/auth-header.module.scss";
import SVG from "@/src/SVG";

const AuthHeader = () => {
  const params = useParams<{ accountid: string }>();
  // const [sideBarState, setSideBarState] = useState<Boolean>(false);
  // const handleSideBarState = () => {
  //   setSideBarState(!sideBarState);
  // };

  return (
    <Header id="auth-header" className={authHeader["auth-header"]}>
      <Div className={authHeader["auth-route"]}>
        <RouteLink
          href={`/account/${params.accountid}/dashboard`}
          className={authHeader["auth-go-back-route"]}
        >
          Back
          <i className={authHeader["auth-route-icon"]}>
            {/* color of icons will chagen depending on the theme chosen later on */}
            <SVG
              src={
                "https://res.cloudinary.com/djjvj73xa/image/upload/v1744795920/house-white-solid_tcuyij.svg"
              }
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
