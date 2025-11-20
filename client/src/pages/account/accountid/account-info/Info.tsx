import { DivClass } from "../../../../../src/ui/Div";
import HeadingOne from "../../../../../src/ui/HeadingOne";
// import AuthHeader from "../../../../../auth/auth-partials/AuthHeader";
import "./info-media-queries.css";
import "./info.css";
// import ShortText from "../../../../../src/ui/ShortText";
// import Footer from "../../../../components/Footer";
import {
  InputDate,
  InputDisabledText,
  InputEnabledText,
  InputPassword,
  InputSubmit,
} from "../../../../components/form-elements/InputTypeInterfaces";
import { ChangeEvent, FormEvent, useState } from "react";
import Label from "../../../../../src/components/form-elements/Label";
import Button from "../../../../../src/components/form-elements/Button";
import PipeSpan from "../../../../../src/components/PipeSpan";
import { NavLink } from "react-router-dom";

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

const Info = ({ params }: any) => {
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
  try {
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
      "Non-Binary",
      "Other",
    ];
    interface UpdateAccountDataProps {
      firstname?: string;
      lastname?: string;
      gender?: string;
      dob?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
      confirmNewPassword?: string;
    }
    const processSubmission = async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        console.log(formData);

        if (!formData) {
          alert("Please complete required fields");
        } else {
          const updateAccountData: UpdateAccountDataProps = {};

          if (formData.firstname)
            updateAccountData.firstname = formData.firstname;

          if (formData.lastname) updateAccountData.lastname = formData.lastname;

          if (formData.gender) updateAccountData.gender = formData.gender;

          if (formData.dob) updateAccountData.dob = formData.dob;

          if (formData.email) updateAccountData.email = formData.email;

          if (formData["current-password"])
            updateAccountData["currentPassword"] = formData["current-password"];

          if (formData["new-password"]) {
            updateAccountData["newPassword"] = formData["new-password"];
          }
          if (formData["confirm-new-password"]) {
            updateAccountData["confirmNewPassword"] =
              formData["confirm-new-password"];
          }
          if (formData["confirm-new-password"] !== formData["new-password"]) {
            new Notification("new password and confirm passwords don not math");
            return;
          }

          const updatedFormData = {
            _id: params.data._id,
            updateAccountData,
          };

          const updatedData = await fetch(
            `http://localhost:5000/api/account/${params.data._id}/account-info`,
            {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedFormData),
            }
          );
          if (updatedData.ok) {
            new Notification("Account Info Has Been Changed");
          } else {
            const error = await updatedData.json();
            new Notification("Account Info Not Updated: " + error.error);
          }
        }
      } catch (err: any) {
        console.warn("Something went wrong: ", err.message);
      }
    };
    console.log("params: ", params);

    return (
      <>
        <DivClass className={"account-info-content"}>
          <div>
            <NavLink
              className="nav-link"
              to={`http://localhost:5173/account/${params.data._id}/canvas-management`}
            >
              <img
                className="nav-image"
                src="/backwards-solid.svg"
                alt="navigation image"
                height={20}
                width={20}
              />
              Canvas Dashboard
            </NavLink>
            <HeadingOne id="heading-one" className={"heading-one"}>
              Account Info
            </HeadingOne>
            <form
              id="account-info-form"
              className={"account-info-form"}
              onSubmit={processSubmission}
            >
              <DivClass className={"firstname-container"}>
                <Label
                  htmlfor="firstname"
                  className={"update-firstname"}
                  text="Firstname"
                />
                {formFieldToggle.firstname ? (
                  <DivClass className={"data-control-container"}>
                    <InputEnabledText
                      id="firstname"
                      className={"firstname-input"}
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
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="disable-firstname-editing"
                      className={"disable-firstname-editing"}
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
                  </DivClass>
                ) : (
                  <DivClass className={"data-control-container"}>
                    <InputDisabledText
                      id="firstname"
                      className={"firstname-input"}
                      placeholder={""}
                      value={
                        params.data.firstname
                          ? params.data.firstname
                          : "Not assigned"
                      }
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="enable-firstname-editing"
                      className={"enable-firstname-editing"}
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
                  </DivClass>
                )}
              </DivClass>
              <DivClass className={"lastname-container"}>
                <Label
                  htmlfor="lastname"
                  className={"update-lastname"}
                  text="Lastname"
                />
                {formFieldToggle.lastname ? (
                  <DivClass className={"data-control-container"}>
                    <InputEnabledText
                      id="lastname"
                      className={"lastname-input"}
                      placeholder={"Update your Last Name"}
                      value={formData.lastname}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        setNewFormData({
                          ...formData,
                          lastname: e.target.value,
                        });
                      }}
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="disable-firstname-editing"
                      className={"disable-lastname-editing"}
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
                  </DivClass>
                ) : (
                  <DivClass className={"data-control-container"}>
                    <InputDisabledText
                      id="lastname"
                      className={"lastname-input"}
                      placeholder={""}
                      value={
                        params.data.lastname
                          ? params.data.lastname
                          : "Not assigned"
                      }
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="enable-lastname-editing"
                      className={"enable-lastname-editing"}
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
                  </DivClass>
                )}
              </DivClass>
              <DivClass className={"gender-container"}>
                <Label
                  htmlfor="gender"
                  className={"update-gender"}
                  text="Gender"
                />
                {formFieldToggle.gender ? (
                  <DivClass className={"data-control-container"}>
                    <select
                      id="gender"
                      className={"gender-input"}
                      value={formData.gender ? formData.gender : ""}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        e.preventDefault();
                        setNewFormData({ ...formData, gender: e.target.value });
                      }}
                    >
                      {gender.map((item: any, index: number) => {
                        return (
                          <option
                            id={`option-${index}`}
                            key={index}
                            value={item}
                          >
                            {item}
                          </option>
                        );
                      })}
                    </select>

                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="disable-gender-editing"
                      className={"disable-gender-editing"}
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
                  </DivClass>
                ) : (
                  <DivClass className={"data-control-container"}>
                    <InputDisabledText
                      id="gender"
                      className={"gender-input-disabled"}
                      placeholder={""}
                      value={
                        params.data.gender ? params.data.gender : "Not assigned"
                      }
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="enable-gender-editing"
                      className={"enable-gender-editing"}
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
                  </DivClass>
                )}
              </DivClass>
              <DivClass className={"dob-container"}>
                <Label htmlfor="dob" className={"update-dob"} text="Dob" />
                {formFieldToggle.dob ? (
                  <DivClass className={"data-control-container"}>
                    <InputDate
                      id="dob"
                      className={"dob-input"}
                      value={formData.dob ? formData.dob : ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        setNewFormData({ ...formData, dob: e.target.value });
                      }}
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="disable-dob-editing"
                      className={"disable-dob-editing"}
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
                  </DivClass>
                ) : (
                  <DivClass className={"data-control-container"}>
                    <InputDisabledText
                      id="dob"
                      className={"dob-input"}
                      placeholder={""}
                      value={params.data.dob ? params.data.dob : "Not assigned"}
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="enable-dob-editing"
                      className={"enable-dob-editing"}
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
                  </DivClass>
                )}
              </DivClass>
              <DivClass className={"email-container"}>
                <Label
                  htmlfor="email"
                  className={"update-email"}
                  text="Email"
                />
                {formFieldToggle.email ? (
                  <DivClass className={"data-control-container"}>
                    <InputEnabledText
                      id="email"
                      className={"email-input"}
                      placeholder={"Update your Email"}
                      value={formData.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        setNewFormData({ ...formData, email: e.target.value });
                      }}
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="disable-email-editing"
                      className={"disable-email-editing"}
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
                  </DivClass>
                ) : (
                  // appear when form field email boolean state is false
                  <DivClass className={"data-control-container"}>
                    <InputDisabledText
                      id="email"
                      className={"email-input"}
                      placeholder={""}
                      value={
                        params.data.email ? params.data.email : "Not assigned"
                      }
                    />
                    <PipeSpan className={"form-pipe-span"} />
                    <Button
                      id="enable-email-editing"
                      className={"enable-email-editing"}
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
                  </DivClass>
                )}
              </DivClass>
              <DivClass className={"current-password-container"}>
                <Label
                  htmlfor="current-password"
                  className={"current-password"}
                  text="Current Password"
                />
                <DivClass className={"data-control-container"}>
                  <InputPassword
                    id="current-password"
                    className={"current-password-input"}
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
                </DivClass>
              </DivClass>
              <DivClass className={"new-password-container"}>
                <Label
                  htmlfor="new-password"
                  className={"new-password"}
                  text="New Password"
                />
                <DivClass className={"data-control-container"}>
                  <InputPassword
                    id="new-password"
                    className={"new-password-input"}
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
                </DivClass>
              </DivClass>
              <DivClass className={"confirm-new-password-container"}>
                <Label
                  htmlfor="confirm-new-password"
                  className={"confirm-new-password"}
                  text="Confirm New Password"
                />
                <DivClass className={"data-control-container"}>
                  <InputPassword
                    id="confirm-new-password"
                    className={"confirm-new-password-input"}
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
                </DivClass>
              </DivClass>
              <DivClass className={"form-processing-btn"}>
                <DivClass className={"cancel-container"}>
                  <Button
                    onClick={() => {
                      alert(
                        " discarded! remember security check before clearing if data exists"
                      );
                    }}
                    id="cancel-submit"
                    className={"cancel-submit"}
                  >
                    Discard
                  </Button>
                </DivClass>
                <DivClass className={"submit-container"}>
                  <InputSubmit
                    className={"submit-btn"}
                    id="submit-btn"
                    value="Update"
                  />
                </DivClass>
              </DivClass>
            </form>
          </div>
        </DivClass>
        {/* <Footer id="account-info-footer" className={"account-info-footer"}>
          <DivClass className={"project-creator"}>
            <ShortText className={"creator"}>
              Created by Christeen Fabian
            </ShortText>
          </DivClass>
        </Footer> */}
      </>
    );
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
};

export default Info;
