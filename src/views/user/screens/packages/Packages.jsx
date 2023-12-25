import "./packages.css";
import React from "react";
import { CardLayout } from "../../containers";
import { CurrentPackageDetailsTable, H2, H3 } from "../../components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const currentPackage = {
  pkgName: "Full Protection",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
  year: 2,
  amount: 5000,
  dateOfContract: "12/04/2022",
  timeRemaining: 45,
};

const Packages = ({ availablePackages }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="user_packages_outer">
        <H2 text={t("UserPanel.Packages.CurrentPackage")} />
        <CardLayout>
          <H3 text={t("UserPanel.Packages.PackageDetails")} />
          <div className="user_packages_table_outer">
            <CurrentPackageDetailsTable data={availablePackages} />
          </div>
        </CardLayout>
        <H2 text={t("UserPanel.Packages.AvailablePackages")} />
        <div className="user_packages__available_packages_outer">
          {availablePackages && availablePackages.map(({ pkgName, amount, PackageId }, index) => (
            <Link
              key={index}
              to={`/user/packages/${PackageId}`}
              className={
                "user_packages__available_packages_btn text-center align-items-center d-flex flex-column"
              }>
              <H3 text={pkgName} className={"flex-grow-1 "} />
              <p>Contract value without VAT</p>
              <div className="d-flex align-items-baseline justify-content-center gap-2">
                <H2 text={amount} />
                <H3 text={"SAR"} className={"text-secondary fw-bold "} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Packages;
