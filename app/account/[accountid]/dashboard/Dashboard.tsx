"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import { useParams } from "next/navigation";

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
    <>
      <Div className="account-dashboard-content">
        <HeadingOne id="heading-one" className="heading-one">
          Account Dashboard
        </HeadingOne>
        {accountDashboardLinkData.map(
          (linkDataComponent: any, index: number) => {
            return (
              <Div key={index} className={`${index}dashboard-link-component`}>
                <RouteLink
                  className="auth-link-component-built-in-app"
                  href={`/account/${params.accountid}/dashboard${linkDataComponent.routeData.route}`}
                >
                  {linkDataComponent.routeData.text}
                </RouteLink>
              </Div>
            );
          }
        )}
      </Div>
      <PageFooter />
    </>
  );
};

export default Dashboard;
