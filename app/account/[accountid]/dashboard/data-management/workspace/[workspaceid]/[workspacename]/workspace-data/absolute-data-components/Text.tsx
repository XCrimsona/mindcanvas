"use client";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import React from "react";

const Text = ({ data }: any) => {
  return (
    <textarea
      className={workspaceDataManagement["textarea"]}
      disabled
      value={data.text}
    />
    // </div>
  );
};

export default Text;
