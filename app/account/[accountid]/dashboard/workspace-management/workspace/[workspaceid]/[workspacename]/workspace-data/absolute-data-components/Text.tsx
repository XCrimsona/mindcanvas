"use client";
import LongText from "@/src/ui/LongText";
import TextStyling from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/text-data-styling.module.scss";
// import compHubDataComponents from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/comp-hub-data-components.module.scss";
import React from "react";

export const ImmutableText = ({ data }: any) => {
  return (
    <LongText
      onDoubleClick={() => {
        console.log(data);
      }}
      className={TextStyling["textarea-live-text"]}
    >
      {data.text}
    </LongText>
  );
};

export const MutableText = ({ data }: any) => {
  return (
    <textarea
      className={"textarea"}
      value={data.text}
      minLength={1}
      maxLength={10000}
    />
  );
};
