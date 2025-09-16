import Footer from "../../src/components/Footer";
import Div from "../../src/ui/Div";
import ShortText from "../../src/ui/ShortText";
import authFooter from "/app/style-files/auth-footer.module.scss";
const AuthFooter = () => {
  return (
    <Footer id="auth-footer" className={authFooter["auth-footer"]}>
      <Div className={authFooter["creator"]}>
        <ShortText className={authFooter["project-creator"]}>
          Created by Christeen Fabian | The Code Hashira
        </ShortText>
      </Div>
    </Footer>
  );
};

export default AuthFooter;
