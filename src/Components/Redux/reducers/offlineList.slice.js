import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from './common.slice';

const initialState = {
  compareDiamondList: {
    labGrownDiamond: [],
    naturalDiamond: [],
  },
  wishDiamondList: {
    labGrownDiamond: [],
    naturalDiamond: [],
  },
  cartDiamondList: {
    labGrownDiamond: [],
    naturalDiamond: [],
  },
  cartMixDiamondList: {
    labGrownDiamond: [],
    naturalDiamond: [],
  },
  wishMixDiamondList: {
    labGrownDiamond: [],
    naturalDiamond: [],
  },
  jewelleryCartListData: [],
  jewelleryWatchListData: [],
  diamondType: 'LABGROWN',
  isAddToCartSettingWise: false,
  isAddToWatchSettingWise: false,
  watchDisplayViewType: 'diamond',
};

const removeiSCheck = arr => {
  if (arr?.length > 0) {
    const dummyArray = arr?.map(item => {
      return { ...item, isCheck: false };
    });
    return dummyArray;
  }
  return [];
};

export const addToWishListInLocalList = createAsyncThunk(
  'add-to-wish-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        const { diamondType, diamondWishList } = props;
        
        let [...oldNaturalDiamond] =
          getState().offlineList?.wishDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.wishDiamondList?.labGrownDiamond || [];
        
        let isAdded = false;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            diamondWishList?.forEach(item => {
              let isAddedObj = oldNaturalDiamond.find(
                item2 => item.Stock_ID === item2.Stock_ID,
              );
              if (!isAddedObj) {
                isAdded = true;
                newNaturalDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newNaturalDiamond = [...diamondWishList];
          }
          dispatch(
            setWishDiamondList({
              naturalDiamond: removeiSCheck([
                ...oldNaturalDiamond,
                ...newNaturalDiamond,
              ]),
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            diamondWishList?.forEach(item => {
              let isAddedObj = oldLabGrownDiamond.find(
                item2 => item.Stock_ID === item2.Stock_ID,
              );
              if (!isAddedObj) {
                isAdded = true;
                newLabGrownDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newLabGrownDiamond = [...diamondWishList];
          }
          dispatch(
            setWishDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: removeiSCheck([
                ...oldLabGrownDiamond,
                ...newLabGrownDiamond,
              ]),
            }),
          );
        }
        
        if (isAdded) {
          dispatch(
            showMessage({
              message: 'Stone added successfully',
              varient: 'success',
            }),
          );
        } else {
          dispatch(
            showMessage({ 
              message: 'Stones are already added',
              varient: 'info'
            })
          );
        }
        
        resolve({ success: true, isAdded });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const addToWishMixListInLocalList = createAsyncThunk(
  'add-to-wish-mix-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        const { diamondType, mixDiamondWishList } = props;
        let [...oldNaturalDiamond] =
          getState().offlineList?.wishMixDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.wishMixDiamondList?.labGrownDiamond || [];
        let isAdded = false;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            mixDiamondWishList?.forEach(item => {
              let isAddedObj = oldNaturalDiamond.find(
                item2 => item.Packet_Id === item2.Packet_Id,
              );
              if (!isAddedObj) {
                isAdded = true;
                newNaturalDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newNaturalDiamond = [...mixDiamondWishList];
          }
          dispatch(
            setWishMixDiamondList({
              naturalDiamond: removeiSCheck([
                ...oldNaturalDiamond,
                ...newNaturalDiamond,
              ]),
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            mixDiamondWishList?.forEach(item => {
              let isAddedObj = oldLabGrownDiamond.find(
                item2 => item.Packet_Id === item2.Packet_Id,
              );
              if (!isAddedObj) {
                isAdded = true;
                newLabGrownDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newLabGrownDiamond = [...mixDiamondWishList];
          }
          dispatch(
            setWishMixDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: removeiSCheck([
                ...oldLabGrownDiamond,
                ...newLabGrownDiamond,
              ]),
            }),
          );
        }
        
        if (isAdded) {
          dispatch(
            showMessage({
              message: 'Stone added successfully',
              varient: 'success',
            }),
          );
        } else {
          dispatch(
            showMessage({ 
              message: 'Stones are already added',
              varient: 'info'
            })
          );
        }
        
        resolve({ success: true, isAdded });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const removeFromWishListInLocal = createAsyncThunk(
  'remove-from-wish-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        let [...oldNaturalDiamond] =
          getState().offlineList?.wishDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.wishDiamondList?.labGrownDiamond || [];
        const { diamondType, diamondWishList } = props;
        
        if (diamondType === 'NATURAL') {
          if (diamondWishList?.length > 0) {
            oldNaturalDiamond = oldNaturalDiamond.filter(
              item1 =>
                !diamondWishList.some(item2 => item1.Stock_ID === item2.Stock_ID),
            );
          }
          dispatch(
            setWishDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          if (diamondWishList?.length > 0) {
            oldLabGrownDiamond = oldLabGrownDiamond.filter(
              item1 =>
                !diamondWishList.some(item2 => item1.Stock_ID === item2.Stock_ID),
            );
          }
          dispatch(
            setWishDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        }
        
        dispatch(
          showMessage({
            message: 'Stone removed successfully',
            varient: 'success',
          }),
        );
        
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const removeFromWishMixListInLocal = createAsyncThunk(
  'remove-from-wish-mix-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        let [...oldNaturalDiamond] =
          getState().offlineList?.wishMixDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.wishMixDiamondList?.labGrownDiamond || [];
        const { diamondType, mixDiamondWishList } = props;
        
        if (diamondType === 'NATURAL') {
          if (mixDiamondWishList?.length > 0) {
            oldNaturalDiamond = oldNaturalDiamond.filter(
              item1 =>
                !mixDiamondWishList.some(
                  item2 => item1.Packet_Id === item2.Packet_Id,
                ),
            );
          }
          dispatch(
            setWishMixDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          if (mixDiamondWishList?.length > 0) {
            oldLabGrownDiamond = oldLabGrownDiamond.filter(
              item1 =>
                !mixDiamondWishList.some(
                  item2 => item1.Packet_Id === item2.Packet_Id,
                ),
            );
          }
          dispatch(
            setWishMixDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        }
        
        dispatch(
          showMessage({
            message: 'Stone removed successfully',
            varient: 'success',
          }),
        );
        
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const addToCartListInLocal = createAsyncThunk(
  'add-to-cart-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        let [...oldNaturalDiamond] =
          getState().offlineList?.cartDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.cartDiamondList?.labGrownDiamond || [];
        const { diamondType, diamondCartList } = props;
        let isAdded = false;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            diamondCartList?.forEach(item => {
              let isAddedObj = oldNaturalDiamond.find(
                item2 => item.Stock_ID === item2.Stock_ID,
              );
              if (!isAddedObj) {
                isAdded = true;
                newNaturalDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newNaturalDiamond = [...diamondCartList];
          }
          dispatch(
            setCartDiamondList({
              naturalDiamond: removeiSCheck([
                ...oldNaturalDiamond,
                ...newNaturalDiamond,
              ]),
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            diamondCartList?.forEach(item => {
              let isAddedObj = oldLabGrownDiamond.find(
                item2 => item.Stock_ID === item2.Stock_ID,
              );
              if (!isAddedObj) {
                isAdded = true;
                newLabGrownDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newLabGrownDiamond = [...diamondCartList];
          }
          dispatch(
            setCartDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: removeiSCheck([
                ...oldLabGrownDiamond,
                ...newLabGrownDiamond,
              ]),
            }),
          );
        }
        
        if (isAdded) {
          dispatch(
            showMessage({
              message: 'Stone added successfully',
              varient: 'success',
            }),
          );
        } else {
          dispatch(
            showMessage({ 
              message: 'Stones are already added',
              varient: 'info'
            })
          );
        }
        
        resolve({ success: true, isAdded });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const addToCartMixListInLocal = createAsyncThunk(
  'add-to-cart-mix-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        let [...oldNaturalDiamond] =
          getState().offlineList?.cartMixDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.cartMixDiamondList?.labGrownDiamond || [];
        const { diamondType, mixDiamondCartList } = props;
        let isAdded = false;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            mixDiamondCartList?.forEach(item => {
              let isAddedObj = oldNaturalDiamond.find(
                item2 => item.Packet_Id === item2.Packet_Id,
              );
              if (!isAddedObj) {
                isAdded = true;
                newNaturalDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newNaturalDiamond = [...mixDiamondCartList];
          }
          dispatch(
            setCartMixDiamondList({
              naturalDiamond: removeiSCheck([
                ...oldNaturalDiamond,
                ...newNaturalDiamond,
              ]),
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            mixDiamondCartList?.forEach(item => {
              let isAddedObj = oldLabGrownDiamond.find(
                item2 => item.Packet_Id === item2.Packet_Id,
              );
              if (!isAddedObj) {
                isAdded = true;
                newLabGrownDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newLabGrownDiamond = [...mixDiamondCartList];
          }
          dispatch(
            setCartMixDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: removeiSCheck([
                ...oldLabGrownDiamond,
                ...newLabGrownDiamond,
              ]),
            }),
          );
        }
        
        if (isAdded) {
          dispatch(
            showMessage({
              message: 'Stone added successfully',
              varient: 'success',
            }),
          );
        } else {
          dispatch(
            showMessage({ 
              message: 'Stones are already added',
              varient: 'info'
            })
          );
        }
        
        resolve({ success: true, isAdded });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const removeFromCartListInLocal = createAsyncThunk(
  'remove-from-cart-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        let [...oldNaturalDiamond] =
          getState().offlineList?.cartDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.cartDiamondList?.labGrownDiamond || [];
        const { diamondType, diamondCartObj } = props;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            newNaturalDiamond = oldNaturalDiamond.filter(
              item => item.Stock_ID !== diamondCartObj.Stock_ID,
            );
          }
          dispatch(
            setCartDiamondList({
              naturalDiamond: newNaturalDiamond,
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            newLabGrownDiamond = oldLabGrownDiamond.filter(
              item => item.Stock_ID !== diamondCartObj.Stock_ID,
            );
          }
          dispatch(
            setCartDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: newLabGrownDiamond,
            }),
          );
        }
        
        dispatch(
          showMessage({
            message: 'Stone removed successfully',
            varient: 'success',
          }),
        );
        
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const removeFromCartMixListInLocal = createAsyncThunk(
  'remove-from-cart-mix-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        let [...oldNaturalDiamond] =
          getState().offlineList?.cartMixDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.cartMixDiamondList?.labGrownDiamond || [];
        const { diamondType, mixDiamondCartObj } = props;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            newNaturalDiamond = oldNaturalDiamond.filter(
              item => item.Packet_Id !== mixDiamondCartObj.Packet_Id,
            );
          }
          dispatch(
            setCartMixDiamondList({
              naturalDiamond: newNaturalDiamond,
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            newLabGrownDiamond = oldLabGrownDiamond.filter(
              item => item.Packet_Id !== mixDiamondCartObj.Packet_Id,
            );
          }
          dispatch(
            setCartMixDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: newLabGrownDiamond,
            }),
          );
        }
        
        dispatch(
          showMessage({
            message: 'Stone removed successfully',
            varient: 'success',
          }),
        );
        
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const addToComapareListInLocalList = createAsyncThunk(
  'add-to-compare-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        const { diamondType, diamondCompareList } = props;
        let [...oldNaturalDiamond] =
          getState().offlineList?.compareDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.compareDiamondList?.labGrownDiamond || [];
        let isAdded = false;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            diamondCompareList?.forEach(item => {
              let isAddedObj = oldNaturalDiamond.find(
                item2 => item.Stock_ID === item2.Stock_ID,
              );
              if (!isAddedObj) {
                isAdded = true;
                newNaturalDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newNaturalDiamond = [...diamondCompareList];
          }
          dispatch(
            setCompareDiamondList({
              naturalDiamond: [...oldNaturalDiamond, ...newNaturalDiamond],
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            diamondCompareList?.forEach(item => {
              let isAddedObj = oldLabGrownDiamond.find(
                item2 => item.Stock_ID === item2.Stock_ID,
              );
              if (!isAddedObj) {
                isAdded = true;
                newLabGrownDiamond.push(item);
              }
            });
          } else {
            isAdded = true;
            newLabGrownDiamond = [...diamondCompareList];
          }
          dispatch(
            setCompareDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: [...oldLabGrownDiamond, ...newLabGrownDiamond],
            }),
          );
        }
        
        if (isAdded) {
          dispatch(
            showMessage({
              message: 'Stone added successfully',
              varient: 'success',
            }),
          );
        } else {
          dispatch(
            showMessage({ 
              message: 'Stones are already added',
              varient: 'info'
            })
          );
        }
        
        resolve({ success: true, isAdded });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const removeFromCompareListInLocal = createAsyncThunk(
  'remove-from-compare-list-in-local',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        let [...oldNaturalDiamond] =
          getState().offlineList?.compareDiamondList?.naturalDiamond || [];
        let [...oldLabGrownDiamond] =
          getState().offlineList?.compareDiamondList?.labGrownDiamond || [];
        const { diamondType, diamondCompareObj } = props;
        
        if (diamondType === 'NATURAL') {
          let newNaturalDiamond = [];
          if (oldNaturalDiamond?.length > 0) {
            newNaturalDiamond = oldNaturalDiamond.filter(
              item => item.Stock_ID !== diamondCompareObj.Stock_ID,
            );
          }
          dispatch(
            setCompareDiamondList({
              naturalDiamond: newNaturalDiamond,
              labGrownDiamond: oldLabGrownDiamond,
            }),
          );
        } else {
          let newLabGrownDiamond = [];
          if (oldLabGrownDiamond?.length > 0) {
            newLabGrownDiamond = oldLabGrownDiamond.filter(
              item => item.Stock_ID !== diamondCompareObj.Stock_ID,
            );
          }
          dispatch(
            setCompareDiamondList({
              naturalDiamond: oldNaturalDiamond,
              labGrownDiamond: newLabGrownDiamond,
            }),
          );
        }
        
        dispatch(
          showMessage({
            message: 'Stone removed successfully',
            varient: 'success',
          }),
        );
        
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const addToCartListInLocalJewelery = createAsyncThunk(
  'add-to-cart-list-in-local-jewelery',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        const { jeweleryList } = props;
        let [...jewelleryCartList] =
          getState().offlineList?.jewelleryCartListData || [];
        let isAdded = false;
        
        if (jewelleryCartList?.length === 0) {
          jewelleryCartList.push(jeweleryList);
          dispatch(setJewelleryCartList(jewelleryCartList));
          isAdded = true;
          jeweleryList?.Setting_ID && dispatch(setIsAddToCartSettingWise(true));
        } else {
          let isAvailbleJewelery = false;
          if (jeweleryList?.Setting_ID) {
            isAvailbleJewelery = jewelleryCartList?.find(
              item =>
                jeweleryList?.Setting_ID &&
                item.Stock_ID === jeweleryList.Stock_ID &&
                item.Jewellery_Stock_ID === jeweleryList.Jewellery_Stock_ID,
            );
          } else {
            isAvailbleJewelery = jewelleryCartList?.find(
              item => item.Jewellery_Stock_ID === jeweleryList.Jewellery_Stock_ID,
            );
          }
          if (!isAvailbleJewelery) {
            jewelleryCartList.push(jeweleryList);
            dispatch(setJewelleryCartList(jewelleryCartList));
            isAdded = true;
            jeweleryList?.Setting_ID && dispatch(setIsAddToCartSettingWise(true));
          }
        }
        
        if (isAdded) {
          dispatch(
            showMessage({
              message: 'Jewellery added successfully',
              varient: 'success',
            }),
          );
        } else {
          dispatch(
            showMessage({ 
              message: 'Jewellery are already added',
              varient: 'info'
            })
          );
        }
        
        resolve({ success: true, isAdded });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const addToWatchListInLocalJewelery = createAsyncThunk(
  'add-to-watch-list-in-local-jewelery',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        const { jeweleryList } = props;
        let [...jewelleryWatchList] =
          getState().offlineList?.jewelleryWatchListData || [];
        let isAdded = false;
        
        if (jewelleryWatchList?.length === 0) {
          jewelleryWatchList.push(jeweleryList);
          dispatch(setJewelleryWatchListData(jewelleryWatchList));
          isAdded = true;
          jeweleryList?.Setting_ID && dispatch(setIsAddToWatchSettingWise(true));
        } else {
          let isAvailbleJewelery = false;
          if (jeweleryList?.Setting_ID) {
            isAvailbleJewelery = jewelleryWatchList?.find(
              item =>
                jeweleryList?.Setting_ID &&
                item.Stock_ID === jeweleryList.Stock_ID &&
                item.Jewellery_Stock_ID === jeweleryList.Jewellery_Stock_ID,
            );
          } else {
            isAvailbleJewelery = jewelleryWatchList?.find(
              item => item.Jewellery_Stock_ID === jeweleryList.Jewellery_Stock_ID,
            );
          }
          if (!isAvailbleJewelery) {
            jewelleryWatchList.push(jeweleryList);
            dispatch(setJewelleryWatchListData(jewelleryWatchList));
            isAdded = true;
            jeweleryList?.Setting_ID &&
              dispatch(setIsAddToWatchSettingWise(true));
          }
        }
        
        if (isAdded) {
          dispatch(
            showMessage({
              message: 'Jewellery added successfully',
              varient: 'success',
            }),
          );
        } else {
          dispatch(
            showMessage({ 
              message: 'Jewellery are already added',
              varient: 'info'
            })
          );
        }
        
        resolve({ success: true, isAdded });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const removeFromWishListInLocalJewelery = createAsyncThunk(
  'remove-from-wish-list-in-local-jewelery',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        const { jeweleryList } = props;
        let [...jewelleryWatchList] =
          getState().offlineList?.jewelleryWatchListData || [];
        
        if (jewelleryWatchList?.length > 0) {
          jewelleryWatchList = jewelleryWatchList.filter(
            item1 =>
              !jeweleryList.some(item2 => item1.Stock_ID === item2.Stock_ID),
          );
        }
        
        dispatch(setJewelleryWatchListData(jewelleryWatchList));
        dispatch(
          showMessage({
            message: 'Jewellery removed successfully',
            varient: 'success',
          }),
        );
        
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const removeFromCartListInLocalJewelery = createAsyncThunk(
  'remove-to-wish-list-in-local-jewelery',
  (props, { dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      try {
        const { jeweleryObj } = props;
        let [...jewelleryCartList] =
          getState().offlineList?.jewelleryCartListData || [];
        let newJewelleryCartListData = [];
        
        if (jewelleryCartList?.length > 0) {
          if (jeweleryObj?.Setting_ID) {
            newJewelleryCartListData = jewelleryCartList.filter(
              item =>
                item.Stock_ID !== jeweleryObj.Stock_ID &&
                item.Jewellery_Stock_ID !== jeweleryObj.Jewellery_Stock_ID,
            );
          } else {
            newJewelleryCartListData = jewelleryCartList.filter(
              item => item.Jewellery_Stock_ID !== jeweleryObj.Jewellery_Stock_ID,
            );
          }
          dispatch(setJewelleryCartList(newJewelleryCartListData));
        }
        
        dispatch(
          showMessage({
            message: 'Stone removed successfully',
            varient: 'success',
          }),
        );
        
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  },
);

export const offlineListSlice = createSlice({
  name: 'offline-list',
  initialState,
  reducers: {
    setDiamondType: (state, action) => {
      state.diamondType = action.payload;
    },
    setWishDiamondList: (state, action) => {
      state.wishDiamondList = action.payload;
    },
    setCartDiamondList: (state, action) => {
      state.cartDiamondList = action.payload;
    },
    setWishMixDiamondList: (state, action) => {
      state.wishMixDiamondList = action.payload;
    },
    setCartMixDiamondList: (state, action) => {
      state.cartMixDiamondList = action.payload;
    },
    setJewelleryCartList: (state, action) => {
      state.jewelleryCartListData = action.payload;
    },
    setJewelleryWatchListData: (state, action) => {
      state.jewelleryWatchListData = action.payload;
    },
    setIsAddToCartSettingWise: (state, action) => {
      state.isAddToCartSettingWise = action.payload;
    },
    setIsAddToWatchSettingWise: (state, action) => {
      state.isAddToWatchSettingWise = action.payload;
    },
    setCompareDiamondList: (state, action) => {
      state.compareDiamondList = action.payload;
    },
    setWatchDisplayViewType: (state, action) => {
      state.watchDisplayViewType = action.payload;
    },
  },
});

export const {
  setDiamondType,
  setWishDiamondList,
  setCartDiamondList,
  setJewelleryCartList,
  setCompareDiamondList,
  setCartMixDiamondList,
  setWishMixDiamondList,
  setWatchDisplayViewType,
  setJewelleryWatchListData,
  setIsAddToCartSettingWise,
  setIsAddToWatchSettingWise,
} = offlineListSlice.actions;

export default offlineListSlice.reducer;