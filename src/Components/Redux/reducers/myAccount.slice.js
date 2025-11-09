import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from './common.slice';

const initialState = {
  editAdditionalInfoLoading: false,
  editMyProfileLoading: false,
  isProfileEdit: false,
  isAdditionalInfoEdit: false,
  myProfileDetailLoading: false,
  myProfileDetailList: {},
  myHoldStockListLoading: false,
  myHoldStockList: [],
  isRefreshGetHoldListApi: true,
  myHoldTotalRows: 0,
  getSearchStockCommonList: [],
  getSearchStockLoading: false,
  exportStockDataLoading: false,
  isExportStock: false,
  exportStockData: [],
  isAddToWatchList: false,
  watchStockLoading: false,
  watchStockList: [],
  watchListCurrentData: [],
  isRefreshGetWatchListApi: true,
  countOfWatchList: 0,
  totalwatchStockListRecords: 0,
  totalwatchStockListRows: 0,
  currentPageMyHold: 0,
  myHoldMinPageLimit: 0,
  myHoldMaxPageLimit: 5,
  currentPageWatchList: 0,
  watchListMinPageLimit: 0,
  watchListMaxPageLimit: 5,
  isAddToCartList: false,
  isAddToCompareList: false,
  isRemoveFromHold: false,
  isExportForMail: false,
  isAddToHoldList: false,
  compareStockList: [],
  compareListLoading: false,
  isPasswordChanged: false,
  addToCartLoading: false,
  addToHoldLoading: false,
  addToWatchLoading: false,
  addToCompareLoading: false,
};

let ajaxWatchListRequest = null;

export const changePassword = createAsyncThunk(
  'change-password',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/registration/change-password', props)
        .then(({ data }) => {
          if (data?.IsSuccess) {
            resolve({ data: data.Result });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getMyProfileDetail = createAsyncThunk(
  'get-my-profile-detail',
  data => {
    return new Promise((resolve, reject) => {
      const obj = {
        UserID: data.UserID,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/registration/get-my-profile-detail', obj)
        .then(({ data }) => {
          if (data?.IsSuccess) {
            resolve({ data: data.Result });
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const editMyProfileDetail = createAsyncThunk(
  'editprofile',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/edit-my-profile-excellent', props)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
          console.log(errors);
        });
    });
  },
);
export const editAdditionalInfo = createAsyncThunk(
  'editadditionalDetail',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/edit-additional-info', props)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getMyHoldStockList = createAsyncThunk('myHoldStockList', data => {
  return new Promise((resolve, reject) => {
    const obj = {
      UserID: data.UserID,
      Diamond_Type: data.diamondType,
    };
    axios
      .post('get-stock-hold', obj)
      .then(({ data }) => {
        resolve({ data: data.Result });
      })
      .catch(errors => {
        reject(errors);
      });
  });
});
export const getSearchStockCommon = createAsyncThunk(
  'getSearchStockCommon',
  data => {
    return new Promise((resolve, reject) => {
      let newFinalObject = {
        StoneNumber: data.StoneNo,
        UserID: data.UserID ? data.UserID : 0,
        BackEndClientId: 0,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-stock-detail-common', newFinalObject)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const addToWatchList = createAsyncThunk(
  'add-to-watchList',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const searchParams = new URLSearchParams(location.search);
      const stockId = searchParams.get('stockId');
      const obj =
        props?.displayType === 'diamond'
          ? {
            StockIDs: props.StockIDs,
            CustomerID: props.CustomerID,
            Diamond_Type: props.diamondType,
            SellerId: 0,
            DeviceType: 'Web',
            BackEndClientId: 0,
            Remark: '',
          }
          : {
            Cust_ID: props.CustomerID,
            Stock_ID: props.StockIDs || stockId,
          };
      props?.displayType === 'diamond'
        ? axios
          .post('http://72.61.170.111:8088/mobile-api/add-to-watch-list', obj)
          .then(({ data }) => {
            if (data.IsSuccess) {
              resolve({ data: data });
              dispatch(
                showMessage({
                  message: data.Message,
                  varient: data.Result.Retval == 1 ? 'success' : 'warning',
                }),
              );
            } else {
              dispatch(showMessage({ message: data.Message }));
              reject(data);
            }
          })
          .catch(errors => {
            reject(errors);
          })
        : axios
          .post('http://72.61.170.111:8088/mobile-api/add-to-jewellery-watchlist', obj)
          .then(({ data }) => {
            if (data.IsSuccess) {
              resolve({ data: data });
              !props?.isToastDisabled &&
                dispatch(
                  showMessage({
                    message: data.Message,
                    varient: data.Result.Retval == 1 ? 'success' : 'warning',
                  }),
                );
            } else {
              dispatch(showMessage({ message: "Alredy add to Watchlist." }));
              reject(data);
            }
          })
          .catch(errors => {
            reject(errors);
          });
    });
  },
);
export const getWatchStockList = createAsyncThunk(
  'get-to-watchList',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (ajaxWatchListRequest) ajaxWatchListRequest.cancel('CANCEL');
      ajaxWatchListRequest = axios.CancelToken.source();
      const obj =
        props?.displayType === 'diamond'
          ? {
            UserID: props.userId,
            Diamond_Type: props.diamondType,
          }
          : {
            Cust_ID: props.userId,
          };
      props?.displayType === 'diamond'
        ? axios
          .post('http://72.61.170.111:8088/mobile-api/get-stock-watchlist', obj, {
            cancelToken: ajaxWatchListRequest.token,
          })
          .then(({ data }) => {
            if (data.IsSuccess) {
              resolve({
                data: data.Result,
                displayType: props?.displayType,
              });
            } else {
              reject(data);
            }
          })
          .catch(errors => {
            reject(errors);
          })
        : axios
          .post('http://72.61.170.111:8088/mobile-api/get-jewellery-watchlist', obj, {
            cancelToken: ajaxWatchListRequest.token,
          })
          .then(({ data }) => {
            if (data.IsSuccess) {
              resolve({ data: data.Result, displayType: props?.displayType });
            } else {
              reject(data);
            }
          })
          .catch(errors => {
            reject(errors);
          });
    });
  },
);
export const getWatchStockListCount = createAsyncThunk(
  'get-to-watchList-count',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const obj = {
        UserID: data.UserID,
        Diamond_Type: '',
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/watchlist-count', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result });
          } else {
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const removeToWatchList = createAsyncThunk(
  'remove-to-watchList',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (props.StockIDs === '') {
        props?.displayType === 'diamond'
          ? dispatch(showMessage({ message: 'Please select stone' }))
          : dispatch(showMessage({ message: 'Please select Jewellery' }));
        reject();
      }
      const obj =
        props?.displayType === 'diamond'
          ? {
            StockIDs: props.StockIDs,
            CustomerID: props.CustomerID,
            Diamond_Type: props.diamondType,
            SellerId: 0,
            DeviceType: 'Web',
            BackEndClientId: 0,
            Remark: '',
          }
          : {
            Stock_ID: props?.StockIDs ? props.StockIDs : '',
            Cust_ID: props?.CustomerID ? props.CustomerID : '',
          };
      props?.displayType === 'diamond'
        ? axios
          .post('http://72.61.170.111:8088/mobile-api/remove-from-watch-list', obj)
          .then(({ data }) => {
            if (data.IsSuccess) {
              resolve({ data: data });
              dispatch(
                showMessage({
                  message: 'Remove to Watchlist Sucessfully.',
                  varient: 'success',
                }),
              );
            } else {
              dispatch(showMessage({ message: data.Message }));
              reject(data);
            }
          })
          .catch(errors => {
            reject(errors);
          })
        : axios
          .post('http://72.61.170.111:8088/mobile-api/remove-from-jewellery-watchlist', obj)
          .then(({ data }) => {
            if (data.IsSuccess) {
              resolve({ data: data });
              dispatch(
                showMessage({
                  message: 'Remove to Watchlist Sucessfully.',
                  varient: 'success',
                }),
              );
            } else {
              dispatch(showMessage({ message: data.Message }));
              reject(data);
            }
          })
          .catch(errors => {
            reject(errors);
          });
    });
  },
);
export const addToHoldList = createAsyncThunk(
  'add-to-hold-list',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (data.StockIDs === '') {
        dispatch(showMessage({ message: 'Please select stone' }));
        reject();
      }
      const obj = {
        StockIDs: data.StockIDs,
        CustomerID: data.CustomerID,
        Diamond_Type: data.diamondType,
        SellerId: 0,
        DeviceType: 'Web',
        BackEndClientId: 0,
        Remark: '',
      };
      axios
        .post('http://http://72.61.170.111:8088/mobile-api/add-to-hold', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result.rows });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const addToCartList = createAsyncThunk(
  'cart/addToCartList',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const { StockIDs, CustomerID } = data;

      let stockIdArray = [];

      // Handle different StockIDs formats: string or array
      if (typeof StockIDs === 'string') {
        stockIdArray = StockIDs
          .split(',')
          .map(id => id.trim())
          .filter(id => !!id);
      } else if (Array.isArray(StockIDs)) {
        stockIdArray = StockIDs
          .map(id => (typeof id === 'string' ? id.trim() : String(id)))
          .filter(id => !!id);
      } else {
        stockIdArray = [StockIDs]
      }
      console.log("stockIdArray", stockIdArray, StockIDs);
      const results = [];
      for (const el of stockIdArray) {
        if (!el) {
          dispatch(showMessage({ message: `Invalid StockID: ${el}` }));
          continue;
        }

        const obj = {
          StockID: el,
          Cust_ID: CustomerID,
          PacketID: '',
          DeviceType: 'Web',
          Diamond_Type: '',
          Jewellery_Stock_ID: el,
          GoldType_Id: 0,
          Color_And_Clarity_Id: 0,
          Color_Id: 0,
          Clarity_Id: 0,
          Qty: 1,
          Amount: 172,
          WithStone: false,
          Comment: '',
          TotalWeight: '1.16',
          Engraving: false,
          PriceType: '',
          Setting_ID: 0,
          Size: '',
        };

        try {
          const response = await axios.post(
            'http://http://72.61.170.111:8088/mobile-api/jewellery-diamond-add-to-cart-with-setting',
            obj
          );

          const resData = response.data;

          if (resData.IsSuccess) {
            results.push(resData.Result);
            dispatch(showMessage({ message: resData.Message, variant: 'success' }));
          } else {
            dispatch(showMessage({ message: resData.Message }));
            return rejectWithValue(resData);
          }
        } catch (error) {
          dispatch(showMessage({ message: `Jewellery are already added.`, varient: "warning" }));
        }
      }

      return { data: results };

    } catch (error) {
      console.error("Add to cart error:", error);
      dispatch(showMessage({ message: 'Unexpected error while adding to cart' }));
      return rejectWithValue(error.message || 'Unexpected error');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'remove-from-cart',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const obj = {
        cartIDs: data.cartIDs.toString(),
        UserID: data.UserID,
      };
      axios
        .post('http://http://72.61.170.111:8088/mobile-api/remove-cart-item-by-cartids', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const addToCompareList = createAsyncThunk(
  'add-to-compare-list',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (data.StockIDs === '') {
        dispatch(showMessage({ message: 'Please select stone' }));
        reject();
      }
      const obj = {
        StockIDs: data.StockIDs,
        CustomerID: data.CustomerID,
        Diamond_Type: data.diamondType,
        SellerId: 0,
        DeviceType: 'Web',
        BackEndClientId: 0,
        Remark: '',
      };
      axios
        .post('http://http://72.61.170.111:8088/mobile-api/add-to-compare', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result.rows });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const removeToCompareList = createAsyncThunk(
  'remove-to-compare-list',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (data.StockIDs === '') {
        dispatch(showMessage({ message: 'Please select stone' }));
        reject();
      }
      const obj = {
        StockIDs: data.StockIDs,
        CustomerID: data.CustomerID,
        Diamond_Type: data.diamondType,
        SellerId: 0,
        DeviceType: 'Web',
        BackEndClientId: 0,
        Remark: '',
      };
      axios
        .post('http://http://72.61.170.111:8088/mobile-api/remove-from-compare-list', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result.rows });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const removeFromHold = createAsyncThunk(
  'remove-from-hold-api',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (data.StockIDs === '') {
        dispatch(showMessage({ message: 'Please select stone' }));
        reject();
      }
      const obj = {
        StockIDs: data.StockIDs,
        CustomerID: data.CustomerID,
        Diamond_Type: data.diamondType,
        SellerId: 0,
        DeviceType: 'Web',
        BackEndClientId: 0,
        Remark: '',
      };
      axios
        .post('http://http://72.61.170.111:8088/mobile-api/remove-from-hold', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result.rows });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const stockExcelSendMail = createAsyncThunk(
  'stockExcelSendMail',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const obj = {
        UserID: data.UserID ? data.UserID : 0,
        EmailID: data.emailId ? data.emailId : '',
        Full_Name: data.fullName ? data.fullName : '',
        Subject: data.subject ? data.subject : '',
        Message: data.message ? data.message : '',
        BackEndClientId: data.backEndClientId ? data.backEndClientId : 0,
      };
      axios
        .post('http://http://72.61.170.111:8088/mobile-api/stock-excel-send-mail', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result });
            dispatch(
              showMessage({ message: data.Message, varient: 'success' }),
            );
          } else {
            dispatch(showMessage({ message: data.Message }));
            reject(data);
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getCompareList = createAsyncThunk('get-compare-list-api', data => {
  return new Promise((resolve, reject) => {
    axios
      .post('get-compare-list', data)
      .then(({ data }) => {
        resolve({ data: data.Result });
      })
      .catch(errors => {
        reject(errors);
      });
  });
});
export const myAccountSlice = createSlice({
  name: 'my-account',
  initialState,
  reducers: {
    setIsRefreshGetWatchListApi: (state, action) => {
      state.isRefreshGetWatchListApi = action.payload;
    },
    setIsRefreshGetHoldListApi: (state, action) => {
      state.isRefreshGetHoldListApi = action.payload;
    },
    setCurrentPageWatchList: (state, action) => {
      state.currentPageWatchList = action.payload;
    },
    setWatchListMinPageLimit: (state, action) => {
      state.watchListMinPageLimit = action.payload;
    },
    setWatchListMaxPageLimit: (state, action) => {
      state.watchListMaxPageLimit = action.payload;
    },
    setCurrentPageMyHold: (state, action) => {
      state.currentPageMyHold = action.payload;
    },
    setMyHoldMinPageLimit: (state, action) => {
      state.myHoldMinPageLimit = action.payload;
    },
    setMyHoldMaxPageLimit: (state, action) => {
      state.myHoldMaxPageLimit = action.payload;
    },
    setIsAddToCartList: (state, action) => {
      state.isAddToCartList = action.payload;
    },
    setIsAddToWatchList: (state, action) => {
      state.isAddToWatchList = action.payload;
    },
    setIsAddToCompareList: (state, action) => {
      state.isAddToCompareList = action.payload;
    },
    setIsRemoveFromHold: (state, action) => {
      state.isRemoveFromHold = action.payload;
    },
    setIsExportForMail: (state, action) => {
      state.isExportForMail = action.payload;
    },
    setIsProfileEdit: (state, action) => {
      state.isProfileEdit = action.payload;
    },
    setIsPasswordChanged: (state, action) => {
      state.isPasswordChanged = action.payload;
    },
  },
  extraReducers: {
    [getMyProfileDetail.pending]: (state, action) => {
      state.myProfileDetailLoading = true;
    },
    [getMyProfileDetail.rejected]: (state, action) => {
      state.myProfileDetailList = {};
      state.myProfileDetailLoading = false;
    },
    [getMyProfileDetail.fulfilled]: (state, action) => {
      state.myProfileDetailList = action.payload.data || {};
      state.myProfileDetailLoading = false;
    },
    [editMyProfileDetail.pending]: (state, action) => {
      state.editMyProfileLoading = true;
      state.isProfileEdit = false;
    },
    [editMyProfileDetail.fulfilled]: (state, action) => {
      state.editMyProfileLoading = false;
      state.isProfileEdit = true;
    },
    [editMyProfileDetail.rejected]: (state, action) => {
      state.editMyProfileLoading = false;
      state.isProfileEdit = false;
    },
    [changePassword.pending]: (state, action) => {
      state.editMyProfileLoading = true;
      state.isPasswordChanged = false;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.editMyProfileLoading = false;
      state.isPasswordChanged = true;
    },
    [changePassword.rejected]: (state, action) => {
      state.editMyProfileLoading = false;
      state.isPasswordChanged = false;
    },
    [editAdditionalInfo.pending]: (state, action) => {
      state.editAdditionalInfoLoading = true;
      state.isAdditionalInfoEdit = false;
    },
    [editAdditionalInfo.fulfilled]: (state, action) => {
      state.editAdditionalInfoLoading = false;
      state.isAdditionalInfoEdit = true;
    },
    [editAdditionalInfo.rejected]: (state, action) => {
      state.editAdditionalInfoLoading = false;
      state.isAdditionalInfoEdit = false;
    },
    [getMyHoldStockList.pending]: (state, action) => {
      state.myHoldStockList = [];
      state.myHoldStockListLoading = true;
    },
    [getMyHoldStockList.rejected]: (state, action) => {
      state.myHoldStockList = [];
      state.myHoldStockListLoading = false;
    },
    [getMyHoldStockList.fulfilled]: (state, action) => {
      state.myHoldStockList = action.payload.data?.rows || [];
      state.myHoldTotalRows = action.payload.data?.total || 0;
      state.myHoldStockListLoading = false;
    },
    [getSearchStockCommon.pending]: (state, action) => {
      state.getSearchStockCommonList = [];
      state.getSearchStockLoading = true;
    },
    [getSearchStockCommon.fulfilled]: (state, action) => {
      state.getSearchStockCommonList = action.payload.data;
      state.getSearchStockLoading = false;
    },
    [getSearchStockCommon.rejected]: (state, action) => {
      state.getSearchStockCommonList = [];
      state.getSearchStockLoading = false;
    },
    [addToWatchList.pending]: (state, action) => {
      state.isAddToWatchList = false;
      state.addToWatchLoading = true;
    },
    [addToWatchList.rejected]: (state, action) => {
      state.isAddToWatchList = false;
      state.addToWatchLoading = false;
    },
    [addToWatchList.fulfilled]: (state, action) => {
      state.isAddToWatchList = true;
      state.addToWatchLoading = false;
    },
    [removeToWatchList.pending]: (state, action) => {
      state.isAddToWatchList = false;
      state.addToWatchLoading = true;
    },
    [removeToWatchList.rejected]: (state, action) => {
      state.isAddToWatchList = false;
      state.addToWatchLoading = false;
    },
    [removeToWatchList.fulfilled]: (state, action) => {
      state.isAddToWatchList = true;
      state.addToWatchLoading = false;
    },
    [addToHoldList.pending]: (state, action) => {
      state.isAddToHoldList = false;
      state.addToHoldLoading = true;
    },
    [addToHoldList.rejected]: (state, action) => {
      state.isAddToHoldList = false;
      state.addToHoldLoading = false;
    },
    [addToHoldList.fulfilled]: (state, action) => {
      state.isAddToHoldList = true;
      state.addToHoldLoading = false;
    },
    [addToCartList.pending]: (state, action) => {
      state.isAddToCartList = false;
      state.addToCartLoading = true;
    },
    [addToCartList.rejected]: (state, action) => {
      state.isAddToCartList = false;
      state.addToCartLoading = false;
    },
    [addToCartList.fulfilled]: (state, action) => {
      state.isAddToCartList = true;
      state.addToCartLoading = false;
    },
    [removeFromCart.pending]: (state, action) => {
      state.isAddToCartList = false;
    },
    [removeFromCart.rejected]: (state, action) => {
      state.isAddToCartList = false;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.isAddToCartList = true;
    },
    [addToCompareList.pending]: (state, action) => {
      state.isAddToCompareList = false;
      state.addToCompareLoading = true;
    },
    [addToCompareList.rejected]: (state, action) => {
      state.isAddToCompareList = false;
      state.addToCompareLoading = false;
    },
    [addToCompareList.fulfilled]: (state, action) => {
      state.isAddToCompareList = true;
      state.addToCompareLoading = false;
    },
    [removeToCompareList.pending]: (state, action) => {
      state.isAddToCompareList = false;
    },
    [removeToCompareList.rejected]: (state, action) => {
      state.isAddToCompareList = false;
    },
    [removeToCompareList.fulfilled]: (state, action) => {
      state.isAddToCompareList = true;
    },
    [removeFromHold.pending]: (state, action) => {
      state.isRemoveFromHold = false;
      state.addToHoldLoading = true;
    },
    [removeFromHold.rejected]: (state, action) => {
      state.isRemoveFromHold = false;
      state.addToHoldLoading = false;
    },
    [removeFromHold.fulfilled]: (state, action) => {
      state.isRemoveFromHold = true;
      state.addToHoldLoading = false;
    },
    [getCompareList.pending]: (state, action) => {
      state.compareStockList = [];
      state.compareListLoading = true;
    },
    [getCompareList.rejected]: (state, action) => {
      state.compareStockList = [];
      state.compareListLoading = false;
    },
    [getCompareList.fulfilled]: (state, action) => {
      state.compareStockList = action.payload.data;
      state.compareListLoading = false;
    },
    [getWatchStockList.pending]: (state, action) => {
      state.watchStockLoading = true;
      state.watchStockList = [];
    },
    [getWatchStockList.rejected]: (state, action) => {
      state.watchStockList = [];
      state.watchStockLoading =
        action?.error?.code === 'ERR_CANCELED' ? true : false;
      state.totalwatchStockListRecords = 0;
      state.totalwatchStockListRows = 0;
    },
    [getWatchStockList.fulfilled]: (state, action) => {
      const { data, displayType } = action.payload;

      if (displayType === 'diamond') {
        console.log("displayType", displayType, data.rows);
        state.watchListCurrentData = data.rows || [];
        state.watchStockLoading = false;
        state.totalwatchStockListRecords = data?.TotalRows;
        state.totalwatchStockListRows = data?.total;
      } else if (displayType === 'jewellery') {
        let watchListData = data?.length > 0 ? [...data] : [];
        watchListData = watchListData?.map(item => {
          return { ...item, Metal_PurityColor: item.Metal };
        });
        state.watchStockLoading = false;
        state.totalwatchStockListRecords = data?.length > 0 ? data.length : 0;
      }
    },
    [getWatchStockListCount.pending]: (state, action) => { },
    [getWatchStockListCount.rejected]: (state, action) => {
      state.countOfWatchList = 0;
    },
    [getWatchStockListCount.fulfilled]: (state, action) => {
      let jewelleryTotalCount = action.payload?.data?.JewelleryTotalCount || 0;
      let mixTotalCount = action.payload?.data?.MixTotalCount || 0;
      state.countOfWatchList =
        (action.payload?.data?.TotalCount
          ? action.payload.data.TotalCount
          : 0) +
        jewelleryTotalCount +
        mixTotalCount;
    },
  },
});
export const {
  setIsRefreshGetWatchListApi,
  setIsRefreshGetHoldListApi,
  setCurrentPageWatchList,
  setWatchListMinPageLimit,
  setWatchListMaxPageLimit,
  setCurrentPageMyHold,
  setMyHoldMinPageLimit,
  setMyHoldMaxPageLimit,
  setIsAddToCartList,
  setIsAddToWatchList,
  setIsProfileEdit,
  setIsPasswordChanged,
  setIsAddToCompareList,
  setIsRemoveFromHold,
  setIsExportForMail,
} = myAccountSlice.actions;

export default myAccountSlice.reducer;
