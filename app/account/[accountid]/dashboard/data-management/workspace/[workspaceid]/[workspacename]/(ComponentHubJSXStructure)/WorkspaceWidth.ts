import { useState } from "react";

export const useWorkspaceWidth = () => {
  const [workspaceWidth, setWorkspaceWidth] = useState<string>("");
  return { workspaceWidth, setWorkspaceWidth };
};
