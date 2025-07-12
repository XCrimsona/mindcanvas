"use client";
import React, { useState } from "react";
import Button from "@/src/components/form-elements/Button";
import Div from "@/src/ui/Div";
import { EnabledTextAreaInput } from "@/src/components/mass-workspace-elements/MassWorkspaceInputComponents";
import Label from "@/src/components/form-elements/Label";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import Select from "@/src/ui/selection/Select";
import textStyle from "@/app/account/[accountid]/dashboard/workspace-management/workspace/[workspaceid]/[workspacename]/DataComponents/text.module.scss";
const TextInputUnit = ({ params }: any) => {
  try {
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

    const [selectedType, setSelectedType] = useState<string>("Text");
    const updateTextSelectionType = () => {
      setSelectedType((prev) => (prev === "Text" ? "List" : "Text"));
    };

    //submit text Data
    const textComponentFormData = async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      //Checks if textInputCompPosRef,newTextComponent and selectedType are not null
      const textFormData: any = {};
      if (newTextComponent.text) textFormData.text = newTextComponent.text;
      // console.log(textFormData.text);

      if (selectedType) textFormData.type = selectedType;
      // console.log(textFormData.type);

      if (textInputCompPosRef.current.x >= 0) {
        textFormData.x = textInputCompPosRef.current.x;
        // console.log("textFormData.x: ", textFormData.x);
        // console.log(
        //   "textInputCompPosRef.current.x: ",
        //   textInputCompPosRef.current.x
        // );
      }
      if (textInputCompPosRef.current.y >= 0) {
        textFormData.y = textInputCompPosRef.current.y;
        // console.log("textFormData.y: ", textFormData.y);
        // console.log(
        //   "textInputCompPosRef.current.y: ",
        //   textInputCompPosRef.current.y
        // );
      }

      if (
        !textFormData.text &&
        !textFormData.type &&
        !textFormData.x &&
        !textFormData.y
      ) {
        alert("Text Component must be filled with relevant data");
        return;
      } else {
        // console.log(
        //   "textInputCompPosRef.current.x: ",
        //   typeof textInputCompPosRef.current.x
        // );
        // console.log(
        //   "textInputCompPosRef.current.y: ",
        //   typeof textInputCompPosRef.current.y
        // );
        const text = await fetch(
          `http://localhost:3000/api/account/${params.accountid}/dashboard/workspace-management/workspace/${params.workspaceid}/${params.workspacename}`,
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
          setSelectedType((prev) => (prev === "Text" ? "Text" : "List"));
        } else {
          //notification failed response
          alert("Failed to save your data.");
          return;
        }
      }
    };

    const processTextMouseMove = (event: React.MouseEvent) => {
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
    const processTextMouseUp = () => {
      globalDraggingRef.current = false;
      document.removeEventListener<any>("mousemove", processTextMouseMove);
      document.removeEventListener<any>("mouseup", processTextMouseUp);
      textInputOffSet.current = {
        x: 0,
        y: 0,
      };
    };
    const processTextMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      globalDraggingRef.current = true;

      // //text input component x y position
      const dataScrollBoardRect = event.currentTarget.getBoundingClientRect();
      textInputOffSet.current = {
        x: event.clientX - dataScrollBoardRect.left,
        y: event.clientY - dataScrollBoardRect.top,
      };
      document.addEventListener<any>("mousemove", processTextMouseMove);
      document.addEventListener<any>("mouseup", processTextMouseUp);
    };

    return (
      textToggleState && (
        <Div
          className={textStyle["data-text-component"]}
          ref={textInputCompRef}
          onStyle={{
            position: "absolute",
            color: "#fff",
            zIndex: 4,
            transform: `translate(${textInputCompPosRef.current.x}px,${textInputCompPosRef.current.y}px)`,
          }}
          onMouseDown={processTextMouseDown}
        >
          <form
            className={textStyle["text-input-form"]}
            onSubmit={textComponentFormData}
          >
            <Div className={textStyle["text-label-wrapper"]}>
              {selectedType === "Text" ? (
                <Label
                  htmlfor="enabled-text-input-field"
                  className={textStyle["text-label"]}
                  text="Text Input Field"
                />
              ) : (
                <Label
                  htmlfor="enabled-list-input-field"
                  className={textStyle["list-label"]}
                  text="List Input Field"
                />
              )}
            </Div>
            <Div className={textStyle["text-container"]}>
              <Div className={textStyle["text-input-wrapper"]}>
                {selectedType === "Text" ? (
                  <EnabledTextAreaInput
                    id="enabled-text-input-field"
                    className={textStyle["enabled-text-input-field"]}
                    placeholder="Type your text data"
                    value={newTextComponent.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setNewTextComponent({
                        ...newTextComponent,
                        text: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <EnabledTextAreaInput
                    id="enabled-list-input-field"
                    className={textStyle["enabled-list-input-field"]}
                    placeholder="Don't use - Under construction"
                    value={newTextComponent.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setNewTextComponent({
                        ...newTextComponent,
                        text: e.target.value,
                      });
                    }}
                  />
                )}
                <Div className={textStyle["text-btn-container"]}>
                  <Div className={textStyle["text-submit-btn-container"]}>
                    <Button
                      id="text-btn-submit"
                      className={textStyle["text-btn-submit"]}
                    >
                      SAVE
                    </Button>
                  </Div>
                  <Div className={textStyle["text-selection-wrapper"]}>
                    <Select
                      id="select-text-type"
                      className={textStyle["select-text-type"]}
                      value={selectedType}
                      onChange={updateTextSelectionType}
                    >
                      <option
                        id="text-type-option-one"
                        className={textStyle["text-type-option-one"]}
                        value={"Text"}
                      >
                        Text
                      </option>
                      <option
                        id="text-type-option-two"
                        className={textStyle["text-type-option-two"]}
                        value={"List"}
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
  } catch (error) {
    console.warn("Error in TextInputUnit: ", error);
    return (
      <Div className={textStyle["erro-message"]}>
        An error occurred while loading the text input unit.
      </Div>
    );
  }
};

export default TextInputUnit;
