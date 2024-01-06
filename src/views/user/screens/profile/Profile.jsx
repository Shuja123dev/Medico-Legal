import React, { useState } from "react";
import "./profile.css";
import { CardLayout } from "../../containers";
import {
  H2,
  H3,
  InputBox,
  Dropzone,
  Button1,
  ProfileUploadBox,
  UploadModal,
  Modal,
} from "../../components";
import { dummyImg, user2Img } from "../../assets";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    yearsOfExperience: "",
    speciality: "",
    email: "",
    phoneNo: "",
    nationalAddress: "",
  });

  const infoChangeHandler = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const toggleUploadModal = () => {
    setIsUploadModalVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="user_profile">
        <H2 text={t("UserPanel.Profile.UserProfile")} />
        <CardLayout className="p-4 p-lg-5">
          <div className="user_profile__info_div_outer">
            <H3 text={t("UserPanel.Profile.PersonalInformation")} />
            <div className="user_profile__personal_info_div">
              <div className="user_profile__picture_div">
                <h5>{t("UserPanel.Profile.ProfilePicture")}</h5>
                <Dropzone
                  content={<img src={user2Img} alt="user" />}
                  className="align-items-start h-auto bg-transparent"
                />
              </div>
              <InputBox
                value={personalInfo.name}
                nameIdHtmlFor={"name"}
                label={t("UserPanel.Profile.Name")}
                type={"text"}
                onChange={infoChangeHandler}
              />
              <InputBox
                value={personalInfo.yearsOfExperience}
                nameIdHtmlFor={"yearsOfExperience"}
                label={t("UserPanel.Profile.YearsOfExperience")}
                type={"number"}
                onChange={infoChangeHandler}
              />
              <InputBox
                value={personalInfo.speciality}
                nameIdHtmlFor={"speciality"}
                label={t("UserPanel.Profile.Speciality")}
                type={"text"}
                onChange={infoChangeHandler}
              />
            </div>
          </div>
          <div className="user_profile__info_div_outer mt-5">
            <H3 text={t("UserPanel.Profile.ContactInformation")} />
            <div className="user_profile__personal_info_div">
              <InputBox
                value={personalInfo.email}
                nameIdHtmlFor={"email"}
                label={t("UserPanel.Profile.Email")}
                type={"email"}
                onChange={infoChangeHandler}
              />
              {/* <InputBox
                value={personalInfo.phoneNo}
                nameIdHtmlFor={"phoneNo"}
                label={t("UserPanel.Profile.PhoneNo")}
                type={"number"}
                onChange={infoChangeHandler}
              /> */}
              <InputBox
                value={personalInfo.nationalAddress}
                nameIdHtmlFor={"nationalAddress"}
                label={t("UserPanel.Profile.NationalAddress")}
                type={"text"}
                onChange={infoChangeHandler}
              />
            </div>
          </div>
          <div>
            <Button1
              text={t("UserPanel.Profile.SaveChanges")}
              className="my-5 ms-auto "
            />
          </div>
          <ProfileUploadBox
            text={t("UserPanel.Profile.SCFHSCopy")}
            buttonText={t("UserPanel.Profile.Upload")}
            onClick={toggleUploadModal}
            image={dummyImg}
          />
          <ProfileUploadBox
            text={t("UserPanel.Profile.MedicalCopy")}
            buttonText={t("UserPanel.Profile.Upload")}
            onClick={toggleUploadModal}
            image={dummyImg}
          />
          <ProfileUploadBox
            text={t("UserPanel.Profile.GovernmentId")}
            buttonText={t("UserPanel.Profile.Upload")}
            onClick={toggleUploadModal}
            image={dummyImg}
          />
          <ProfileUploadBox
            text={t("UserPanel.Profile.Passport")}
            buttonText={t("UserPanel.Profile.Upload")}
            onClick={toggleUploadModal}
          />
          <ProfileUploadBox
            text={t("UserPanel.Profile.NationalAddressProof")}
            buttonText={t("UserPanel.Profile.Upload")}
            onClick={toggleUploadModal}
          />
          <ProfileUploadBox
            text={t("UserPanel.Profile.Agreement")}
            buttonText={t("UserPanel.Profile.Download")}
          />
          <ProfileUploadBox
            text={t("UserPanel.Profile.Password")}
            buttonText={t("UserPanel.Profile.ChangePassword")}
            buttonType="link"
            to="/user/change-password"
          />
        </CardLayout>
        {isUploadModalVisible && (
          <Modal toggleModal={toggleUploadModal}>
            <UploadModal modalType={"documentUpload"} />
            <div className="d-flex align-items-center justify-content-between mt-4 ">
              <Button1
                onClick={toggleUploadModal}
                text={t("UserPanel.Cases.AddNewCasePage.Cancel")}
                color="gray"
              />
              <Button1
                onClick={toggleUploadModal}
                text={t("UserPanel.Cases.AddNewCasePage.Submit")}
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Profile;
