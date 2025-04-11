"use client";
import Div from "@/src/ui/Div";
import PageHeader from "@/app/(home)/(components)/PageHeader";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import HeadingOne from "@/src/ui/HeadingOne";

const ImageEditing = () => {
  return (
    <>
      <PageHeader />
      <Div className="account-image-editing-tools">
        <HeadingOne id="heading-one" className="heading-one">
          Image Editing section 4
        </HeadingOne>
      </Div>
      <PageFooter />
    </>
  );
};

export default ImageEditing;
