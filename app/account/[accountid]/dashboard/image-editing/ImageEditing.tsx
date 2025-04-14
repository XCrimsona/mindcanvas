"use client";
import Div from "@/src/ui/Div";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../AuthHeader";

const ImageEditing = () => {
  return (
    <>
      <AuthHeader />
      <Div className="account-image-editing-tools">
        <HeadingOne id="heading-one" className="heading-one">
          Image Editing section 4 | Coming Soon
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default ImageEditing;
