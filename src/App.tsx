import React, {useEffect} from 'react';
import logo from './logo.svg';
import {Products} from './pages/products/Products';
import {ProductDetail} from './pages/productDetail/ProductDetail';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import {fetchProductsAsync} from "./pages/products/productsSlice";
import {useAppDispatch} from "./app/hooks";

function App() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Products/>
        </Route>
        <Route path="/edit-product">
          <ProductDetail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
