"use client";
import Div from "@/src/ui/Div";
import Section from "@/src/ui/Section";
import Label from "@/src/components/form-elements/Label";
import HeadingOne from "@/src/ui/HeadingOne";
import authstyles from "@/app/style-files/auth.module.scss";
import React, { FormEvent, useEffect, useState } from "react";
import {
  InputEmail,
  InputPassword,
  InputSubmit,
} from "@/src/components/form-elements/InputTypeInterfaces";
import Contact from "@/src/components/ProductSection/Contact";
import LongText from "@/src/ui/LongText";
import Button from "@/src/components/form-elements/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Signin = () => {
  try {
    const router = useRouter();

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
        const response: any = await fetch("/api/signin", {
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
          router.push(
            `http://localhost:3000/account/${data.data._id}/dashboard/workspace-management`
          );
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
        className={authstyles["sign-in-block"]}
      >
        <HeadingOne id="sign-in" className={authstyles["heading-one"]}>
          Sign In
        </HeadingOne>
        <form
          className={authstyles["form-sign-in"]}
          onSubmit={processSignIn}
          autoSave="off"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
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
              onClick={formCancelled}
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

export default Signin;
