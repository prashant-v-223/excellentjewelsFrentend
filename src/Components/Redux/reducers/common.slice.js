import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSessionData } from 'Helper/AuthTokenHelper';
import _ from 'lodash';
const initialState = {
  message: '',
  showMessage: false,
  varient: 'success',
  watchListCurrentData: new Map(),
  isAddToWatchMixList: false,
  addToWatchMixLoading: false,
  diamondDetailListLoading: false,
  getDynamicDataLoader: true,
  instagramList: [],
  educationList: [],
  bannerList: [],
  subBannerList: [],
  diamondDetailList: [],
  diamondFilterDetail: {
    shapeList: [],
    mixShapeList: [],
    caratSizeList: [],
    clarityList: [],
    mixClarityList: [],
    cutList: [],
    mixLocation: [],
    mixGrowthTypeList: [],
    mixCutList: [],
    colorWhiteList: [],
    mixColorWhiteList: [],
    polishList: [],
    symmetryList: [],
    labList: [],
    fluorescenceList: [],
    fancycolorList: [],
    fancyintensityList: [],
    fancyovertonList: [],
    gridleThickList: [],
    locationList: [],
    natureOfOrgList: [],
  },
  // inquiryLoader: false,
  mixDiamondInquirySubmitted: false,
  mixSizeListByShape: [],
  watchMixStockLoading: false,
  watchMixStockList: [],
  selectedMixDiamondList: [],
  mixDiamondStockList: new Map(),
  mixSavedFilterDetail: {},
  webConfigurationType: [],
  getWebConfigurationTypeLoader: false,
  webConfigurationTypeDetail: [],
  getWebConfigurationTypeDetailLoader: false,
  mixDiamondApiLoader: false,
  mixDiamondDetailObj: {},
  isMixGetStockApiRefresh: true,
  isAddToCartMixDiamondList: false,
  addToCartMixDiamondLoading: false,
};
let ajaxMixDiamondListRequest = null;
let ajaxWatchListRequest = null;

export const getMixSizeByShapeList = createAsyncThunk(
  'get-mix-size-by-shape-list',
  masterType => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://72.61.170.111:8088/mobile-api/mix-shape-wise-size-list?ShapeID=${masterType}`)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getDiamondDetailList = createAsyncThunk(
  'search-diamond-list',
  masterType => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://72.61.170.111:8088/mobile-api/parameter-list-by-name/master-types-by-name?MasterType=${masterType}`)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getWebConfigurationType = createAsyncThunk(
  'web-configuration-type-list',
  masterType => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-web-configurationtype-list')
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getWebConfigurationTypeDetail = createAsyncThunk(
  'web-configuration-type-details--list',
  typeId => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://72.61.170.111:8088/mobile-api/get-web-configuration-details-list?Type_ID=${typeId}`)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getMixDiamondDetailList = createAsyncThunk(
  'mix-diamond-detail',
  masterType => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://72.61.170.111:8088/mobile-api/get-mix-detail-data?Packet_Id=${masterType}`)
        .then(({ data }) => {
          resolve({ data: data.Result });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);

export const getMixDimaondFilterDataList = createAsyncThunk(
  'get-mix-diamond-filter-list',
  (props, { getState }) => {
    return new Promise((resolve, reject) => {
      if (ajaxMixDiamondListRequest) ajaxMixDiamondListRequest.cancel('CANCEL');
      ajaxMixDiamondListRequest = axios.CancelToken.source();
      const isLogin = getSessionData();
      const mixDiamondWishList = getState().offlineList?.wishMixDiamondList;
      let mixSize = props?.size?.map(item => item.value)?.toString() || '';
      const obj = {
        Cust_ID: isLogin?.UserID ? isLogin?.UserID : '',
        Shape_ID: props?.Shape
          ? props?.Shape?.length > 0
            ? props?.Shape.toString()
            : ''
          : '',
        DiamondType: props?.diamond_Type ? props.diamond_Type : '',
        Size_ID: mixSize,
        Color_ID: props?.color
          ? props?.color?.length > 0
            ? props?.color.toString()
            : ''
          : '',
        Cut_ID: props?.cut
          ? props?.cut?.length > 0
            ? props?.cut.toString()
            : ''
          : '',
        Clarity_ID: props?.clarity
          ? props?.clarity?.length > 0
            ? props?.clarity.toString()
            : ''
          : '',
        Location_ID: props?.location
          ? props?.location?.length > 0
            ? props?.location.toString()
            : ''
          : '',
        GrowthType_ID: props?.growthType
          ? props?.growthType?.length > 0
            ? props?.growthType.toString()
            : ''
          : '',
        FromRate: props?.priceF ? props?.priceF : 0,
        ToRate: props?.priceT ? props?.priceT : 0,
        FromWeight: props?.fromWeight ? props?.fromWeight : 0,
        ToWeight: props?.toWeight ? props?.toWeight : 0,
        ShortType:
          props?.shortBy === '1' || props?.shortBy === '3'
            ? 'ASC'
            : props?.shortBy === '2' || props?.shortBy === '4'
            ? 'DESC'
            : '',
        ShortBy:
          props?.shortBy === '1' || props?.shortBy === '2'
            ? 'Price'
            : props?.shortBy === '3' || props?.shortBy === '4'
            ? 'Weight'
            : '',
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/mix-stock-data', obj, {
          cancelToken: ajaxMixDiamondListRequest.token,
        })
        .then(({ data }) => {
          resolve({
            data: data.Result,
            isLogin: isLogin?.UserID ? true : false,
            mixDiamondWishList,
            diamondType: props.diamond_Type,
          });
        })
        .catch(errors => {
          reject(errors);
        });
    });
  },
);
export const getMixWatchStockList = createAsyncThunk(
  'get-to-mix-watchList',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (ajaxWatchListRequest) ajaxWatchListRequest.cancel('CANCEL');
      ajaxWatchListRequest = axios.CancelToken.source();
      const obj = {
        Cust_ID: props.userId,
        DiamondType: props.diamondType,
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-packet-watchlist', obj, {
          cancelToken: ajaxWatchListRequest.token,
        })
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({
              data: data.Result,
            });
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

export const addToWatchMixDimaondList = createAsyncThunk(
  'add-to-watchlist-mix-diamond',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (props.packetId === '') {
        dispatch(showMessage({ message: 'Please select stone' }));
        reject();
      }
      const obj = {
        Cust_ID: props.userId,
        Packet_Id: props?.packetId ? props.packetId : '',
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/add-to-packet-watchlist', obj)
        .then(({ data }) => {
          if (data.IsSuccess) {
            resolve({ data: data });
            dispatch(
              showMessage({
                message: 'Add to Watchlist Sucessfully.',
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

export const removeToWatchMixDimaondList = createAsyncThunk(
  'remove-to-watchlist-mix-diamond',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      if (props.StockIDs === '') {
        dispatch(showMessage({ message: 'Please select stone' }));
        reject();
      }
      const obj = {
        Cust_ID: props.userId,
        Packet_Id: props?.packetId ? props.packetId : '',
      };
      axios
        .post('http://72.61.170.111:8088/mobile-api/remove-from-packet-watchlist', obj)
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

export const createDiamondInquiry = createAsyncThunk(
  'create-diamond-inquiry',
  (props, { dispatch }) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/Jewellery-Inquiry', props)
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

export const createMixDiamondInquiry = createAsyncThunk(
  'create-mix-diamond-inquiry',
  (props, { dispatch }) => {
    const obj = {
      FullName: '',
      Email_ID: '',
      Phone_No: '',
      Remark: props?.remark ? props.remark : '',
      CustomerID: props?.userId ? props.userId : '',
      Packet_Id: props?.packetId ? props.packetId : '',
      ApiKey: '',
    };
    return new Promise((resolve, reject) => {
      axios
        .post('http://72.61.170.111:8088/mobile-api/get-mix-packet-inquiry', obj)
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

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message;
      console.log("action.payload.varient",action.payload);
      
      state.varient = action.payload.varient;
      state.showMessage = true;
    },
    hideMessage: (state, action) => {
      state.showMessage = false;
    },
    setBannerList: (state, action) => {
      state.bannerList = action.payload;
    },
    setInstagramList: (state, action) => {
      state.instagramList = action.payload;
    },
    setEducationList: (state, action) => {
      state.educationList = action.payload;
    },
    setSubBannerList: (state, action) => {
      state.subBannerList = action.payload;
    },
    setGetDynamicDataLoader: (state, action) => {
      state.getDynamicDataLoader = action.payload;
    },
    setMixDiamondInquirySubmitted: (state, action) => {
      state.mixDiamondInquirySubmitted = action.payload;
    },
    setIsAddToWatchMixList: (state, action) => {
      state.isAddToWatchMixList = action.payload;
    },
    setMixSavedFilterDetail: (state, action) => {
      state.mixSavedFilterDetail = action.payload;
    },
    setWatchListCurrentData: (state, action) => {
      console.log("wishDiamondList",action.payload);
      
      state.watchListCurrentData = action.payload;
    },
    setSelectedMixDiamondList: (state, action) => {
      state.selectedMixDiamondList = action.payload;
    },
    setMixDiamondStockList: (state, action) => {
      const list = action.payload || [];
      let map = new Map();
      list?.forEach(x => map.set(x?.Packet_Id, x));
      state.mixDiamondStockList = map;
    },
    setIsMixGetStockApiRefresh: (state, action) => {
      state.isMixGetStockApiRefresh = action.payload;
    },
  },
  extraReducers: {
    [createDiamondInquiry.pending]: (state, action) => {
      // state.inquiryLoader = true;
    },
    [createDiamondInquiry.rejected]: (state, action) => {
      // state.inquiryLoader = false;
    },
    [createDiamondInquiry.fulfilled]: (state, action) => {
      // state.inquiryLoader = false;
    },
    [createMixDiamondInquiry.pending]: (state, action) => {
      state.mixDiamondInquirySubmitted = false;
    },
    [createMixDiamondInquiry.rejected]: (state, action) => {
      state.mixDiamondInquirySubmitted = false;
    },
    [createMixDiamondInquiry.fulfilled]: (state, action) => {
      state.mixDiamondInquirySubmitted = true;
    },
    [getMixWatchStockList.pending]: (state, action) => {
      state.watchMixStockLoading = true;
      state.watchMixStockList = [];
    },
    [getMixWatchStockList.rejected]: (state, action) => {
      state.watchMixStockList = [];
      state.watchMixStockLoading =
        action?.error?.code === 'ERR_CANCELED' ? true : false;
    },
    [getMixWatchStockList.fulfilled]: (state, action) => {
      state.watchMixStockList = action?.payload?.data || [];
      state.watchMixStockLoading = false;
    },
    [getMixSizeByShapeList.pending]: (state, action) => {
      state.mixSizeListByShape = [];
    },
    [getMixSizeByShapeList.rejected]: (state, action) => {
      state.mixSizeListByShape = [];
    },
    [getMixSizeByShapeList.fulfilled]: (state, action) => {
      let mixSizeByShape = [];
      if (action?.payload?.data?.length > 0) {
        mixSizeByShape = action.payload.data.sort(
          (a, b) => a.From_Size - b.From_Size,
        );
      }
      state.mixSizeListByShape = mixSizeByShape;
    },
    [getMixDiamondDetailList.pending]: (state, action) => {},
    [getMixDiamondDetailList.rejected]: (state, action) => {},
    [getMixDiamondDetailList.fulfilled]: (state, action) => {
      state.mixDiamondDetailObj = action?.payload?.data?.[0] || {};
    },
    [getMixDimaondFilterDataList.pending]: (state, action) => {
      state.mixDiamondStockList = [];
      state.mixDiamondApiLoader = true;
    },
    [getMixDimaondFilterDataList.rejected]: (state, action) => {
      state.mixDiamondStockList = [];
      state.mixDiamondApiLoader =
        action?.error?.code === 'ERR_CANCELED' ? true : false;
    },
    [getMixDimaondFilterDataList.fulfilled]: (state, action) => {
      const { isLogin, mixDiamondWishList, diamondType } = action.payload;
      let list = action.payload.data || [];
      let map = new Map();
      list = _.map(list, o => _.extend({ isCheck: false }, o));
      list?.forEach(x => map.set(x?.Packet_Id, x));
      if (map?.size > 0 && !isLogin) {
        if (
          diamondType === 'NATURAL' &&
          mixDiamondWishList?.naturalDiamond?.length > 0
        ) {
          const naturalDiamondList = [...mixDiamondWishList.naturalDiamond];
          _.map(naturalDiamondList, o => {
            let obj = map.get(o.Packet_Id);
            obj && map.set(o.Packet_Id, { ...obj, Is_Like: o.Is_Like });
          });
        }
        if (
          diamondType === 'LABGROWN' &&
          mixDiamondWishList?.labGrownDiamond?.length > 0
        ) {
          const labGrownDiamondList = [...mixDiamondWishList.labGrownDiamond];
          _.map(labGrownDiamondList, o => {
            let obj = map.get(o.Packet_Id);
            obj && map.set(o.Packet_Id, { ...obj, Is_Like: o.Is_Like });
          });
        }
      }
      state.mixDiamondStockList = map;
      state.mixDiamondApiLoader = false;
    },
    [addToWatchMixDimaondList.pending]: (state, action) => {
      state.isAddToWatchMixList = false;
      state.addToWatchMixLoading = true;
    },
    [addToWatchMixDimaondList.rejected]: (state, action) => {
      state.isAddToWatchMixList = false;
      state.addToWatchMixLoading = false;
    },
    [addToWatchMixDimaondList.fulfilled]: (state, action) => {
      state.isAddToWatchMixList = true;
      state.addToWatchMixLoading = false;
    },
    [removeToWatchMixDimaondList.pending]: (state, action) => {
      state.isAddToWatchMixList = false;
      state.addToWatchMixLoading = true;
    },
    [removeToWatchMixDimaondList.rejected]: (state, action) => {
      state.isAddToWatchMixList = false;
      state.addToWatchMixLoading = false;
    },
    [removeToWatchMixDimaondList.fulfilled]: (state, action) => {
      state.isAddToWatchMixList = true;
      state.addToWatchMixLoading = false;
    },
    [getWebConfigurationType.pending]: (state, action) => {
      state.getWebConfigurationTypeLoader = true;
    },
    [getWebConfigurationType.rejected]: (state, action) => {
      state.webConfigurationType = [];
      state.getWebConfigurationTypeLoader = false;
    },
    [getWebConfigurationType.fulfilled]: (state, action) => {
      state.webConfigurationType =
        action.payload?.data?.length > 0 ? action.payload.data : [];
      state.getWebConfigurationTypeLoader = false;
    },
    [getWebConfigurationTypeDetail.pending]: (state, action) => {
      state.getWebConfigurationTypeDetailLoader = true;
    },
    [getWebConfigurationTypeDetail.rejected]: (state, action) => {
      state.webConfigurationTypeDetail = [];
      state.getWebConfigurationTypeDetailLoader = false;
    },
    [getWebConfigurationTypeDetail.fulfilled]: (state, action) => {
      state.webConfigurationTypeDetail =
        action.payload?.data?.length > 0 ? action.payload.data : [];
      state.getWebConfigurationTypeDetailLoader = false;
    },
    [getDiamondDetailList.pending]: (state, action) => {
      state.diamondDetailListLoading = true;
    },
    [getDiamondDetailList.rejected]: (state, action) => {
      state.diamondDetailList = [];
      state.diamondDetailListLoading = false;
    },
    [getDiamondDetailList.fulfilled]: (state, action) => {
      let finalShapeList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'SHAPE',
      );
      let finalMixShapeList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'MIXSHAPE',
      );
      let finalCaratSizeList = action.payload?.data?.Size
        ? action.payload?.data?.Size
        : [];
      /*  let finalTingeList = action.payload.data.tinge.map(item => {
         let finalObj = {};
         finalObj = { ...item, classToggle: false };
         return finalObj;
       }); */
      let finalClarityList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'CLARITY',
      );
      let finalMixClarityList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'MIXQUALITY',
      );
      let finalCutList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'CUT',
      );
      let finalMixLocation = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'LOCATION',
      );
      let finalGrowthTypeList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'GROWTHTYPE',
      );
      let finalMixCutList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'MIXCUT',
      );
      let finalcolorWhiteList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'COLOR',
      );
      let finalMixColorWhiteList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'MIXCOLOR',
      );
      let finalPolishList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'POLISH',
      );
      let finaSymmetryList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'SYMMETRY',
      );
      let finaLabList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'LAB',
      );
      let finaFluorescenceList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'FLUROINT',
      );
      /*   let finaHnaList = action.payload.data.hna.map(item => {
        let finalObj = {
          value: item.MasterTypeValue_Code,
          label: item.MasterTypeValue_Code,
        };

        return finalObj;
      }); */
      /*  let finaLocationList = action.payload.data.location.map(item => {
        let finalObj = {
          value: item.MasterTypeValue_Code,
          label: item.MasterTypeValue_Code,
        };

        return finalObj;
      }); */
      let finaFancyColorList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'FC',
      )?.map(item => {
        return {
          value: item.MasterTypeValue_Code,
          label: item.MasterTypeValue_Code,
        };
      });
      let finaLocationList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'LOCATION',
      );
      let finaFancyIntensityList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'FCINTESE',
      )?.map(item => {
        return {
          value: item.MasterTypeValue_Code,
          label: item.MasterTypeValue_Code,
        };
      });
      let finaFancyOvertoneList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'FCOVERTON',
      )?.map(item => {
        return {
          value: item.MasterTypeValue_Code,
          label: item.MasterTypeValue_Code,
        };
      });
      let finaGirdleThickList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'GIRDLE',
      );
      let natureOfOrgList = action.payload?.data?.MasterList?.filter(
        item => item.MasterType_Code === 'NATURE OF ORG',
      );
      /*  let finaGirdleConditionList = action.payload.data.girdlecon.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      });
      let finaGirdleList = action.payload.data.girdle.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      });
      let finaCuletConditionList = action.payload.data.culcondi.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      });
      let finaCuletSizeList = action.payload.data.culsize.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      });
      let finaMilkyList = action.payload.data.milky.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      });
      let finalShadeList = action.payload.data.shade.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      });
      let finalEyeCleanList = action.payload.data.eyeclean.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      }); */
      // let finalTreatmentList = action.payload.data.treatment.map(
      //   (item) => {
      //     let finalObj = {};
      //     finalObj = { ...item, classToggle: false };
      //     return finalObj;
      //   }
      // );
      /*  let finalGrowthTypeList = action.payload.data.treatment.map(item => {
        let finalObj = {};
        finalObj = { ...item, classToggle: false };
        return finalObj;
      }); */
      // state.eyecleanList = finalEyeCleanList;
      state.diamondDetailList = action.payload.data;
      state.diamondFilterDetail = {
        shapeList: finalShapeList || state.diamondFilterDetail?.shapeList,
        mixShapeList:
          finalMixShapeList || state.diamondFilterDetail?.mixShapeList,
        caratSizeList:
          finalCaratSizeList || state.diamondFilterDetail?.caratSizeList,
        clarityList: finalClarityList || state.diamondFilterDetail?.clarityList,
        mixClarityList:
          finalMixClarityList || state.diamondFilterDetail?.mixClarityList,
        // tingeList: finalTingeList,
        cutList: finalCutList || state.diamondFilterDetail?.cutList,
        mixLocation: finalMixLocation || state.diamondFilterDetail?.mixLocation,
        mixGrowthTypeList:
          finalGrowthTypeList || state.diamondFilterDetail?.mixGrowthTypeList,
        mixCutList: finalMixCutList || state.diamondFilterDetail?.mixCutList,
        colorWhiteList:
          finalcolorWhiteList || state.diamondFilterDetail?.colorWhiteList,
        mixColorWhiteList:
          finalMixColorWhiteList ||
          state.diamondFilterDetail?.mixColorWhiteList,
        polishList: finalPolishList || state.diamondFilterDetail?.polishList,
        symmetryList:
          finaSymmetryList || state.diamondFilterDetail?.symmetryList,
        labList: finaLabList || state.diamondFilterDetail?.labList,
        fluorescenceList:
          finaFluorescenceList || state.diamondFilterDetail?.fluorescenceList,
        // hnaList: finaHnaList,
        // locationList: finaLocationList,
        fancycolorList:
          finaFancyColorList || state.diamondFilterDetail?.fancycolorList,
        fancyintensityList:
          finaFancyIntensityList ||
          state.diamondFilterDetail?.fancyintensityList,
        fancyovertonList:
          finaFancyOvertoneList || state.diamondFilterDetail?.fancyovertonList,
        // gridleConditionList: finaGirdleConditionList,
        // gridleList: finaGirdleList,
        gridleThickList:
          finaGirdleThickList || state.diamondFilterDetail?.gridleThickList,
        // culetConditionList: finaCuletConditionList,
        // culetSizeList: finaCuletSizeList,
        // milkyList: finaMilkyList,
        // shadeList: finalShadeList,
        // eyecleanList: finalEyeCleanList,
        // treatmentList: finalTreatmentList,
        // growthTypeList: finalGrowthTypeList,
        locationList:
          finaLocationList || state.diamondFilterDetail?.locationList,
        natureOfOrgList:
          natureOfOrgList || state.diamondFilterDetail?.natureOfOrgList,
      };
      state.diamondDetailListLoading = false;
    },
  },
});

export const {
  showMessage,
  hideMessage,
  setBannerList,
  setInstagramList,
  setEducationList,
  setSubBannerList,
  setGetDynamicDataLoader,
  setIsAddToWatchMixList,
  setMixDiamondStockList,
  setWatchListCurrentData,
  setMixSavedFilterDetail,
  setSelectedMixDiamondList,
  setIsMixGetStockApiRefresh,
  setMixDiamondInquirySubmitted,
} = commonSlice.actions;
export default commonSlice.reducer;
