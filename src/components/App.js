import { useEffect, useState } from "react";
import "./App.css";
import api from "../api/products";
import Header from "./header";
import ProductsList from "./productsList";

function App() {
  const [products, setProducts] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [basketCount, setBasketCount] = useState("");

  const retreiveProducts = async () => {
    const response = await api.get("/products");
    return response.data;
  };

  const getAllProduct = async () => {
    const allProducts = await retreiveProducts();
    if (allProducts) setProducts(allProducts);
  };

  const retreiveBasket = async () => {
    const response = await api.get("/baskets");
    return response.data;
  };

  const getAllBasket = async () => {
    const baskets = await retreiveBasket();
    if (baskets) setBaskets(baskets);
    return baskets;
  };

  const updateTotalNumberOfShoppingCart = async () => {
    const baskets = await getAllBasket();
    let totalCount = baskets
      .map((basket) => basket.count)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
    setBasketCount(totalCount);
    return totalCount;
  };
  const findProductInBasketById = async (productId) => {
    const baskets = await getAllBasket();
    const product = baskets.find(
      (basket) => basket.id === productId
    );
    return product;
  };

  const addProductToShoppingCart = async (productId) => {
    const product = await findProductInBasketById(productId);
    if(product) {
      let request = { id: productId, count: product.count+1 };
      await api.put(`/baskets/${productId}`, request);
      await updateTotalNumberOfShoppingCart();
    }else{
      let request = { id: productId, count: 1 };
      await api.post("/baskets", request);
      await updateTotalNumberOfShoppingCart();
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="App">
      <Header basketCount={basketCount} />
      <ProductsList
        products={products}
        addProductToShoppingCart={addProductToShoppingCart}
      />
    </div>
  );
}

export default App;
