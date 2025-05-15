import { useState } from "react";
export const useWorkspaceHeight = () => {
  const [workspaceHeight, setWorkspaceHeight] = useState<string>("");
  return { workspaceHeight, setWorkspaceHeight };
};
