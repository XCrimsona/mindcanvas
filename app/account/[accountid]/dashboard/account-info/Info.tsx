"use client";
import Div from "@/src/ui/Div";
import HeadingOne from "@/src/ui/HeadingOne";
import AuthHeader from "@/app/account/[accountid]/dashboard/(auth-header)/AuthHeader";
import info from "@/app/account/[accountid]/dashboard/account-info/(css)/info.module.scss";
import ShortText from "@/src/ui/ShortText";
import Footer from "@/src/components/Footer";
import {
  InputDate,
  InputDisabledText,
  InputEnabledText,
  InputPassword,
  InputSubmit,
} from "@/src/components/form-elements/InputTypeInterfaces";
import { ChangeEvent, FormEvent, useState } from "react";
import Label from "@/src/components/form-elements/Label";
import Button from "@/src/components/form-elements/Button";
import PipeSpan from "@/src/components/PipeSpan";

const Info = ({ params }: any) => {
  try {
    interface formDataInterface {
      firstname: string;
      lastname: string;
      gender?: string | undefined;
      dob?: string | undefined;
      email: string;
      ["current-password"]: string;
      ["new-password"]: string;
      ["confirm-new-password"]: string;
    }
    // define form field data types and input
    const [formData, setNewFormData] = useState<formDataInterface>({
      firstname: "",
      lastname: "",
      gender: "",
      dob: "",
      email: "",
      ["current-password"]: "",
      ["new-password"]: "",
      ["confirm-new-password"]: "",
    });

    //used to control which fields are read only and which can be editable with the below interface object and useState
    interface formFieldToggleProps {
      firstname: boolean;
      lastname: boolean;
      gender: boolean;
      dob: boolean;
      email: boolean;
      ["current-password"]: boolean;
      ["new-password"]: boolean;
      ["confirm-new-password"]: boolean;
    }

    //auth controls whether user can update their credentials
    //below code design is temporary
    const [formFieldToggle, setformFieldToggle] =
      useState<formFieldToggleProps>({
        firstname: false,
        lastname: false,
        gender: false,
        dob: false,
        email: false,
        ["current-password"]: false,
        ["new-password"]: false,
        ["confirm-new-password"]: false,
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

    const processSubmission = async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        console.log(formData);

        if (!formData) {
          alert("Please complete required fields");
        } else {
          const formattedFormData = {
            id: params.message._id,
            formData,
          };
          const updatedData = await fetch(
            `/api/account/${params.message._id}/dashboard/account-info`,
            {
              method: "PUT",
              body: JSON.stringify(formattedFormData),
            }
          );
          if (updatedData.ok) {
            alert("Successfully Updated");
          } else {
            alert("Failed to Update account info");
          }
        }
      } catch (err: any) {
        console.warn("Something went wrong: ", err.message);
      }
    };

    return (
      <>
        <AuthHeader />
        <Div className={info["account-info-content"]}>
          <HeadingOne id="heading-one" className={info["heading-one"]}>
            Account Info
          </HeadingOne>
          <form
            id="account-info-form"
            className={info["account-info-form"]}
            method="POST"
            onSubmit={processSubmission}
          >
            <Div className={info["firstname-container"]}>
              <Label
                htmlfor="firstname"
                className={info["update-firstname"]}
                text="Firstname"
              />
              {formFieldToggle.firstname ? (
                <Div className={info["data-control-container"]}>
                  <InputEnabledText
                    id="firstname"
                    className={info["firstname-input"]}
                    placeholder={"Update your First Name"}
                    value={formData.firstname}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewFormData({
                        ...formData,
                        firstname: e.target.value,
                      });
                    }}
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState firstname to help control view and edit modes. This one disables field editing*/}
                  <Button
                    id="disable-firstname-editing"
                    className={info["disable-firstname-editing"]}
                    onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setformFieldToggle({
                        ...formFieldToggle,
                        firstname: !formFieldToggle.firstname,
                      });
                    }}
                  >
                    View Only
                  </Button>
                </Div>
              ) : (
                <Div className={info["data-control-container"]}>
                  <InputDisabledText
                    id="firstname"
                    className={info["firstname-input"]}
                    placeholder={""}
                    value={
                      params.message.firstname
                        ? params.message.firstname
                        : "Not assigned"
                    }
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState data.firstname to help control view and edit modes. This one enables field editing*/}
                  <Button
                    id="enable-firstname-editing"
                    className={info["enable-firstname-editing"]}
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
            <Div className={info["lastname-container"]}>
              <Label
                htmlfor="lastname"
                className={info["update-lastname"]}
                text="Lastname"
              />
              {formFieldToggle.lastname ? (
                <Div className={info["data-control-container"]}>
                  <InputEnabledText
                    id="lastname"
                    className={info["lastname-input"]}
                    placeholder={"Update your Last Name"}
                    value={formData.lastname}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewFormData({ ...formData, lastname: e.target.value });
                    }}
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState lastname to help control view and edit modes. This one disables field editing*/}
                  <Button
                    id="disable-firstname-editing"
                    className={info["disable-lastname-editing"]}
                    onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setformFieldToggle({
                        ...formFieldToggle,
                        lastname: !formFieldToggle.lastname,
                      });
                    }}
                  >
                    View Only
                  </Button>
                </Div>
              ) : (
                <Div className={info["data-control-container"]}>
                  <InputDisabledText
                    id="lastname"
                    className={info["lastname-input"]}
                    placeholder={""}
                    value={
                      params.message.lastname
                        ? params.message.lastname
                        : "Not assigned"
                    }
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState lastname to help control view and edit modes. This one enables field editing*/}
                  <Button
                    id="enable-lastname-editing"
                    className={info["enable-lastname-editing"]}
                    onClick={(e: ChangeEvent<HTMLButtonElement>) => {
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
            <Div className={info["gender-container"]}>
              <Label
                htmlfor="gender"
                className={info["update-gender"]}
                text="Gender"
              />
              {formFieldToggle.gender ? (
                <Div className={info["data-control-container"]}>
                  <select
                    id="gender"
                    className={info["gender-input"]}
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

                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState gender to help control view and edit modes. This one disables field editing*/}
                  <Button
                    id="disable-gender-editing"
                    className={info["disable-gender-editing"]}
                    onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setformFieldToggle({
                        ...formFieldToggle,
                        gender: !formFieldToggle.gender,
                      });
                    }}
                  >
                    View Only
                  </Button>
                </Div>
              ) : (
                <Div className={info["data-control-container"]}>
                  <InputDisabledText
                    id="gender"
                    className={info["gender-input-disabled"]}
                    placeholder={""}
                    value={
                      params.message.gender
                        ? params.message.gender
                        : "Not assigned"
                    }
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState gender to help control view and edit modes. This one enables field editing*/}
                  <Button
                    id="enable-gender-editing"
                    className={info["enable-gender-editing"]}
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
            <Div className={info["dob-container"]}>
              <Label htmlfor="dob" className={info["update-dob"]} text="Dob" />
              {formFieldToggle.dob ? (
                <Div className={info["data-control-container"]}>
                  <InputDate
                    id="dob"
                    className={info["dob-input"]}
                    value={formData.dob ? formData.dob : ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewFormData({ ...formData, dob: e.target.value });
                    }}
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState dob to help control view and edit modes. This one disables field editing*/}
                  <Button
                    id="disable-dob-editing"
                    className={info["disable-dob-editing"]}
                    onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setformFieldToggle({
                        ...formFieldToggle,
                        dob: !formFieldToggle.dob,
                      });
                    }}
                  >
                    View Only
                  </Button>
                </Div>
              ) : (
                <Div className={info["data-control-container"]}>
                  <InputDisabledText
                    id="dob"
                    className={info["dob-input"]}
                    placeholder={""}
                    value={
                      params.message.dob ? params.message.dob : "Not assigned"
                    }
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState dob to help control view and edit modes. This one enables field editing*/}
                  <Button
                    id="enable-dob-editing"
                    className={info["enable-dob-editing"]}
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
            <Div className={info["email-container"]}>
              <Label
                htmlfor="email"
                className={info["update-email"]}
                text="Email"
              />
              {formFieldToggle.email ? (
                // appear when form field email boolean state is true
                <Div className={info["data-control-container"]}>
                  <InputEnabledText
                    id="email"
                    className={info["email-input"]}
                    placeholder={"Update your Email"}
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      setNewFormData({ ...formData, email: e.target.value });
                    }}
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState email to help control view and edit modes. This one disables field editing*/}
                  <Button
                    id="disable-email-editing"
                    className={info["disable-email-editing"]}
                    onClick={(e: ChangeEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setformFieldToggle({
                        ...formFieldToggle,
                        email: !formFieldToggle.email,
                      });
                    }}
                  >
                    View Only
                  </Button>
                </Div>
              ) : (
                // appear when form field email boolean state is false
                <Div className={info["data-control-container"]}>
                  <InputDisabledText
                    id="email"
                    className={info["email-input"]}
                    placeholder={""}
                    value={
                      params.message.email
                        ? params.message.email
                        : "Not assigned"
                    }
                  />
                  <PipeSpan className={info["form-pipe-span"]} />
                  {/* Button below is soleply programmed for updating useState email to help control view and edit modes. This one enables field editing*/}
                  <Button
                    id="enable-email-editing"
                    className={info["enable-email-editing"]}
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
            <Div className={info["current-password-container"]}>
              <Label
                htmlfor="current-password"
                className={info["current-password"]}
                text="Current Password"
              />
              <InputPassword
                id="current-password"
                className={info["current-password-input"]}
                placeholder={"Type in your current password"}
                value={formData["current-password"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setNewFormData({
                    ...formData,
                    "current-password": e.target.value,
                  });
                }}
              />
            </Div>
            <Div className={info["new-password-container"]}>
              <Label
                htmlfor="new-password"
                className={info["new-password"]}
                text="New Password"
              />
              <InputPassword
                id="new-password"
                className={info["new-password-input"]}
                placeholder={"Type in your new password"}
                value={formData["new-password"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setNewFormData({
                    ...formData,
                    "new-password": e.target.value,
                  });
                }}
              />
            </Div>
            <Div className={info["confirm-new-password-container"]}>
              <Label
                htmlfor="confirm-new-password"
                className={info["confirm-new-password"]}
                text="Confirm New Password"
              />
              <InputPassword
                id="confirm-new-password"
                className={info["confirm-new-password-input"]}
                placeholder={"Confirm your new password"}
                value={formData["confirm-new-password"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setNewFormData({
                    ...formData,
                    "confirm-new-password": e.target.value,
                  });
                }}
              />
            </Div>
            <Div className={info["form-processing-btn"]}>
              <Div className={info["submit-container"]}>
                <InputSubmit
                  className={info["submit-btn"]}
                  id="submit-btn"
                  value="Update"
                />
              </Div>
              <Div className={info["cancel-container"]}>
                <Button
                  onClick={() => {
                    alert(
                      " discarded! remember security check before clearing if data exists"
                    );
                  }}
                  id="cancel-submit"
                  className={info["cancel-submit"]}
                >
                  Discard
                </Button>
              </Div>
            </Div>
          </form>
        </Div>
        <Footer
          id="account-info-footer"
          className={info["account-info-footer"]}
        >
          <Div className={info["project-creator"]}>
            <ShortText className={info["creator"]}>
              Created by Christeen Fabian
            </ShortText>
          </Div>
        </Footer>
      </>
    );
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default Info;
