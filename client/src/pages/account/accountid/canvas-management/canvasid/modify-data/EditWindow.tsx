import Div from "../src/ui/Div";
import style from "../app/style-files/modification-window.module.scss";
import ShortText from "../src/ui/ShortText";
import Button from "../src/components/form-elements/Button";
import { useModificationContext } from "./InfoModificationContextProvider";
import StyleDiv from "../src/ui/StylineDiv";

//ReactNode and live component data
export const EditWindow = ({ componentData }: { componentData: any }) => {
  const {
    toggleEditStateFunc,
    toggleModificationState,
    newComponentData,
    editLiveDataElement,
    updateComponentData,
  } = useModificationContext();

  const { owner, _id, workspaceId, workspacename, text, type } = componentData;
  console.log(owner, _id, workspaceId, workspacename, text, type);

  return (
    <Div className={style["edit-window-container"]}>
      <ShortText className={style["window-heading"]}>
        You are editing:
      </ShortText>
      <Div className={style["update-box"]}>
        <Div className={style["box-one"]}>
          <Div className={style["pull-data-container"]}>
            <textarea
              className={style["pulled-data"]}
              disabled
              value={text}
            ></textarea>
          </Div>
          <Button
            id="change-windows"
            onClick={() => {
              toggleEditStateFunc();
              toggleModificationState();
            }}
            className={style["change-windows"]}
          >
            Back
          </Button>
        </Div>
        <StyleDiv className={style["style-div"]}></StyleDiv>
        <Div className={style["box-two"]}>
          <Div className={style["new-text"]}>
            <textarea
              className={style["new-data"]}
              rows={8}
              value={newComponentData}
              required
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                updateComponentData(e.target.value);
                return;
              }}
              placeholder="Your new data"
            />
          </Div>
          <StyleDiv className={style["new-text-style-div"]}></StyleDiv>
          <button
            type="submit"
            className={style["update-button"]}
            id="edit-button"
            onClick={() => {
              // _id is the componont being edited
              editLiveDataElement(
                owner,
                _id,
                workspaceId,
                workspacename,
                newComponentData
              );
              //   console.log(data);
            }}
          >
            Update
          </button>
        </Div>
      </Div>
    </Div>
  );
};
