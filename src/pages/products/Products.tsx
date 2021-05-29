import React from 'react';
import { useHistory } from "react-router-dom";
import {useAppSelector} from '../../app/hooks';
import {
  ProductInterface,
  selectProducts,
} from './productsSlice';
import './products.css';

export function Products() {
  let history = useHistory();
  const products = useAppSelector(selectProducts);

  const goToProductDetails = (product:ProductInterface) => {
    history.push({
      pathname:'/edit-product',
      state:{
        product
      }
    })
  }
  return (
    <div>
      <h2 className="product-title">My Products List</h2>

      <section className="products-list">
        <div className="products-header">
          <div className="row product-name">Name</div>
          <div className="row product-weight">Weight</div>
          <div className="row product-availability">Availability</div>
          <div className="row product-is-editable">Is Editable</div>
        </div>
        {products?.data?.map(product => {
          return (
            <div className="product" key={product._id}>
              <section className="product-row">
                <div className="row product-name">{product.product_name}</div>
                <div className="row product-weight">{product.weight}</div>
                <div className="row product-availability">{product.availability}</div>
                <div className="row product-is-editable">{product.isEditable? (<button onClick={() => goToProductDetails(product)}>Edit</button>) : null}</div>
              </section>

            </div>
          )
        })}
      </section>
    </div>
  );
}
