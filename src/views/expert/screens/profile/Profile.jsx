import axios from 'axios';
import React, { useEffect, useState } from "react";
import "./profile.css";
import { CardLayout } from "../../containers";
import { H2, H3, InputBox, Dropzone, Button1, H4 } from "../../components";
import { user2Img } from "../../assets";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Profile = () => {

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = Cookies.get('token');
  const ExpertId = Cookies.get('userId');

  console.log(token);

  const [workingHoursStartSt, setWorkingHoursStartSt] = useState({
    time: "",
    amPm: "AM",
  });
  const [workingHoursEndSt, setWorkingHoursEndSt] = useState({
    time: "",
    amPm: "AM",
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    yearsOfExperience: "",
    expertise: "",
    email: "",
    phoneNo: "",
    nationalAddress: "",
    workingHoursStart: workingHoursStartSt,
    workingHoursEnd: workingHoursEndSt,
    status: "active",
  });

  const getExpertDetails = async () => {
    await axios.post(`${baseURL}/api/getexpertbyid`, {
      ExpertId: 5
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      console.log(response.data);
      setPersonalInfo(response.data.response.data[0])
    })
  }

  const infoChangeHandler = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const timeChangeHandler = (e, type) => {
    if (type === "workingHoursStart") {
      setWorkingHoursStartSt({
        ...workingHoursStartSt,
        [e.target.name]: e.target.value,
      });
    } else if (type === "workingHoursEnd") {
      setWorkingHoursEndSt({
        ...workingHoursEndSt,
        [e.target.name]: e.target.value,
      });
    }
    setPersonalInfo({
      ...personalInfo,
      [type]: {
        ...personalInfo[type],
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    getExpertDetails();
  }, [])

  return (
    <>
      <div className="expert_profile">
        <H2 text={"User Profile"} />
        <CardLayout className="p-4 p-lg-5">
          <div className="expert_profile__info_div_outer">
            <H3 text={"Personal Information"} />
            <div className="expert_profile__info_div_inner">
              <div className="expert_profile__picture_div">
                <h5>{"Profile Picture"}</h5>
                <Dropzone
                  content={<img src={user2Img} alt="user" />}
                  className="align-items-start h-auto bg-transparent"
                />
              </div>
              <InputBox
                value={personalInfo.name}
                nameIdHtmlFor={"name"}
                label={"Name"}
                type={"text"}
                onChange={infoChangeHandler}
              />
              <InputBox
                value={personalInfo.yearsOfExperience}
                nameIdHtmlFor={"yearsOfExperience"}
                label={"Years Of Experience"}
                type={"number"}
                onChange={infoChangeHandler}
              />
              <InputBox
                value={personalInfo.expertise}
                nameIdHtmlFor={"expertise"}
                label={"Expertise"}
                type={"text"}
                onChange={infoChangeHandler}
              />
            </div>
          </div>
          <div className="expert_profile__info_div_outer mt-5">
            <H3 text={"Contact Information"} />
            <div className="expert_profile__info_div_inner">
              <InputBox
                value={personalInfo.email}
                nameIdHtmlFor={"email"}
                label={"Email"}
                type={"email"}
                onChange={infoChangeHandler}
              />
              <InputBox
                value={personalInfo.phoneNo}
                nameIdHtmlFor={"phoneNo"}
                label={"Phone No"}
                type={"number"}
                onChange={infoChangeHandler}
              />
              <InputBox
                value={personalInfo.nationalAddress}
                nameIdHtmlFor={"nationalAddress"}
                label={"National Address"}
                type={"text"}
                onChange={infoChangeHandler}
              />
            </div>
          </div>
          <div className="expert_profile__info_div_outer mt-5">
            <H3 text={"Working Hours"} />
            <div className="expert_profile__info_div_inner">
              <InputBox
                values={[workingHoursStartSt.time, workingHoursStartSt.amPm]}
                names={["time", "amPm"]}
                label={"Start"}
                type={"time"}
                onChange={(e) => timeChangeHandler(e, "workingHoursStart")}
              />
              <InputBox
                values={[workingHoursEndSt.time, workingHoursEndSt.amPm]}
                names={["time", "amPm"]}
                label={"End"}
                type={"time"}
                onChange={(e) => timeChangeHandler(e, "workingHoursEnd")}
              />
              <InputBox
                value={personalInfo.status}
                nameIdHtmlFor={"status"}
                label={"Status"}
                type={"select"}
                options={["active", "inactive"]}
                onChange={infoChangeHandler}
              />
            </div>
          </div>
          <div>
            <Button1 text={"Save Changes"} className="my-5 px-3 ms-auto " />
          </div>
          <div className="expert_profile__password_div">
            <H4 text={"Password"} />
            <Link
              to={"/expert/change-password"}
              className="expert_profile__password_link">
              Change Password
            </Link>
          </div>
        </CardLayout>
      </div>
    </>
  );
};

export default Profile;
