import "./packages.css";
import React, { useState } from "react";
import { CardLayout } from "../../containers";
import { CurrentPackageDetailsTable, H2, H3 } from "../../components";
import { useTranslation } from "react-i18next";

const packages = [
  {
    pkgName: "Full Protection",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
    year: 2,
    amount: 5000,
    dateOfContract: "12/04/2022",
    timeRemaining: 45,
  },
  {
    pkgName: "General Court",
    description:
      "Lorem ipsum dolor sit dipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
    year: 2,
    amount: 1500,
    dateOfContract: "1/10/2022",
    timeRemaining: 45,
  },
  {
    pkgName: "General Court and Insurance",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ion ullamco laboris nisi ut.",
    year: 2,
    amount: 2000,
    dateOfContract: "12/04/2022",
    timeRemaining: 45,
  },
];

const Packages = () => {
  const { t } = useTranslation();
  const [currentPackageInd, setCurrentPackageInd] = useState(0);
  return (
    <>
      <div className="user_packages_outer">
        <H2 text={t("UserPanel.Packages.CurrentPackage")} />
        <CardLayout>
          <H3 text={t("UserPanel.Packages.PackageDetails")} />
          <div className="user_packages_table_outer">
            <CurrentPackageDetailsTable data={packages[currentPackageInd]} />
          </div>
        </CardLayout>
        <H2 text={t("UserPanel.Packages.AvailablePackages")} />
        <div className="user_packages__available_packages_outer">
          {packages.map(
            ({ pkgName, amount }, index) =>
              index != currentPackageInd && (
                <button
                  key={index}
                  onClick={() => setCurrentPackageInd(index)}
                  className={
                    "user_packages__available_packages_btn text-center align-items-center d-flex flex-column"
                  }>
                  <H3 text={pkgName} className={"flex-grow-1 "} />
                  <p>Contract value without VAT</p>
                  <div className="d-flex align-items-baseline justify-content-center gap-2">
                    <H2 text={amount} />
                    <H3 text={"SAR"} className={"text-secondary fw-bold "} />
                  </div>
                </button>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Packages;
