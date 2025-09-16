import Div from "../src/ui/Div";
import React from "react";

export const ImmutableList = ({ data }: any) => {
  return <p className={"textarea"}>{data.text}</p>;
};

export const MutableList = ({ data }: any) => {
  return (
    <Div className={"list-input"}>
      <input
        type="text"
        className={"list-text-input"}
        value={data.text}
        minLength={1}
        maxLength={10000}
      />
    </Div>
  );
};
