import Div from "../src/ui/Div";
import React from "react";
import LongText from "../src/ui/LongText";

export const ImmutableVideo = ({ data }: any) => {
  return (
    <Div
      className={"video-component"}
      key={data._id}
      onStyle={{
        position: "absolute",
        left: 0,
        top: 0,
        color: "#fff",
        zIndex: 4,
        transform: `translate(${data?.position?.x}px,${data?.position?.y}px)`,
      }}
    >
      <Div className={"video-info"}>
        <LongText className={"video-name"}>{data.name}</LongText>
        <video id="video" className={"video"} />
      </Div>
    </Div>
  );
};

export const MutableVideo = ({ data }: any) => {
  return (
    <Div
      className={"video-component"}
      key={data._id}
      onStyle={{
        position: "absolute",
        left: 0,
        top: 0,
        color: "#fff",
        zIndex: 4,
        transform: `translate(${data?.position?.x}px,${data?.position?.y}px)`,
      }}
    >
      <Div className={"video-info"}>
        <LongText className={"video-name"}>{data.name}</LongText>
        <video id="video" className={"video"} />
      </Div>
    </Div>
  );
};
