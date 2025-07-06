"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type TypeWorkspaceDeletionOpsContext = true | false;

interface IWorkspaceDeletionContext {
  workspaceDeletionState: TypeWorkspaceDeletionOpsContext;
  workspaceDeletionToggle: () => void;
  hitClickDelete: () => void;
}

const WorkspaceContextDeletionType = createContext<
  IWorkspaceDeletionContext | undefined
>(undefined);

export const WorkspaceContextDeletionProvider = ({
  children,
  params,
}: {
  params: any;
  children: ReactNode;
}) => {
  const router = useRouter();
  const [workspaceDeletionState, setConfirmDeletionState] =
    useState<TypeWorkspaceDeletionOpsContext>(false);

  const workspaceDeletionToggle = async () => {
    setConfirmDeletionState((prev) => (prev === false ? true : false));
  };
  const hitClickDelete = async () => {
    const response = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/dashboard/workspace-management/workspace/${params.workspaceid}/${params.workspacename}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      alert("Workspace deleted. You'll be redirected");
      router.push(
        `http://localhost:3000/account/${params.accountid}/dashboard/workspace-management`
      );
    } else {
      alert("Workspace deletion failed.");
    }
  };
  return (
    <WorkspaceContextDeletionType.Provider
      value={{
        workspaceDeletionState,
        workspaceDeletionToggle,
        hitClickDelete,
      }}
    >
      {children}
    </WorkspaceContextDeletionType.Provider>
  );
};

export const useWorkspaceDeletionContext = () => {
  const context = useContext(WorkspaceContextDeletionType);
  if (!context) {
    throw new Error(
      "useWorkspaceContext must be used within a WorkspaceContextProvider"
    );
  }
  return context;
};
