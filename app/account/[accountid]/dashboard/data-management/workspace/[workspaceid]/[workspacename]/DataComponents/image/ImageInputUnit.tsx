"use client";
import React, { useState } from "react";
import Button from "@/src/components/form-elements/Button";
import Div from "@/src/ui/Div";
import {
  EnabledImageInput,
  EnabledImagesInput,
} from "@/src/components/mass-workspace-elements/MassWorkspaceInputComponents";
import Label from "@/src/components/form-elements/Label";
import { useWorkspaceContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/workspace-data-provider/WorkspaceDataContextProvider";
import Select from "@/src/ui/selection/Select";
import imageStyle from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/image.module.scss";

const ImageInputUnit = ({ params }: any) => {
  //activates image input form
  const {
    dataScrollBoardRef,
    imageInputOffSet,
    globalDraggingRef,
    imageInputCompPosRef,
    imageInputCompRef,
    imageToggleState,
    updateWorkspaceData,
  } = useWorkspaceContext();

  const [newImageComponent, setnewImageComponent] = useState<any>({
    files: [],
  });

  const [selectedType, setSelectedType] = useState<string>("Single");
  const updateImageSelectionType = () => {
    setSelectedType((prev) => (prev === "Single" ? "Many" : "Single"));
  };

  //submit image Data
  const imageComponentFormData = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const imageFormData: any = {};
    if (newImageComponent.files) imageFormData.files = newImageComponent.files;

    if (selectedType) imageFormData.type = selectedType;

    if (imageInputCompPosRef.current.x)
      imageFormData.x = imageInputCompPosRef.current.x;
    // console.log(
    //   "imageInputCompPosRef.current.x: ",
    //   imageInputCompPosRef.current.x
    // );
    if (imageInputCompPosRef.current.y)
      imageFormData.y = imageInputCompPosRef.current.y;
    // console.log(
    //   "imageInputCompPosRef.current.y: ",
    //   imageInputCompPosRef.current.y
    // );

    if (
      !newImageComponent.files ||
      !selectedType ||
      !imageInputCompPosRef.current.x ||
      !imageInputCompPosRef.current.y
    ) {
      alert("image Component must be filled with data");
      return;
    } else {
      //test imageFormData.image
      console.log("imageFormData: ", imageFormData.image);
      console.log("imageFormData: ", imageFormData);

      const files = await fetch(
        `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management/workspace/${params.workspaceid}/${params.workspacename}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imageFormData),
        }
      );
      if (files.ok) {
        //notification ok response
        // alert("Your image data has been saved!");
        updateWorkspaceData();
        setnewImageComponent({
          ...newImageComponent,
          files: [],
        });
      } else {
        //notification failed response
        alert("Failed to save your image data!");
      }
    }
  };

  const processImageMouseMove = (event: React.MouseEvent) => {
    if (!globalDraggingRef.current || !dataScrollBoardRef.current) return;

    const imageInputComp = imageInputCompRef.current;
    const imageInputCompRect = imageInputComp?.getBoundingClientRect();

    //windowRef (dataScrollBoard)
    const dataScrollBoardRect =
      dataScrollBoardRef.current.getBoundingClientRect();

    const mouseX: number = event.clientX - dataScrollBoardRect.left;
    const mouseY: number = event.clientY - dataScrollBoardRect.top;

    let newValueX = mouseX - imageInputOffSet.current.x;
    let newValueY = mouseY - imageInputOffSet.current.y;

    const maxX = dataScrollBoardRect.width - imageInputCompRect!.width;
    const maxY = dataScrollBoardRect.height - imageInputCompRect!.height;

    //set boundaries so draggables dont go outside the drag frame
    newValueX = Math.max(0, Math.min(newValueX, maxX));
    newValueY = Math.max(0, Math.min(newValueY, maxY));

    imageInputCompPosRef.current = {
      x: newValueX,
      y: newValueY,
    };

    if (imageInputComp) {
      imageInputComp.style.transform = `translate(${newValueX}px, ${newValueY}px)`;
    }
  };
  const processImageMouseUp = (event: React.MouseEvent) => {
    globalDraggingRef.current = false;
    document.removeEventListener<any>("mousemove", processImageMouseMove);
    document.removeEventListener<any>("mouseup", processImageMouseUp);
    imageInputOffSet.current = {
      x: 0,
      y: 0,
    };
  };
  const processImageMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    globalDraggingRef.current = true;

    // //image input component x y position
    const dataScrollBoardRect = event.currentTarget.getBoundingClientRect();
    imageInputOffSet.current = {
      x: event.clientX - dataScrollBoardRect.left,
      y: event.clientY - dataScrollBoardRect.top,
    };
    document.addEventListener<any>("mousemove", processImageMouseMove);
    document.addEventListener<any>("mouseup", processImageMouseUp);
  };

  return (
    imageToggleState && (
      <Div
        className={imageStyle["data-image-component"]}
        ref={imageInputCompRef}
        onStyle={{
          position: "absolute",
          color: "#fff",
          zIndex: 4,
          transform: `translate(${imageInputCompPosRef.current.x}px,${imageInputCompPosRef.current.y}px)`,
        }}
        onMouseDown={processImageMouseDown}
      >
        <form
          className={imageStyle["image-input-form"]}
          onSubmit={imageComponentFormData}
        >
          <Div className={imageStyle["image-label-wrapper"]}>
            {selectedType === "Single" ? (
              <Label
                htmlfor="enabled-image-input-field"
                className={imageStyle["image-label"]}
                text="Single Image Input Field"
              />
            ) : (
              <Label
                htmlfor="enabled-images-input-field"
                className={imageStyle["images-label"]}
                text="Multi Image Input Field"
              />
            )}
          </Div>
          <Div className={imageStyle["image-container"]}>
            <Div className={imageStyle["image-input-wrapper"]}>
              {selectedType === "Single" ? (
                <EnabledImageInput
                  id="enabled-image-input-field"
                  className={imageStyle["enabled-image-input-field"]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newImage = e.target.files;
                    if (newImage && newImage.length > 0) {
                      setnewImageComponent({
                        ...newImageComponent,
                        files: Array.from(newImage),
                      });
                    }
                  }}
                />
              ) : (
                <EnabledImagesInput
                  id="enabled-images-input-field"
                  className={imageStyle["enabled-images-input-field"]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newImage = e.target.files;
                    if (newImage && newImage.length > 0) {
                      setnewImageComponent({
                        ...newImageComponent,
                        files: Array.from(newImage),
                      });
                    }
                  }}
                />
              )}
              <Div className={imageStyle["image-btn-container"]}>
                <Div className={imageStyle["image-submit-btn-container"]}>
                  <Button
                    id="image-btn-submit"
                    className={imageStyle["image-btn-submit"]}
                  >
                    SAVE
                  </Button>
                </Div>
                <Div className={imageStyle["image-selection-wrapper"]}>
                  <Select
                    id="select-image-type"
                    className={imageStyle["select-image-type"]}
                    value={selectedType}
                    onChange={updateImageSelectionType}
                  >
                    <option
                      id="image-type-option-one"
                      className={imageStyle["image-type-option-one"]}
                      value={"Single"}
                    >
                      Single
                    </option>
                    <option
                      id="image-type-option-two"
                      className={imageStyle["image-type-option-two"]}
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
};

export default ImageInputUnit;
