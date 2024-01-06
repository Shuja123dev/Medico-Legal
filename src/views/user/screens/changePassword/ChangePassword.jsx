import React, { useEffect, useState } from "react";
import "./changePassword.css";
import { CardLayout } from "../../containers";
import { Button1, H3, InputBox, OtpInput } from "../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate()

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(t("UserPanel.Profile.PasswordErrorMessage"));
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = () => {
    if (validatePassword(newPassword)) {
      // Perform the password change logic here
      setIsSuccessMsgVisible(true);
    }
  };

  const passwordChangeHandler = (e) => {
    setNewPassword(e.target.value);
    validatePassword(e.target.value);
  };

  useEffect(() => {
    let timer;
    if (isSuccessMsgVisible) {
      timer = setTimeout(() => {
        setIsSuccessMsgVisible(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isSuccessMsgVisible]);

  return (
    <>
      <CardLayout className="user_changePassword">
        {isOtpVerified ? (
          <>
            <H3 text={t("UserPanel.Profile.ChangePassword")} />
            <p>{t("UserPanel.Profile.EnterNewPassword")}</p>
            <InputBox
              type="password"
              placeholder={t("UserPanel.Profile.EnterNewPassword")}
              value={newPassword}
              onChange={passwordChangeHandler}
            />
            {passwordError && <p className="mt-3">{passwordError}</p>}
            <Button1
              text={t("UserPanel.Profile.Change")}
              className="mt-4"
              onClick={handleSubmit}
            />
          </>
        ) : (
          <>
            <H3 text={t("UserPanel.Profile.OTPVerification")} />
            <p>{t("UserPanel.Profile.OTPVerificationInfo")}</p>
            <OtpInput />
            <div className="d-flex" style={{ justifyContent: "space-between", width: "100%" }}>
              <Button1
                text={t("UserPanel.Profile.Submit")}
                className="mt-4"
                onClick={() => setIsOtpVerified(true)}
              />
              <Button1
                text="Cancel"
                className="mt-4"
                onClick={() => navigate("/user/profile")}
                color="gray"
              />
            </div>
          </>
        )}
      </CardLayout>
      {isSuccessMsgVisible && (
        <div className="user_changePassword__successMsg">
          {t("UserPanel.Profile.PasswordChangedSuccessMessage")}
        </div>
      )}
    </>
  );
};

export default ChangePassword;
