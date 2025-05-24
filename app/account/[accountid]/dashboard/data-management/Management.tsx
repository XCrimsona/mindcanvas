"use client";
import Div from "@/src/ui/Div";
import management from "@/app/account/[accountid]/dashboard/data-management/(css)/management.module.scss";
import controls from "@/app/account/[accountid]/dashboard/data-management/(css)/data-workspace-board-controls.module.scss";
import workspacesheetWrapper from "@/app/account/[accountid]/dashboard/data-management/(css)/workspace-board-sheet-wrapper.module.scss";
import Button from "@/src/components/form-elements/Button";
import {
  InputSubmit,
  InputText,
  InputTextReadOnly,
} from "@/src/components/form-elements/InputTypeInterfaces";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import React, { use, useEffect, useState } from "react";
import SVG from "@/src/SVG";
import { EnabledTextAreaInput } from "@/src/components/mass-workspace-elements/MassWorkspaceInputComponents";

const DataManagement = ({ params }: { params: any }) => {
  //pull latest data from the cloud
  const [workspaceData, setWorkspaceData] = useState<any>([]);
  useEffect(() => {
    const data = params.info.data;
    setWorkspaceData(data);
  }, []);

  // setWorkspaceData(params.data.workspaces);
  const fetchMoreData = async () => {
    const response = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management`
    );
    if (response.ok) {
      const data = await response.json();
      setWorkspaceData(data.data);
    } else {
      console.error("Failed to fetch workspace data");
    }
  };
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
        `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management`,
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
        `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management`,
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
    <Div className={management["workspace-dashboard"]}>
      <Div className={management["workspace-sheets-wrapper"]}>
        <Div className={management["workspace-sheets"]}>
          {/* {params.data.firstname} */}
          {workspaceData &&
            workspaceData.map((workspace: any) => {
              return (
                <Div
                  id={workspace.id}
                  key={workspace._id}
                  className={workspacesheetWrapper["workspace-sheet-wrapper"]}
                >
                  <form className={workspacesheetWrapper["workspace-sheet"]}>
                    <Div
                      className={
                        workspacesheetWrapper["workspace-sheet-forefront-data"]
                      }
                    >
                      <RouteLink
                        href={`http://localhost:3000/account/${params.accountid}/dashboard/data-management/workspace/${workspace._id}/${workspace.name}`}
                        className={
                          workspacesheetWrapper["dynamic-workspace-route"]
                        }
                      >
                        <SVG
                          src="https://res.cloudinary.com/djjvj73xa/image/upload/v1745662977/backward-solid_1_dpek7z.svg"
                          alt="double forward icon"
                          className={
                            workspacesheetWrapper["forward-to-workspace-icon"]
                          }
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
                            workspacesheetWrapper[
                              "new-temp-update-description-field-workspace-name"
                            ]
                          }
                        />
                      ) : (
                        <InputTextReadOnly
                          id={workspace._id}
                          value={workspace.workspacename}
                          className={workspacesheetWrapper["workspace-name"]}
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
                            workspacesheetWrapper[
                              "new-temp-update-description-field-workspace-description"
                            ]
                          }
                        />
                      ) : (
                        <textarea
                          cols={12}
                          id={workspace.name}
                          readOnly
                          value={workspace.description}
                          placeholder={"Update workspace description"}
                          className={
                            workspacesheetWrapper["workspace-description"]
                          }
                        />
                      )}
                    </Div>
                    <Div
                      className={
                        workspacesheetWrapper["workspace-buttons-container"]
                      }
                    >
                      <Div
                        className={
                          workspacesheetWrapper["workspace-toggle-edit-btns"]
                        }
                      >
                        {workspace.viewMode === true ? (
                          <Button
                            id="view-mode"
                            className={workspacesheetWrapper["view-mode"]}
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
                            className={workspacesheetWrapper["edit-mode"]}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleASingleWorkspace(workspace._id);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </Div>
                      <Div
                        className={
                          workspacesheetWrapper[
                            "workspace-sheet-forefront-data"
                          ]
                        }
                      >
                        <Button
                          id="update-workspace-sheet"
                          className={
                            workspacesheetWrapper["update-workspace-sheet"]
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            updateWorkspace(e, workspace._id);
                          }}
                        >
                          Update
                        </Button>
                      </Div>
                    </Div>
                  </form>
                </Div>
              );
            })}

          {displayNewWorkspace && (
            <Div className={workspacesheetWrapper["workspace-sheet-wrapper"]}>
              <form
                className={workspacesheetWrapper["workspace-sheet-temp-field"]}
                onSubmit={saveWorkspace}
              >
                <Div
                  className={
                    workspacesheetWrapper["workspace-sheet-forefront-data"]
                  }
                >
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
                    className={workspacesheetWrapper["workspace-name"]}
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
                    className={workspacesheetWrapper["workspace-description"]}
                  />
                </Div>
                <Div
                  className={
                    workspacesheetWrapper["workspace-sheet-forefront-data"]
                  }
                >
                  <InputSubmit
                    value="Save Workspace"
                    id="create-workspace-sheet"
                    className={workspacesheetWrapper["create-workspace-sheet"]}
                  />
                </Div>
              </form>
            </Div>
          )}
        </Div>
        <Div className={controls["controls"]}>
          <Div className={controls["button-wrapper"]}>
            <Button
              id="create-new-workspace-sheet-button"
              className={controls["create-new-workspace-sheet-button"]}
              onClick={addNewWorkspace}
            >
              {"\u002B"}
            </Button>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default DataManagement;
