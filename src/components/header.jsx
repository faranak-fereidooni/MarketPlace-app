import React from "react";
import commerce from "../img/commerce.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";

const Header = (props) => {
  const { basketCount, baskets } = props;
  return (
    <div className="header-container">
      <div className="header-innerContainer">
        <img src={commerce} className="header-logo" />
        <h1 className="header-name">MarketPlace</h1>
      </div>
      <div className="header-cart-container">
        <Link to="/shoppingCart" state={{ basket: baskets }}>
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
        </Link>
      </div>
    </div>
  );
};

export default Header;
