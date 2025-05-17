"use client";
import Div from "@/src/ui/Div";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import { useDataScrollBoardRef } from "./DataScrollBoardRef";
import TextInputUnit from "./DataComponents/text/TextInputUnit";
import { TextContextProvider } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/text/TextContextProvider";
import { useWorkspaceSizeContext } from "./DataComponents/WorkspaceControlsProvider/WorkspaceSizeContextProvider";
const DataContainer = ({ params }: any) => {
  // const { textComponentDisplayState } = useTextComponentDisplayState();
  const dataScrollBoard = useDataScrollBoardRef();
  console.log("dataScrollBoard: ", dataScrollBoard);

  const { workspaceHeight, workspaceWidth } = useWorkspaceSizeContext();
  console.log("workspaceHeight: ", workspaceHeight);
  console.log("workspaceWidth: ", workspaceWidth);

  //save selected data component to latest x y coordindates
  const updateDataComponentPosition = async () => {
    //requires a dedicated object to check if selected component has newly updated coordinates
    const updateResponse = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management/workspace/${params.workspaceid}/${params.workspacename}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({position:{x,y}}),
      }
    );
  };

  // const data: any = ["hana", "dull", "set"];
  return (
    <Div className={workspaceDataManagement["data-container"]}>
      <Div
        className={workspaceDataManagement["data-scroll-board"]}
        //dataScrollBoardRef
        ref={dataScrollBoard}
        onStyle={{
          width: `${workspaceWidth}px`,
          height: `${workspaceHeight}px`,
          transition: "height .2s ease-in-out, width .2s ease-in-out",
        }}
      >
        {/* Appears as tsx text form input when textToggleState is set to true */}
        <TextContextProvider>
          <TextInputUnit params={params} />
        </TextContextProvider>

        {/* append data to the UI when thetComponent's display boolean state is true*/}
      </Div>
    </Div>
  );
};

export default DataContainer;

// interface ITextComponent {
//   id: string;
//   text: string;
//   position: { x: number; y: number };
// }
{
  /* db mapped user workspace data will be implemented below */
}
{
  /*data.map((dataItem: any) => {
          return (
            <Div
              ref={"map id for precise findings"}
              className={workspaceDataManagement["dynamic-data-container"]}
            >
              <p>{dataItem}</p>
            </Div>
          );
        })*/
}

{
  /* <Div
          className={workspaceDataManagement["data-element"]}
          // onMouseDown={compHubDataElementMouseDownEvent}
          // ref={boxRef}
          onStyle={{
            position: "absolute",
            top: "0px",
            left: "0px",
            color: "#fff",
            // transform: `translate(${posRef.current.x}px,${posRef.current.y}px)`,
          }}
        > */
}
{
  /* temp data */
}
{
  /* <p
            className={workspaceDataManagement["p-tag"]}
            style={{ width: "170px", height: "150px" }}
          >
            Workspace with data component drag,drop,keyboard, and behind the
            scenes animation capabilities
          </p> 
        </Div>
          */
}
