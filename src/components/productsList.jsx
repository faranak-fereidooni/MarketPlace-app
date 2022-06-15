import React from "react";
import ProductCard from "./productCard";

const ProductsList = (props) => {
  const { products, addProductToShoppingCart } = props;

  let renderProductsList = [];
  if (products.length > 0) {
    renderProductsList = products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        addProductToShoppingCart={addProductToShoppingCart}
      />
    ));
  }
  return (
    <div className="container-productsList">
      {renderProductsList.length > 0
        ? renderProductsList
        : "No contact available"}
    </div>
  );
};

export default ProductsList;
