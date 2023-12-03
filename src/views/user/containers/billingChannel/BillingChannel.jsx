import React, { useEffect, useState } from "react";
import "./billingChannel.css";
import { Button1, H2, H3, InputBox } from "../../components";
import { useTranslation } from "react-i18next";

const BillingChannel = () => {
  const { t } = useTranslation();
  const [isChannelExpanded, setIsChannelExpanded] = useState(false);
  const [channelType, setChannelType] = useState("credit_card");

  const [expireDaysLeft, setExpireDaysLeft] = useState(12);
  const [membershipStatus, setMembershipStatus] = useState(
    expireDaysLeft > 0 ? "valid" : "expired"
  );
  const [makePayment, setMakePayment] = useState(false);

  const [creditCardDetails, setCreditCardDetails] = useState({
    accountNumber: "",
    expireDate: "",
    cvv: "",
  });
  const creditCardDetailsHandler = (e) => {
    setCreditCardDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [bankTransferDetails, setBankTransferDetails] = useState({
    accountNumber: "",
    transactionId: "",
    paymentDate: "",
  });
  const bankTransferDetailsHandler = (e) => {
    setBankTransferDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (membershipStatus === "expired") {
      setChannelType("bank_transfer");
    }
  }, [membershipStatus]);

  const toggleChannel = () => {
    setIsChannelExpanded((prev) => !prev);
  };

  const channelTypeHandler = (e) => {
    setChannelType(e.target.value);
  };

  return (
    <>
      <div className="user_billingChannel">
        <div className="user_billingChannel__head">
          <div className="user_billingChannel__head__top">
            <H3
              className="text-capitalize"
              text={
                channelType === "credit_card"
                  ? t("UserPanel.Billing.MadaCard")
                  : "bank transfer"
              }
            />
            <button onClick={toggleChannel}>
              {t("UserPanel.Billing.ChangeOption")}
            </button>
          </div>
          <div className="user_billingChannel__head__bottom">
            {membershipStatus === "valid" && (
              <>
                <H2 text={expireDaysLeft} />
                <p>{t("UserPanel.Billing.DaysLeftBeforeExpireMsg")}</p>
              </>
            )}
            {membershipStatus === "expired" && (
              <p className="user_billingChannel__message text-danger ">
                {t("UserPanel.Billing.ExpireWarning")}
              </p>
            )}
            {membershipStatus === "paid" && (
              <p className="user_billingChannel__message text-success ">
                {t("UserPanel.Billing.SuccessMessage")}
              </p>
            )}
          </div>
        </div>
        <div
          className={`user_billingChannel__body_outer ${isChannelExpanded ? "user_billingChannel__body_outer-expanded" : ""
            }`}>
          <div className="user_billingChannel__body">
            {membershipStatus !== "expired" && (
              <div className="user_billingChannel__radio_divs">
                <div>
                  <input
                    defaultChecked={channelType === "credit_card"}
                    type="radio"
                    name="billingChannelType"
                    value="credit_card"
                    id="credit_card"
                    onChange={channelTypeHandler}
                  />
                  <label htmlFor="credit_card">
                    {t("UserPanel.Billing.CreditCard")}
                  </label>
                </div>
                <div>
                  <input
                    defaultChecked={channelType === "bank_transfer"}
                    type="radio"
                    name="billingChannelType"
                    value="bank_transfer"
                    id="bank_transfer"
                    onChange={channelTypeHandler}
                  />
                  <label htmlFor="bank_transfer">
                    {t("UserPanel.Billing.BankTransfer")}
                  </label>
                </div>
              </div>
            )}
            {channelType === "credit_card" && (
              <div className="user_billingChannel___input_div">
                <InputBox
                  type={"number"}
                  placeholder={t("UserPanel.Billing.AccountNumber")}
                  value={creditCardDetails.accountNumber}
                  nameIdHtmlFor={"accountNumber"}
                  onChange={creditCardDetailsHandler}
                />
                <InputBox
                  type={"date"}
                  placeholder={"Expire Date"}
                  value={creditCardDetails.expireDate}
                  nameIdHtmlFor={"expireDate"}
                  onChange={creditCardDetailsHandler}
                />
                <InputBox
                  type={"number"}
                  placeholder={t("UserPanel.Billing.CVV")}
                  value={creditCardDetails.cvv}
                  nameIdHtmlFor={"cvv"}
                  onChange={creditCardDetailsHandler}
                />
              </div>
            )}
            {channelType === "bank_transfer" && (
              <div className="user_billingChannel__bank_transfer__table_outer">
                <table className="user_billingChannel__bank_transfer_table">
                  <tbody>
                    <tr>
                      <td className="user_billingChannel__bank_transfer_table__key">
                        {t("UserPanel.Billing.AccountNumber")}
                      </td>
                      <td className="user_billingChannel__bank_transfer_table__value">
                        729812790382108321
                      </td>
                    </tr>
                    <tr>
                      <td className="user_billingChannel__bank_transfer_table__key">
                        {t("UserPanel.Cases.Name")}
                      </td>
                      <td className="user_billingChannel__bank_transfer_table__value">
                        ABC
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {makePayment && (
              <div className="user_billingChannel___input_div">
                <InputBox
                  type={"number"}
                  placeholder={t("UserPanel.Billing.AccountNumber")}
                  value={bankTransferDetails.accountNumber}
                  nameIdHtmlFor={"accountNumber"}
                  onChange={bankTransferDetailsHandler}
                />
                <InputBox
                  type={"number"}
                  placeholder={t("UserPanel.Billing.TransactionId")}
                  value={bankTransferDetails.transactionId}
                  nameIdHtmlFor={"transactionId"}
                  onChange={bankTransferDetailsHandler}
                />
                <InputBox
                  type={"date"}
                  placeholder={"Payment Date"}
                  value={bankTransferDetails.paymentDate}
                  nameIdHtmlFor={"paymentDate"}
                  onChange={bankTransferDetailsHandler}
                />
              </div>
            )}
            {membershipStatus === "expired" &&
              (makePayment ? (
                <Button1
                  text={t("UserPanel.Billing.Submit")}
                  onClick={() => {
                    setMembershipStatus("paid");
                    setMakePayment(false);
                    toggleChannel();
                  }}
                  className="mt-4"
                />
              ) : (
                <Button1
                  text={t("UserPanel.Billing.MakePayment")}
                  onClick={() => setMakePayment(true)}
                  className="mt-4"
                />
              ))}
            {membershipStatus === "valid" && (
              <Button1
                text={t("UserPanel.Billing.SaveChanges")}
                onClick={toggleChannel}
                className="mt-4"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingChannel;
