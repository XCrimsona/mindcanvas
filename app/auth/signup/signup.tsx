import HeadingOne from "@/src/ui/HeadingOne";
import Section from "@/src/ui/Section";

const Signup = () => {
  return (
    <Section id="signup" className="signup" ariaLabelledBy="">
      <HeadingOne id="heading-one" className="heading-one">
        Sign Up
      </HeadingOne>
    </Section>
  );
};

export default Signup;
