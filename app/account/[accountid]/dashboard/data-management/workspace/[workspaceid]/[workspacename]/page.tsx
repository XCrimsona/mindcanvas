import Div from "@/src/ui/Div";

const Page = async ({ params }: any) => {
  const { workspacename } = await params;

  return (
    <Div className="">
      <h1>You are currenctly editing: {workspacename}</h1>
    </Div>
  );
};

export default Page;
