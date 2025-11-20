import {
  InputDisabledText,
  InputEnabledText,
  InputSubmit,
} from "../../../../../../components/form-elements/InputTypeInterfaces";
import { DivClass } from "../../../../../../ui/Div";
import "./canva-controls.css";
import { LongText } from "../../../../../../ui/LongText";
import { useCanvasContext } from "../../DataComponents/canva-data-provider/CanvasDataContextProvider";
import { useState } from "react";
import { useParams } from "react-router-dom";

//Dynamic canvas width and height
const CanvasSizeControls = () => {
  try {
    const {
      canvasHeight,
      canvasWidth,
      updateDataBoardCanvasHeight,
      updateDataBoardCanvasWidth,
      toggleCanvasSizePropertiesState,
      canvasSizePropertiesToggleState,
    } = useCanvasContext();

    //these two are the cause of bad call state
    // updateDataBoardCanvasHeight("900");
    // updateDataBoardCanvasWidth("1200");
    const [updatedHeight, setUpdatedHeight] = useState<string>("");
    const [updatedWidth, setUpdatedWidth] = useState<string>("");
    const { userid, canvaid } = useParams();

    const sendcanvasPropertyUpdate = async () => {
      if (!updatedHeight || !updatedWidth) {
        alert("Something is broken...");
        return;
      } else {
        const newData: any = {};
        if (updatedHeight) newData.newHeight = updatedHeight;
        if (updatedWidth) newData.newWidth = updatedWidth;
        const response = await fetch(
          `http://localhost:5000/api/account/${userid}/canvas-management/${canvaid}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );
        if (response.ok) {
          alert("canvas properties updated.");
        } else {
          alert("canvas properties NOT updated.");
        }
      }
    };
    return (
      <form
        className={"canvas-size-controls"}
        onSubmit={(e) => {
          e.preventDefault();
          if (!canvasHeight || !canvasWidth) {
            alert("Complete the canvas size fields");
            return;
          } else {
            sendcanvasPropertyUpdate();
          }
          // save width and height to db
          // use comm notification lib to communicate
        }}
      >
        {/* make height and width editable and immutable */}
        <DivClass className={"height-container"}>
          {canvasSizePropertiesToggleState ? (
            <>
              <span>Height:</span>
              <InputEnabledText
                id="mutable-height"
                className={"mutable-height"}
                value={canvasHeight ? canvasHeight : ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  updateDataBoardCanvasHeight(event.target.value);
                  setUpdatedHeight(event.target.value);
                }}
                placeholder="Update height"
              />
            </>
          ) : (
            <>
              <span>Height:</span>
              <InputDisabledText
                id="immutable-height"
                className={"immutable-height"}
                value={canvasHeight ? canvasHeight : "No DB height"}
              />
            </>
          )}
        </DivClass>
        <DivClass className={"width-container"}>
          {canvasSizePropertiesToggleState ? (
            <>
              <span>Width:</span>
              <InputEnabledText
                id="mutable-width"
                className={"mutable-width"}
                value={canvasWidth ? canvasWidth : ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.preventDefault();
                  updateDataBoardCanvasWidth(event.target.value);
                  setUpdatedWidth(event.target.value);
                }}
                placeholder="Update width"
              />
            </>
          ) : (
            <>
              <span>Width:</span>
              <InputDisabledText
                id="immutable-width"
                className={"immutable-width"}
                value={canvasWidth ? canvasWidth : "No DB width"}
              />
            </>
          )}
        </DivClass>
        <DivClass className={"toggle-visual-ops-wrapper"}>
          <div
            id="toggle-visual-ops"
            className={"toggle-visual-ops"}
            onClick={(e) => {
              e.preventDefault();
              toggleCanvasSizePropertiesState(canvasSizePropertiesToggleState);
            }}
          >
            {canvasSizePropertiesToggleState
              ? "View Properies"
              : "Edit Properies"}
          </div>
        </DivClass>
        <DivClass className={"update-spacing-btn-wrapper"}>
          <InputSubmit
            id="update"
            className={"update-spacing-btn"}
            value="Update"
          />
        </DivClass>
        <LongText className={"canvas-controls-text"}>
          canvas Size Properties
        </LongText>
      </form>
    );
  } catch (err: any) {
    console.warn(
      "Something went wrong inside canvasSizeControls: ",
      err.message
    );
  }
};

export default CanvasSizeControls;

//update height and width for entire canvas
// const updatecanvasSizeProperties = async (
//   e: React.FormEvent<HTMLInputElement>
// ) => {
//   e.preventDefault();
//   const canvasSizeData: any = {};
//   if (canvasHeight) canvasSizeData.height = canvasHeight;
//   if (canvasWidth) canvasSizeData.width = canvasWidth;
//   if (!canvasSizeData.height || !canvasSizeData.width) {
//     alert("Please fill the canvas size property fields!");
//     return;
//   } else {
// const text = await fetch(
//   `http://localhost:3000/api/account/${source.accountid}/dashboard/canvas-management/canvas/${source.canvasid}/${source.canvasname}`,
//   {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(canvasSizeData),
//   }
// );
//   if (text.ok) {
//     //notification ok response
//     alert("Your text data has been saved!");
//   } else {
//     //notification failed response
//     alert("Failed to save your text data!");
//   }
// }
// console.log("demo ok");
