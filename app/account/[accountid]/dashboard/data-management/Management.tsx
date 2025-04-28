"use client";
import Div from "@/src/ui/Div";

import management from "@/app/account/[accountid]/dashboard/data-management/(css)/management.module.scss";
import Button from "@/src/components/form-elements/Button";
import { InputText } from "@/src/components/form-elements/InputTypeInterfaces";
// import RouteLink from "@/src/components/ProductSection/RouteLink";
import { FormEvent, useState } from "react";

interface IPulledDataProps {
  name: String;
  workspacename: string;
  workspacedescription: string;
}

interface IWorkspaceProps {
  workspacename: string;
  workspacedescription: string;
}
const DataManagement = ({ params }: { params: any }) => {
  const pulledData: IPulledDataProps = {
    name: params.data.name,
    workspacename: params.data.workspacename,
    workspacedescription: params.data.workspacedescription,
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
  const saveWorkspace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveNewWorkspace({
      ...newWorkspace,
      workspacename: e.target.value,
      workspacedescription: e.target.value,
    });
    const response = await fetch(
      `http://localhost:3000/api/account/${params.data._id}/dashboard/data-management`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveNewWorkspace),
      }
    );
    if (response.ok) {
      alert("New workspace saved!");
      setDisplayNewWorkspace(false);
    } else {
      alert("New workspace not saved!");
    }
  };

  //used to update existing cloud data
  const [updateAWorkspace, setUpdateAWorkspace] = useState<IWorkspaceProps>({
    workspacename: "",
    workspacedescription: "",
  });

  const updateWorkspace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // updating a specific workspace on at a time
    setSaveNewWorkspace({
      ...newWorkspace,
      workspacename: e.target.value,
      workspacedescription: e.target.value,
    });
    const response = await fetch(
      `http://localhost:3000/api/account/${params.data._id}/dashboard/data-management`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveNewWorkspace),
      }
    );
    if (response.ok) {
      alert("New workspace saved!");
      setDisplayNewWorkspace(false);
    } else {
      alert("New workspace not saved!");
    }
  };

  return (
    <>
      <Div className={management["workspace-dashboard"]}>
        <Div className={management["workspace-sheets-wrapper"]}>
          <Div className={management["workspace-sheets"]}>
            {/* {params.data.firstname} */}
            <Div className={management["workspace-sheet-wrapper"]}>
              {/* params.workspaceName */}

              {/* Workspace sheet appear here */}
              {/* temp div field */}
              <Div className={management["workspace-sheet"]}>
                {/* // mapping required  */}
                {/* // <RouteLink */}
                {/* //   href={`http://localhost:3000/api/account/${accountid}/dashboard/data-management`} */}
                {/* //   className="" */}
                {/* // > */}
                {/* //   <SVG src="" alt="" className=""></SVG>{" "} */}
                {/* // </RouteLink>  */}
                <Div className={management["workspace-sheet-forefront-data"]}>
                  <InputText
                    id="workspace-description"
                    value={pulledData.workspacename}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUpdateAWorkspace({
                        ...updateAWorkspace,
                        workspacedescription: e.target.value,
                      });
                    }}
                    placeholder={"Update workspace name"}
                    className={management["workspace-name"]}
                  />
                  {/* based on boolean expression for onfocus and off focus */}
                  <InputText
                    id="workspace-description"
                    value={pulledData.workspacedescription}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUpdateAWorkspace({
                        ...updateAWorkspace,
                        workspacedescription: e.target.value,
                      });
                    }}
                    placeholder={"Update workspace description"}
                    className={management["workspace-description"]}
                  />
                </Div>
                <Div className={management["workspace-sheet-forefront-data"]}>
                  <Button
                    id="create-workspace-sheet"
                    className={management["create-workspace-sheet"]}
                    onClick={updateWorkspace}
                  >
                    Update
                  </Button>
                </Div>
              </Div>
            </Div>
            <Div className={management["workspace-sheet-wrapper"]}>
              {displayNewWorkspace ? (
                <Div className={management["workspace-sheet"]}>
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
                    <InputText
                      id="workspace-description"
                      value={newWorkspace.workspacedescription}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <Button
                      id="create-workspace-sheet"
                      className={management["create-workspace-sheet"]}
                      onClick={saveWorkspace}
                    >
                      Save Workspace
                    </Button>
                  </Div>
                </Div>
              ) : null}
            </Div>
          </Div>
          <Div className={management["controls"]}>
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
    </>
  );
};

export default DataManagement;
