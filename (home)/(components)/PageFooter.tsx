"use client";
import Footer from "@/src/components/Footer";
import Div from "@/src/ui/Div";
import ShortText from "@/src/ui/ShortText";

const PageFooter = () => {
  return (
    <Footer id="home-footer" className="home-footer">
      <Div className="creator">
        <ShortText className="project-creator">
          Created by Christeen Fabian | MysteriousTechLady
        </ShortText>
      </Div>
    </Footer>
  );
};

export default PageFooter;
