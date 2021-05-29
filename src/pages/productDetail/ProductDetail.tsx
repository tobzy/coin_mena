import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useLocation, useHistory} from "react-router-dom";
import {ProductInterface, editProduct} from "../products/productsSlice";
import {useAppDispatch} from "../../app/hooks";


export function ProductDetail() {
  let location = useLocation();
  const dispatch = useAppDispatch();
  let history = useHistory();
  if (!location?.state) {
    history.push('/');
  }

  const {product}: { product: ProductInterface } = location?.state as { product: ProductInterface };

  const validation = Yup.object().shape({
    product_name: Yup.string()
      .required('Product name is required'),
    weight: Yup.string()
      .required('Weight is required'),
    url: Yup.string()
      .required('Product Url is required'),
    price_tier: Yup.string()
      .required('Price tier is required'),
    price_range: Yup.string()
      .required('Price range is required'),
    isEditable: Yup.bool().oneOf([true, false], 'Accept Terms & Conditions is required'),
  });


  const onSubmit = (values: ProductInterface) => {
    dispatch(editProduct(values));
    history.push('/');
  }

  return (
    <div>
      <h2 className="product-title">Edit Product "{product.product_name}"</h2>
      <Formik
        initialValues={product}
        validationSchema={validation}
        onSubmit={onSubmit}
        render={props => {
          const values = props.values as ProductInterface
          return (
            <Form className='form-section'>
              <div>
                <p>Product Name</p>
                <Field
                  className='inputs' name='product_name' type='text'
                  placeholder='Product Name'/>
                <ErrorMessage
                  className={"error"}
                  name='product_name'
                  component='div'/>
              </div>

              <div>
                <p>Weight</p>
                <Field
                  className='inputs' name='weight' type='text'
                  placeholder='Weight'/>
                <ErrorMessage
                  className={"error"}
                  name='weight'
                  component='div'/>
              </div>

              <div>
                <p>Availability</p>
                <Field
                  className='inputs'
                  name='availability'
                  type='number'
                  placeholder='Availability'/>
                <ErrorMessage
                  className={"error"}
                  name='availability'
                  component='div'/>
              </div>

              <div>
                <p>Product Url</p>
                <Field
                  className='inputs'
                  name='url' type='text'
                  placeholder='Product Url'/>
                <ErrorMessage
                  className={"error"}
                  name='url'
                  component='div'/>
              </div>

              <div className={'product-tier'}>
                <p>Select Product Tier</p>
                <div role="group" aria-labelledby="my-radio-group" className='radio-inputs'>
                  <label>
                    <Field type="radio" name="price_tier" value="budget"/>
                    Budget
                  </label>
                  <label>
                    <Field type="radio" name="price_tier" value="premium"/>
                    Premier
                  </label>
                </div>
                <ErrorMessage className={"error"}
                              name='price_tier'
                              component='div'/>
              </div>

              <div>
                <p>Product Range</p>
                <Field className='inputs' name='price_range' as='select'
                       placeholder='Select Price Range'>
                  {values.price_tier === 'budget' && (
                    <>
                      <option value='$1-10'>$1-10</option>
                      <option value='$11-20'>$11-20</option>
                      <option value='$20-50'>$20-50</option>
                    </>
                  )}
                  {values.price_tier === 'premium' && (
                    <>
                      <option value='$50-99'>$50-99</option>
                      <option value='$100-199'>$100-199</option>
                      <option value='$200+'>$200+</option>
                    </>
                  )}
                </Field>
                <ErrorMessage className={"error"} name='price_range'
                              component='div'/>
              </div>

              <div className={'checkboxContainer'}>
                <p className='checkboxLabel'>Mark as editable ?</p>
                <Field name='isEditable' type='checkbox' className={'edit-check'}/>
                <div>
                  <ErrorMessage name="isEditable" component="div" className='error'/>
                </div>
              </div>

              <button
                className='.submit-button'
                type='submit'
                style={{cursor: props.isValid ? 'pointer' : 'not-allowed'}}
              >
                Edit Product
              </button>
            </Form>
          )
        }}
      />
    </div>
  );
}
