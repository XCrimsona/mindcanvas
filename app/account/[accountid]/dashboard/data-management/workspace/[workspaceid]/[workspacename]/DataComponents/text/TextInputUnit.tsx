"use client";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import React, { useState } from "react";
import Button from "@/src/components/form-elements/Button";
import Div from "@/src/ui/Div";
import {
  // MassInputDisabledText,
  MassInputEnabledText,
  MassInputEnabledTextArea,
} from "@/src/components/mass-workspace-elements/MassWorkspaceInputComponents";
import Label from "@/src/components/form-elements/Label";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";
import Select from "@/src/ui/selection/Select";

const TextInputUnit = ({ params }: any) => {
  //activates text input form
  const {
    dataScrollBoardRef,
    textInputOffSet,
    globalDraggingRef,
    textInputCompPosRef,
    textInputCompRef,
    textToggleState,
    updateWorkspaceData,
  } = useWorkspaceContext();

  // const { newTextComponent, setNewTextComponent } = useNewTextComponent();
  const [newTextComponent, setNewTextComponent] = useState<any>({
    text: "",
  });

  const [selectedType, setSelectedType] = useState<string>("text");
  const updateSelectionType = () => {
    setSelectedType((prev) => (prev === "text" ? "list" : "text"));
  };

  //submit text Data
  const textComponentFormData = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const textFormData: any = {};
    if (newTextComponent.text) textFormData.text = newTextComponent.text;
    console.log(newTextComponent.text);

    if (selectedType) textFormData.type = selectedType;
    console.log(newTextComponent.type);

    if (textInputCompPosRef.current.x)
      textFormData.x = textInputCompPosRef.current.x;
    console.log(
      "textInputCompPosRef.current.x: ",
      textInputCompPosRef.current.x
    );
    if (textInputCompPosRef.current.y)
      textFormData.y = textInputCompPosRef.current.y;
    console.log(
      "textInputCompPosRef.current.y: ",
      textInputCompPosRef.current.y
    );

    if (
      !newTextComponent.text
      // !textInputCompPosRef.current.x &&
      // !textInputCompPosRef.current.y
    ) {
      alert("Text Component must be filled with data");
      return;
    } else {
      //test textFormData.text
      console.log("textFormData: ", textFormData.text);
      console.log("textFormData: ", textFormData);

      const text = await fetch(
        `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management/workspace/${params.workspaceid}/${params.workspacename}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(textFormData),
        }
      );
      if (text.ok) {
        //notification ok response
        // alert("Your text data has been saved!");
        updateWorkspaceData();
        setNewTextComponent({
          ...newTextComponent,
          text: "",
        });
      } else {
        //notification failed response
        alert("Failed to save your text data!");
      }
    }
  };

  const processMouseMove = (event: React.MouseEvent) => {
    if (!globalDraggingRef.current || !dataScrollBoardRef.current) return;

    const textInputComp = textInputCompRef.current;
    const textInputCompRect = textInputComp?.getBoundingClientRect();

    //windowRef (dataScrollBoard)
    const dataScrollBoardRect =
      dataScrollBoardRef.current.getBoundingClientRect();

    const mouseX: number = event.clientX - dataScrollBoardRect.left;
    const mouseY: number = event.clientY - dataScrollBoardRect.top;

    let newValueX = mouseX - textInputOffSet.current.x;
    let newValueY = mouseY - textInputOffSet.current.y;

    const maxX = dataScrollBoardRect.width - textInputCompRect!.width;
    const maxY = dataScrollBoardRect.height - textInputCompRect!.height;

    //set boundaries so draggables dont go outside the drag frame
    newValueX = Math.max(0, Math.min(newValueX, maxX));
    newValueY = Math.max(0, Math.min(newValueY, maxY));

    textInputCompPosRef.current = {
      x: newValueX,
      y: newValueY,
    };

    if (textInputComp) {
      textInputComp.style.transform = `translate(${newValueX}px, ${newValueY}px)`;
    }
  };
  const processMouseUp = (event: React.MouseEvent) => {
    globalDraggingRef.current = false;
    document.removeEventListener<any>("mousemove", processMouseMove);
    document.removeEventListener<any>("mouseup", processMouseUp);
    textInputOffSet.current = {
      x: 0,
      y: 0,
    };
  };
  const processMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    globalDraggingRef.current = true;

    // //text input component x y position
    const dataScrollBoardRect = event.currentTarget.getBoundingClientRect();
    textInputOffSet.current = {
      x: event.clientX - dataScrollBoardRect.left,
      y: event.clientY - dataScrollBoardRect.top,
    };
    document.addEventListener<any>("mousemove", processMouseMove);
    document.addEventListener<any>("mouseup", processMouseUp);
  };

  return (
    textToggleState && (
      <Div
        className={workspaceDataManagement["data-text-component"]}
        ref={textInputCompRef}
        onStyle={{
          position: "absolute",
          color: "#fff",
          zIndex: 4,
          transform: `translate(${textInputCompPosRef.current.x}px,${textInputCompPosRef.current.y}px)`,
        }}
        onMouseDown={processMouseDown}
      >
        <form
          className={workspaceDataManagement["text-input-form"]}
          onSubmit={textComponentFormData}
        >
          <Div className={workspaceDataManagement["label-wrapper"]}>
            <Label
              htmlfor="mass-enabled-input-text-field"
              className={
                workspaceDataManagement["text-component-data-input-label"]
              }
              text="Text Input Field"
            />
          </Div>
          <Div className={workspaceDataManagement["text-container"]}>
            <Div className={workspaceDataManagement["text-input-wrapper"]}>
              <MassInputEnabledTextArea
                //   onClick={clickedTextDataComponent}
                id="mass-enabled-input-text-field"
                className={
                  workspaceDataManagement["mass-enabled-input-text-field"]
                }
                placeholder="Type your text data"
                value={newTextComponent.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewTextComponent({
                    ...newTextComponent,
                    text: e.target.value,
                  });
                }}
              />
              <Div className={workspaceDataManagement["btn-container"]}>
                <Div
                  className={
                    workspaceDataManagement["text-submit-btn-container"]
                  }
                >
                  <Button
                    id=""
                    className={workspaceDataManagement["btn-wrapper"]}
                  >
                    SAVE
                  </Button>
                </Div>
                <Div
                  className={workspaceDataManagement["text-selection-wrapper"]}
                >
                  <Select
                    defaultValue="text"
                    id="select-text-type"
                    className={workspaceDataManagement["select-text-type"]}
                    value={selectedType}
                    onChange={updateSelectionType}
                  >
                    <option
                      id="text-type-option-one"
                      className={
                        workspaceDataManagement["text-type-option-one"]
                      }
                      value={"text"}
                    >
                      Text
                    </option>
                    <option
                      id="text-type-option-two"
                      className={
                        workspaceDataManagement["text-type-option-two"]
                      }
                      value={"list"}
                    >
                      List
                    </option>
                  </Select>
                </Div>
              </Div>
            </Div>
          </Div>
        </form>
      </Div>
    )
  );
};

export default TextInputUnit;

// const [newAudioComponent, setNewAudioComponent] = useState<any>({
//   textname: "",
//   textUrl: "",
// });
// const AddAudioComponent = () => {
//   return <Div className={"add-audio-component"}></Div>;
// };

// const [newImageComponent, setsNewImageComponent] = useState<any>({
//   textname: "",
//   textUrl: "",
// });
// const AddImageComponent = () => {
//   return <Div className={"add-image-component"}></Div>;
// };

// const [newVideoComponent, setNewVideoComponent] = useState<any>({
//   tedxt: "",
//   textUrl: "",
// });
// const addVideoComponent = () => {
//   return <Div className={"add-video-component"}></Div>;
// };
//Dynamic Data Components logic ends here
