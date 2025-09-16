import { DivClass } from "../../../../src/ui/Div";
import Signin from "./Signin";
import "../../../style-files/auth.css";
import { useEffect } from "react";

const SignInPage = () => {
  //wake up the DB ops for incoming requests
  const signInInit = async () => {
    await fetch("http://localhost:3000/api/signin-portal");
  };

  useEffect(() => {
    document.title = "Signin Page";
    signInInit();
  }, []);

  return (
    <DivClass className={"sign-in-page"}>
      {/* <div>SinginPage</div> */}
      <Signin />
    </DivClass>
  );
};

export default SignInPage;
