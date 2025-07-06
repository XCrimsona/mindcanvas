"use client";
import Div from "@/src/ui/Div";
import Section from "@/src/ui/Section";
import Label from "@/src/components/form-elements/Label";
import HeadingOne from "@/src/ui/HeadingOne";
import authstyles from "@/app/auth/auth.module.scss";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  InputConfirmPassword,
  InputDate,
  InputEmail,
  InputPassword,
  InputSelect,
  InputSubmit,
  InputText,
} from "@/src/components/form-elements/InputTypeInterfaces";

import LongText from "@/src/ui/LongText";
import Button from "@/src/components/form-elements/Button";
import Link from "next/link";
import RouteLink from "@/src/components/ProductSection/RouteLink";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  try {
    //Data controls | input containers
    interface formDataInterface {
      firstname: string;
      lastname: string;
      gender?: string | undefined;
      dob?: string | undefined;
      email: string;
      password: string;
      confirmpassword: string;
    }
    const [formData, setFormData] = useState<formDataInterface>({
      firstname: "",
      lastname: "",
      gender: "",
      dob: "",
      email: "",
      password: "",
      confirmpassword: "",
    });

    const processSignup = async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        console.log(formData);

        //extra sanitation incase devtools manipulate input
        const requiredFields =
          formData.firstname &&
          formData.lastname &&
          formData.email &&
          formData.password &&
          formData.confirmpassword;
        if (!requiredFields) {
          alert("please complete required fields for signup!");
          return;
        } else if (formData.confirmpassword !== formData.password) {
          alert("Passwords do not match!");
          return;
        } else {
          //data will be sent to the backend from here
          const response: any = await fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          //want to try a new feature: socket.io
          //for real-time notifcations to check login success or failed to verify
          const data = await response.json();
          if (response.ok) {
            // redirect to dashboard
            alert("welcome");
            router.push(`/account/${data._id}/dashboard`);
          } else {
            //reload and remain on signup page
            alert(data.error);
          }
        }
      } catch (err: any) {
        console.warn("Something went wrong");
      }
    };

    const signupCancelled = () => {
      setFormData({
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    };

    const gender = [
      "Prefer not to specify",
      "Female",
      "Male",
      "Transgender",
      "Non-binary",
      "Other",
    ];
    return (
      <Section
        id="sign-up-container"
        ariaLabelledBy="sign-up"
        className={authstyles["sign-up-block"]}
      >
        <HeadingOne id="sign-up" className={authstyles["heading-one"]}>
          Sign Up
        </HeadingOne>
        <form
          className={authstyles["form-sign-up"]}
          onSubmit={processSignup}
          autoSave="on"
          autoCorrect="off"
          autoComplete="off"
          autoFocus={false}
          autoCapitalize="off"
        >
          {/* //fist name */}
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="firstname-input"
                className={authstyles["sign-up-label-firstname"]}
                text="First Name"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputText
                id="firstname-input"
                placeholder="Type in your first name"
                className={authstyles["firstname-input"]}
                value={formData.firstname}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, firstname: e.target.value });
                }}
              />
            </Div>
          </Div>
          {/* //last name */}
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="lastname-input"
                className={authstyles["sign-up-label-lastname"]}
                text="Last Name"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputText
                id="lastname-input"
                placeholder="Type in your last name"
                className={authstyles["lastname-input"]}
                value={formData.lastname}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, lastname: e.target.value });
                }}
              />
            </Div>
          </Div>
          {/* //gender */}
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="gender-input"
                className={authstyles["sign-up-label-gender"]}
                text="Gender (Optional)"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputSelect
                id="gender-input"
                className={authstyles["gender-input"]}
                value={formData.gender ? formData.gender : ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
              >
                {gender.map((item: any, index: number) => {
                  return (
                    <option id={`option${index}`} key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </InputSelect>
            </Div>
          </Div>
          {/* //dob */}
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="dob-input"
                className={authstyles["sign-up-label-dob"]}
                text="DoB (Optional)"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <input
                type="date"
                id="dob-input"
                className={authstyles["dob-input"]}
                value={formData.dob ? formData.dob : ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, dob: e.target.value });
                }}
              />
            </Div>
          </Div>
          {/* //email */}
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="email-input"
                className={authstyles["sign-up-label-email"]}
                text="Email"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputEmail
                id="email-input"
                placeholder="Type in your Email"
                className={authstyles["email-input"]}
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </Div>
          </Div>
          {/* //password */}
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="password-input"
                className={authstyles["sign-up-label-password"]}
                text="Password"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputPassword
                id="password-input"
                placeholder="Type in your new password"
                className={authstyles["password-input"]}
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </Div>
          </Div>
          {/* //confirm password */}
          <Div className={authstyles["form-data-container"]}>
            <Div className={authstyles["label-wrapper"]}>
              <Label
                htmlfor="confirm-password-input"
                className={authstyles["sign-up-label-confirm-password"]}
                text="Confirm password"
              />
            </Div>
            <Div className={authstyles["input-wrapper"]}>
              <InputConfirmPassword
                id="confirm-password-input"
                placeholder="Confirm your new password"
                className={authstyles["confirm-password-input"]}
                value={formData.confirmpassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormData({ ...formData, confirmpassword: e.target.value });
                }}
              />
            </Div>
          </Div>
          <Div className={authstyles["submit-btn-wrapper"]}>
            <InputSubmit
              id="submit"
              className={authstyles["submit"]}
              value="Sign Up"
            />
          </Div>
          <Div className={authstyles["cancel-btn-wrapper"]}>
            <Button
              id="cancel-signup"
              className={authstyles["cancel-signup"]}
              onClick={signupCancelled}
            >
              <Link href={"/"}>Cancel</Link>
            </Button>
          </Div>
        </form>
        <Div className={authstyles["may-need-account"]}>
          <LongText className={authstyles["have-an-account"]}>
            Already have an account?
          </LongText>
          <LongText className={authstyles["login-access"]}>
            <RouteLink
              className={authstyles["login-route-link"]}
              href="/auth/signin"
            >
              Sign in
            </RouteLink>
          </LongText>
        </Div>
      </Section>
    );
  } catch (err: any) {
    console.warn("Error: ", err.message);
  }
};

export default Signup;
