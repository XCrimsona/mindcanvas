"use client";
import React from "react";
import Div from "@/src/ui/Div";
import Figure from "@/src/ui/Figure";
import Figcaption from "@/src/ui/Figcaption";

export const ImmutableImage = ({ data }: any) => {
  return (
    <Div className={"image-info"}>
      <Figure className={"figure"}>
        <Div className={""}>
          <img src={data?.src} className={"image"} />
        </Div>
        <Figcaption className="">{data?.caption}</Figcaption>
      </Figure>
    </Div>
  );
};

export const MutableImage = ({ data }: any) => {
  return (
    <Div className={"image-info"}>
      <Figure className={"figure"}>
        <Div className={""}>
          <input type="file" src={data?.src} className={"image"} />
        </Div>
        <Figcaption className="">{data?.caption}</Figcaption>
      </Figure>
    </Div>
  );
};
