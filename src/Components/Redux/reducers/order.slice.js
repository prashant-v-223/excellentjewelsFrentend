import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isRefreshOrderDetailAPI: true,
  myOrderListLoading: false,
  myOrderList: [],
  myOrderDetail: {},
  myOrderDetailList: {
    diamondOrderList: [],
    settingOrderList: [],
    jewelleryOrderList: [],
    mixDiamondOrderList: [],
  },
  countryWiseShippingCharge: [],
  totalOrders: 0,
  totalPendingOrder: 0,
  totaldeliverdOrder: 0,
  totalapprovedOrder: 0,
  totalcanceledOrder: 0,
  currentEventsList: [],
  previousEventsList: [],
  currentEventsLoader: false,
};

export const getMyOrderList = createAsyncThunk(
  'get-my-order-list',
  myOrderFilter => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-order-list', myOrderFilter)
        .then(({ data }) => {
          if (data?.Result?.rows?.length > 0) {
            resolve({ data: data?.Result?.rows });
          } else {
            resolve({ data: [] });
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getGeneralSetting = createAsyncThunk(
  'get-general-setting',
  myOrderFilter => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/general-setting', myOrderFilter)
        .then(({ data }) => {
          if (
            data?.Result?.GeneralSetting &&
            Object.keys(data.Result.GeneralSetting?.length > 0)
          ) {
            resolve({ data: data.Result.GeneralSetting });
          } else {
            resolve({ data: [] });
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getCurrentEventsList = createAsyncThunk(
  'get-current-events-list',
  () => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-web-configuration-details-list?Type_ID=6')
        .then(({ data }) => {
          if (data?.Result?.length > 0) {
            resolve({ data: data?.Result });
          } else {
            resolve({ data: [] });
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getCountryWiseShippingChargeList = createAsyncThunk(
  'get-country-shipping-charge-list',
  (data, { getState }) => {
    return new Promise((resolve, reject) => {
      const countryWiseShippingChargeList =
        getState().order.countryWiseShippingCharge;
      if (countryWiseShippingChargeList?.length > 0) {
        resolve({ data: countryWiseShippingChargeList });
        return;
      }
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-country-with-shipping-charge-list')
        .then(({ data }) => {
          if (data?.Result?.length > 0) {
            resolve({ data: data?.Result });
          } else {
            resolve({ data: [] });
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getPreviousEventsList = createAsyncThunk(
  'get-previous-events-list',
  () => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://excellentjewels.com:8080/mobile-api/get-web-configuration-details-list?Type_ID=5')
        .then(({ data }) => {
          if (data?.Result?.length > 0) {
            resolve({ data: data?.Result });
          } else {
            resolve({ data: [] });
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getMyOrderDetail = createAsyncThunk(
  'order/getMyOrderDetail',
  async ({ orderId, customerId }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://72.61.170.111:8088/mobile-api/get-order-detail-by-order-id-withsetting', {
        params: { orderId, customerId }
      });
      console.log(
        response
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch order details');
    }
  }
);
// export const getMyOrderDetail = createAsyncThunk(
//   'get-my-order-detail',
//   myOrderFilter => {
//     return new Promise((resolve, reject) => {
//       axios
//         .post(
//           `http://72.61.170.111:8088/mobile-api/get-order-detail-by-order-id-withsetting?Web_OrderId=${myOrderFilter.Web_OrderId}&UserID=${myOrderFilter.UserID}`,
//         )
//         .then(({ data }) => {
//           if (data?.Result) {
//             resolve({ data: data?.Result });
//           } else {
//             resolve({ data: [] });
//           }
//         })
//         .catch(errors => {
//           reject(errors);
//         });
//     });
//   },
// );

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setIsRefreshOrderDetailAPI: (state, action) => {
      state.isRefreshOrderDetailAPI = action.payload;
    },
  },
  extraReducers: {
    [getMyOrderList.pending]: (state, action) => {
      state.myOrderList = [];
      state.myOrderListLoading = true;
      state.totalPendingOrder = 0;
      state.totaldeliverdOrder = 0;
      state.totalapprovedOrder = 0;
      state.totalcanceledOrder = 0;
    },
    [getMyOrderList.rejected]: (state, action) => {
      state.myOrderList = [];
      state.totalOrders = 0;
      state.totalPendingOrder = 0;
      state.totaldeliverdOrder = 0;
      state.totalapprovedOrder = 0;
      state.totalcanceledOrder = 0;
      state.myOrderListLoading = false;
    },
    [getMyOrderList.fulfilled]: (state, action) => {
      state.myOrderList = action.payload.data;
      action.payload.data?.forEach(item => {
        if (item.WebOrder_Status === 'PENDING') {
          state.totalPendingOrder = state.totalPendingOrder + 1;
        } else if (item.WebOrder_Status === 'DELIVERED') {
          state.totaldeliverdOrder = state.totaldeliverdOrder + 1;
        } else if (item.WebOrder_Status === 'APPROVED') {
          state.totalapprovedOrder = state.totalapprovedOrder + 1;
        } else if (item.WebOrder_Status === 'CANCELED') {
          state.totalcanceledOrder = state.totalcanceledOrder + 1;
        }
      });
      state.totalOrders = action.payload.data.length;
      state.myOrderListLoading = false;
    },
    [getMyOrderDetail.pending]: (state, action) => {
      state.myOrderListLoading = true;
    },
    [getMyOrderDetail.rejected]: (state, action) => {
      state.myOrderDetail = {};
      state.myOrderDetailList = {
        diamondOrderList: [],
        settingOrderList: [],
        jewelleryOrderList: [],
        mixDiamondOrderList: [],
      };
      state.myOrderListLoading = false;
    },
    [getMyOrderDetail.fulfilled]: (state, action) => {
      state.myOrderDetail = action.payload;
      state.myOrderListLoading = false;
    },
    [getCurrentEventsList.pending]: (state, action) => {
      state.currentEventsLoader = true;
    },
    [getCurrentEventsList.rejected]: (state, action) => {
      state.currentEventsList = [];
      state.currentEventsLoader = false;
    },
    [getCurrentEventsList.fulfilled]: (state, action) => {
      state.currentEventsList =
        action?.payload?.data?.length > 0 ? [...action.payload.data] : [];
      state.currentEventsLoader = false;
    },
    // [getCountryWiseShippingChargeList.pending]: (state, action) => {
    //   state.countryWiseShippingCharge = [];
    // },
    [getCountryWiseShippingChargeList.rejected]: (state, action) => {
      state.countryWiseShippingCharge = [];
    },
    [getCountryWiseShippingChargeList.fulfilled]: (state, action) => {
      state.countryWiseShippingCharge =
        action?.payload?.data?.length > 0 ? [...action.payload.data] : [];
    },
    [getPreviousEventsList.pending]: (state, action) => {},
    [getPreviousEventsList.rejected]: (state, action) => {
      state.previousEventsList = [];
    },
    [getPreviousEventsList.fulfilled]: (state, action) => {
      state.previousEventsList =
        action?.payload?.data?.length > 0 ? [...action.payload.data] : [];
      state.currentEventsLoader = false;
    },
  },
});
export const { setIsRefreshOrderDetailAPI } = orderSlice.actions;

export default orderSlice.reducer;
