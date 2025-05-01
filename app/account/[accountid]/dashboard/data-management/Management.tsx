"use client";
import Div from "@/src/ui/Div";

import management from "@/app/account/[accountid]/dashboard/data-management/(css)/management.module.scss";
import Button from "@/src/components/form-elements/Button";
import {
  InputSubmit,
  InputText,
} from "@/src/components/form-elements/InputTypeInterfaces";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import { useState } from "react";
import SVG from "@/src/SVG";

interface IWorkspaceProps {
  workspacename: string;
  workspacedescription: string;
}
const DataManagement = ({ params }: { params: any }) => {
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
      setDisplayNewWorkspace(true);

      //temperory editable data until submitted to the claoud
      setNewWorkspace({
        ...newWorkspace,
        workspacename: "New workspace",
        workspacedescription: "Workspace description",
      });
    } catch (err: any) {
      console.warn("Management Error: ", err.message);
    }
  };

  //used to send data to the cloud via post
  const [saveNewWorkspace, setSaveNewWorkspace] = useState<IWorkspaceProps>({
    workspacename: "",
    workspacedescription: "",
  });

  //send data to cloud
  const saveWorkspace = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    setSaveNewWorkspace({
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
      sub: params.data._id,
      workspacename: saveNewWorkspace.workspacename,
      workspacedescription: saveNewWorkspace.workspacedescription,
    };

    if (!formData) {
      alert("Please ensure your form data is complete!");
    } else {
      const response = await fetch(
        `http://localhost:3000/api/account/${params.data._id}/dashboard/data-management`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("New workspace saved!");
        setDisplayNewWorkspace(false);
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

  interface updatedWorkspaceProps {
    sub: string;
    workspacename: string;
    workspacedescription: string;
  }
  const updatedWorkspaceData: updatedWorkspaceProps = {
    sub: params.data._id,
    workspacename: "",
    workspacedescription: "",
  };

  const updateWorkspace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // updating a specific workspace on at a time
    setUpdateAWorkspace({
      ...newWorkspace,
      workspacename: e.target.value,
      workspacedescription: e.target.value,
    });

    const response = await fetch(
      `http://localhost:3000/api/account/${params.data._id}/dashboard/data-management`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedWorkspaceData),
      }
    );
    if (response.ok) {
      alert("Workspace updated!");
    } else {
      alert("Workspace not updated!");
    }
  };

  return (
    <>
      <Div className={management["workspace-dashboard"]}>
        <Div className={management["workspace-sheets-wrapper"]}>
          <Div className={management["workspace-sheets"]}>
            {/* {params.data.firstname} */}
            {params.data.workspaces.map((workspace: any) => {
              return (
                <Div
                  key={workspace._id}
                  className={management["workspace-sheet-wrapper"]}
                >
                  <Div className={management["workspace-sheet"]}>
                    <Div
                      className={management["workspace-sheet-forefront-data"]}
                    >
                      <RouteLink
                        href={`http://localhost:3000/account/${params.data._id}/dashboard/data-management/workspace/${workspace._id}/${workspace.name}`}
                        className={management["dynamic-workspace-route"]}
                      >
                        <SVG
                          src="https://res.cloudinary.com/djjvj73xa/image/upload/v1745662977/backward-solid_1_dpek7z.svg"
                          alt="double forward icon"
                          className={management["forward-to-workspace-icon"]}
                        />
                      </RouteLink>
                      <InputText
                        id="workspace-name"
                        value={workspace.workspacename}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setUpdateAWorkspace({
                            ...updateAWorkspace,
                            workspacedescription: e.target.value,
                          });
                        }}
                        placeholder={"Update workspace name"}
                        className={management["workspace-name"]}
                      />
                      {/* based on boolean expression for onfocus and off focus  */}
                      <textarea
                        cols={12}
                        id="workspace-description"
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
                        className={management["workspace-description"]}
                      />
                    </Div>
                    <Div
                      className={management["workspace-sheet-forefront-data"]}
                    >
                      <Button
                        id="create-workspace-sheet"
                        className={management["update-workspace-sheet"]}
                        onClick={updateWorkspace}
                      >
                        Update
                      </Button>
                    </Div>
                  </Div>
                </Div>
              );
            })}

            {displayNewWorkspace ? (
              <Div className={management["workspace-sheet-wrapper"]}>
                <form
                  className={management["workspace-sheet"]}
                  onSubmit={saveWorkspace}
                >
                  <Div className={management["workspace-sheet-forefront-data"]}>
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
                      className={management["workspace-name"]}
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
                      className={management["workspace-description"]}
                    />
                  </Div>
                  <Div className={management["workspace-sheet-forefront-data"]}>
                    <InputSubmit
                      value="Save Workspace"
                      id="create-workspace-sheet"
                      className={management["create-workspace-sheet"]}
                    />
                  </Div>
                </form>
              </Div>
            ) : null}
          </Div>
          <Div className={management["controls"]}>
            <Div className={management["button-wrapper"]}>
              <Button
                id="create-new-workspace-sheet-button"
                className={management["create-new-workspace-sheet-button"]}
                onClick={addNewWorkspace}
              >
                {"\u002B"}
              </Button>
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default DataManagement;
