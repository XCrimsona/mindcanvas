"use client";
import Header from "@/src/components/Header";
import CustomNavLink from "@/src/components/nav/Nav-Link";
import { sideBarState, setSideBarState } from "@/src/components/SidebarState";
import Div from "@/src/ui/Div";
import { ChangeEvent } from "react";

const PageHeader = () => {
  const globalAuthedNavList: string[] = ["Account Info", "Analysis", "", ""];
  const handleSideBarState = (e: ChangeEvent) => {
    setSideBarState(!sideBarState);
  };
  return (
    <Header id="home-header" className="home-header">
      <Div className="nav-list">
        {globalAuthedNavList.map((listItem: string, key: number) => {
          return (
            <CustomNavLink
              id={"list-item"}
              className="list-item"
              navigateTo="/dashboard"
              key={key}
            >
              {listItem}
            </CustomNavLink>
          );
        })}
      </Div>
    </Header>
  );
};

export default PageHeader;
