"use client";
import PageFooter from "@/app/(home)/(components)/PageFooter";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "../AuthHeader";
import info from "@/app/account/[accountid]/dashboard/account-info/(css)/info.module.scss";
import ShortText from "@/src/ui/ShortText";
import Footer from "@/src/components/Footer";
import {
  InputDisabledText,
  InputEnabledText,
  InputPassword,
  InputSubmit,
  InputText,
} from "@/src/components/form-elements/InputTypeInterfaces";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import Label from "@/src/components/form-elements/Label";
import Button from "@/src/components/form-elements/Button";
import PipeSpan from "@/src/components/PipeSpan";

const Info = () => {
  //define form field data types and input
  interface formDataInterface {
    firstname: string;
    lastname: string;
    gender?: string | undefined;
    dob?: string | undefined;
    email: string;
    password: string;
    confirmpassword: string;
  }
  const [formData, setNewFormData] = useState<formDataInterface>({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  //used to control which fields are read only and which can be editable with the below interface object and useState
  interface formFieldToggleProps {
    firstname: boolean;
    lastname: boolean;
    gender: boolean;
    dob: boolean;
    email: boolean;
    password: boolean;
    confirmpassword: boolean;
  }

  //auth controls whether user can update their credentials
  //below code design is temporary
  const [formFieldToggle, setformFieldToggle] = useState<formFieldToggleProps>({
    firstname: false,
    lastname: false,
    gender: false,
    dob: false,
    email: false,
    password: false,
    confirmpassword: false,
  });

  const gender = [
    "Prefer not to specify",
    "Female",
    "Male",
    "Transgender",
    "Non-binary",
    "Other",
  ];
  //pull data from the cloud to display in read only fields
  // useEffect(() => {
  //   try {
  //     const data = fetch("api/account/2938423/dashboard/account-info"); //number must be an actual user from db
  //     const resposne = await data.json();

  //     return; //replace with data object
  //   } catch (err: any) {
  //     console.warn("Something went wrong: ", err.message);
  //   }
  // }, []);

  //this area manages all submitted data
  const processSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Hello I am a submission!");
    //combine backend fetch api route with submission
    //16apr continues here
  };

  return (
    <>
      <AuthHeader />
      <Div className={info["account-info-content"]}>
        <HeadingOne id="heading-one" className={info["heading-one"]}>
          Account Info Start here
        </HeadingOne>
        <form method="POST" onSubmit={processSubmission}>
          <Div className="firstname-container">
            <Label
              htmlfor="firstname"
              className={info["update-firstname"]}
              text="Firstname"
            />
            {formFieldToggle.firstname ? (
              <Div className="data-control-container">
                <InputEnabledText
                  id="firstname-input"
                  className={"firstname-input"}
                  placeholder={"Update your firstname"}
                  value={formData.firstname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setNewFormData({ ...formData, firstname: e.target.value });
                  }}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState firstname to help control view and edit modes. This one disables field editing*/}
                <Button
                  id="disable-firstname-editing"
                  className="disable-firstname-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      firstname: !formFieldToggle.firstname,
                    });
                  }}
                >
                  Make View Only
                </Button>
              </Div>
            ) : (
              <Div className="data-control-container">
                <InputDisabledText
                  id="firstname-input"
                  className={"firstname-input"}
                  placeholder={""}
                  value={/*formData.firstname*/ "some name"}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState data.firstname to help control view and edit modes. This one enables field editing*/}
                <Button
                  id="enable-firstname-editing"
                  className="enable-firstname-editing"
                  onClick={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      firstname: !formFieldToggle.firstname,
                    });
                  }}
                >
                  Modify
                </Button>
              </Div>
            )}
          </Div>
          <Div className="lastname-container">
            <Label
              htmlfor="lastname"
              className={info["update-lastname"]}
              text="Lastname"
            />
            {formFieldToggle.lastname ? (
              <Div className="data-control-container">
                <InputEnabledText
                  id="lastname-input"
                  className={"lastname-input"}
                  placeholder={"Update your lastname"}
                  value={formData.lastname}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setNewFormData({ ...formData, lastname: e.target.value });
                  }}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState lastname to help control view and edit modes. This one disables field editing*/}
                <Button
                  id="disable-firstname-editing"
                  className="disable-firstname-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      lastname: !formFieldToggle.lastname,
                    });
                  }}
                >
                  Make View Only
                </Button>
              </Div>
            ) : (
              <Div className="data-control-container">
                <InputDisabledText
                  id="lastname-input"
                  className={"lastname-input"}
                  placeholder={""}
                  value={/*formData.lastname*/ "some name"}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState lastname to help control view and edit modes. This one enables field editing*/}
                <Button
                  id="enable-lastname-editing"
                  className="enable-lastname-editing"
                  onClick={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      lastname: !formFieldToggle.lastname,
                    });
                  }}
                >
                  Modify
                </Button>
              </Div>
            )}
          </Div>
          <Div className="gender-container">
            <Label
              htmlfor="gender"
              className={info["update-gender"]}
              text="Gender"
            />
            {formFieldToggle.gender ? (
              <Div className="data-control-container">
                <select
                  id="gender-input"
                  className={"gender-input"}
                  value={formData.gender ? formData.gender : ""}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    e.preventDefault();
                    setNewFormData({ ...formData, gender: e.target.value });
                  }}
                >
                  {gender.map((item: any, index: number) => {
                    return (
                      <option id={`option-${index}`} key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>

                <PipeSpan />
                {/* Button below is soleply programmed for updating useState gender to help control view and edit modes. This one disables field editing*/}
                <Button
                  id="disable-gender-editing"
                  className="disable-gender-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      gender: !formFieldToggle.gender,
                    });
                  }}
                >
                  Make View Only
                </Button>
              </Div>
            ) : (
              <Div className="data-control-container">
                <InputDisabledText
                  id="gender-input"
                  className={"gender-input"}
                  placeholder={""}
                  value={/*formData.gender*/ "some name"}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState gender to help control view and edit modes. This one enables field editing*/}
                <Button
                  id="enable-gender-editing"
                  className="enable-gender-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      gender: !formFieldToggle.gender,
                    });
                  }}
                >
                  Modify
                </Button>
              </Div>
            )}
          </Div>
          <Div className="dob-container">
            <Label htmlfor="dob" className={info["update-dob"]} text="Dob" />
            {formFieldToggle.dob ? (
              <Div className="data-control-container">
                <InputEnabledText
                  id="dob"
                  className={"dob-input"}
                  placeholder={"Update your DoB"}
                  value={formData.dob ? formData.dob : ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setNewFormData({ ...formData, dob: e.target.value });
                  }}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState dob to help control view and edit modes. This one disables field editing*/}
                <Button
                  id="disable-dob-editing"
                  className="disable-dob-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      dob: !formFieldToggle.dob,
                    });
                  }}
                >
                  Make View Only
                </Button>
              </Div>
            ) : (
              <Div className="data-control-container">
                <InputDisabledText
                  id="dob"
                  className={"dob-input"}
                  placeholder={""}
                  value={/*formData.dob*/ "some name"}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState dob to help control view and edit modes. This one enables field editing*/}
                <Button
                  id="enable-dob-editing"
                  className="enable-dob-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      dob: !formFieldToggle.dob,
                    });
                  }}
                >
                  Modify
                </Button>
              </Div>
            )}
          </Div>
          <Div className="email-container">
            <Label
              htmlfor="email"
              className={info["update-email"]}
              text="Email"
            />
            {formFieldToggle.email ? (
              // appear when form field email boolean state is true
              <Div className="data-control-container">
                <InputEnabledText
                  id="email"
                  className={"email-input"}
                  placeholder={"Update your email"}
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setNewFormData({ ...formData, email: e.target.value });
                  }}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState email to help control view and edit modes. This one disables field editing*/}
                <Button
                  id="disable-email-editing"
                  className="disable-email-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      email: !formFieldToggle.email,
                    });
                  }}
                >
                  Make View Only
                </Button>
              </Div>
            ) : (
              // appear when form field email boolean state is false
              <Div className="data-control-container">
                <InputDisabledText
                  id="email"
                  className={"email-input"}
                  placeholder={""}
                  value={/*formData.email*/ "some name"}
                />
                <PipeSpan />
                {/* Button below is soleply programmed for updating useState email to help control view and edit modes. This one enables field editing*/}
                <Button
                  id="enable-email-editing"
                  className="enable-email-editing"
                  onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setformFieldToggle({
                      ...formFieldToggle,
                      email: !formFieldToggle.email,
                    });
                  }}
                >
                  Modify
                </Button>
              </Div>
            )}
          </Div>
          <Div className="password-container">
            <Label
              htmlfor="new-password"
              className={info["update-password"]}
              text="Password"
            />
            <InputPassword
              id="new-password"
              className={"new-password"}
              placeholder={"Update to your new password"}
              value={formData.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setNewFormData({ ...formData, password: e.target.value });
              }}
            />
          </Div>
          <Div className="confirm-password-container">
            <Label
              htmlfor="confirm-new-password"
              className={info["confirm-new-password"]}
              text="Confirm New Password"
            />
            <InputPassword
              id="confirm-new-password"
              className={"confirm-new-password"}
              placeholder={"Confirm your new password"}
              value={formData.confirmpassword ? formData.confirmpassword : ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setNewFormData({
                  ...formData,
                  confirmpassword: e.target.value,
                });
              }}
            />
          </Div>
          <Div className="submit">
            <InputSubmit
              className="submit-btn"
              id="submit-btn"
              value="Update"
            />
          </Div>
          <Div className="cancel">
            <Button
              onClick={() => {
                alert(
                  " discarded! remember security check before clearing if data exists"
                );
              }}
              id="cancel-submit"
              className="cancel-submit"
            >
              Discard
            </Button>
          </Div>
        </form>
      </Div>
      <Footer id="account-info-footer" className={info["account-info-footer"]}>
        <Div className={info["project-creator"]}>
          <ShortText className={info["creator"]}>
            Created by Christeen Fabian
          </ShortText>
        </Div>
      </Footer>
    </>
  );
};

export default Info;
