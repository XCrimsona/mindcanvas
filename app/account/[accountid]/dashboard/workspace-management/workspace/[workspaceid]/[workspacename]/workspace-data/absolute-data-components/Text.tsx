"use client";
import LongText from "@/src/ui/LongText";
//text input unit. Not the output styling
import TextfieldStyling from "@/app/style-files/text.module.scss";
import React, { useState } from "react";
import { useModificationUseState } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/workspace-data/InfoModificationContextProvider";
import Div from "@/src/ui/Div";
import style from "@/app/style-files/text-data-styling.module.scss";
export const ImmutableText = ({ data }: { data: any }) => {
  const {
    modificationState,
    ModificationWindow,
    selectedComp,
    mouseDoubleClick,
  } = useModificationUseState();

  const { editState, EditWindow } = useModificationUseState();
  //extract _id from data object
  const { _id } = data;

  return (
    <Div className={style["textarea-live-text-wrapper"]}>
      <LongText
        id={`${data._id}`}
        onDoubleClick={mouseDoubleClick}
        className={style["textarea-live-text"]}
      >
        {data.text}
      </LongText>
      {modificationState && selectedComp === _id && (
        <ModificationWindow data={data} />
      )}
      {editState && selectedComp === _id && <EditWindow data={data} />}
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
