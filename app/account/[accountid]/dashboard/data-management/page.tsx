import Div from "@/src/ui/Div";
import DataManagement from "./Management";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../(auth-header)/AuthHeader";
import management from "@/app/account/[accountid]/dashboard/data-management/(css)/management.module.scss";
import LongText from "@/src/ui/LongText";
import { NextResponse } from "next/server";

//declare data fetch here

const fetchSheetData = async (accountid: string) => {
  const response = await fetch(
    `http://localhost:3000/api/account/${accountid}/dashboard/data-management`
  );
  if (response.ok) {
    return await response.json();

    // const userId = await response.json();

    // console.log("userId: ", userId);
    // const sheetData = await fetch(
    //   `http://localhost:3000/api/account/${userId.data._id}/dashboard/data-management/sheet/[sheetid]/[sheetname]/`
    // );
    // if (sheetData.ok) {
    //   const sheetdata = await sheetData.json();
    //   console.log("sheet Data: ", "Failed to retrive sheet data");
    //   return sheetdata;
    // } else {
    //   console.log("Failed to retrive sheet data");
    //   return new NextResponse(
    //     JSON.stringify({ error: "Failed to retrieve sheet data" }),
    //     { status: 404 }
    //   );
    // }
  } else {
    console.log("Failed to retrieve accountid");
    return new NextResponse(
      JSON.stringify({ error: "Failed to retrieve accountid" }),
      { status: 404 }
    );
  }
};

const Page = async ({ params }: any) => {
  //invoke fetch here
  //data will be sent to the backend from here
  const { accountid } = await params;

  const info = await fetchSheetData(String(accountid));
  // console.log(info);

  return (
    <Div className={management["account-data-management"]}>
      <AuthHeader />

      <HeadingOne id="heading-one" className={management["heading-one"]}>
        White Board Data Management
      </HeadingOne>
      <LongText className={management["paragraph"]}>
        Your workspace of creativity, organization and automating space and work
        flow efficiency. No Limitations!
      </LongText>
      <LongText className={management["paragraph"]}>
        Right click for options and explore the power. If running short or
        finding it hard. You&pos;ll find the ? mark at the top middle to help
        you with your questions
      </LongText>
      {/* pass fetch down here*/}
      <DataManagement params={info} />
    </Div>
  );
};

export default Page;
