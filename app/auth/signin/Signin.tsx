"use client";
import Div from "@/src/ui/Div";
import Section from "@/src/ui/Section";
import Label from "@/src/components/form-elements/Label";
import HeadingOne from "@/src/ui/HeadingOne";
const Signin = () => {
  return (
    <Section id="" ariaLabelledBy="" className="">
      <HeadingOne id="sign-in" className="sign-in">
        Sign In
      </HeadingOne>
      <form>
        <legend>Firstname</legend>
        <fieldset>
          <div>
            <Label htmlfor="" className="" text="Signin" />
            <input />
          </div>
        </fieldset>
      </form>
    </Section>
  );
};

export default Signin;
