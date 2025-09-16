import Header from "../src/components/Header";
import Div from "../src/ui/Div";
import dashboardStyling from "../app/style-files/dashboard.module.scss";

import { useParams } from "next/navigation";
import RouteLink from "../src/components/ProductSection/RouteLink";
import authHeader from "../app/style-files/auth-header.module.scss";
import SVG from "../src/SVG";
import HeadingTwo from "../src/ui/HeadingTwo";

const AuthHeader = ({ params }: { params: any }) => {
  const param = useParams<{ accountid: string }>();
  const accountDashboardLinkData: any = [
    {
      routeData: {
        route: "account-info",
        text: "Account Info",
      },
    },
  ];
  return (
    <Header id="auth-header" className={authHeader["auth-header"]}>
      <Div className={authHeader["auth-route"]}>
        <RouteLink
          href={`/account/${params.accountid}/canvas-management`}
          className={authHeader["auth-go-back-route"]}
        >
          Back
          <i className={authHeader["auth-route-icon"]}>
            {/* color of icons will chagen depending on the theme chosen later on */}
            <SVG
              src={"/house-white-solid.svg"}
              className={authHeader["backward-icon"]}
              alt="backward-icon"
            />
          </i>
        </RouteLink>
      </Div>
      <Div className={dashboardStyling["account-dashboard-content"]}>
        <HeadingTwo
          id="heading-one"
          className={dashboardStyling["heading-one"]}
        >
          Account Dashboard
        </HeadingTwo>
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
                  href={`/account/${param.accountid}/${linkDataComponent.routeData.route}`}
                >
                  {linkDataComponent.routeData.text}
                </RouteLink>
              </Div>
            );
          }
        )}
      </Div>
    </Header>
  );
};

export default AuthHeader;
