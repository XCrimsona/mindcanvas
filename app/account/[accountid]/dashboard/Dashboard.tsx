"use client";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import { useParams } from "next/navigation";
import dashboardStyling from "@/app/style-files/dashboard.module.scss";
import Footer from "@/src/components/Footer";
import ShortText from "@/src/ui/ShortText";

const Dashboard = () => {
  const params = useParams<{ accountid: string }>();
  const accountDashboardLinkData: any = [
    {
      routeData: {
        route: "/account-info",
        text: "Account Info",
      },
    },
    {
      routeData: {
        route: "/workspace-management",
        text: "Data Management",
      },
    },
  ];

  return (
    <>
      <Div className={dashboardStyling["account-dashboard-content"]}>
        <HeadingOne
          id="heading-one"
          className={dashboardStyling["heading-one"]}
        >
          Account Dashboard
        </HeadingOne>
        {accountDashboardLinkData.map(
          (linkDataComponent: any, index: number) => {
            return (
              <Div
                key={index}
                className={`${dashboardStyling["dashboard-link-component"]}`}
              >
                <RouteLink
                  className={
                    dashboardStyling["auth-link-component-built-in-app"]
                  }
                  href={`/account/${params.accountid}/dashboard${linkDataComponent.routeData.route}`}
                >
                  {linkDataComponent.routeData.text}
                </RouteLink>
              </Div>
            );
          }
        )}
      </Div>
      <Footer
        id="dashboard-footer"
        className={dashboardStyling["dashboard-footer"]}
      >
        <Div className={dashboardStyling["project-creator"]}>
          <ShortText className={dashboardStyling["creator"]}>
            Created by Christeen Fabian
          </ShortText>
        </Div>
      </Footer>
    </>
  );
};

export default Dashboard;
