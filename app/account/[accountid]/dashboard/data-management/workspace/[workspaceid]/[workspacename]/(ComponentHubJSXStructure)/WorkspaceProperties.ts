import { useState } from "react";

export const useWorkspaceProperties = () => {
  const [workspaceProperties, setWorkspaceProperties] =
    useState<boolean>(false);
  return { workspaceProperties, setWorkspaceProperties };
};
