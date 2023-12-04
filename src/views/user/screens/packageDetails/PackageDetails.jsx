import "./packageDetails.css";
import React, { useState } from "react";
import { CardLayout } from "../../containers";
import { AvailablePackageDetailsTable, H2, H3 } from "../../components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const PackageDetails = ({ availablePackages }) => {
  const { t } = useTranslation();
  const location = useLocation().pathname.split("/")[3];
  const [currentAvailablePackage, setCurrentAvailablePackage] = useState(
    availablePackages.find(({ packageId }) => packageId == location)
  );

  return (
    <>
      <div className="user_packageDetails_outer">
        <H2 text={t("UserPanel.Packages.PackageDetails")} />
        <CardLayout>
          <H3 text={t("UserPanel.Packages.PackageDetails")} />
          <div className="user_packageDetails_table_outer">
            <AvailablePackageDetailsTable data={currentAvailablePackage} />
          </div>
        </CardLayout>
      </div>
    </>
  );
};

export default PackageDetails;
