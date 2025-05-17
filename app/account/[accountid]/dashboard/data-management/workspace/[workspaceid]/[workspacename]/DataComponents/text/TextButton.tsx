"use client";
import Button from "@/src/components/form-elements/Button";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import { useTextContext } from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/DataComponents/text/TextContextProvider";
import Div from "@/src/ui/Div";

export const TextButton = () => {
  const { textToggleState, toggleTextState } = useTextContext();
  console.log(textToggleState);
  return (
    <Button
      id="text-comp"
      onClick={toggleTextState}
      className={workspaceDataManagement["text-comp"]}
    >
      Text
    </Button>
  );
};

// export const NewText = () => {
// const [newTextComponent, setNewTextComponent] = useState<any>({
//   text: "",
// });
// return { newTextComponent, setNewTextComponent };
// };

//create a new Text Component
// export const addTextComponent = () => {
// return { addTextComponent };
// };

//update text compononent data in db
// const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setNewTextComponent({
//     ...newTextComponent,
//     text: e.target.value,
//   });
// };
