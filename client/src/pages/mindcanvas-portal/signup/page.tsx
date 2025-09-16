import { useEffect } from "react";
import { DivClass } from "../../../../src/ui/Div";
import "../../../../src/style-files/auth.css";
import Signup from "./Signup";

// export const metadata: Metadata = {
//   description:
//   "Need a serious work environment upgrade? Workspace Manager provides a powerful tool to help you streamline your workflow.",
//   robots: "noindex, nofollow",
//   alternates: {
//     canonical: "",
//   },
//   icons: {
//     icon: "favicon.ico",
//   },
// };

const SignUpPage = () => {
  //wake up the DB ops for incoming requests
  const signUpInit = async () => {
    await fetch("http://localhost:3000/api/signup-portal");
  };
  useEffect(() => {
    document.title = "Signup Page";
    signUpInit();
  }, []);

  return (
    <DivClass className={"sign-up-page"}>
      <Signup />
    </DivClass>
  );
};

export default SignUpPage;
