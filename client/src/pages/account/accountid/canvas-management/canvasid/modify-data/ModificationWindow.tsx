" use client";
import style from "../app/style-files/modification-window.module.scss";
import { useModificationContext } from "./InfoModificationContextProvider";
import Div from "../src/ui/Div";
import Button from "../src/components/form-elements/Button";
export const ModificationWindow = ({ componentData }: any) => {
  const {
    toggleEditStateFunc,
    toggleModificationState,
    mouseClickDelete,
    deleteLiveDataElement,
  } = useModificationContext();

  console.log(componentData);

  const { owner, _id, workspaceId, workspacename, type } = componentData;
  console.log(owner, _id, workspaceId, workspacename, type);

  return (
    <Div className={style["modifications-window-container"]}>
      <Button
        className={style["edit-button"]}
        id="edit-button"
        onClick={() => {
          toggleModificationState();
          toggleEditStateFunc();
        }}
      >
        Edit
      </Button>
      <hr
        style={{
          width: "94%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <Button
        className={style["delete-button"]}
        id=""
        // id={`${_id}`}
        onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
          mouseClickDelete(e);
          deleteLiveDataElement(owner, _id, workspaceId, workspacename, type);
        }}
      >
        Delete
      </Button>
    </Div>
  );
};
