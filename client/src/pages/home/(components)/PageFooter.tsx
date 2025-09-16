import Footer from "../../../../src/components/Footer";
import { DivClass } from "../../../../src/ui/Div";
import ShortText from "../../../../src/ui/ShortText";

const PageFooter = () => {
  return (
    <Footer id="home-footer" className="home-footer">
      <DivClass className="creator">
        <ShortText className="project-creator">
          Created by Christeen Fabian | The Code Hashira
        </ShortText>
      </DivClass>
    </Footer>
  );
};

export default PageFooter;
