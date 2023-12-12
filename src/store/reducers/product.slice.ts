import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';
import {
  addProduct,
  deleteProduct,
  fetchCategoryProducts,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from '../actions/product.actions';

type SortBy = 'newest' | 'priceLow' | 'priceHigh' | 'nameAZ' | 'nameZA';

interface ProductState {
  products: Product[];
  product: Product | null;
  sortBy: SortBy;
  error: string | null | undefined;
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  product: null,
  sortBy: 'newest',
  error: null,
  isLoading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    sortByPriceLowToHigh: (state) => {
      state.products.sort((a, b) => a.price - b.price);
    },
    sortByPriceHighToLow: (state) => {
      state.products.sort((a, b) => b.price - a.price);
    },
    sortByNewest: (state) => {
      state.products.sort((a, b) => {
        const aDate = new Date(a.creationAt);
        const bDate = new Date(b.creationAt);
        return bDate.getTime() - aDate.getTime();
      });
    },
    sortByNameAZ: (state) => {
      state.products.sort((a, b) => b.title.localeCompare(a.title));
    },
    sortByNameZA: (state) => {
      state.products.sort((a, b) => a.title.localeCompare(b.title));
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      switch (state.sortBy) {
        case 'priceLow':
          state.products.sort((a, b) => a.price - b.price);
          break;
        case 'priceHigh':
          state.products.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          state.products.sort((a, b) => {
            const aDate = new Date(a.creationAt);
            const bDate = new Date(b.creationAt);
            return bDate.getTime() - aDate.getTime();
          });
          break;
        case 'nameAZ':
          state.products.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'nameZA':
          state.products.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          state.products.sort((a, b) => {
            const aDate = new Date(a.creationAt);
            const bDate = new Date(b.creationAt);
            return bDate.getTime() - aDate.getTime();
          });
      }

      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id,
        );
        state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  sortByNameAZ,
  sortByNameZA,
  sortByNewest,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  setSortBy,
} = productSlice.actions;

export default productSlice.reducer;
