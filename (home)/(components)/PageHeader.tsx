"use client";
import Header from "@/src/components/Header";
import CustomNavLink from "@/src/components/nav/Nav-Link";
import { useState } from "react";
import Div from "@/src/ui/Div";
import { useParams } from "next/navigation";
const PageHeader = () => {
  const params = useParams<{ accountid: string }>();
  const [sideBarState, setSideBarState] = useState<Boolean>(false);
  const handleSideBarState = () => {
    setSideBarState(!sideBarState);
  };
  const globalAuthedNavList: any = [
    {
      routeData: {
        route: "/account-info",
        text: "Account Info",
      },
    },
    {
      routeData: {
        route: "/account-analysis",
        text: "Content Analysis",
      },
    },
    {
      routeData: {
        route: "/data-management",
        text: "Data Management",
      },
    },
    {
      routeData: {
        route: "/image-editing",
        text: "Image Editing",
      },
    },
    {
      routeData: {
        route: "/account-fitness-tracking",
        text: "Fitness Tracking",
      },
    },
    { routeData: { route: "/planner", text: "Planner" } },
  ];
  return (
    <Header id="home-header" className="home-header">
      <Div className="nav-list">
        {globalAuthedNavList.map((routeItem: any, index: number) => {
          return (
            <CustomNavLink
              id={"list-item"}
              className="list-item"
              navigateTo={`/account/${params.accountid}/dashboard${routeItem.routeData.route}`}
              key={index}
            >
              {routeItem.routeData.text}
            </CustomNavLink>
          );
        })}
      </Div>
    </Header>
  );
};

export default PageHeader;
