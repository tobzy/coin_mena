import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchProducts } from './productsAPI';

export interface ProductInterface  {
  "_id": number,
  "product_name": string,
  "weight": string,
  "availability": 261,
  "url": string,
  "price_tier": string,
  "price_range": string,
  "unit_cost": string,
  "isEditable": boolean
}
export interface ProductState {
  data: ProductInterface[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
  data: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. Thunks are
// typically used to make async requests.
export const fetchProductsAsync = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    editProduct: (state, action: PayloadAction<ProductInterface>) => {
      const updatedProduct = {...action.payload};
      const olderProducts = [...state.data].map(product => {
        if(product._id === updatedProduct._id){
          return updatedProduct
        }
        return product
      });

      state.data = olderProducts
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = [...action.payload] ;
      });
  },
});

export const { editProduct } = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.products)`
export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
