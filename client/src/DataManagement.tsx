import { DivClass, DivId } from "../src/ui/Div";
import "./style-files/management.css";
import "./style-files/canva-board-sheet-wrapper.css";
import "./style-files/data-workspace-board-controls.css";
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
import { useParams } from "react-router-dom";
import HeadingOne from "./ui/HeadingOne";
import canvaNotification_CreateCanva from "./pages/account/accountid/canvas-management/notifications/canva-creation/CanvaNotification_CreateCanva";
import canvaNotification_CanvaNotCreated from "./pages/account/accountid/canvas-management/notifications/canva-creation/CanvaNotification_CanvaNotCreated";
import canvaNotification_CanvaUpdated from "./pages/account/accountid/canvas-management/notifications/canva-updates/CanvaNotification_CanvaDetailsUpdated";
import canvaNotification_CanvaNotUpdated from "./pages/account/accountid/canvas-management/notifications/canva-updates/CanvaNotification_CanvaDetailsNotUpdated";

const DataManagement = ({ source }: { source: any }) => {
  //pull latest data from the cloud
  const { userid } = useParams();
  const [workspaceData, setWorkspaceData] = useState<any>([]);
  // console.log("data management source.data: ", source);

  useEffect(() => {
    if (!Notification.requestPermission()) {
      Notification.requestPermission();
    }
  }, []);
  const fetchMoreData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/account/${userid}/canvas-management`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      // console.log("ok data from datamanagement : ", data);
      setWorkspaceData(data.data);
      return {
        status: "success",
        message: data,
      };
    } else {
      const issue = await response.json();
      console.log("issue from data management: ", issue);

      setWorkspaceData(issue);
      return {
        status: "false",
        message: issue,
      };
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
    description: string;
  }

  //used to capture the data to update the actual specified workspace
  const [workspaceEdits, setWorkspaceEdits] = useState<
    Record<string, IWorkspaceProps>
  >({});
  //db data before edits
  const [currentWorkspacePreEdits, setCurrentWorkspacePreEdits] = useState<
    Record<string, IWorkspaceProps>
  >({});

  const updateWorkspace = async (e: any, workspaceId: string) => {
    console.log(workspaceId);

    try {
      e.preventDefault();
      const updateFields: any = {};
      // const edited = workspaceEdits[workspaceId];
      // const original = workspaceData?.find((w: any) => w._id === workspaceId);
      // console.log("workspaceEdits: ", workspaceEdits);
      // console.log("currentWorkspacePreEdits: ", currentWorkspacePreEdits);

      if (userid) {
        updateFields.sub = userid;
        updateFields.workspaceid = workspaceId;
      }

      // if (workspaceEdits.workspacename)
      updateFields.workspacename = workspaceEdits[workspaceId].workspacename;

      // if (workspaceEdits.description)
      updateFields.description = workspaceEdits[workspaceId].description;

      // if (currentWorkspacePreEdits.workspacename)
      updateFields.currentworkspacename =
        currentWorkspacePreEdits[workspaceId].workspacename;

      // if (currentWorkspacePreEdits.description)
      updateFields.currentworkspacedescription =
        currentWorkspacePreEdits[workspaceId].description;

      // console.log("updateFields: ", updateFields);

      const response = await fetch(
        `http://localhost:5000/api/account/${userid}/canvas-management`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateFields),
        }
      );

      if (response.ok) {
        const data = await response.json();
        fetchMoreData();
        canvaNotification_CanvaUpdated();
        setWorkspaceEdits({
          ...workspaceEdits,
          [workspaceId]: { workspacename: "", description: "" },
        });
        return {
          status: "success",
          message: data.data,
        };
      } else {
        const data = await response.json();
        if (!data.success) {
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
        }
        canvaNotification_CanvaNotUpdated();
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
    description: "",
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
        description: "Workspace description",
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
      description: newWorkspace.description,
    });

    interface formDataProps {
      sub: string;
      workspacename: string;
      workspacedescription: string;
    }
    const formData: formDataProps = {
      sub: String(userid),
      workspacename: newWorkspace.workspacename,
      workspacedescription: newWorkspace.description,
    };

    if (!formData) {
      alert("Fill all the fields!");
    } else {
      const response = await fetch(
        `http://localhost:5000/api/account/${userid}/canvas-management`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        canvaNotification_CreateCanva();
        fetchMoreData();
        setDisplayNewWorkspace((prev) => !prev);
      } else {
        canvaNotification_CanvaNotCreated();

        window.location.reload();
      }
    }
  };
  // console.log(workspaceData);
  useEffect(() => {
    setWorkspaceData(source.data);
    fetchMoreData();
  }, []);

  return (
    <DivClass className={"workspace-dashboard"}>
      <DivClass className={"workspace-sheets-wrapper"}>
        <DivClass className={"heading-container"}>
          <HeadingOne id="heading-one" className={"heading-one"}>
            Canvas Management
          </HeadingOne>
        </DivClass>
        <DivClass className={"workspace-sheets"}>
          {/* {params.data.firstname} */}
          {workspaceData &&
            workspaceData.map((workspace: any) => {
              // console.log(
              //   `/account/${userid}/canvas-management/${workspace._id}`
              // );

              return (
                <DivId
                  id={workspace.id}
                  key={workspace._id}
                  className={"workspace-sheet-wrapper"}
                >
                  <form className={"workspace-sheet"}>
                    <DivClass className={"workspace-sheet-forefront-data"}>
                      <RouteLink
                        href={`/account/${userid}/canvas-management/${workspace._id}`}
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
                            setCurrentWorkspacePreEdits((previous: any) => ({
                              ...previous,
                              [workspace._id]: {
                                ...previous[workspace._id],
                                workspacename: workspace.workspacename,
                              },
                            }));
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
                            workspaceEdits[workspace._id]?.description || ""
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            // updating a specific workspace description
                            setCurrentWorkspacePreEdits((previous: any) => ({
                              ...previous,
                              [workspace._id]: {
                                ...previous[workspace._id],
                                description: workspace.description,
                              },
                            }));
                            setWorkspaceEdits((previous: any) => ({
                              ...previous,
                              [workspace._id]: {
                                ...previous[workspace._id],
                                description: e.target.value,
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
                            workspace.viewMode = false;
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
                    value={newWorkspace.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setNewWorkspace({
                        ...newWorkspace,
                        description: e.target.value,
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
