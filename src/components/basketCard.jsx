import React from "react";

const BasketCard = (props) => {
  const { basket, onDecrement, onIncrement, onDelete } = props;
  // console.log(product);
  return (
    <div>
      <div className="card">
        <div>
          <img src={basket.imgUrl} className="card-img" />
        </div>
        <div className="content">
          <div className="title">
            <h2 className="card-title">{basket.name}</h2>
            <span className="card-span">${basket.price}</span>
          </div>
          <div className="text">{basket.describe}</div>

          <div>
            <button
              className="btn btn-product minus-btn"
              onClick={() => onDecrement(basket.id)}
            >
              -
            </button>
            <span className="peoductCount">{basket.count}</span>
            <button
              className="btn btn-product plus-btn"
              onClick={() => onIncrement(basket.id)}
            >
              +
            </button>
            <button
              className="btn btn-remove"
              onClick={() => onDelete(basket.id)}
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
