"use client";
import Div from "@/src/ui/Div";

import management from "@/app/account/[accountid]/dashboard/data-management/(css)/management.module.scss";
import controls from "@/app/account/[accountid]/dashboard/data-management/(css)/data-workspace-board-controls.module.scss";
import workspacesheetWrapper from "@/app/account/[accountid]/dashboard/data-management/(css)/workspace-board-sheet-wrapper.module.scss";
import Button from "@/src/components/form-elements/Button";
import {
  InputSubmit,
  InputText,
} from "@/src/components/form-elements/InputTypeInterfaces";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import { useEffect, useState } from "react";
import SVG from "@/src/SVG";

interface IWorkspaceProps {
  workspacename: string;
  workspacedescription: string;
}
const DataManagement = ({ params }: { params: any }) => {
  console.log("Params: ", params);

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
    console.log("sub: params.info.data._id", formData.sub);

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

  //used to update existing cloud data
  const [updateAWorkspace, setUpdateAWorkspace] = useState<IWorkspaceProps>({
    workspacename: "",
    workspacedescription: "",
  });

  // const updatedWorkspaceData: updatedWorkspaceProps = {
  //   sub: params.info.data._id,
  //   workspacename: "",
  //   workspacedescription: "",
  // };

  const updateWorkspace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // updating a specific workspace on at a time
    setUpdateAWorkspace({
      ...updateAWorkspace,
      workspacename: e.target.value,
      workspacedescription: e.target.value,
    });

    const anUpdateWorkspace: any = {};
    if (params.accountid) {
      workspaceData.sub = params.accountid;
    }
    if (updateAWorkspace.workspacename) {
      workspaceData.workspacename = updateAWorkspace.workspacename;
    }
    if (updateAWorkspace.workspacedescription) {
      workspaceData.workspacedescription =
        updateAWorkspace.workspacedescription;
    }

    const response = await fetch(
      `http://localhost:3000/api/account/${params.accountid}/dashboard/data-management`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anUpdateWorkspace),
      }
    );
    if (response.ok) {
      alert("Workspace updated!");
    } else {
      alert("Workspace not updated!");
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
                  <Div className={workspacesheetWrapper["workspace-sheet"]}>
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
                      <InputText
                        id={workspace._id}
                        value={workspace.workspacename}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUpdateAWorkspace({
                            ...updateAWorkspace,
                            workspacedescription: e.target.value,
                          });
                        }}
                        placeholder={"Update workspace name"}
                        className={workspacesheetWrapper["workspace-name"]}
                      />
                      {/* based on boolean expression for onfocus and off focus  */}
                      <textarea
                        cols={12}
                        id={workspace.name}
                        value={workspace.description}
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          setUpdateAWorkspace({
                            ...updateAWorkspace,
                            workspacedescription: e.target.value,
                          });
                        }}
                        placeholder={"Update workspace description"}
                        className={
                          workspacesheetWrapper["workspace-description"]
                        }
                      />
                    </Div>
                    <Div
                      className={
                        workspacesheetWrapper["workspace-sheet-forefront-data"]
                      }
                    >
                      <Button
                        id="update-workspace-sheet"
                        className={
                          workspacesheetWrapper["update-workspace-sheet"]
                        }
                        onClick={updateWorkspace}
                      >
                        Update
                      </Button>
                    </Div>
                  </Div>
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
                  <textarea
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
