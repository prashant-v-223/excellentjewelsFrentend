import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSessionData } from 'Helper/AuthTokenHelper';
import _ from 'lodash';
import { showMessage } from './common.slice';

// API Base URL - should be moved to config
const API_BASE_URL = 'http://72.61.170.111:8088/mobile-api';

// Initial State
const initialState = {
  jewelleryBaseMetal: [],
  jewelleryFilterData: {
    cust_ID: 0,
    product_Type_ID: '',
    category_ID: '',
    type_ID: '',
    sub_Type_ID: [],
    jewellery_For_ID: '',
    brand_ID: '',
    vendor_ID: '',
    shape_ID: [],
    priceF: 0,
    priceT: 1000000,
    weightF: 0,
    weightT: 100,
    searchBy: '',
    sortBy: { label: 'Price - Low to High', value: 'ASC' },
    apiKey: '',
    metal_type: [],
  },
  isJewelleryGetApi: true,
  jewelleryCategory: [],
  customerReviewList: [],
  jewelleryMainCategoryLoader: false,
  customerReviewLoader: false,
  isRefreshGetJewelleryCartApi: true,
  jewelleryCartList: [],
  jewelleryDetailData: {},
  jewellerySearchStock: new Map(),
  selectedJewelleryList: [],
  jewellerySimillarProducts: [],
  getJewellerySimillarProductsLoader: false,
  jewelleryCategoryDetail: [],
  jewelleryCartListDetail: {},
  jewelleryParameterDetail: {
    shapeList: [],
    locationList: [],
  },
  jewellerySizeListByTypewise: {},
  jewelleryFilterDetailByHeader: {},
  isAddToCartJewellery: false,
  jewelleryDetailLoader: false,
  jewelleryCategoryLoader: false,
  jewelleryBaseMetalLoader: false,
  jewelleryParameterLoader: false,
  jewelleryFilterDataLoader: false,
  isModifySearchForJewellery: false,
  isSearchForJewellerySettingWise: false,
  addToCartJewelleryLoading: false,
};

// Cancel token for API requests
let ajaxJewelleryListRequest = null;

// Async Thunks
export const getJewelleryCategoryList = createAsyncThunk(
  'jewellery/getCategoryList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { jewelleryCategoryDetail = [] } = getState().jewellery;
      
      // Return cached data if available
      if (jewelleryCategoryDetail?.length > 0) {
        return { data: jewelleryCategoryDetail };
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/jewellery-master-list/get-jewellery-type-subtype-list-millionhands`
      );
      
      return { data: data.Result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewelleryBaseMetal = createAsyncThunk(
  'jewellery/getBaseMetal',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { jewelleryBaseMetal = [] } = getState().jewellery;
      
      if (jewelleryBaseMetal?.length > 0) {
        return { data: jewelleryBaseMetal };
      }

      const { data } = await axios.get(
        `${API_BASE_URL}/gold/get-Jewellery-Base-Metal-Purity-And-Color-Rate`
      );
      
      return { data: data.Result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewelleryMainCategoryList = createAsyncThunk(
  'jewellery/getMainCategoryList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { jewelleryCategory = [] } = getState().jewellery;
      
      if (jewelleryCategory?.length > 0) {
        return { data: jewelleryCategory };
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/jewellery-master-list/get-JewelleryCategory-list`
      );
      
      return { data: data.Result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getWebCustomerReview = createAsyncThunk(
  'jewellery/getCustomerReview',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/get-web-customer-review`);
      return { data: data.Result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewelleryCartList = createAsyncThunk(
  'jewellery/getCartList',
  async (userID, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/get-jewellery-diamond-cart-list?Cust_ID=${userID}`
      );
      
      if (data.IsSuccess) {
        return { data: data.Result };
      }
      
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCartJewellery = createAsyncThunk(
  'jewellery/addToCart',
  async (props, { dispatch, rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const stockId = searchParams.get('stockId');

      const payload = {
        StockID: stockId,
        Cust_ID: props?.Cust_ID || props?.userId,
        PacketID: props?.packetId || '',
        DeviceType: 'Web',
        Diamond_Type: props?.Diamond_Type || '',
        Jewellery_Stock_ID: props?.Jewellery_Stock_ID || 0,
        GoldType_Id: props?.Metal_ID || 0,
        Color_And_Clarity_Id: props?.Color_And_Clarity_Id || 0,
        Color_Id: props?.Color_Id || 0,
        Clarity_Id: props?.Clarity_Id || 0,
        Qty: 1,
        Amount: props?.Sale_Rate || 0,
        WithStone: props?.WithStone || false,
        Comment: '',
        TotalWeight: props?.Total_Metal_Weight || 0,
        Engraving: props?.Engraving || false,
        PriceType: props?.PriceType || '',
        Setting_ID: props?.Setting_ID || 0,
        Size: props?.Size || '',
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/jewellery-diamond-add-to-cart-with-setting`,
        payload
      );

      if (data.IsSuccess) {
        dispatch(
          showMessage({
            message: 'Jewellery added successfully',
            varient: 'success',
          })
        );
        return { data: data.Result.rows };
      }
      
      dispatch(showMessage({ message: 'Jewellery already added' }));
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewelleryParameterListByName = createAsyncThunk(
  'jewellery/getParameterListByName',
  async (masterType, { getState, rejectWithValue }) => {
    try {
      const { jewelleryParameterDetail } = getState().jewellery;
      const { shapeList = [], locationList = [] } = jewelleryParameterDetail;
      
      if (shapeList?.length > 0) {
        return { data: { MasterList: [...shapeList, ...locationList] } };
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/parameter-list-by-name/master-types-by-name?MasterType=${masterType}`
      );
      
      return { data: data.Result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewellerySizeListByTypewise = createAsyncThunk(
  'jewellery/getSizeListByTypewise',
  async (masterType, { getState, rejectWithValue }) => {
    try {
      const { jewellerySizeListByTypewise = [] } = getState().jewellery;
      
      if (jewellerySizeListByTypewise?.length > 0) {
        return jewellerySizeListByTypewise;
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/parameter-list-by-name/master-types-by-name?MasterTypeValue=${masterType}`
      );
      
      return { data: data.Result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewelleryDetailList = createAsyncThunk(
  'jewellery/getDetailList',
  async (stockID, { rejectWithValue }) => {
    try {
      const payload = {
        Stock_ID: stockID,
        CustomerId: 0,
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/get-JewelleryDetail-list`,
        payload
      );

      if (data.IsSuccess) {
        return { data: data.Result };
      }
      
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewellerySimillarProducts = createAsyncThunk(
  'jewellery/getSimillarProducts',
  async (props, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/jewellery-simillar-products`,
        props
      );
      
      return { data: data.Result };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getJewelleryFilterData = createAsyncThunk(
  'jewellery/getFilterData',
  async (filterData, { getState, rejectWithValue }) => {
    try {
      // Cancel previous request if exists
      if (ajaxJewelleryListRequest) {
        ajaxJewelleryListRequest.cancel('CANCEL');
      }
      ajaxJewelleryListRequest = axios.CancelToken.source();

      const sessionData = getSessionData();
      const jewelleryWishList = getState().offlineList?.jewelleryWatchListData;

      // Build query parameters
      const params = {
        category: filterData?.category_ID || '',
        type: filterData?.type_ID || '',
        subType: filterData?.sub_Type_ID?.length > 0 ? filterData.sub_Type_ID.toString() : '',
        maxPrice: filterData?.priceT || 0,
        minPrice: filterData?.priceF || 0,
        minWeight: filterData?.weightF || 0,
        maxWeight: filterData?.weightT || 0,
        shape: filterData?.shape_ID?.length > 0 ? filterData.shape_ID.toString() : '',
        metalType: filterData?.metal_type?.length > 0 ? filterData.metal_type.toString() : '',
        page: 1,
        limit: 50,
      };

      const queryString = new URLSearchParams(
        Object.entries(params).filter(([_, value]) => value !== '')
      ).toString();

      const { data } = await axios.get(
        `${API_BASE_URL}/jewellery-master-list/products?${queryString}`,
        { cancelToken: ajaxJewelleryListRequest.token }
      );

      return {
        data: data.data.response,
        isLogin: !!sessionData?.UserID,
        jewelleryWishList,
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return rejectWithValue({ cancelled: true });
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeJewelleryFromCart = createAsyncThunk(
  'jewellery/removeFromCart',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const payload = {
        Cart_ID: data?.cartIDs ? data.cartIDs.toString() : '',
        PacketCartID: data?.packetCartID ? data.packetCartID.toString() : '',
        JewellCartID: data?.Jewellery_Stock_ID ? data.Jewellery_Stock_ID.toString() : '',
        Type: data?.type || '',
        Customer_ID: data?.UserID || 0,
      };

      const { data: responseData } = await axios.post(
        `${API_BASE_URL}/remove-cart-Jewellery-Diamond-WithSetting`,
        payload
      );

      if (responseData.IsSuccess) {
        dispatch(
          showMessage({
            message: responseData.Message,
            varient: 'success',
          })
        );
        return { data: responseData.Result };
      }
      
      dispatch(showMessage({ message: responseData.Message }));
      return rejectWithValue(responseData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
export const jewellerySlice = createSlice({
  name: 'jewellery',
  initialState,
  reducers: {
    setIsJewelleryGetApi: (state, action) => {
      state.isJewelleryGetApi = action.payload;
    },
    setSelectedJewelleryList: (state, action) => {
      state.selectedJewelleryList = action.payload;
    },
    setJewelleryDetailData: (state, action) => {
      state.jewelleryDetailData = action.payload;
    },
    setIsSearchForJewellerySettingWise: (state, action) => {
      state.isSearchForJewellerySettingWise = action.payload;
    },
    setIsModifySearchForJewellery: (state, action) => {
      state.isModifySearchForJewellery = action.payload;
    },
    setJewelleryFilterDetailByHeader: (state, action) => {
      state.jewelleryFilterDetailByHeader = action.payload;
    },
    setHipHopJewelleryFilterDetailByHeader: (state, action) => {
      state.jewelleryFilterDetailByHeader = action.payload;
    },
    setIsAddToCartJewellery: (state, action) => {
      state.isAddToCartJewellery = action.payload;
    },
    setJewellerySearchStock: (state, action) => {
      const list = action.payload || [];
      const map = new Map();
      list.forEach(item => map.set(item?.Stock_ID, item));
      state.jewellerySearchStock = map;
    },
    setOnlineJewelleryCartList: (state, action) => {
      state.jewelleryCartList = action.payload;
    },
    setIsRefreshGetJewelleryCartApi: (state, action) => {
      state.isRefreshGetJewelleryCartApi = action.payload;
    },
    setJewelleryFilterData: (state, action) => {
      state.jewelleryFilterData = {
        ...state.jewelleryFilterData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Get Jewellery Category List
    builder
      .addCase(getJewelleryCategoryList.pending, (state) => {
        state.jewelleryCategoryLoader = true;
      })
      .addCase(getJewelleryCategoryList.rejected, (state) => {
        state.jewelleryCategoryLoader = false;
        state.jewelleryCategoryDetail = [];
      })
      .addCase(getJewelleryCategoryList.fulfilled, (state, action) => {
        state.jewelleryCategoryDetail = action.payload?.data || [];
        state.jewelleryCategoryLoader = false;
      });

    // Get Jewellery Base Metal
    builder
      .addCase(getJewelleryBaseMetal.pending, (state) => {
        state.jewelleryBaseMetalLoader = true;
      })
      .addCase(getJewelleryBaseMetal.rejected, (state) => {
        state.jewelleryBaseMetalLoader = false;
        state.jewelleryBaseMetal = [];
      })
      .addCase(getJewelleryBaseMetal.fulfilled, (state, action) => {
        state.jewelleryBaseMetal = action.payload?.data || [];
        state.jewelleryBaseMetalLoader = false;
      });

    // Get Jewellery Main Category List
    builder
      .addCase(getJewelleryMainCategoryList.pending, (state) => {
        state.jewelleryMainCategoryLoader = true;
      })
      .addCase(getJewelleryMainCategoryList.rejected, (state) => {
        state.jewelleryMainCategoryLoader = false;
        state.jewelleryCategory = [];
      })
      .addCase(getJewelleryMainCategoryList.fulfilled, (state, action) => {
        state.jewelleryCategory = action.payload?.data || [];
        state.jewelleryMainCategoryLoader = false;
      });

    // Get Web Customer Review
    builder
      .addCase(getWebCustomerReview.pending, (state) => {
        state.customerReviewLoader = true;
      })
      .addCase(getWebCustomerReview.rejected, (state) => {
        state.customerReviewLoader = false;
        state.customerReviewList = [];
      })
      .addCase(getWebCustomerReview.fulfilled, (state, action) => {
        state.customerReviewLoader = false;
        state.customerReviewList = action.payload?.data || [];
      });

    // Get Jewellery Parameter List By Name
    builder
      .addCase(getJewelleryParameterListByName.pending, (state) => {
        state.jewelleryParameterLoader = true;
      })
      .addCase(getJewelleryParameterListByName.rejected, (state) => {
        state.jewelleryParameterLoader = false;
      })
      .addCase(getJewelleryParameterListByName.fulfilled, (state, action) => {
        const masterList = action.payload?.data?.MasterList || [];
        const shapeList = masterList.filter(
          item => item.MasterType_Code?.toLowerCase() === 'shape'
        );
        const locationList = masterList.filter(
          item => item.MasterType_Code?.toLowerCase() === 'location'
        );
        
        state.jewelleryParameterLoader = false;
        state.jewelleryParameterDetail = {
          shapeList: shapeList.length > 0 ? shapeList : state.jewelleryParameterDetail.shapeList,
          locationList: locationList.length > 0 ? locationList : state.jewelleryParameterDetail.locationList,
        };
      });

    // Get Jewellery Size List By Typewise
    builder
      .addCase(getJewellerySizeListByTypewise.pending, (state) => {
        state.jewellerySizeListByTypewise = {};
      })
      .addCase(getJewellerySizeListByTypewise.rejected, (state) => {
        state.jewellerySizeListByTypewise = {};
      })
      .addCase(getJewellerySizeListByTypewise.fulfilled, (state, action) => {
        state.jewellerySizeListByTypewise = action.payload?.data?.MasterList || [];
      });

    // Get Jewellery Detail List
    builder
      .addCase(getJewelleryDetailList.pending, (state) => {
        state.jewelleryDetailLoader = true;
        state.jewelleryDetailData = {};
      })
      .addCase(getJewelleryDetailList.rejected, (state) => {
        state.jewelleryDetailLoader = false;
        state.jewelleryDetailData = {};
      })
      .addCase(getJewelleryDetailList.fulfilled, (state, action) => {
        state.jewelleryDetailLoader = false;
        state.jewelleryDetailData = action.payload?.data || {};
      });

    // Get Jewellery Cart List
    builder
      .addCase(getJewelleryCartList.pending, (state) => {
        state.jewelleryDetailLoader = true;
        state.jewelleryCartList = [];
      })
      .addCase(getJewelleryCartList.rejected, (state) => {
        state.jewelleryDetailLoader = false;
        state.jewelleryCartList = [];
        state.jewelleryCartListDetail = {};
      })
      .addCase(getJewelleryCartList.fulfilled, (state, action) => {
        const cartList = action.payload?.data?._CartList || [];
        const mixCartList = action.payload?.data?._MixCartList || [];
        
        state.jewelleryDetailLoader = false;
        state.jewelleryCartList = { cartList, mixCartList };
        state.jewelleryCartListDetail = action.payload?.data || {};
      });

    // Add To Cart Jewellery
    builder
      .addCase(addToCartJewellery.pending, (state) => {
        state.isAddToCartJewellery = false;
        state.addToCartJewelleryLoading = true;
      })
      .addCase(addToCartJewellery.rejected, (state) => {
        state.isAddToCartJewellery = false;
        state.addToCartJewelleryLoading = false;
      })
      .addCase(addToCartJewellery.fulfilled, (state) => {
        state.isAddToCartJewellery = true;
        state.addToCartJewelleryLoading = false;
      });

    // Remove Jewellery From Cart
    builder
      .addCase(removeJewelleryFromCart.pending, (state) => {
        state.isAddToCartJewellery = false;
        state.addToCartJewelleryLoading = true;
      })
      .addCase(removeJewelleryFromCart.rejected, (state) => {
        state.isAddToCartJewellery = false;
        state.addToCartJewelleryLoading = false;
      })
      .addCase(removeJewelleryFromCart.fulfilled, (state) => {
        state.isAddToCartJewellery = true;
        state.addToCartJewelleryLoading = false;
      });

    // Get Jewellery Filter Data
    builder
      .addCase(getJewelleryFilterData.pending, (state) => {
        state.jewelleryFilterDataLoader = true;
        state.jewellerySearchStock = new Map();
      })
      .addCase(getJewelleryFilterData.rejected, (state, action) => {
        state.jewelleryFilterDataLoader = action.payload?.cancelled || false;
        state.jewellerySearchStock = new Map();
      })
      .addCase(getJewelleryFilterData.fulfilled, (state, action) => {
        const { isLogin, jewelleryWishList } = action.payload;
        state.jewelleryFilterDataLoader = false;

        let list = action.payload?.data || [];
        const map = new Map();

        // Add isCheck property to each item
        list = list.map(item => ({ ...item, isCheck: false }));
        list.forEach(item => map.set(item?.Stock_ID, item));

        // Merge wishlist data for non-logged-in users
        if (map.size > 0 && !isLogin && jewelleryWishList?.length > 0) {
          jewelleryWishList.forEach(wishItem => {
            const existingItem = map.get(wishItem.Stock_ID);
            if (existingItem) {
              map.set(wishItem.Stock_ID, {
                ...existingItem,
                Is_Like: wishItem.Is_Like,
              });
            }
          });
        }

        state.jewellerySearchStock = map;
      });

    // Get Jewellery Similar Products
    builder
      .addCase(getJewellerySimillarProducts.pending, (state) => {
        state.getJewellerySimillarProductsLoader = true;
      })
      .addCase(getJewellerySimillarProducts.rejected, (state) => {
        state.jewellerySimillarProducts = [];
        state.getJewellerySimillarProductsLoader = false;
      })
      .addCase(getJewellerySimillarProducts.fulfilled, (state, action) => {
        state.jewellerySimillarProducts = action.payload?.data || [];
        state.getJewellerySimillarProductsLoader = false;
      });
  },
});

// Export actions
export const {
  setIsJewelleryGetApi,
  setJewelleryDetailData,
  setJewelleryFilterData,
  setIsAddToCartJewellery,
  setJewellerySearchStock,
  setSelectedJewelleryList,
  setOnlineJewelleryCartList,
  setIsModifySearchForJewellery,
  setIsRefreshGetJewelleryCartApi,
  setJewelleryFilterDetailByHeader,
  setHipHopJewelleryFilterDetailByHeader,
  setIsSearchForJewellerySettingWise,
} = jewellerySlice.actions;

export default jewellerySlice.reducer;