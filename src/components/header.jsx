import React from "react";
import commerce from "../img/commerce.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const { basketCount } = props;
  return (
    <div className="header-container">
      <div className="header-innerContainer">
        <img src={commerce} className="header-logo" />
        <h1 className="header-name">MarketPlace</h1>
      </div>
      <div>
        <FontAwesomeIcon icon={faCartShopping} className="faCartShopping" />
        <span
          className={
            basketCount > 0
              ? "countItemsCartShopping"
              : "noCountItemsCartShopping"
          }
        >
          {basketCount}
        </span>
      </div>
    </div>
  );
};

export default Header;
