import { TextFragment } from "../../../../../../ui/LongText";

//text input unit. Not the output styling
import "../../DataComponents/text/text.css";
import { useModificationContext } from "../../modify-data/InfoModificationContextProvider";
import { DivClass } from "../../../../../../ui/Div";
import "./text-data-styling.css";
import { EditWindow } from "../../modify-data/EditWindow";
import { ModificationWindow } from "../../modify-data/ModificationWindow";
import "../i-note.css";
import { SpanFragment } from "../../../../../../ui/spanElement";
export const Text = ({ data }: { data: any }) => {
  //extract _id from data object
  const { _id } = data;

  const { modificationState, selectedComp, editState, mouseDoubleClick } =
    useModificationContext();
  return (
    <>
      {/* UI code implementation works in reverse but the css still displays 
      the context on the right next to the live data which is correct */}
      {modificationState && selectedComp === _id && (
        <ModificationWindow componentData={data} />
      )}
      {editState && selectedComp === _id && <EditWindow componentData={data} />}
      <DivClass className={"text-fragment-container"}>
        <TextFragment id={`${data._id}`} className={"text-fragment"}>
          <SpanFragment
            id={`${data._id}`}
            onClick={mouseDoubleClick}
            className="i-note-drop-down"
          >
            i
          </SpanFragment>
          {data.text}
        </TextFragment>
      </DivClass>
    </>
  );
};
