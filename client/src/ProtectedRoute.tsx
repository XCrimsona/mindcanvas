import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth-check", {
      method: "GET",
      credentials: "include", //allow cookies to be sent
    })
      .then((response: any) => response.json())
      .then((data) => {
        if (data.code === "AUTHENTICATED") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          new Notification("Verify Your Identity", {
            body: "You either logged out or your session expired, log in again to continue...",
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setIsLoading(false);
      });
  }, []);

  if (isloading) return <div>...loading</div>;
  if (!isAuth) return <Navigate to={"/signin-portal"} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
