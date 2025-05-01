import Div from "@/src/ui/Div";
import DataManagement from "./Management";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../(auth-header)/AuthHeader";
import management from "@/app/account/[accountid]/dashboard/data-management/(css)/management.module.scss";
import { NextResponse } from "next/server";
import AuthFooter from "../(auth-footer)/AuthFooter";

const fetchSheetData = async (accountid: string) => {
  const response = await fetch(
    `http://localhost:3000/api/account/${accountid}/dashboard/data-management`
  );
  if (response.ok) {
    return await response.json();
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Failed to retrieve accountid" }),
      { status: 404 }
    );
  }
};

const Page = async ({ params }: any) => {
  const { accountid } = await params;
  const info = await fetchSheetData(String(accountid));

  return (
    <Div className={management["main-data-management-container"]}>
      <AuthHeader />
      <Div className={management["heading-container"]}>
        <HeadingOne id="heading-one" className={management["heading-one"]}>
          White Board Data Management
        </HeadingOne>
      </Div>
      {/* pass fetch down here*/}

      <DataManagement params={info} />
      <AuthFooter />
    </Div>
  );
};

export default Page;
