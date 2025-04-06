"use client";
import Div from "@/src/ui/Div";
import Section from "@/src/ui/Section";
import Label from "@/src/components/form-elements/Label";
import HeadingOne from "@/src/ui/HeadingOne";
import authstyles from "@/app/auth/auth.module.scss";
import React, { FormEvent, useState } from "react";
import {
  InputEmail,
  InputPassword,
  InputSubmit,
} from "@/src/components/form-elements/InputTypeInterfaces";
import Contact from "@/src/components/ProductSection/Contact";
import LongText from "@/src/ui/LongText";
import Button from "@/src/components/form-elements/Button";
import Link from "next/link";

const Signup = () => {
  try {
    //Data controls | input containers
    interface formDataInterface {
      firstname: string;
      lastname: string;
      gender?: string;
      dob?: string;
      email: string;
      password: string;
    }
    const [formData, setFormData] = useState<formDataInterface>({
      firstname: "",
      lastname: "",
      gender: "",
      dob: "",
      email: "",
      password: "",
    });

    //Updating field states
    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    //
    const processSignup = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      alert("This is the submit process");
    };

    return (
      <Section
        id="sign-in-container"
        ariaLabelledBy="sign-in"
        className={authstyles["sign-in-block"]}
      >
        <HeadingOne id="sign-in" className={authstyles["heading-one"]}>
          Sign In
        </HeadingOne>
        <form
          className={authstyles["form-sign-in"]}
          onSubmit={processSignup}
          autoSave="on"
          autoCorrect="off"
          autoComplete="off"
          autoFocus={false}
          autoCapitalize="off"
        >
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="email-input"
                className={authstyles["sign-in-label"]}
                text="Email"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputEmail
                id="email-input"
                placeholder="Type in your email"
                className={authstyles["email-input"]}
                value={formData.email}
                onChange={updateFormData}
              />
            </Div>
          </Div>
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="password-input"
                className={authstyles["sign-in-label"]}
                text="Password"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputPassword
                id="password-input"
                placeholder="Type in your password"
                className={authstyles["password-input"]}
                value={formData.password}
                onChange={updateFormData}
              />
            </Div>
          </Div>
          <Div className={authstyles["submit-btn-wrapper"]}>
            <InputSubmit
              id="submit"
              className={authstyles["submit"]}
              value="Verify"
            />
          </Div>
          <Div className={authstyles["cancel-btn-wrapper"]}>
            <Button
              id="cancel-verification"
              className={authstyles["cancel-verification"]}
            >
              <Link href={"/"}>Cancel</Link>
            </Button>
          </Div>
        </form>
        <Div className={authstyles["may-need-account"]}>
          <LongText className={authstyles["no-account"]}>
            Don{"\u2019"}t have an account?
          </LongText>
          <LongText className={authstyles["get-access"]}>
            Contact{" "}
            <Contact href="tel:+27726053548" className={authstyles["contact"]}>
              +27 72-605-3548
            </Contact>{" "}
            to get access.
          </LongText>
        </Div>
      </Section>
    );
  } catch (err: any) {
    console.warn("Error: ", err.message);
  }
};

export default Signup;
