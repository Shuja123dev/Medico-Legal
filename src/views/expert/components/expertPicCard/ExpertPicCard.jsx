import React, { useState } from "react";
import "./expertPicCard.css";
import { chevronDownIcon, expertIcon } from "../../assets";

const ExpertPicCard = () => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  return (
    <>
      <div className={`expert_pic_card_outer `}>
        <button
          className={`expert_pic_card`}
          onClick={() => setIsCardExpanded((prevState) => !prevState)}>
          <div className="expert_pic_card_inner">
            <img src={expertIcon} alt="expert name" />
            <span>Name</span>
          </div>
          <img src={chevronDownIcon} alt="chevron down" width={12} />
        </button>
        {isCardExpanded && (
          <div className="expert_pic_card_logout">
            <button>{"Logout"}</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExpertPicCard;
