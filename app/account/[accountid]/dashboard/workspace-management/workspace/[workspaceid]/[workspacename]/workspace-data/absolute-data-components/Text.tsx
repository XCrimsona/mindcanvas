"use client";
import workspaceDataManagement from "@/app/account/[accountid/dashboard/workspace-management/workspace/[workspaceid/[workspacename/workspace-workspace-management.module.scss";
import React from "react";

export const ImmutableText = ({ data }: any) => {
  return <p className={"textarea"}>{data.text}</p>;
};

export const MutableText = ({ data }: any) => {
  return (
    <textarea
      className={"textarea"}
      value={data.text}
      minLength={1}
      maxLength={10000}
    />
  );
};
