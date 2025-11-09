import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToWatchMixDimaondList, showMessage } from './common.slice';
import axios from 'axios';
import { clearToken } from '../../../Helper/AuthTokenHelper';
import { Domain } from '../../../Helper/CommonHelper';
import {
  addToCartList,
  addToCompareList,
  addToWatchList,
} from './myAccount.slice';
import {
  setCartDiamondList,
  setCartMixDiamondList,
  setCompareDiamondList,
  setJewelleryCartList,
  setJewelleryWatchListData,
  setWishDiamondList,
  setWishMixDiamondList,
} from './offlineList.slice';
import { addToCartJewellery } from './jewellery.slice';

const initialState = {
  isLogin: false,
  loginLoading: false,
  registrationLoading: false,
  isRegistration: false,
  contactDetailLoading: false,
  IsContactDetail: false,
  userData: {},
  isLogout: false,
  logoutLoading: false,
  isForget: false,
  forgetLoading: false,
};

export const registration = createAsyncThunk(
  'user-registration',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const obj = {
        DomainName: Domain ? Domain : '',
        Company_Name: data.companyName ? data.companyName : '',
        Nature_Organisation_ID: data?.natureOfBusiness?.value
          ? data.natureOfBusiness.value
          : '',
        Full_Name:
          data.firstName && data.lastName
            ? data.firstName + ' ' + data.lastName
            : '',
        Login_Name: data.email ? data.email : '',
        Contact_No: data.contactNo ? data.contactNo : '',
        Login_Pass: data.password ? data.password : '',
        Country_Name: data?.country?.label ? data.country.label : '',
        State_Name: data?.state ? data.state : '',
        CityName: data?.city ? data.city : '',
        Country_ID: data?.country?.value ? data.country.value : 0,
        State_ID: 0,
        City_ID: 0,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/registration/signup', obj)
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
export const contactDetail = createAsyncThunk(
  'contactDetail',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/save-contact-detail', props)
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
export const login = createAsyncThunk(
  'user-login',
  (data, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      const obj = {
        UserName: data.email ? data.email : '',
        Password: data.password ? data.password : '',
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/registration/login', obj)
        .then(async ({ data }) => {
          if (data.IsSuccess) {
            Object.keys(data.Result)?.length > 0 &&
              localStorage.setItem(
                'userLoginInfo',
                window.btoa(JSON.stringify(data.Result)),
              );
            if (data.Result?.UserID) {
              const diamondWishList = getState().offlineList?.wishDiamondList;
              const diamondCartList = getState().offlineList?.cartDiamondList;
              const mixDiamondCartList =
                getState().offlineList?.cartMixDiamondList;
              const mixDiamondWishList =
                getState().offlineList?.wishMixDiamondList;
              const jewelleryCartList =
                getState().offlineList?.jewelleryCartListData;
              const diamondCompareList =
                getState().offlineList?.compareDiamondList;
              const jewelleryWatchList =
                getState().offlineList?.jewelleryWatchListData;
              if (diamondWishList?.naturalDiamond?.length > 0) {
                let wishList = diamondWishList.naturalDiamond?.map(
                  item => item.Stock_ID,
                );
                await dispatch(
                  addToWatchList({
                    StockIDs: wishList.toString(),
                    CustomerID: data.Result.UserID,
                    diamondType: 'NATURAL',
                    displayType: 'diamond',
                  }),
                );
              }
              if (diamondWishList?.labGrownDiamond?.length > 0) {
                let wishList = diamondWishList.labGrownDiamond?.map(
                  item => item.Stock_ID,
                );
                await dispatch(
                  addToWatchList({
                    StockIDs: wishList.toString(),
                    CustomerID: data.Result.UserID,
                    diamondType: 'LABGROWN',
                    displayType: 'diamond',
                  }),
                );
              }
              if (
                mixDiamondWishList?.naturalDiamond?.length > 0 ||
                mixDiamondWishList?.labGrownDiamond?.length > 0
              ) {
                let mixDiamondWishListData = [
                  ...(mixDiamondWishList.naturalDiamond || []),
                  [...(mixDiamondWishList.labGrownDiamond || [])],
                ]?.map(item => item.Packet_Id);
                await dispatch(
                  addToWatchMixDimaondList({
                    packetId: mixDiamondWishListData.toString(),
                    userId: data.Result.UserID,
                  }),
                );
              }
              if (diamondCartList?.naturalDiamond?.length > 0) {
                let cartList = diamondCartList.naturalDiamond?.map(
                  item => item.Stock_ID,
                );
                await dispatch(
                  addToCartList({
                    StockIDs: cartList.toString(),
                    CustomerID: data.Result.UserID,
                    diamondType: 'NATURAL',
                  }),
                );
              }
              if (diamondCartList?.labGrownDiamond?.length > 0) {
                let cartList = diamondCartList.labGrownDiamond?.map(
                  item => item.Stock_ID,
                );
                
                await dispatch(
                  addToCartList({
                    StockIDs: cartList.toString(),
                    CustomerID: data.Result.UserID,
                    diamondType: 'LABGROWN',
                  }),
                );
              }
              if (
                mixDiamondCartList?.naturalDiamond?.length > 0 ||
                mixDiamondCartList?.labGrownDiamond?.length > 0
              ) {
                let mixDiaondcartListData = [
                  ...(mixDiamondCartList.naturalDiamond || []),
                  ...(mixDiamondCartList.labGrownDiamond || []),
                ]?.map(item => item.Packet_Id);
                await dispatch(
                  addToCartJewellery({
                    packetId: mixDiaondcartListData.toString(),
                    userId: data.Result.UserID,
                  }),
                );
              }
              if (diamondCompareList?.naturalDiamond?.length > 0) {
                let compareList = diamondCompareList.naturalDiamond?.map(
                  item => item.Stock_ID,
                );
                await dispatch(
                  addToCompareList({
                    StockIDs: compareList.toString(),
                    CustomerID: data.Result.UserID,
                    diamondType: 'NATURAL',
                  }),
                );
              }
              if (diamondCompareList?.labGrownDiamond?.length > 0) {
                let compareList = diamondCompareList.labGrownDiamond?.map(
                  item => item.Stock_ID,
                );
                await dispatch(
                  addToCompareList({
                    StockIDs: compareList.toString(),
                    CustomerID: data.Result.UserID,
                    diamondType: 'LABGROWN',
                  }),
                );
              }
              if (jewelleryCartList?.length > 0) {
                for (let i = 0; i < jewelleryCartList.length; i++) {
                  const element = jewelleryCartList[i];
                  await dispatch(
                    addToCartJewellery({
                      ...element,
                      userId: data.Result.UserID,
                      isToastDisabled: true,
                    }),
                  );
                }
              }
              if (jewelleryWatchList?.length > 0) {
                let jewelleryWatch = jewelleryWatchList?.map(
                  item => item.Stock_ID,
                );
                await dispatch(
                  addToWatchList({
                    StockIDs: jewelleryWatch.toString(),
                    CustomerID: data.Result.UserID,
                    isToastDisabled: true,
                  }),
                );
              }
            }
            dispatch(
              setCompareDiamondList({
                naturalDiamond: [],
                labGrownDiamond: [],
              }),
            );
            dispatch(
              setWishDiamondList({
                naturalDiamond: [],
                labGrownDiamond: [],
              }),
            );
            dispatch(
              setCartDiamondList({
                naturalDiamond: [],
                labGrownDiamond: [],
              }),
            );
            dispatch(
              setWishMixDiamondList({
                naturalDiamond: [],
                labGrownDiamond: [],
              }),
            );
            dispatch(
              setCartMixDiamondList({
                naturalDiamond: [],
                labGrownDiamond: [],
              }),
            );
            dispatch(setJewelleryCartList([]));
            dispatch(setJewelleryWatchListData([]));
            resolve({ data: data.Result });
            dispatch(
              showMessage({ message: 'Log In Successful', varient: 'success' }),
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
export const forgetPassword = createAsyncThunk(
  'forgot-password',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const obj = {
        DomainName: data.DomainName,
        EmailID: data.EmailID,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/forget-password', obj)
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

export const logout = createAsyncThunk('user-logout', (data, { dispatch }) => {
  return new Promise((resolve, reject) => {
    const obj = {
      UserID: data.UserID,
    };
    axios
      .post('http://72.61.170.111:8088/mobile-api/logout', obj)
      .then(({ data }) => {
        if (data?.IsSuccess) {
          clearToken();
          dispatch(getLoginInfo({}));
          resolve({ data: data.Result });
          dispatch(showMessage({ message: data.Message, varient: 'success' }));
        } else {
          dispatch(showMessage({ message: data.Message }));
          reject(data);
        }
      })
      .catch(errors => {
        reject(errors);
        dispatch(showMessage({ message: data.Message }));
      });
  });
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getLoginInfo: (state, action) => {
      state.userData = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setIsRegistration: (state, action) => {
      state.isRegistration = action.payload;
    },
    setContactDetail: (state, action) => {
      state.IsContactDetail = action.payload;
    },
    setIsForget: (state, action) => {
      state.isForget = action.payload;
    },
    setIsLogout: (state, action) => {
      state.isLogout = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.userData = {};
      state.loginLoading = true;
      state.isLogin = false;
    },
    [login.rejected]: (state, action) => {
      state.userData = {};
      state.isLogin = false;
      state.loginLoading = false;
    },
    [login.fulfilled]: (state, action) => {
      state.userData = action.payload.data;
      state.isLogin = true;
      state.loginLoading = false;
    },
    [logout.pending]: (state, action) => {
      state.logoutLoading = true;
      state.isLogout = false;
    },
    [logout.rejected]: (state, action) => {
      state.isLogout = false;
      state.logoutLoading = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.isLogout = true;
      state.logoutLoading = false;
    },
    [registration.pending]: (state, action) => {
      state.registrationLoading = true;
      state.isRegistration = false;
    },
    [registration.rejected]: (state, action) => {
      state.isRegistration = false;
      state.registrationLoading = false;
    },
    [registration.fulfilled]: (state, action) => {
      state.isRegistration = true;
      state.registrationLoading = false;
    },
    [contactDetail.pending]: (state, action) => {
      state.contactDetailLoading = true;
      state.IsContactDetail = false;
    },
    [contactDetail.rejected]: (state, action) => {
      state.IsContactDetail = false;
      state.contactDetailLoading = false;
    },
    [contactDetail.fulfilled]: (state, action) => {
      state.IsContactDetail = true;
      state.contactDetailLoading = false;
    },
    [forgetPassword.pending]: (state, action) => {
      state.forgetLoading = true;
      state.isForget = false;
    },
    [forgetPassword.rejected]: (state, action) => {
      state.isForget = false;
      state.forgetLoading = false;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.isForget = true;
      state.forgetLoading = false;
    },
  },
});

export const {
  getLoginInfo,
  setIsLogin,
  setIsLogout,
  setIsForget,
  setIsRegistration,
  setContactDetail,
} = authSlice.actions;
export default authSlice.reducer;
