import { DivClass, DivId } from "../src/ui/Div";
import "../app/style-files/management.css";
import "./style-files/data-workspace-board-controls.css";
import "../app/style-files/workspace-board-sheet-wrapper.css";
import Button from "./components/form-elements/Button";
import {
  InputSubmit,
  InputText,
  InputTextReadOnly,
} from "./components/form-elements/InputTypeInterfaces";
import RouteLink from "./components/ProductSection/RouteLink";
import React, { useEffect, useState } from "react";
import SVG from "./SVG";
import { EnabledTextAreaInput } from "./components/mass-workspace-elements/MassWorkspaceInputComponents";

const DataManagement = ({ params }: { params: any }) => {
  //pull latest data from the cloud
  const [workspaceData, setWorkspaceData] = useState<any>([]);

  // setWorkspaceData(params.data.workspaces);
  const fetchMoreData = async () => {
    const response = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/dashboard/canvas-management`
    );

    const data = await response.json();
    if (data.success !== true) {
      switch (data.code) {
        case "NO_WORKSPACE_DATA":
          alert(data.code);

          return {
            status: "no-workspace-data",
            message: data.message,
          };
        case "NO_USER_DATA":
          alert(data.code);

          return {
            status: "no-user-data",
            message: data.message,
          };
        default:
          console.log("route error");

          return {
            status: "error",
            message: data.message || "Unhandled backend condition.",
          };
      }
    } else {
      setWorkspaceData(data.data);
      return {
        status: "success",
        message: data.data,
      };
    }
  };

  useEffect(() => {
    const data = params.info.data;
    setWorkspaceData(data);
  }, []);

  const toggleASingleWorkspace = (id: string) => {
    setWorkspaceData((prev: any) =>
      prev.map((workspace: any) =>
        workspace._id === id
          ? { ...workspace, viewMode: !workspace.viewMode }
          : workspace
      )
    );
  };

  interface IWorkspaceProps {
    sub?: string;
    workspacename: string;
    workspacedescription: string;
  }

  //used to capture the data to update the actual specified workspace
  const [workspaceEdits, setWorkspaceEdits] = useState<
    Record<string, IWorkspaceProps>
  >({});

  const updateWorkspace = async (e: any, workspaceId: string) => {
    try {
      e.preventDefault();
      const updateFields: Partial<IWorkspaceProps> = {};
      const edited = workspaceEdits[workspaceId];
      const original = workspaceData?.find((w: any) => w._id === workspaceId);

      if (!original || !edited) return;
      if (original.workspacename !== edited.workspacename) {
        updateFields.workspacename = edited.workspacename;
      }
      if (original.workspacedescription !== edited.workspacedescription) {
        updateFields.workspacedescription = edited.workspacedescription;
      }
      if (params.accountid) {
        updateFields.sub = workspaceId;
      }

      const response = await fetch(
        `http://localhost:3000/api/account/${params.accountid}/dashboard/canvas-management`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateFields),
        }
      );

      if (response.ok) {
        fetchMoreData();
        alert("Workspace updated!");
      } else {
        alert("Workspace not updated!");
      }

      const data = await response.json();
      if (data.success !== true) {
        switch (data.code) {
          case "MISSING_WORKSPACE_DATA":
            alert(data.code);
            return {
              status: "missing-workspace-data",
              message: data.message,
            };
          case "WORKSPACE_MANAGEMENT_DATA_PATCHED":
            alert(data.code);
            return {
              status: "no-user-data",
              message: data.message,
            };
          case "SERVER_WORKSPACE_ERROR":
            alert(data.code);
            return {
              status: "server-error",
              message: data.message,
            };
          default:
            return {
              status: "error",
              message: data.message || "Unhandled backend condition.",
            };
        }
      } else {
        setWorkspaceData(data.data);
        alert(data.code);
        return {
          status: "success",
          message: data.data,
        };
      }
    } catch (err: any) {
      console.warn("Management Update Error: ", err.message);
    }
  };

  //displays temporary field when plus button is clicked
  const [displayNewWorkspace, setDisplayNewWorkspace] =
    useState<Boolean>(false);

  //used to add a temporary workspace field until saved
  const [newWorkspace, setNewWorkspace] = useState<IWorkspaceProps>({
    workspacename: "",
    workspacedescription: "",
  });

  //create new workspace locally
  const addNewWorkspace = async (): Promise<void> => {
    try {
      //make temporary form visisble
      setDisplayNewWorkspace((prev) => !prev);

      //temperory editable data until submitted to the cloud
      setNewWorkspace({
        ...newWorkspace,
        workspacename: "New workspace",
        workspacedescription: "Workspace description",
      });
    } catch (err: any) {
      console.warn("Management Error: ", err.message);
    }
  };

  //send data to cloud
  const saveWorkspace = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    setNewWorkspace({
      ...newWorkspace,
      workspacename: newWorkspace.workspacename,
      workspacedescription: newWorkspace.workspacedescription,
    });

    interface formDataProps {
      sub: string;
      workspacename: string;
      workspacedescription: string;
    }
    const formData: formDataProps = {
      sub: params.accountid,
      workspacename: newWorkspace.workspacename,
      workspacedescription: newWorkspace.workspacedescription,
    };
    // console.log("sub: params.info.data._id", formData.sub);

    if (!formData) {
      alert("Fill all the fields!");
    } else {
      const response = await fetch(
        `http://localhost:3000/api/account/${params.accountid}/dashboard/workspace-management`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("New workspace saved!");
        fetchMoreData();
        setDisplayNewWorkspace((prev) => !prev);
      } else {
        alert("New workspace not saved!");
      }
    }
  };

  return (
    <DivClass className={"workspace-dashboard"}>
      <DivClass className={"workspace-sheets-wrapper"}>
        <DivClass className={"workspace-sheets"}>
          {/* {params.data.firstname} */}
          {workspaceData &&
            workspaceData.map((workspace: any) => {
              return (
                <DivId
                  id={workspace.id}
                  key={workspace._id}
                  className={"workspace-sheet-wrapper"}
                >
                  <form className={"workspace-sheet"}>
                    <DivClass className={"workspace-sheet-forefront-data"}>
                      <RouteLink
                        href={`http://localhost:3000/account/${params.accountid}/dashboard/workspace-management/workspace/${workspace._id}/${workspace.name}`}
                        className={"dynamic-workspace-route"}
                      >
                        <SVG
                          src="/backwards-solid.svg"
                          alt="double forward icon"
                          className={"forward-to-workspace-icon"}
                        />
                      </RouteLink>
                      {workspace.viewMode === true ? (
                        <InputText
                          id={`new-temp-update-name-field-${workspace._id}`}
                          value={
                            workspaceEdits[workspace._id]?.workspacename || ""
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            e.preventDefault();
                            // updating a specific workspace description
                            setWorkspaceEdits((previous: any) => ({
                              ...previous,
                              [workspace._id]: {
                                ...previous[workspace._id],
                                workspacename: e.target.value,
                              },
                            }));
                          }}
                          placeholder={"Your new workspace name"}
                          className={
                            "new-temp-update-description-field-workspace-name"
                          }
                        />
                      ) : (
                        <InputTextReadOnly
                          id={workspace._id}
                          value={workspace.workspacename}
                          className={"workspace-name"}
                        />
                      )}

                      {workspace.viewMode === true ? (
                        <InputText
                          id={`new-temp-update-description-field-${workspace._id}`}
                          value={
                            workspaceEdits[workspace._id]
                              ?.workspacedescription || ""
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            // updating a specific workspace description
                            setWorkspaceEdits((previous: any) => ({
                              ...previous,
                              [workspace._id]: {
                                ...previous[workspace._id],
                                workspacedescription: e.target.value,
                              },
                            }));
                          }}
                          placeholder={"Your new workspace description"}
                          className={
                            "new-temp-update-description-field-workspace-description"
                          }
                        />
                      ) : (
                        <textarea
                          cols={12}
                          id={workspace.name}
                          readOnly
                          value={workspace.description}
                          placeholder={"Update workspace description"}
                          className={"workspace-description"}
                        />
                      )}
                    </DivClass>
                    <DivClass className={"workspace-buttons-container"}>
                      <DivClass className={"workspace-toggle-edit-btns"}>
                        {workspace.viewMode === true ? (
                          <Button
                            id="view-mode"
                            className={"view-mode"}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleASingleWorkspace(workspace._id);
                            }}
                          >
                            View
                          </Button>
                        ) : (
                          <Button
                            id="edit-mode"
                            className={"edit-mode"}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleASingleWorkspace(workspace._id);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </DivClass>
                      <DivClass className={"workspace-sheet-forefront-data"}>
                        <Button
                          id="update-workspace-sheet"
                          className={"update-workspace-sheet"}
                          onClick={(e) => {
                            e.preventDefault();
                            updateWorkspace(e, workspace._id);
                          }}
                        >
                          Update
                        </Button>
                      </DivClass>
                    </DivClass>
                  </form>
                </DivId>
              );
            })}

          {displayNewWorkspace && (
            <DivClass className={"workspace-sheet-wrapper"}>
              <form
                className={"workspace-sheet-temp-field"}
                onSubmit={saveWorkspace}
              >
                <DivClass className={"workspace-sheet-forefront-data"}>
                  <InputText
                    id="workspace-name"
                    value={newWorkspace.workspacename}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewWorkspace({
                        ...newWorkspace,
                        workspacename: e.target.value,
                      });
                    }}
                    placeholder={"Workspace Name"}
                    className={"workspace-name"}
                  />
                  {/* based on boolean expression for onfocus and off focus */}
                  <EnabledTextAreaInput
                    id="workspace-description"
                    value={newWorkspace.workspacedescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setNewWorkspace({
                        ...newWorkspace,
                        workspacedescription: e.target.value,
                      });
                    }}
                    placeholder={"Workspace Description"}
                    className={"workspace-description"}
                  />
                </DivClass>
                <DivClass className={"workspace-sheet-forefront-data"}>
                  <InputSubmit
                    value="Save Workspace"
                    id="create-workspace-sheet"
                    className={"create-workspace-sheet"}
                  />
                </DivClass>
              </form>
            </DivClass>
          )}
        </DivClass>
        <DivClass className={"controls"}>
          <DivClass className={"button-wrapper"}>
            <Button
              id="create-new-workspace-sheet-button"
              className={"create-new-workspace-sheet-button"}
              onClick={addNewWorkspace}
            >
              {"\u002B"}
            </Button>
          </DivClass>
        </DivClass>
      </DivClass>
    </DivClass>
  );
};

export default DataManagement;
