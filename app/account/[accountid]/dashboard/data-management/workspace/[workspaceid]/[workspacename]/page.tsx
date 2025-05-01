import Div from "@/src/ui/Div";
import workspaceDataManagement from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/workspace-data-management.module.scss";
import LongText from "@/src/ui/LongText";
import AuthHeader from "@/app/account/[accountid]/dashboard/data-management/workspace/[workspaceid]/[workspacename]/(header)/AuthHeader";
const Page = async ({ params }: any) => {
  const { workspacename } = await params;

  return (
    <Div
      className={workspaceDataManagement["work-data-management-main-container"]}
    >
      <AuthHeader />

      <h1 className={workspaceDataManagement["heading-one"]}>
        You are currenctly editing: {workspacename}
      </h1>
      <Div
        className={workspaceDataManagement["work-data-management-container"]}
      >
        <Div
          className={workspaceDataManagement["work-data-management-cluster"]}
        >
          <LongText
            className={
              workspaceDataManagement["work-data-management-cluster-data"]
            }
          >
            Workspace with data component drag,drop,keyboard, and behind the
            scenes animation capabilities
          </LongText>
        </Div>
      </Div>
    </Div>
  );
};

export default Page;
