import { DivClass } from "../../../../src/ui/Div";
import Section from "../../../../src/ui/Section";
import Label from "../../../../src/components/form-elements/Label";
import HeadingOne from "../../../../src/ui/HeadingOne";
import "../../../style-files/auth.css";
import React, { FormEvent, useEffect, useState } from "react";
import {
  InputEmail,
  InputPassword,
  InputSubmit,
} from "../../../../src/components/form-elements/InputTypeInterfaces";
import Contact from "../../../../src/components/ProductSection/Contact";
import LongText from "../../../../src/ui/LongText";
import Button from "../../../../src/components/form-elements/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  try {
    const router = useNavigate();

    //Data controls | input containers
    interface formDataInterface {
      email: string;
      password: string;
    }
    const [formData, setFormData] = useState<formDataInterface>({
      email: "",
      password: "",
    });

    const processSignIn = async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        const loginData: any = {};
        if (formData.email) loginData.email = formData.email;
        if (formData.password) loginData.password = formData.password;
        if (!loginData) {
          alert("Complete the login fields");
          return;
        }
        //data will be sent to the backend from here
        const response = await fetch("/api/signup-portal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        //want to try a new feature: socket.io
        //for real-time notifcations to check login success or failed to verify
        if (response.ok) {
          const data: any = await response.json();
          // router(
          //   `http://localhost:3000/account/${data.data._id}/canvas-management`
          // );
        } else {
          const error = await response.json();
          console.warn("frontend sigin error: ", error);
        }
      } catch (err: any) {
        console.warn("Something went wrong");
      }
    };

    const formCancelled = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormData({
        ...formData,
        email: "",
        password: "",
      });
    };

    return (
      <Section
        id="sign-in-container"
        ariaLabelledBy="sign-in"
        className="sign-in-block"
      >
        <HeadingOne id="sign-in" className="heading-one">
          Sign In
        </HeadingOne>
        <form
          className="form-sign-in"
          onSubmit={processSignIn}
          autoSave="off"
          autoCorrect="off"
          autoComplete="off"
          autoFocus={false}
          autoCapitalize="off"
        >
          <DivClass className="form-data-container">
            <DivClass className="label-wrapper">
              <Label
                htmlfor="email-input"
                className="sign-in-label"
                text="Email"
              />
            </DivClass>
            <DivClass className="input-wrapper">
              <InputEmail
                id="email-input"
                placeholder="Type in your email"
                className="email-input"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </DivClass>
          </DivClass>
          <DivClass className="form-data-container">
            <DivClass className="label-wrapper">
              <Label
                htmlfor="password-input"
                className="sign-in-label"
                text="Password"
              />
            </DivClass>
            <DivClass className="input-wrapper">
              <InputPassword
                id="password-input"
                placeholder="Type in your password"
                className="password-input"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </DivClass>
          </DivClass>
          <DivClass className="submit-btn-wrapper">
            <InputSubmit id="submit" className="submit" value="Verify" />
          </DivClass>
          <DivClass className="cancel-btn-wrapper">
            <Button
              id="cancel-verification"
              className="cancel-verification"
              onClick={formCancelled}
            >
              <Link href={"/"}>Cancel</Link>
            </Button>
          </DivClass>
        </form>
        <DivClass className="may-need-account">
          <LongText className="no-account">
            Don{"\u2019"}t have an account?
          </LongText>
          <LongText className="get-access">
            Contact{" "}
            <Contact href="tel:+27726053548" className="contact">
              +27 72-605-3548
            </Contact>{" "}
            to get access.
          </LongText>
        </DivClass>
      </Section>
    );
  } catch (err: any) {
    console.warn("Error: ", err.message);
  }
};

export default Signin;
