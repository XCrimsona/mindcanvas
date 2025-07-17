"use client";
import LongText from "@/src/ui/LongText";
//text input unit. Not the output styling
import TextfieldStyling from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/text.module.scss";
// import compHubDataComponents from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspaceHub/comp-hub-data-components.module.scss";
import React from "react";
import { useModificationUseState } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/DataModificationWindowContextProvider";
import Div from "@/src/ui/Div";
import style from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/absolute-data-components/text-data-styling.module.scss";
export const ImmutableText = ({ data }: { data: any }) => {
  const {
    modificationToggleState,
    ModificationWindow,
    toggleModificationState,
  } = useModificationUseState();

  return (
    <Div className={style["textarea-live-text-wrapper"]}>
      <LongText
        onDoubleClick={() => {
          toggleModificationState();
        }}
        className={style["textarea-live-text"]}
      >
        {data.text}
      </LongText>
      {modificationToggleState && <ModificationWindow data={data} />}
    </Div>
  );
};

export const MutableText = ({ data }: any) => {
  return (
    <textarea
      className={TextfieldStyling["textarea"]}
      value={data.text}
      minLength={1}
      maxLength={10000}
    />
  );
};
