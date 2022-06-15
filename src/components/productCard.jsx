import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const ProductCard = (props) => {
  const { id, name, price, describe, imgUrl } = props.product;
  return (
    <div className="card">
      <div>
        <img src={imgUrl} className="card-img" />
      </div>
      <div className="content">
        <div className="title">
          <h2 className="card-title">{name}</h2>
          <span className="card-span">{price}</span>
        </div>
        <div className="text">{describe}</div>
        <FontAwesomeIcon
          icon={faCartPlus}
          id="faCartPlus"
          onClick={() => props.addProductToShoppingCart(id)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
