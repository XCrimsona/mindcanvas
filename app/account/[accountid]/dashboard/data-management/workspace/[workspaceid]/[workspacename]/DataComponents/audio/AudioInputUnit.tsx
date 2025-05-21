"use client";
import React, { useState } from "react";
import Button from "@/src/components/form-elements/Button";
import Div from "@/src/ui/Div";
import {
  EnabledAudioInput,
  EnabledAudiosInput,
} from "@/src/components/mass-workspace-elements/MassWorkspaceInputComponents";
import Label from "@/src/components/form-elements/Label";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-controls-provider/WorkspaceContextProvider";
import Select from "@/src/ui/selection/Select";
import audioStyle from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/audio.module.scss";

const AudioInputUnit = ({ params }: any) => {
  try {
    //activates audio input form
    const {
      dataScrollBoardRef,
      audioInputOffSet,
      globalDraggingRef,
      audioInputCompPosRef,
      audioInputCompRef,
      audioToggleState,
      updateWorkspaceData,
    } = useWorkspaceContext();

    const [newAudioComponent, setNewAudioComponent] = useState<any>({
      files: [],
    });
    const [selectedType, setSelectedType] = useState<string>("Single");
    const updateAudioSelectionType = () => {
      setSelectedType((prev) => (prev === "Single" ? "Many" : "Single"));
    };

    //submit audio Data
    const audioComponentFormData = async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      const audioFormData: any = {};
      if (newAudioComponent.files)
        audioFormData.files = newAudioComponent.files;
      console.log(newAudioComponent.files);

      if (selectedType) audioFormData.type = selectedType;

      if (audioInputCompPosRef.current.x)
        audioFormData.x = audioInputCompPosRef.current.x;
      // console.log(
      //   "audioInputCompPosRef.current.x: ",
      //   audioInputCompPosRef.current.x
      // );
      if (audioInputCompPosRef.current.y)
        audioFormData.y = audioInputCompPosRef.current.y;
      // console.log(
      //   "audioInputCompPosRef.current.y: ",
      //   audioInputCompPosRef.current.y
      // );

      if (
        !newAudioComponent.files ||
        !selectedType ||
        !audioInputCompPosRef.current.x ||
        !audioInputCompPosRef.current.y
      ) {
        alert("Audio component must be filled with data");
        return;
      } else {
        //test audioFormData.file
        // console.log("audioFormDatta: ", audioFormData.files);
        // console.log("audioFormDatta: ", audioFormData);

        const audio = await fetch(
          `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management/workspace/${params.workspaceid}/${params.workspacename}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(audioFormData),
          }
        );
        if (audio.ok) {
          //notification ok response
          // alert("Your audio data has been saved!");
          updateWorkspaceData();
          setNewAudioComponent({
            ...newAudioComponent,
            files: [],
          });
        } else {
          //notification failed response
          alert("Failed to save your audio data!");
        }
      }
    };

    const processAudioMouseMove = (event: React.MouseEvent) => {
      if (!globalDraggingRef.current || !dataScrollBoardRef.current) return;

      const audioInputComp = audioInputCompRef.current;
      const audioInputCompRect = audioInputComp?.getBoundingClientRect();

      //windowRef (dataScrollBoard)
      const dataScrollBoardRect =
        dataScrollBoardRef.current.getBoundingClientRect();

      const mouseX: number = event.clientX - dataScrollBoardRect.left;
      const mouseY: number = event.clientY - dataScrollBoardRect.top;

      let newValueX = mouseX - audioInputOffSet.current.x;
      let newValueY = mouseY - audioInputOffSet.current.y;

      const maxX = dataScrollBoardRect.width - audioInputCompRect!.width;
      const maxY = dataScrollBoardRect.height - audioInputCompRect!.height;

      //set boundaries so draggables dont go outside the drag frame
      newValueX = Math.max(0, Math.min(newValueX, maxX));
      newValueY = Math.max(0, Math.min(newValueY, maxY));

      audioInputCompPosRef.current = {
        x: newValueX,
        y: newValueY,
      };

      if (audioInputComp) {
        audioInputComp.style.transform = `translate(${newValueX}px, ${newValueY}px)`;
      }
    };
    const processAudioMouseUp = (event: React.MouseEvent) => {
      globalDraggingRef.current = false;
      document.removeEventListener<any>("mousemove", processAudioMouseMove);
      document.removeEventListener<any>("mouseup", processAudioMouseUp);
      audioInputOffSet.current = {
        x: 0,
        y: 0,
      };
    };
    const processAudioMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      globalDraggingRef.current = true;

      // //audio input component x y position
      const dataScrollBoardRect = event.currentTarget.getBoundingClientRect();
      audioInputOffSet.current = {
        x: event.clientX - dataScrollBoardRect.left,
        y: event.clientY - dataScrollBoardRect.top,
      };
      document.addEventListener<any>("mousemove", processAudioMouseMove);
      document.addEventListener<any>("mouseup", processAudioMouseUp);
    };

    return (
      audioToggleState && (
        <Div
          className={audioStyle["data-audio-component"]}
          ref={audioInputCompRef}
          onStyle={{
            position: "absolute",
            color: "#fff",
            zIndex: 4,
            transform: `translate(${audioInputCompPosRef.current.x}px,${audioInputCompPosRef.current.y}px)`,
          }}
          onMouseDown={processAudioMouseDown}
        >
          <form
            className={audioStyle["audio-input-form"]}
            onSubmit={audioComponentFormData}
          >
            <Div className={audioStyle["audio-label-wrapper"]}>
              {selectedType === "Single" ? (
                <Label
                  htmlfor="enabled-audio-input-field"
                  className={audioStyle["audio-label"]}
                  text="Single Audio Input Field"
                />
              ) : (
                <Label
                  htmlfor="enabled-audios-input-field"
                  className={audioStyle["audios-label"]}
                  text="Multi Audio Input Field"
                />
              )}
            </Div>
            <Div className={audioStyle["audio-container"]}>
              <Div className={audioStyle["audio-input-wrapper"]}>
                {selectedType === "Single" ? (
                  <EnabledAudioInput
                    id="enabled-audio-input-field"
                    className={audioStyle["enabled-audio-input-field"]}
                    value={newAudioComponent.audio}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newFile = e.target.files;

                      if (newFile && newFile.length > 0) {
                        setNewAudioComponent({
                          ...newAudioComponent,
                          files: Array.from(newFile),
                        });
                      }
                    }}
                  />
                ) : (
                  <EnabledAudiosInput
                    id="enabled-audios-input-field"
                    className={audioStyle["enabled-audios-input-field"]}
                    value={newAudioComponent.audio}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newFile = e.target.files;

                      if (newFile && newFile.length > 0) {
                        setNewAudioComponent({
                          ...newAudioComponent,
                          files: Array.from(newFile),
                        });
                      }
                    }}
                  />
                )}
                <Div className={audioStyle["audio-btn-container"]}>
                  <Div className={audioStyle["audio-submit-btn-container"]}>
                    <Button
                      id="audio-btn-submit"
                      className={audioStyle["audio-btn-submit"]}
                    >
                      SAVE
                    </Button>
                  </Div>
                  <Div className={audioStyle["audio-selection-wrapper"]}>
                    <Select
                      id="select-audio-type"
                      className={audioStyle["select-audio-type"]}
                      value={selectedType}
                      onChange={updateAudioSelectionType}
                    >
                      <option
                        id="audio-type-option-one"
                        className={audioStyle["audio-type-option-one"]}
                        value={"Single"}
                      >
                        Single
                      </option>
                      <option
                        id="audio-type-option-two"
                        className={audioStyle["audio-type-option-two"]}
                        value={"Many"}
                      >
                        Many
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
    console.warn("Error in AudioInputUnit:", error);
    return (
      <Div className={audioStyle["error-message"]}>
        An error occurred while loading the audio input unit.
      </Div>
    );
  }
};

export default AudioInputUnit;
