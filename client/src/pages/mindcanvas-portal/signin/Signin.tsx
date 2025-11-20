import { DivClass } from "../../../../src/ui/Div";
import Section from "../../../../src/ui/Section";
import Label from "../../../../src/components/form-elements/Label";
import HeadingOne from "../../../../src/ui/HeadingOne";
import "../mind-canvas-portal.css";
// import "../mind-canvas-portal-media-queries.css";

import React, { FormEvent, useEffect, useState } from "react";
import {
  InputEmail,
  InputPassword,
  InputSubmit,
} from "../../../../src/components/form-elements/InputTypeInterfaces";
import Contact from "../../../../src/components/ProductSection/Contact";
import { LongText } from "../../../../src/ui/LongText";
import Button from "../../../../src/components/form-elements/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RouteLink from "../../../components/ProductSection/RouteLink";

const Signin = () => {
  try {
    // useEffect(()=>{
    //   const screenSizeL = window.innerHeight;
    //   console.log("height: ", screenSizeL);

    //   const screenSizeW = window.innerWidth;
    //   console.log("width: ", screenSizeW);

    // })
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
          new Notification("Complete the login fields");
          return;
        }

        //data will be sent to the backend from here
        const response = await fetch(
          "http://localhost:5000/api/signin-portal",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          }
        );
        //want to try a new feature: socket.io
        //for real-time notifcations to check login success or failed to verify
        if (response.ok) {
          const data: any = await response.json();
          // console.log("pulled data", data);

          router(`/account/${data.user}/canvas-management`);
        } else {
          const error = await response.json();
          new Notification(`Signin failed: ${error.message}`);
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
        </form>
        <DivClass className="may-need-account">
          <LongText className="no-account">
            Don{"\u2019"}t have an account?
          </LongText>
          <LongText className="register-for-access">
            <RouteLink href="/signup-portal" className="route-link">
              Create Your Profile
            </RouteLink>
          </LongText>
        </DivClass>
        <DivClass className="cancel-btn-wrapper">
          <Button
            id="cancel-verification"
            className="cancel-verification"
            onClick={formCancelled}
          >
            <NavLink to="/">Go Back</NavLink>
          </Button>
        </DivClass>
      </Section>
    );
  } catch (err: any) {
    console.warn("Error: ", err.message);
  }
};

export default Signin;
