"use client";
import React from "react";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import Div from "@/src/ui/Div";
import Figure from "@/src/ui/figure";
import Figcaption from "@/src/ui/figcaption";

const Image = ({ data }: any) => {
  return (
    <Div
      className={workspaceDataManagement["image-component"]}
      key={data?._id}
      onStyle={{
        position: "absolute",
        left: 0,
        top: 0,
        color: "#fff",
        zIndex: 4,
        transform: `translate(${data?.position?.x}px,${data?.position?.y}px)`,
      }}
    >
      <Div className={workspaceDataManagement["image-info"]}>
        <Figure className={workspaceDataManagement["figure"]}>
          <Div className={workspaceDataManagement[""]}>
            <img src={data?.src} className={workspaceDataManagement["image"]} />
          </Div>
          <Figcaption className="">{data?.caption}</Figcaption>
        </Figure>
      </Div>
    </Div>
  );
};

export default Image;
