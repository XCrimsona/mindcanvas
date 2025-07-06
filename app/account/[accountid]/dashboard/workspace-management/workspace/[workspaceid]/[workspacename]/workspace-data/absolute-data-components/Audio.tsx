"use client";
import Div from "@/src/ui/Div";
import React from "react";
// import workspaceDataManagement from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-workspace-management.module.scss";
import LongText from "@/src/ui/LongText";

export const ImmutableAudio = ({ data }: any) => {
  return (
    <Div className={"audio-info"}>
      <LongText className={"audio-name"}>{data.name}</LongText>
      <audio src={data.audio.src} className={"audio"} />
    </Div>
    // </Div>
  );
};

// export const MutableAudio = ({ data }: any) => {
//   return (
//     <Div className={"audio-info"]}>
//       <LongText className={"audio-name"]}>
//         {data.name}
//       </LongText>
//       <audio src className={"audio"]} translate={"yes"} />
//     </Div>
//     // </Div>
//   );
// };
