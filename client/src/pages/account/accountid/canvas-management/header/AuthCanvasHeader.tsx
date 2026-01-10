import Header from "../../../../../components/Header";
import { DivClass } from "../../../../../ui/Div";
import { useParams } from "react-router-dom";
import RouteLink from "../../../../../components/ProductSection/RouteLink";
import "./auth-workspaceheader.css";
import SVG from "../../../../../SVG";
import { useAuthLogout } from "../../logout/logoutContext";

const AuthCanvasHeader = () => {
  const { userid } = useParams();
  const { logout } = useAuthLogout();
  if (!userid) return;

  return (
    <Header id="auth-canva-header" className={"auth-canva-header"}>
      <DivClass className={"auth-canva-route"}>
        <RouteLink
          href={`/account/${userid}/canvas-management`}
          className={"auth-go-back-route"}
        >
          <i className={"auth-route-icon"}>
            <SVG
              src={"/backwards-solid.svg"}
              className={"canva-management-backward-arrow-nav-icon"}
              alt="backward-icon"
            />
          </i>
          Canvas Management
        </RouteLink>
        <div onClick={logout} className="log-out">
          Log out
        </div>
      </DivClass>
    </Header>
  );
};

export default AuthCanvasHeader;
