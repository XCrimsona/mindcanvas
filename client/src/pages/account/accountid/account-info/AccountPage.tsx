import { DivClass } from "../../../../ui/Div";
import Info from "./Info";
import "./info.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Account Info",
//   description: "Read and modify you data safely",
// };

const AccountPage = () => {
  const { userid } = useParams();
  const [accountData, setAccountData] = useState<{}>({});
  const fetchUserInfo = async () => {
    const response: any = await fetch(
      `http://localhost:5000/api/account/${userid}/account-info`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const resData: any = await response.json();
      setAccountData(resData);
    } else {
      console.warn("Failed to retrieve, try again in 3 minutes");
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  console.log("accountData: ", accountData);

  return (
    <DivClass className={"account-info"}>
      <Info params={accountData} />
    </DivClass>
  );
};

export default AccountPage;
