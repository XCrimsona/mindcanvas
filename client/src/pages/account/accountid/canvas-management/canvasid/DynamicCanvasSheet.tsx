import Div from "../src/ui/Div";
import dynamicCanvasSheet from "../app/style-files/dynamicCanvasSheet.module.scss";
import AuthHeader from "../app/account/[accountid]/canvas-management/[canvasid]/(header)/AuthCanvasHeader";
import DataContainer from "../app/account/[accountid]/canvas-management/[canvasid]/DataContainer";
import CanvasDataContextProvider from "./DataComponents/canva-data-provider/CanvasDataContextProvider";
import InfoModificationContextProvider from "./modify-data/InfoModificationContextProvider";
import CanvasCoreFunctionality from "../app/account/[accountid]/canvas-management/[canvasid]/CanvasHub/CanvasCoreFunctionality";
import { CanvasContextDeletionProvider } from "./delete-data/CanvasDeletionOpsContext";
import DeleteCanvas from "./CanvasDeletion/DeleteCanvas";
import PrimaryControlsAndDetails from "../app/account/[accountid]/canvas-management/[canvasid]/PrimaryControlsAndDetails";
const DynamicCanvasSheet = ({ params }: any) => {
  try {
    return (
      <>
        <Div
          className={
            dynamicWorkspaceSheet["work-workspace-management-main-container"]
          }
        >
          <AuthHeader />
          <Div
            className={
              dynamicWorkspaceSheet[
                "work-workspace-management-container-wrapper"
              ]
            }
          >
            <CanvasDataContextProvider params={params}>
              <InfoModificationContextProvider>
                <CanvasContextDeletionProvider params={params}>
                  <DeleteCanvas params={params} />
                  <Div
                    className={
                      dynamicWorkspaceSheet[
                        "work-workspace-management-container"
                      ]
                    }
                  >
                    <PrimaryControlsAndDetails params={params} />
                    <CanvasCoreFunctionality params={params} />
                    <DataContainer params={params} />
                  </Div>
                </CanvasContextDeletionProvider>
              </InfoModificationContextProvider>
            </CanvasDataContextProvider>
          </Div>
        </Div>
      </>
    );
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default DynamicCanvasSheet;
