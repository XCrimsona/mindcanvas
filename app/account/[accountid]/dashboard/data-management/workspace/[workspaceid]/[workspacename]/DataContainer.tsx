"use client";
import Div from "@/src/ui/Div";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import TextInputUnit from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/text/TextInputUnit";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";
import WorkspaceData from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data/WorkspaceData";
const DataContainer = ({ params }: any) => {
  // const { textComponentDisplayState } = useTextComponentDisplayState();

  const { dataScrollBoardRef, workspaceHeight, workspaceWidth } =
    useWorkspaceContext();

  //save selected data component to latest x y coordindates
  // const updateDataComponentPosition = async () => {
  //   //requires a dedicated object to check if selected component has newly updated coordinates
  //   const updateResponse = await fetch(
  //     `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management/workspace/${params.workspaceid}/${params.workspacename}`,
  //     {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  // body: JSON.stringify({position:{x,y}}),
  //     }
  //   );
  // };

  return (
    <Div className={workspaceDataManagement["data-container"]}>
      <Div
        className={workspaceDataManagement["data-scroll-board"]}
        //dataScrollBoardRef as windowRef
        ref={dataScrollBoardRef}
        onStyle={{
          width: `${workspaceWidth}px`,
          height: `${workspaceHeight}px`,
          transition: "height .2s ease-in-out, width .2s ease-in-out",
        }}
      >
        {/* Appears as tsx text form input when textToggleState is set to true */}
        <TextInputUnit params={params} />
        <WorkspaceData />
        {/* append data to the UI when thetComponent's display boolean state is true*/}
      </Div>
    </Div>
  );
};

export default DataContainer;
