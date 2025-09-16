import LongText from "../src/ui/LongText";
//text input unit. Not the output styling
import TextfieldStyling from "../app/style-files/text.module.scss";
import React, { useState } from "react";
import { useModificationContext } from "../app/account/[accountid]/canvas-management/[canvasid]/modify-data/InfoModificationContextProvider";
import Div from "../src/ui/Div";
import style from "../app/style-files/text-data-styling.module.scss";
import { EditWindow } from "../modify-data/EditWindow";
import { ModificationWindow } from "../modify-data/ModificationWindow";
export const ImmutableText = ({ data }: { data: any }) => {
  const { modificationState, selectedComp, mouseDoubleClick } =
    useModificationContext();

  const { editState } = useModificationContext();
  //extract _id from data object
  const { _id } = data;
  // console.log("data from Text TSX: ", data);

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
        <ModificationWindow componentData={data} />
      )}
      {editState && selectedComp === _id && <EditWindow componentData={data} />}
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
