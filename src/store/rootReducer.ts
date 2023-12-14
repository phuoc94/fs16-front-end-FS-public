import { combineReducers } from 'redux';

import authReducer from './reducers/auth.slice';
import authorReducer from './reducers/author.slice';
import cartReducer from './reducers/cart.slice';
import categoryReducer from './reducers/category.slice';
import lendingSlice from './reducers/lending.slice';
import productReducer from './reducers/product.slice';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  authors: authorReducer,
  auth: authReducer,
  cart: cartReducer,
  lending: lendingSlice,
});

export default rootReducer;
