import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSessionData } from 'Helper/AuthTokenHelper';
import _ from 'lodash';
import { Domain } from '../../../Helper/CommonHelper';
import { showMessage } from './common.slice';
const initialState = {
  countryList: [],
  locationLoader: false,
  stateList: [],
  seavedSearchLoading: false,
  searchDiamondSavedData: [],
  SeavedSearchList: [],
  isColorType: 1,
  isSavedToResult: false,
  isOrderConfirm: false,
  confirmOrderLoading: false,
  isSavedToSearchDiamond: false,
  exportStockDataLoading: false,
  isRemoveFromSearchTemplateList: false,
  totalCountSearchDiamond: 0,
  totalSearchDiamondLoading: false,
  isClearSelection: false,
  searchDiamondFilterListLoading: false,
  searchDiamondFilterList: new Map(),
  selectedDiamondList: [],
  searchDiamondFilterList2: new Map(),
  searchResultTotalRows: 0,
  searchResultTotalRecords: 0,
  stockDetailDnaList: {},
  stockDetailDnaLoading: false,
  similarDiamondList: [],
  similarDiamondLoader: false,
  isModifySearchForDiamond: false,
  isRefreshSearchApi: true,
  totalCart: 0,
};

let ajaxSearchStockListRequest = null;

export const getCountryList = createAsyncThunk(
  'countryList',
  (data, { getState }) => {
    return new Promise((resolve, reject) => {
      const { countryList = [] } = getState().dashboard;
      if (countryList?.length > 0) {
        resolve({ data: countryList });
        return;
      }
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-country-list')
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getStateList = createAsyncThunk('stateList', data => {
  return new Promise((resolve, reject) => {
    const obj = {
      CountryID: data.CountryID,
    };
    axios
      .post(
        `http://72.61.170.111:8088/mobile-api/get-state-list?${obj.CountryID ? `CountryID=${obj.CountryID}` : ''}`,
      )
      .then(({ data }) => {
        resolve({ data: data.Result });
      })
      .catch(errors => {
        reject(errors);
      });
  });
});
export const getCityList = createAsyncThunk('cityList', data => {
  return new Promise((resolve, reject) => {
    const obj = {
      CountryID: data.CountryID,
      StateID: data.StateID,
    };
    axios
      .post(
        `http://72.61.170.111:8088/mobile-api/get-city-list?${obj.CountryID
          ? `CountryID=${obj.CountryID}&StateID=${obj.StateID}`
          : ''
        }`,
      )
      .then(({ data }) => {
        resolve({ data: data.Result });
      })
      .catch(errors => {
        reject(errors);
      });
  });
});
export const getSeavedSearchList = createAsyncThunk(
  'seavedsearchlist',
  data => {
    return new Promise((resolve, reject) => {
      const obj = {
        UserID: data.UserID,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-saved-search-template-list', obj)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getCartStockCount = createAsyncThunk(
  'get-cart-stock-count',
  props => {
    return new Promise((resolve, reject) => {
      const obj = {
        CustomerID: props.UserID,
        Diamond_Type: '',
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/cart-count', obj)
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

export const confirmOrder = createAsyncThunk(
  'confirm-order',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/jewellery-diamond-cart-to-order-with-setting', data)
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

export const getTotalSearchDiamond = createAsyncThunk(
  'get-total-search-diamond-list',
  data => {
    return new Promise((resolve, reject) => {
      let newFinalObject = {};
      newFinalObject.SaveSearchID = data.saveSearchId ? data.saveSearchId : 0;
      newFinalObject.IsQuickSearch = data.IsQuickSearch
        ? data.IsQuickSearch
        : false;
      newFinalObject.DomainName = data.domainName ? data.domainName : Domain;
      newFinalObject.Shape = data.shape ? data.shape : '';
      newFinalObject.SearchName = data.SearchName ? data.SearchName : '';
      newFinalObject.IsFancyShape = data.IsFancyShape
        ? data.IsFancyShape
        : false;
      newFinalObject.CaratsizeIds = data.caratSizeIds
        ? data.caratSizeIds
        : '0-500';
      newFinalObject.Culetsize = data.culetSize ? data.culetSize : '';
      newFinalObject.Culetcondition = data.culetCondition
        ? data.culetCondition
        : '';
      newFinalObject.Clarity = data.clarity ? data.clarity : '';
      newFinalObject.CrAngelF = data.crownAngleFrom ? data.crownAngleFrom : '';
      newFinalObject.CrAngelT = data.crownAngleTo ? data.crownAngleTo : '';

      newFinalObject.CustomerId = data.UserID ? data.UserID : 0;
      newFinalObject.CaretFilterType = data.caretFilterType
        ? data.caretFilterType
        : 0;
      newFinalObject.ColorType = data.colorType ? data.colorType : 1;
      newFinalObject.Color = data.whiteColor ? data.whiteColor : '';
      newFinalObject.FCColor = data.fancyColor ? data.fancyColor : '';
      newFinalObject.FCItens = data.fancyIntensity ? data.fancyIntensity : '';
      newFinalObject.FCOverton = data.fancyOvertone ? data.fancyOvertone : '';

      newFinalObject.Cut = data.cut ? data.cut : '';
      newFinalObject.Polish = data.polish ? data.polish : '';
      newFinalObject.Symm = data.symmetry ? data.symmetry : '';
      newFinalObject.FluroIntent = data.fluorescence ? data.fluorescence : '';
      newFinalObject.Tinge = data.tinge ? data.tinge : '';
      newFinalObject.Lab = data.lab ? data.lab : '';
      newFinalObject.FluroColor = data.fluroColor ? data.fluroColor : '';
      newFinalObject.Location = data.location ? data.location : '';
      newFinalObject.AmtFrom = data.priceFrom ? data.priceFrom : 0;
      newFinalObject.AmtTo = data.priceTo ? data.priceTo : 0;
      newFinalObject.DiscFrom = data.discountFrom ? data.discountFrom : 0;
      newFinalObject.DiscTo = data.discountTo ? data.discountTo : 0;
      newFinalObject.TableFrom = data.tableFrom ? data.tableFrom : '';
      newFinalObject.TableTo = data.tableTo ? data.tableTo : '';
      newFinalObject.TableDepthF = data.tableDepthF ? data.tableDepthF : '';
      newFinalObject.TableDepthT = data.tableDepthT ? data.tableDepthT : '';
      newFinalObject.PavAngelF = data.pavilionAngleFrom
        ? data.pavilionAngleFrom
        : '';
      newFinalObject.PavAngelT = data.pavilionAngleTo
        ? data.pavilionAngleTo
        : '';
      newFinalObject.PavHeightF = data.pavilionDepthFrom
        ? data.pavilionDepthFrom
        : '';
      newFinalObject.PavHeightT = data.pavilionDepthTo
        ? data.pavilionDepthTo
        : '';
      newFinalObject.StarLenF = data.starLengthFrom ? data.starLengthFrom : '';
      newFinalObject.StarLenT = data.starLengthTo ? data.starLengthTo : '';
      newFinalObject.LowerHalveF = data.lowerHalfFrom ? data.lowerHalfFrom : '';
      newFinalObject.LowerHalveT = data.lowerHalfTo ? data.lowerHalfTo : '';
      newFinalObject.GirdlePerFrom = data.girdlePerFrom
        ? data.girdlePerFrom
        : '';
      newFinalObject.GirdlePerTo = data.girdlePerTo ? data.girdlePerTo : '';
      newFinalObject.CentralInclusion = '';
      newFinalObject.Milkey = data.milky ? data.milky : '';
      newFinalObject.EyeClean = data.eyeClean ? data.eyeClean : '';
      newFinalObject.HNA = data.hna ? data.hna : '';
      newFinalObject.SortingFilter = data.sortingFilter
        ? data.sortingFilter
        : '';
      newFinalObject.BIS = '';
      newFinalObject.BIC = '';
      newFinalObject.WIS = '';
      newFinalObject.WIC = '';
      newFinalObject.LengthFrom = data.lengthFrom ? data.lengthFrom : '';
      newFinalObject.LengthTo = data.lengthTo ? data.lengthTo : '';
      newFinalObject.WidthFrom = data.widthFrom ? data.widthFrom : '';
      newFinalObject.WidthT = data.widthTo ? data.widthTo : '';
      newFinalObject.DepthFrom = data.depthFrom ? data.depthFrom : '';
      newFinalObject.DepthTo = data.depthTo ? data.depthTo : '';
      newFinalObject.Keytosymbol = data.keytoSymbols ? data.keytoSymbols : '';
      // newFinalObject.Treatment = data.treatment ? data.treatment : "";
      newFinalObject.Growth_Type = data.growthType ? data.growthType : '';
      newFinalObject.Girdlecondition = data.girdleCondition
        ? data.girdleCondition
        : '';
      newFinalObject.Shade = data.shade ? data.shade : '';
      newFinalObject.GirdleFrom = data.girdleFrom ? data.girdleFrom : '';
      newFinalObject.GirdleTo = data.girdleTo ? data.girdleTo : '';
      newFinalObject.GirdleThin = data.girdleThin ? data.girdleThin : '';
      newFinalObject.GirdleThick = data.girdleThick ? data.girdleThick : '';
      newFinalObject.IsNewArrival = data.IsNewArrival
        ? data.IsNewArrival
        : false;
      newFinalObject.IsPriceReviced = data.IsPriceReviced
        ? data.IsPriceReviced
        : false;
      newFinalObject.inStartIndex = data.inStartIndex ? data.inStartIndex : 0;
      newFinalObject.inEndIndex = data.inEndIndex ? data.inEndIndex : 0;
      newFinalObject.TabID = data.tabID ? data.tabID : 0;
      newFinalObject.PageSize = data.pageSize ? data.pageSize : 100;
      newFinalObject.PageNum = data.pageNum ? data.pageNum : 0;
      newFinalObject.SellerId = data.sellerId ? data.sellerId : 0;
      newFinalObject.Luster = data.luster ? data.luster : '';
      newFinalObject.RatioF = data.ratioFrom ? data.ratioFrom : '';
      newFinalObject.RatioT = data.ratioTo ? data.ratioTo : '';
      newFinalObject.BlackInclusion = data.blackInclusion
        ? data.blackInclusion
        : '';
      newFinalObject.CrownHeightF = data.crownHeightFrom
        ? data.crownHeightFrom
        : '';
      newFinalObject.CrownHeightT = data.crownHeightTo
        ? data.crownHeightTo
        : '';
      newFinalObject.BackEndClientId = data.backEndClientId
        ? data.backEndClientId
        : 0;

      newFinalObject.OrderByType = data.orderByType ? data.orderByType : '';
      newFinalObject.StoneNos = data.stoneNos ? data.stoneNos : '';
      newFinalObject.StockStatus = data.StockStatus ? data.StockStatus : '';
      newFinalObject.RatioF = data.ratioFrom ? data.ratioFrom : '';
      newFinalObject.RatioT = data.ratioTo ? data.ratioTo : '';
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-search-stock-count', newFinalObject)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getSearchDiamondFilterList = createAsyncThunk(
  'get-search-diamond-filter-list',
  (data, { getState }) => {
    return new Promise((resolve, reject) => {
      if (ajaxSearchStockListRequest)
        ajaxSearchStockListRequest.cancel('CANCEL');
      ajaxSearchStockListRequest = axios.CancelToken.source();
      const isLogin = getSessionData();
      const diamondWishList = getState().offlineList?.wishDiamondList;
      let newFinalObject = {};
      newFinalObject.Diamond_Type = data.diamondType;
      newFinalObject.SaveSearchID = data.SaveSearchID ? data.SaveSearchID : 0;
      newFinalObject.Shape = data.shape ? data.shape : '';
      newFinalObject.SearchName = data.SearchName ? data.SearchName : '';
      newFinalObject.IsFancyShape = data.IsFancyShape
        ? data.IsFancyShape
        : false;
      newFinalObject.CaratsizeIds = data.caratSizeIds ? data.caratSizeIds : '';
      newFinalObject.Culetsize = data.culetSize ? data.culetSize : '';
      newFinalObject.Culetcondition = data.culetCondition
        ? data.culetCondition
        : '';
      newFinalObject.Clarity = data.clarity ? data.clarity : '';
      newFinalObject.CrAngelF = data.crownAngleFrom ? data.crownAngleFrom : '';
      newFinalObject.CrAngelT = data.crownAngleTo ? data.crownAngleTo : '';
      newFinalObject.IsQuickSearch = data.IsQuickSearch
        ? data.IsQuickSearch
        : false;
      newFinalObject.DomainName = data.DomainName ? data.DomainName : Domain;
      newFinalObject.CustomerId = data.UserID
        ? data.UserID
        : data.CustomerId
        ? data.CustomerId
        : 0;
      newFinalObject.CaretFilterType = data.caretFilterType
        ? data.caretFilterType
        : 0;
      newFinalObject.ColorType = data.colorType ? data.colorType : 1;
      newFinalObject.Color = data.whiteColor ? data.whiteColor : '';
      newFinalObject.FCColor = data.fancyColor ? data.fancyColor : '';
      newFinalObject.FCItens = data.fancyIntensity ? data.fancyIntensity : '';
      newFinalObject.FCOverton = data.fancyOvertone ? data.fancyOvertone : '';
      newFinalObject.Cut = data.cut ? data.cut : '';
      newFinalObject.Polish = data.polish ? data.polish : '';
      newFinalObject.Symm = data.symmetry ? data.symmetry : '';
      newFinalObject.FluroIntent = data.fluorescence ? data.fluorescence : '';
      newFinalObject.Tinge = data.tinge ? data.tinge : '';
      newFinalObject.Lab = data.lab ? data.lab : '';
      newFinalObject.FluroColor = data.FluroColor ? data.FluroColor : '';
      newFinalObject.Location = data.location ? data.location : '';
      newFinalObject.AmtFrom = data.priceFrom ? data.priceFrom : 0;
      newFinalObject.AmtTo = data.priceTo ? data.priceTo : 0;
      newFinalObject.DiscFrom = data.discountFrom ? data.discountFrom : '';
      newFinalObject.DiscTo = data.discountTo ? data.discountTo : 0;
      newFinalObject.TableFrom = data.tableFrom ? data.tableFrom : '';
      newFinalObject.TableTo = data.tableTo ? data.tableTo : '';
      newFinalObject.TableDepthF = data.tableDepthF ? data.tableDepthF : '';
      newFinalObject.TableDepthT = data.tableDepthT ? data.tableDepthT : '';
      newFinalObject.PavAngelF = data.pavilionAngleFrom
        ? data.pavilionAngleFrom
        : '';
      newFinalObject.PavAngelT = data.pavilionAngleTo
        ? data.pavilionAngleTo
        : '';
      newFinalObject.PavHeightF = data.pavilionDepthFrom
        ? data.pavilionDepthFrom
        : '';
      newFinalObject.PavHeightT = data.pavilionDepthTo
        ? data.pavilionDepthTo
        : '';
      newFinalObject.StarLenF = data.starLengthFrom ? data.starLengthFrom : '';
      newFinalObject.StarLenT = data.starLengthTo ? data.starLengthTo : '';
      newFinalObject.LowerHalveF = data.lowerHalfFrom ? data.lowerHalfFrom : '';
      newFinalObject.LowerHalveT = data.lowerHalfTo ? data.lowerHalfTo : '';
      newFinalObject.GirdlePerFrom = data.girdlePerFrom
        ? data.girdlePerFrom
        : '';
      newFinalObject.GirdlePerTo = data.girdlePerTo ? data.girdlePerTo : '';
      newFinalObject.BlackInclusion = data.BlackInclusion
        ? data.BlackInclusion
        : '';
      newFinalObject.CentralInclusion = data.CentralInclusion
        ? data.CentralInclusion
        : '';
      newFinalObject.Milkey = data.milky ? data.milky : '';
      newFinalObject.EyeClean = data.eyeClean ? data.eyeClean : '';
      newFinalObject.HNA = data.hna ? data.hna : '';
      newFinalObject.SortingFilter = data.SortingFilter
        ? data.SortingFilter
        : '';
      newFinalObject.BIS = data.BIS ? data.BIS : '';
      newFinalObject.BIC = data.BIC ? data.BIC : '';
      newFinalObject.WIS = data.WIS ? data.WIS : '';
      newFinalObject.WIC = data.WIC ? data.WIC : '';
      newFinalObject.LengthFrom = data.lengthFrom ? data.lengthFrom : '';
      newFinalObject.LengthTo = data.lengthTo ? data.lengthTo : '';
      newFinalObject.WidthFrom = data.widthFrom ? data.widthFrom : '';
      newFinalObject.WidthT = data.widthTo ? data.widthTo : '';
      newFinalObject.DepthFrom = data.depthFrom ? data.depthFrom : '';
      newFinalObject.DepthTo = data.depthTo ? data.depthTo : '';
      newFinalObject.Keytosymbol = data.keytoSymbols ? data.keytoSymbols : '';
      // newFinalObject.Treatment = data.treatment ? data.treatment : "";
      newFinalObject.Growth_Type = data.growthType ? data.growthType : '';
      newFinalObject.ShortType =
        data.shortBy === '1' || data.shortBy === '3'
          ? 'ASC'
          : data.shortBy === '2' || data.shortBy === '4'
          ? 'DESC'
          : '';
      newFinalObject.ShortBy =
        data.shortBy === '1' || data.shortBy === '2'
          ? 'Price'
          : data.shortBy === '3' || data.shortBy === '4'
          ? 'Size'
          : '';
      newFinalObject.Girdlecondition = data.girdleCondition
        ? data.girdleCondition
        : '';
      newFinalObject.Shade = data.shade ? data.shade : '';
      newFinalObject.GirdleFrom = data.GirdleFrom ? data.GirdleFrom : '';
      newFinalObject.GirdleTo = data.GirdleTo ? data.GirdleTo : '';
      newFinalObject.GirdleThin = data.girdleThin ? data.girdleThin : '';
      newFinalObject.GirdleThick = data.girdleThick ? data.girdleThick : '';
      newFinalObject.IsNewArrival = data.IsNewArrival
        ? data.IsNewArrival
        : false;
      newFinalObject.IsPriceReviced = data.IsPriceReviced
        ? data.IsPriceReviced
        : false;
      newFinalObject.inStartIndex = data.inStartIndex ? data.inStartIndex : 0;
      newFinalObject.inEndIndex = data.inEndIndex ? data.inEndIndex : 0;
      newFinalObject.TabID = data.tabID ? data.tabID : 0;
      newFinalObject.PageSize = data.pageSize ? data.pageSize : 100;
      newFinalObject.PageNum = data.pageNum ? data.pageNum : 0;
      newFinalObject.StoneNos = data.stoneNos ? data.stoneNos : '';
      newFinalObject.SellerId = data.SellerId ? data.SellerId : 0;
      newFinalObject.Luster = data.Luster ? data.Luster : '';
      newFinalObject.RatioF = data.ratioFrom ? data.ratioFrom : '';
      newFinalObject.RatioT = data.ratioTo ? data.ratioTo : '';
      newFinalObject.CrownHeightF = data.crownHeightFrom
        ? data.crownHeightFrom
        : '';
      newFinalObject.CrownHeightT = data.crownHeightTo
        ? data.crownHeightTo
        : '';
      newFinalObject.StockStatus =
        window.location.pathname === '/setting-diamond-wise' ||
        window.location.pathname === '/setting-jewellery-wise'
          ? 'AVAILABLE'
          : data.StockStatus
          ? data.StockStatus
          : '';
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-search-stock', newFinalObject, {
          cancelToken: ajaxSearchStockListRequest.token,
        })
        .then(({ data }) => {
          if (data.IsSuccess === true) {
            resolve({
              data: data.Result,
              isLogin: isLogin?.UserID ? true : false,
              diamondWishList,
              diamondType: newFinalObject.Diamond_Type,
            });
          } else {
            reject({ errorMessage: data.Message });
          }
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const removeFromSaveSearchTemplate = createAsyncThunk(
  'remove-from-save-search-template-list',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const obj = {
        HistoryID: data.HistoryID,
        SearchName: data.SearchName,
        WebStoreID: data.WebStoreID,
        UserID: data.UserID,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/remove-saved-search-template', obj)
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
export const getStockDetailDna = createAsyncThunk(
  'get-stock-detail-dna-data',
  data => {
    return new Promise((resolve, reject) => {
      let newFinalObject = {
        StoneNumber: data.StoneNo,
        UserID: data.UserID ? data.UserID : 0,
        BackEndClientId: 0,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-stock-detail-dna', newFinalObject)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getExportStockData = createAsyncThunk(
  'export-stock-data-list',
  data => {
    return new Promise((resolve, reject) => {
      const obj = {
        UserID: data?.UserID ? data.UserID : 0,
        SelectedStone: data.SelectedStone,
        Diamond_Type: data.diamondType,
        IsPdf: false,
        lang: 'en',
        BackEndClientId: 0,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/export-stock-data', obj)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getSimilarStockList = createAsyncThunk(
  'get-simillar-stock-list',
  data => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-simillar-stock-detail-dna', data)
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
export const getStockCopytoClipboardString = createAsyncThunk(
  'get-stock-copy-to-clipboard',
  data => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/Stock-Copy-to-Clipboard', data)
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
export const getJewelleryCopytoClipboardString = createAsyncThunk(
  'get-jewellery-copy-to-clipboard',
  ({ JewelleryNo }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://72.61.170.111:8088/mobile-api/jewellery-Copy-to-Clipboard?JewelleryNo=${JewelleryNo}`)
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
export const getMixDiamondCopyToClipboardString = createAsyncThunk(
  'get-mix-diamond-copy-to-clipboard',
  ({ PacketName }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://72.61.170.111:8088/mobile-api/Mix-Copy-to-Clipboard?PacketName=${PacketName}`)
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
export const sendDiamondDetailMail = createAsyncThunk(
  'send-diamond-detail-mail',
  (data, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/send-diamond-mail', data)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data.Result });
            data?.Message &&
              dispatch(
                showMessage({ message: data.Message, varient: 'success' }),
              );
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
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIsFancyColor: (state, action) => {
      state.isColorType = action.payload;
    },
    setIsFilterSaved: (state, action) => {
      state.isFilterSaved = action.payload;
    },
    setIsModifySearchForDiamond: (state, action) => {
      state.isModifySearchForDiamond = action.payload;
    },
    setIsRemoveFromSearchTemplateList: (state, action) => {
      state.isRemoveFromSearchTemplateList = action.payload;
    },
    setIsClearSelection: (state, action) => {
      state.isClearSelection = action.payload;
    },
    setSearchDiamondSavedData: (state, action) => {
      state.searchDiamondSavedData = action.payload;
    },
    setIsSavedToResult: (state, action) => {
      state.isSavedToResult = action.payload;
    },
    setIsSavedToSearchDiamond: (state, action) => {
      state.isSavedToSearchDiamond = action.payload;
    },
    setSelectedDiamondList: (state, action) => {
      state.selectedDiamondList = action.payload;
    },
    setIsOrderConfirm: (state, action) => {
      state.isOrderConfirm = action.payload;
    },
    setIsRefreshSearchApi: (state, action) => {
      state.isRefreshSearchApi = action.payload;
    },
    setSearchDiamondFilterList2: (state, action) => {
      const list = action.payload || [];
      let map = new Map();
      list?.forEach(x => map.set(x?.Stock_ID, x));
      state.searchDiamondFilterList2 = map;
    },
  },
  extraReducers: {
    [getCountryList.pending]: (state, action) => {
      state.locationLoader = true;
    },
    [getCountryList.rejected]: (state, action) => {
      state.countryList = [];
      state.locationLoader = false;
    },
    [getCountryList.fulfilled]: (state, action) => {
      state.countryList = action.payload.data;
      state.locationLoader = false;
    },
    [getStateList.pending]: (state, action) => {
      state.stateList = [];
      state.locationLoader = true;
    },
    [getStateList.rejected]: (state, action) => {
      state.stateList = [];
      state.locationLoader = false;
    },
    [getStateList.fulfilled]: (state, action) => {
      state.stateList = action.payload.data;
      state.locationLoader = false;
    },
    [getCityList.pending]: (state, action) => {
      state.cityList = [];
      state.locationLoader = true;
    },
    [getCityList.rejected]: (state, action) => {
      state.cityList = [];
      state.locationLoader = false;
    },
    [getCityList.fulfilled]: (state, action) => {
      state.cityList = action.payload.data;
      state.locationLoader = false;
    },
    [getSeavedSearchList.pending]: (state, action) => {
      state.seavedSearchLoading = true;
      state.SeavedSearchList = [];
    },
    [getSeavedSearchList.fulfilled]: (state, action) => {
      state.seavedSearchLoading = false;
      state.SeavedSearchList = action.payload.data;
    },
    [getSeavedSearchList.rejected]: (state, action) => {
      state.seavedSearchLoading = false;
      state.SeavedSearchList = [];
    },
    [getTotalSearchDiamond.pending]: (state, action) => {
      state.totalSearchDiamondLoading = true;
    },
    [getTotalSearchDiamond.fulfilled]: (state, action) => {
      state.totalSearchDiamondLoading = false;
      state.totalCountSearchDiamond = action.payload.data;
    },
    [getTotalSearchDiamond.rejected]: (state, action) => {
      state.totalSearchDiamondLoading = false;
      state.totalCountSearchDiamond = 0;
    },
    [getSearchDiamondFilterList.pending]: (state, action) => {
      state.searchDiamondFilterListLoading = true;
      state.searchDiamondFilterList = [];
      state.searchDiamondFilterList2 = [];
    },
    [getSearchDiamondFilterList.fulfilled]: (state, action) => {
      const { isLogin, diamondWishList, diamondType } = action.payload;
      let list = action.payload.data?.rows || [];
      let map = new Map();
      list = _.map(list, o =>
        _.extend({ isCheck: false, isExpanded: false }, o),
      );
      list?.forEach(x => map.set(x?.Stock_ID, x));
      if (map?.size > 0 && !isLogin) {
        if (
          diamondType === 'NATURAL' &&
          diamondWishList?.naturalDiamond?.length > 0
        ) {
          const naturalDiamondList = [...diamondWishList.naturalDiamond];
          _.map(naturalDiamondList, o => {
            let obj = map.get(o.Stock_ID);
            obj && map.set(o.Stock_ID, { ...obj, Is_Like: o.Is_Like });
          });
        }
        if (
          diamondType === 'LABGROWN' &&
          diamondWishList?.labGrownDiamond?.length > 0
        ) {
          const labGrownDiamondList = [...diamondWishList.labGrownDiamond];
          _.map(labGrownDiamondList, o => {
            let obj = map.get(o.Stock_ID);
            obj && map.set(o.Stock_ID, { ...obj, Is_Like: o.Is_Like });
          });
        }
      }
      state.searchResultTotalRows = action.payload.data?.total || 0;
      state.searchResultTotalRecords = action.payload.data?.TotalRows || 0;
      state.searchDiamondFilterList = map;
      state.searchDiamondFilterList2 = map;
      state.searchDiamondFilterListLoading = false;
    },
    [getSearchDiamondFilterList.rejected]: (state, action) => {
      state.searchDiamondFilterListLoading =
        action?.error?.code === 'ERR_CANCELED' ? true : false;
      state.searchDiamondFilterList = [];
      state.searchDiamondFilterList2 = [];
      state.searchResultTotalRows = 0;
      state.searchResultTotalRecords = 0;
    },
    [getStockDetailDna.pending]: (state, action) => {
      state.stockDetailDnaList = {};
      state.stockDetailDnaLoading = true;
    },
    [getStockDetailDna.fulfilled]: (state, action) => {
      state.stockDetailDnaList = action.payload.data || {};
      state.stockDetailDnaLoading = false;
    },
    [getStockDetailDna.rejected]: (state, action) => {
      state.stockDetailDnaList = {};
      state.stockDetailDnaLoading = false;
    },
    [getSimilarStockList.pending]: (state, action) => {
      state.similarDiamondLoader = true;
    },
    [getSimilarStockList.fulfilled]: (state, action) => {
      state.similarDiamondList = action.payload.data || [];
      state.similarDiamondLoader = false;
    },
    [getSimilarStockList.rejected]: (state, action) => {
      state.similarDiamondList = [];
      state.similarDiamondLoader = false;
    },
    [removeFromSaveSearchTemplate.pending]: (state, action) => {
      state.isRemoveFromSearchTemplateList = false;
    },
    [removeFromSaveSearchTemplate.rejected]: (state, action) => {
      state.isRemoveFromSearchTemplateList = false;
    },
    [removeFromSaveSearchTemplate.fulfilled]: (state, action) => {
      state.isRemoveFromSearchTemplateList = true;
    },
    [getCartStockCount.pending]: (state, action) => { },
    [getCartStockCount.rejected]: (state, action) => {
      state.totalCart = 0;
    },
    [getCartStockCount.fulfilled]: (state, action) => {
      state.totalCart = action.payload.data?.RetVal || 0;
    },
    [confirmOrder.pending]: (state, action) => {
      state.isOrderConfirm = false;
      state.confirmOrderLoading = true;
    },
    [confirmOrder.rejected]: (state, action) => {
      state.isOrderConfirm = false;
      state.confirmOrderLoading = false;
    },
    [confirmOrder.fulfilled]: (state, action) => {
      state.isOrderConfirm = true;
      state.confirmOrderLoading = false;
    },
    [getExportStockData.pending]: (state, action) => {
      state.exportStockDataLoading = true;
    },
    [getExportStockData.fulfilled]: (state, action) => {
      state.exportStockDataLoading = false;
      if (action.payload.data?.filePath) {
        const outputFilename = action.payload.data?.filePath;
        const link = document.createElement('a');
        link.href = outputFilename;
        link.setAttribute('download', outputFilename);
        document.body.appendChild(link);
        link.click();
      }
    },
    [getExportStockData.rejected]: (state, action) => {
      state.exportStockDataLoading = false;
    },
  },
});
export const {
  setIsRemoveFromSearchTemplateList,
  setIsClearSelection,
  setIsSavedToResult,
  setIsSavedToSearchDiamond,
  setIsFancyColor,
  setIsFilterSaved,
  setIsModifySearchForDiamond,
  setSearchDiamondSavedData,
  setSelectedDiamondList,
  setSearchDiamondFilterList2,
  setIsRefreshSearchApi,
  setIsOrderConfirm,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
