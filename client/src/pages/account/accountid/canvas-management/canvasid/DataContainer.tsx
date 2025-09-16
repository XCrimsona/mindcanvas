import Div from "../src/ui/Div";
import React from "react";
import dataContainer from "../app/style-files/data-container.module.scss";
import TextInputUnit from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/text/TextInputUnit";
import { useCanvasContext } from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/canva-data-provider/CanvasDataContextProvider";
import CanvasData from "../app/account/[accountid]/canvas-management/[canvasid]/canvas-data/CanvasData";
import AudioInputUnit from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/audio/AudioInputUnit";
import ImageInputUnit from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/image/ImageInputUnit";
import VideoInputUnit from "../app/account/[accountid]/canvas-management/[canvasid]/DataComponents/video/VideoInputUnit";

const DataContainer = ({ params }: any) => {
  const { dataScrollBoardRef, canvasHeight, canvasWidth } = useCanvasContext();
  return (
    <Div className={dataContainer["data-container"]}>
      <Div
        className={dataContainer["data-scroll-board"]}
        //dataScrollBoardRef as windowRef
        ref={dataScrollBoardRef}
        onStyle={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          transition: "height .2s ease-in-out, width .2s ease-in-out",
        }}
      >
        {/* Below InputUnits used for multi media submits */}
        <TextInputUnit params={params} />
        <AudioInputUnit params={params} />
        <ImageInputUnit params={params} />
        <VideoInputUnit params={params} />
        {/* display cloud data below */}
        <CanvasData />
      </Div>
    </Div>
  );
};

export default DataContainer;
