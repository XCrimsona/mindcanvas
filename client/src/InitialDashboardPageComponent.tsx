import { DivClass } from "./ui/Div";
import DataManagement from "./DataManagement";
import AuthHeader from "../auth/auth-partials/AuthHeader";
import "./style-files/management.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InitialDashboardPageComponent = () => {
  const [canvaData, setCanvaData] = useState<any>({});

  const { userid } = useParams();
  const fetchEssentialData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/account/${userid}/canvas-management`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setCanvaData(data);
      // console.log("frontend dashboard initial user data: ", data);
    } else {
      const issue = await response.json();
      console.log("frontend dashboard initial: ", issue);
    }
  };

  useEffect(() => {
    document.title = "Canva Management | MindCanvas";
    fetchEssentialData();
  }, []);

  return (
    <DivClass className={"main-workspace-management-container"}>
      <AuthHeader />
      <DataManagement source={canvaData} />
    </DivClass>
  );
};

export default InitialDashboardPageComponent;
