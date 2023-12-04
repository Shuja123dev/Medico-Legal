import React, { useState } from "react";
import "./changePassword.css";
import { CardLayout } from "../../containers";
import { Button1, H3, InputBox, OtpInput } from "../../components";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();

  return (
    <>
      <CardLayout className="expert_changePassword">
        {isOtpVerified ? (
          <>
            <H3 text={t("UserPanel.Profile.ChangePassword")} />
            <p>{t("UserPanel.Profile.EnterNewPassword")}</p>
            <InputBox
              type={"password"}
              placeholder={t("UserPanel.Profile.EnterNewPassword")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button1 text={t("UserPanel.Profile.Change")} className="mt-4" />
          </>
        ) : (
          <>
            <H3 text={t("UserPanel.Profile.OTPVerification")} />
            <p>{t("UserPanel.Profile.OTPVerificationInfo")}</p>
            <OtpInput />
            <Button1
              text={t("UserPanel.Profile.Submit")}
              className="mt-4"
              onClick={() => setIsOtpVerified(true)}
            />
          </>
        )}
      </CardLayout>
    </>
  );
};

export default ChangePassword;
