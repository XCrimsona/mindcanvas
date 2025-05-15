"use client";

import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";

import React, { useState } from "react";
import Button from "@/src/components/form-elements/Button";
import Div from "@/src/ui/Div";
import {
  MassInputDisabledText,
  MassInputEnabledText,
} from "@/src/components/mass-workspace-elements/MassWorkspaceInputComponents";
import Label from "@/src/components/form-elements/Label";
import SVG from "@/src/SVG";
// import { useTextComponentDisplayState } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/TextComponentDisplayState";
import { useNewTextComponent } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/text/NewTextComponent";

const TextInputUnit = ({ params }: any) => {
  const { newTextComponent, setNewTextComponent } = useNewTextComponent();

  //submit text Data
  const textComponentFormData = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const textFormData: any = {};

    if (newTextComponent.text) textFormData.text = newTextComponent.text;
    if (!newTextComponent.text) {
      alert("Text Component must be filled with data");
      return;
    } else {
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
        alert("Your text data has been saved!");
      } else {
        //notification failed response
        alert("Failed to save your text data!");
      }
    }
  };

  return (
    <form onSubmit={textComponentFormData}>
      <Div className={workspaceDataManagement["label-wrapper"]}>
        <Label
          htmlfor="mass-enabled-input-text-field"
          className={workspaceDataManagement["text-component-data-input-label"]}
          text="Text Component"
        />
      </Div>
      <Div className={workspaceDataManagement["text-input-wrapper"]}>
        <MassInputEnabledText
          //   onClick={clickedTextDataComponent}
          id="mass-enabled-input-text-field"
          className={workspaceDataManagement["mass-enabled-input-text-field"]}
          value={newTextComponent.text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewTextComponent({
              ...newTextComponent,
              text: e.target.value,
            });
          }}
        />
      </Div>
      <Div className={workspaceDataManagement["text-submit-btn-container"]}>
        <Button
          id=""
          className={workspaceDataManagement[""]}
          // onClick={}
        >
          <SVG
            className={workspaceDataManagement["svg-send-icon"]}
            src="https://res.cloudinary.com/djjvj73xa/image/upload/v1745662977/backward-solid_1_dpek7z.svg"
            alt="Up arrow send icon"
          />
        </Button>
      </Div>
    </form>
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
