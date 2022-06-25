import { React, Component } from "react";
import api from "../api/products";
import BasketCard from "./basketCard";
import { Link, useNavigate } from "react-router-dom";

class ShoppingCartList extends Component {
  getBasket = async (basketId) => {
    return await api.get(`/baskets/${basketId}`);
  };
  handleDecrementProduct = async (basketId) => {
    let response = await this.getBasket(basketId);
    let basket = response.data;
    let count = basket.count - 1;

    if (count === 0) {
      await this.handleDelete(basketId);
    } else {
      let request = {
        id: basketId,
        count: count,
        imgUrl: basket.imgUrl,
        name: basket.name,
        price: basket.price,
        describe: basket.describe,
      };
      await api.put(`/baskets/${basketId}`, request);
    }
    await this.props.updateBasketInfo();
  };

  handleDelete = async (basketId) => {
    await api.delete(`/baskets/${basketId}`);
    await this.props.updateBasketInfo();
  };
  handleEmptyCart = async (baskets) => {
    baskets.map((basket) => this.handleDelete(basket.id));
    this.props.history("/");
  };

  render() {
    return (
      <div>
        <h1 className="header-shoppingCard">Your Shopping Cart</h1>
        <div className="container-basketCard">
          {this.props.basketInfo.baskets.map((basket) => (
            <BasketCard
              key={basket.id}
              basket={basket}
              onDecrement={this.handleDecrementProduct}
              onIncrement={this.props.addProductToShoppingCart}
              onDelete={this.handleDelete}
            />
          ))}
        </div>
        <div>
          <h3>TotalPrice: {this.props.basketInfo.totalAmount}</h3>
        </div>

        <div className="btn-container">
          <button
            className="btn btn-emptyCard"
            onClick={() => this.handleEmptyCart(this.props.basketInfo.baskets)}
          >
            Empty Cart
          </button>
          <Link to="/shoppingCart/checkout">
            <button className="btn btn-checkout">Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default (props) => (
  <ShoppingCartList {...props} history={useNavigate()} />
);
