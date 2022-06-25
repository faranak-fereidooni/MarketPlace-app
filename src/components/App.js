import { useEffect, useState } from "react";
import "./App.css";
import api from "../api/products";
import Header from "./header";
import ProductsList from "./productsList";
import ShoppingCartList from "./shoppingCartList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [basketInfo, setBasketInfo] = useState({});

  const retreiveProducts = async () => {
    const response = await api.get("/products");
    return response.data;
  };

  const setAllProduct = async () => {
    const allProducts = await retreiveProducts();
    if (allProducts) setProducts(allProducts);
  };

  const retreiveBasket = async () => {
    const response = await api.get("/baskets");
    return response.data;
  };

  const getAllBasket = async () => {
    const baskets = await retreiveBasket();
    return baskets;
  };
  const getTotalAmount=(baskets)=> {   
    return baskets
      .map((basket) => basket.price*basket.count)
      .reduce((previousValue, currentValue) => previousValue + currentValue,0);
  }
  const getBasketCount=(baskets)=>{
    let basketCount=0;
    if (baskets.length > 0) {
      basketCount = baskets
        .map((basket) => basket.count)
        .reduce((previousValue, currentValue) => previousValue + currentValue,0);
    }
    if(basketCount>0)
    return basketCount;
  }
  const updateBasketInfo = async () => {
    const baskets = await getAllBasket();
    if(baskets){
    const basketCount= getBasketCount(baskets);
   const totalAmount = getTotalAmount(baskets);
   setBasketInfo({totalAmount,basketCount,baskets});
  }};
  const addProductToShoppingCart = async (productId) => {
    const responsepProduct = await api.get(`/products/${productId}`);
    const product = responsepProduct.data;
    if(basketInfo.baskets!=undefined){
    const basket = basketInfo.baskets.find((basket) => basket.id === productId);
    
    if (basket) {
      let request = {
        id: productId,
        count: basket.count + 1,
        imgUrl: product.imgUrl,
        name: product.name,
        price: product.price,
        describe: product.describe,
      };
      await api.put(`/baskets/${productId}`, request);
    } else {
      let request = {
        id: productId,
        count: 1,
        imgUrl: product.imgUrl,
        name: product.name,
        price: product.price,
        describe: product.describe,
      };
      await api.post("/baskets", request);
    }}
    await updateBasketInfo();
  };

  useEffect(() => {
    setAllProduct();
    updateBasketInfo();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header basketCount={basketInfo.basketCount} baskets={basketInfo.baskets} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProductsList
                products={products}
                addProductToShoppingCart={addProductToShoppingCart}
              />
            }
          />
          <Route
            path="/shoppingCart"
            element={
              <ShoppingCartList
                basketInfo={basketInfo}
                updateBasketInfo={updateBasketInfo}
                addProductToShoppingCart={addProductToShoppingCart}
              />
            }
          />
          <Route path="/shoppingCart/checkout" element={<checkoutPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
