import DynamicWorkspaceSheet from "./DynamicWorkspaceSheet";
const Page = async ({ params }: any) => {
  try {
    const { workspacename, workspaceid } = await params;
    const data = { workspacename, workspaceid };
    return <DynamicWorkspaceSheet params={data} />;
  } catch (err: any) {
    console.warn("Someting broke on the workspace page: ", err.message);
  }
};

export default Page;
