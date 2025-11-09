import { disableCalcuSymbol } from 'Helper/CommonHelper';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Offcanvas,
  Row,
} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import RangeSlider from 'react-range-slider-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import NoImageAvailableShape from '../Assets/Images/diamond-not-found.svg';
import FilterIcon from '../Assets/Images/filter.svg';
import Grid from '../Assets/Images/grid.svg';
import LikeImage from '../Assets/Images/heart-red.svg';
import HeartIcon from '../Assets/Images/heart.svg';
import List from '../Assets/Images/list.svg';
import NoImageAvailable from '../Assets/Images/notfound2.png';
import recordsNotFound from '../Assets/Images/records-not-found1.png';
import ResetIcon from '../Assets/Images/reset.svg';
import { ParcelGoodsGridView } from './ParcelGoodsGridView';
import { ParcelGoodsListView } from './ParcelGoodsListView';
import {
  addToWatchMixDimaondList,
  createMixDiamondInquiry,
  getMixDimaondFilterDataList,
  getMixSizeByShapeList,
  removeToWatchMixDimaondList,
  setIsAddToWatchMixList,
  setIsMixGetStockApiRefresh,
  setMixDiamondInquirySubmitted,
  setMixDiamondStockList,
  setMixSavedFilterDetail,
  setSelectedMixDiamondList,
} from './Redux/reducers/common.slice';
import { getCartStockCount } from './Redux/reducers/dashboard.slice';
import {
  addToCartJewellery,
  setIsAddToCartJewellery,
} from './Redux/reducers/jewellery.slice';
import { getWatchStockListCount } from './Redux/reducers/myAccount.slice';
import {
  addToCartMixListInLocal,
  addToWishMixListInLocalList,
  removeFromWishMixListInLocal,
  setDiamondType,
} from './Redux/reducers/offlineList.slice';
import { OptimizedImage } from 'utils/performanceUtils';

export default function ParcelGoods() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listGridInDiamond, setListGridInDiamond] = useState('Grid');
  const [inquiryPopUp, setInquiryPopUp] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [mixDiamondInquiryObj, setMixDiamondInquiryObj] = useState({});
  const [mixDiamondInquiryRemark, setMixDiamondInquiryRemark] = useState({
    value: '',
    isErrorShown: false,
  });
  const handleClose = () => setFilterShow(false);
  const handleShow = () => setFilterShow(true);
  const {
    mixSizeListByShape,
    isAddToWatchMixList,
    mixDiamondStockList = new Map(),
    mixDiamondApiLoader,
    diamondFilterDetail,
    selectedMixDiamondList,
    isMixGetStockApiRefresh,
    addToWatchMixLoading,
    mixDiamondInquirySubmitted,
    mixSavedFilterDetail,
  } = useSelector(({ common }) => common);

  const currentData = useMemo(() => {
    return mixDiamondStockList?.size > 0
      ? [...mixDiamondStockList.values()]
      : [];
  }, [mixDiamondStockList]);

  const { userData } = useSelector(({ auth }) => auth);
  const { addToCartJewelleryLoading, isAddToCartJewellery } = useSelector(
    ({ jewellery }) => jewellery,
  );
  const { diamondType } = useSelector(({ offlineList }) => offlineList);
  const shortByOption = [
    { label: 'Price - Low to High', value: '1' },
    { label: 'Price - High to Low', value: '2' },
    { label: 'Size - Low to High', value: '3' },
    { label: 'Size - High to Low', value: '4' },
  ];
  const customStyles = {
    option: (base, { isSelected }) => {
      return {
        ...base,
        backgroundColor: isSelected ? '#be8d28' : '#fff',
        ':hover': {
          backgroundColor: 'rgb(200, 200, 200)',
        },
        color: '#000',
      };
    },
  };

  const mixSizeOptionList = useMemo(() => {
    return (
      mixSizeListByShape?.map(item => {
        return { label: item.Size_Name, value: item.Size_Name };
      }) || []
    );
  }, [mixSizeListByShape]);

  const initialValues = {
    size: [],
    shape_ID: [],
    color: [],
    clarity: [],
    fromWeight: 0,
    toWeight: 1000,
    cut: [],
    growthType: [],
    priceF: 0,
    priceT: 1000000,
    location: [],
    shortBy: '1',
    diamond_Type: diamondType,
  };

  const [mixDimaondFilterData, setMixDimaondFilterData] =
    useState(initialValues);

  const shortByOptionObj = useMemo(() => {
    const sortingValue = shortByOption?.find(
      item => item.value === mixDimaondFilterData.shortBy,
    );
    return sortingValue || null;
  }, [mixDimaondFilterData.shortBy]);

  const onHideInquiryPopUp = useCallback(() => {
    setInquiryPopUp(false);
    setMixDiamondInquiryObj({});
    setMixDiamondInquiryRemark({ value: '', isErrorShown: false });
  }, []);

  useEffect(() => {
    if (isMixGetStockApiRefresh) {
      dispatch(getMixDimaondFilterDataList(mixDimaondFilterData));
      dispatch(setIsMixGetStockApiRefresh(false));
    } else if (Object.keys(mixSavedFilterDetail)?.length > 0) {
      setMixDimaondFilterData({
        ...initialValues,
        ...mixSavedFilterDetail,
      });
    }
  }, [dispatch, isMixGetStockApiRefresh]);

  useEffect(() => {
    if (isAddToCartJewellery && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartJewellery(false));
    }
  }, [dispatch, isAddToCartJewellery, userData]);

  useEffect(() => {
    if (isAddToWatchMixList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToWatchMixList(false));
    }
  }, [dispatch, userData, isAddToWatchMixList]);

  useEffect(() => {
    if (mixDiamondInquirySubmitted) {
      dispatch(setMixDiamondInquirySubmitted(false));
      onHideInquiryPopUp();
    }
  }, [dispatch, onHideInquiryPopUp, mixDiamondInquirySubmitted]);

  const loadingDiamondGridView = useMemo(() => {
    let arr = [];
    for (let i = 0; i <= 9; i++) {
      arr.push(
        <Col
          xl={4}
          md={4}
          sm={6}
          key={`skeleton_${i}`}
          className="jewellery_item_col"
        >
          <div className="product_box">
            <div className="product_img">
              <Skeleton height={270} />
            </div>
            <div className="product_info1">
              <Skeleton height={50} />
              <Row>
                <Col xs>
                  <Skeleton height={30} />
                </Col>
                <Col xs>
                  <Skeleton height={30} />
                </Col>
              </Row>
            </div>
          </div>
        </Col>,
      );
    }
    return arr;
  }, []);

  const loadingDiamondListView = useMemo(() => {
    return (
      <div className="product_list_wrapper mt-0">
        <div className="table-responsive">
          <table>
            <thead>
              <tr className="center_all_td">
                <th></th>
                <th>Image</th>
                <th>Shape</th>
                <th>Size</th>
                <th>Color</th>
                <th>Clarity</th>
                <th>Growth Type</th>
                <th>Total Carat Weight</th>
                <th>Price/CT</th>
                <th>Quantity</th>
                <th>Pcs</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="center_all_td">
                <td colSpan={12} style={{ paddingRight: '10px' }}>
                  <div className="skelleton_Wrapper">
                    <Skeleton
                      height={60}
                      count={8}
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }, []);

  const onShapeSelectChange = useCallback(
    (e, MasterTypeValue_Id) => {
      let shapeIdArr =
        mixDimaondFilterData?.shape_ID?.length > 0
          ? [...mixDimaondFilterData.shape_ID]
          : [];
      if (e.target.checked) {
        shapeIdArr = [MasterTypeValue_Id];
        dispatch(getMixSizeByShapeList(MasterTypeValue_Id));
      } else {
        shapeIdArr = [];
      }
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        shape_ID: shapeIdArr,
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          shape_ID: shapeIdArr,
        }),
      );
    },
    [dispatch, mixDimaondFilterData, setMixDimaondFilterData],
  );

  const onSelectColorHandler = useCallback(
    (isChecked, MasterTypeValue_Code) => {
      let colorArr =
        mixDimaondFilterData?.color?.length > 0
          ? [...mixDimaondFilterData.color]
          : [];
      if (isChecked) {
        if (colorArr.includes(MasterTypeValue_Code)) {
          colorArr = colorArr?.filter(item2 => item2 !== MasterTypeValue_Code);
        } else {
          colorArr = [...colorArr, MasterTypeValue_Code];
        }
      } else {
        colorArr = colorArr?.filter(v => v !== MasterTypeValue_Code);
      }
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        color: colorArr,
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          color: colorArr,
        }),
      );
    },
    [dispatch, mixDimaondFilterData, setMixDimaondFilterData],
  );

  const onChangeSizeHandler = useCallback(
    value => {
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        size: value,
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          size: value,
        }),
      );
    },
    [dispatch, mixDimaondFilterData],
  );

  const onSelectCutHandler = useCallback(
    (isChecked, MasterTypeValue_Id) => {
      let cutArr =
        mixDimaondFilterData?.cut?.length > 0
          ? [...mixDimaondFilterData.cut]
          : [];
      if (isChecked) {
        if (cutArr.includes(MasterTypeValue_Id)) {
          cutArr = cutArr?.filter(item2 => item2 !== MasterTypeValue_Id);
        } else {
          cutArr = [...cutArr, MasterTypeValue_Id];
        }
      } else {
        cutArr = cutArr?.filter(v => v !== MasterTypeValue_Id);
      }
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        cut: cutArr,
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          cut: cutArr,
        }),
      );
    },
    [dispatch, mixDimaondFilterData, setMixDimaondFilterData],
  );

  const onSelectClarityHandler = useCallback(
    (isChecked, MasterTypeValue_Id) => {
      let clarityArr =
        mixDimaondFilterData?.clarity?.length > 0
          ? [...mixDimaondFilterData.clarity]
          : [];
      if (isChecked) {
        if (clarityArr.includes(MasterTypeValue_Id)) {
          clarityArr = clarityArr?.filter(
            item2 => item2 !== MasterTypeValue_Id,
          );
        } else {
          clarityArr = [...clarityArr, MasterTypeValue_Id];
        }
      } else {
        clarityArr = clarityArr?.filter(v => v !== MasterTypeValue_Id);
      }
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        clarity: clarityArr,
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          clarity: clarityArr,
        }),
      );
    },
    [dispatch, mixDimaondFilterData, setMixDimaondFilterData],
  );

  const onSelectLocationHandler = useCallback(
    (isChecked, MasterTypeValue_Id) => {
      let locationArr =
        mixDimaondFilterData?.location?.length > 0
          ? [...mixDimaondFilterData.location]
          : [];
      if (isChecked) {
        if (locationArr.includes(MasterTypeValue_Id)) {
          locationArr = locationArr?.filter(
            item2 => item2 !== MasterTypeValue_Id,
          );
        } else {
          locationArr = [...locationArr, MasterTypeValue_Id];
        }
      } else {
        locationArr = locationArr?.filter(v => v !== MasterTypeValue_Id);
      }
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        location: locationArr,
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          location: locationArr,
        }),
      );
    },
    [dispatch, mixDimaondFilterData, setMixDimaondFilterData],
  );

  const onSelectGrowthTypeHandler = useCallback(
    (isChecked, MasterTypeValue_Id) => {
      let growthTypeArr =
        mixDimaondFilterData?.growthType?.length > 0
          ? [...mixDimaondFilterData.growthType]
          : [];
      if (isChecked) {
        if (growthTypeArr.includes(MasterTypeValue_Id)) {
          growthTypeArr = growthTypeArr?.filter(
            item2 => item2 !== MasterTypeValue_Id,
          );
        } else {
          growthTypeArr = [...growthTypeArr, MasterTypeValue_Id];
        }
      } else {
        growthTypeArr = growthTypeArr?.filter(v => v !== MasterTypeValue_Id);
      }
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        growthType: growthTypeArr,
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          growthType: growthTypeArr,
        }),
      );
    },
    [dispatch, mixDimaondFilterData, setMixDimaondFilterData],
  );

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const handleImageErrorForShape = useCallback(event => {
    event.target.src = NoImageAvailableShape;
  }, []);

  const handlePriceSearchChange = useCallback(
    (value, jewelleryFilterValue) => {
      dispatch(
        getMixDimaondFilterDataList({
          ...jewelleryFilterValue,
          priceF: value[0],
          priceT: value[1],
        }),
      );
    },
    [dispatch],
  );

  const debounceHandlePriceTextChange = React.useCallback(
    _.debounce(handlePriceSearchChange, 800),
    [],
  );

  const onChangePriceHandler = useCallback(
    value => {
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        priceF: value[0],
        priceT: value[1],
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          priceF: value[0],
          priceT: value[1],
        }),
      );
    },
    [dispatch, setMixDimaondFilterData, mixDimaondFilterData],
  );

  const handleWeightSearchChange = useCallback(
    (value, jewelleryFilterValue) => {
      dispatch(
        getMixDimaondFilterDataList({
          ...jewelleryFilterValue,
          fromWeight: value[0],
          toWeight: value[1],
        }),
      );
    },
    [dispatch],
  );

  const debounceHandleWeightTextChange = React.useCallback(
    _.debounce(handleWeightSearchChange, 800),
    [],
  );

  const onChangeWeightHandler = useCallback(
    value => {
      setMixDimaondFilterData(prevState => ({
        ...prevState,
        fromWeight: value[0],
        toWeight: value[1],
      }));
      dispatch(
        getMixDimaondFilterDataList({
          ...mixDimaondFilterData,
          fromWeight: value[0],
          toWeight: value[1],
        }),
      );
    },
    [dispatch, mixDimaondFilterData, setMixDimaondFilterData],
  );

  const onClickMixDiamondDetail = useCallback(
    diamond => {
      if (diamond.Packet_Id) {
        navigate(`/parcel-goods-detail?packetId=${diamond.Packet_Id}`);
        dispatch(setMixSavedFilterDetail(mixDimaondFilterData));
      }
    },
    [dispatch, mixDimaondFilterData, navigate],
  );

  const onAddToCartMixDiamondHandler = useCallback(
    async cartListData => {
      if (cartListData?.length > 0) {
        let cartListMixDiamond = cartListData?.map(item => item.Packet_Id);
        if (userData?.UserID) {
          dispatch(
            addToCartJewellery({
              packetId: cartListMixDiamond.toString(),
              userId: userData?.UserID,
            }),
          );
        } else {
          let cartListMixDiamond = cartListData?.map(item => {
            return {
              Cut: item?.Cut ? item.Cut : '',
              Cts: item?.Cts ? item.Cts : '',
              Rate: item?.Price ? item.Price : '',
              Size: item?.Size ? item.Size : '',
              Image: item?.Image_Url ? item.Image_Url : '',
              Shape: item?.Shape ? item.Shape : '',
              Color: item?.Color ? item.Color : '',
              Quality: item?.Quality ? item.Quality : '',
              Packet_Id: item?.Packet_Id ? item.Packet_Id : '',
              Packet_Name: item?.Packet_Name ? item.Packet_Name : '',
              Diamond_Type: item?.Diamond_Type ? item.Diamond_Type : '',
            };
          });
          dispatch(
            addToCartMixListInLocal({
              mixDiamondCartList: cartListMixDiamond,
              diamondType: diamondType,
            }),
          );
        }
      }
    },
    [dispatch, userData, diamondType],
  );

  const onSelectDiamond = useCallback(
    row => {
      const newMixDiamondStockList = new Map(mixDiamondStockList);
      newMixDiamondStockList.set(row.Packet_Id, {
        ...row,
        isCheck: !row.isCheck,
      });
      const newSelectedMixDiamondList = _.filter(
        [...newMixDiamondStockList.values()],
        item => {
          if (item.isCheck) {
            return item;
          }
        },
      );
      dispatch(setMixDiamondStockList(newMixDiamondStockList));
      dispatch(setSelectedMixDiamondList(newSelectedMixDiamondList));
    },
    [dispatch, mixDiamondStockList],
  );

  const updateRowWatch = useCallback(
    (row, value) => {
      const newMixDiamondStockList = new Map(mixDiamondStockList);
      newMixDiamondStockList.set(row.Packet_Id, {
        ...row,
        Is_Like: value,
      });
      dispatch(setMixDiamondStockList(newMixDiamondStockList));
    },
    [dispatch, mixDiamondStockList],
  );

  const onWatchHandler = useCallback(
    async row => {
      if (userData?.UserID) {
        if (row?.Is_Like) {
          let { payload } = await dispatch(
            removeToWatchMixDimaondList({
              packetId: row.Packet_Id.toString(),
              userId: userData?.UserID,
            }),
          );
          payload?.data?.IsSuccess && updateRowWatch(row, !row.Is_Like);
        } else {
          let { payload } = await dispatch(
            addToWatchMixDimaondList({
              userId: userData.UserID,
              packetId: row.Packet_Id.toString(),
            }),
          );
          payload?.data?.IsSuccess && updateRowWatch(row, !row.Is_Like);
        }
      } else {
        if (row?.Is_Like) {
          dispatch(
            removeFromWishMixListInLocal({
              mixDiamondWishList: [{ ...row, Is_Like: !row.Is_Like }],
              diamondType: diamondType,
            }),
          );
          updateRowWatch(row, !row.Is_Like);
        } else {
          const obj = {
            Running_Price: row?.Price ? row.Price : '',
            Image: row?.Image_Url ? row.Image_Url : '',
            Diamond_Type: row?.Diamond_Type ? row.Diamond_Type : '',
          };
          dispatch(
            addToWishMixListInLocalList({
              mixDiamondWishList: [{ ...row, ...obj, Is_Like: !row.Is_Like }],
              diamondType: diamondType,
            }),
          );
          updateRowWatch(row, !row.Is_Like);
        }
      }
    },
    [dispatch, diamondType, updateRowWatch, userData],
  );

  const onAddToWishHandler = useCallback(async () => {
    if (selectedMixDiamondList?.length > 0) {
      let wishList = selectedMixDiamondList?.map(item => item.Packet_Id);
      if (userData?.UserID) {
        const { payload } = await dispatch(
          addToWatchMixDimaondList({
            userId: userData.UserID,
            packetId: wishList.toString(),
          }),
        );
        if (payload?.data?.IsSuccess) {
          const newMixDiamondStockList = new Map(mixDiamondStockList);
          wishList?.forEach(item => {
            let diamondObj = newMixDiamondStockList.get(item);
            newMixDiamondStockList.set(item, {
              ...diamondObj,
              Is_Like: true,
            });
          });
          dispatch(setMixDiamondStockList(newMixDiamondStockList));
        }
      } else {
        const selectedDiamondData = selectedMixDiamondList?.map(item => {
          const obj = {
            Running_Price: item?.Price ? item.Price : '',
            Image: item?.Image_Url ? item.Image_Url : '',
            Diamond_Type: item?.Diamond_Type ? item.Diamond_Type : '',
          };
          return { ...item, ...obj, Is_Like: true };
        });
        dispatch(
          addToWishMixListInLocalList({
            mixDiamondWishList: selectedDiamondData,
            diamondType: diamondType,
          }),
        );
        const newMixDiamondStockList = new Map(mixDiamondStockList);
        wishList?.forEach(item => {
          let diamondObj = newMixDiamondStockList.get(item);
          newMixDiamondStockList.set(item, {
            ...diamondObj,
            Is_Like: true,
          });
        });
        dispatch(setMixDiamondStockList(newMixDiamondStockList));
      }
    }
  }, [
    dispatch,
    userData,
    diamondType,
    mixDiamondStockList,
    selectedMixDiamondList,
  ]);

  const handlClearFilter = useCallback(() => {
    setMixDimaondFilterData(initialValues);
    dispatch(getMixDimaondFilterDataList(mixDimaondFilterData));
  }, [dispatch, setMixDimaondFilterData]);

  const onInquiryHandler = useCallback(
    diamond => {
      if (userData?.UserID && diamond?.Packet_Id) {
        setInquiryPopUp(true);
        setMixDiamondInquiryObj(diamond);
      } else {
        navigate('/login');
      }
    },
    [userData, navigate],
  );

  const onSubmitMixDiamondInquiry = useCallback(() => {
    if (!mixDiamondInquiryRemark?.value?.trim()) {
      setMixDiamondInquiryRemark({
        ...mixDiamondInquiryObj,
        isErrorShown: true,
      });
    } else if (mixDiamondInquiryObj?.Packet_Id && userData?.UserID) {
      dispatch(
        createMixDiamondInquiry({
          remark: mixDiamondInquiryObj.value,
          userId: userData.UserID,
          packetId: mixDiamondInquiryObj.Packet_Id,
        }),
      );
    }
  }, [dispatch, userData, mixDiamondInquiryRemark, mixDiamondInquiryObj]);

  return (
    <main>
      <section className="parcel_goods_sec pt50 pt20-lg pb10">
        <Container>
          <h3 className="text-center mb40 mb20-lg ff_Title text-uppercase">
            Search For{' '}
            <span className="text_colorC">Parcel Goods Diamond.</span>
          </h3>
          <Row>
            <Col xl={3} className="d-none d-xl-block">
              <div className="jewellery_filter parcel_goods_filter">
                <h5>
                  Filter
                  <span onClick={handlClearFilter}>
                    <img
                      src={ResetIcon}
                      className="mr0 ml30"
                      alt="reset-icon"
                    />
                  </span>
                </h5>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Shape</Accordion.Header>
                    <Accordion.Body>
                      <div className="filter_shape_checkbox shape_select">
                        <ul>
                          {diamondFilterDetail?.mixShapeList?.map(
                            (shapeObj, index) => {
                              return (
                                <li key={`shape_li_${index}`}>
                                  <div className="custom_checkbox_shape">
                                    <input
                                      type="checkbox"
                                      id={shapeObj.MasterTypeValue_Code}
                                      name={shapeObj.MasterTypeValue_Code}
                                      key={`shape_${index}`}
                                      checked={mixDimaondFilterData?.shape_ID?.includes(
                                        shapeObj.MasterTypeValue_Id,
                                      )}
                                      readOnly
                                      onClick={e =>
                                        onShapeSelectChange(
                                          e,
                                          shapeObj.MasterTypeValue_Id,
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={shapeObj.MasterTypeValue_Code}
                                    >
                                      <span>
                                        <img
                                          src={`http://72.61.170.111:8088/uploads/Diamonds/${shapeObj.MasterTypeValue_Code?.replaceAll(
                                            ' ',
                                            '',
                                          )}.svg`}
                                          alt={shapeObj.MasterTypeValue_Code}
                                          onError={handleImageErrorForShape}
                                        />
                                        <h5>{shapeObj.MasterTypeValue_Code}</h5>
                                      </span>
                                    </label>
                                  </div>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Size</Accordion.Header>
                    <Accordion.Body>
                      <div className="jewellery_sorting_wrap">
                        <Form.Group
                          controlId="exampleForm.ControlInput1"
                          className="form_group"
                        >
                          <Select
                            isMulti
                            isSearchable={true}
                            className="react_custom_select_Wrapper square "
                            options={mixSizeOptionList}
                            placeholder="Select Size"
                            value={mixDimaondFilterData.size}
                            onChange={onChangeSizeHandler}
                            styles={customStyles}
                          />
                        </Form.Group>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Color</Accordion.Header>
                    <Accordion.Body>
                      <div className="common_checkbox_wrapper">
                        {diamondFilterDetail?.mixColorWhiteList?.map(
                          (color, index) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                key={`mix_color_${index}`}
                                name="color"
                                id={color.MasterTypeValue_Id}
                                label={color.DisplayName}
                                readOnly
                                checked={mixDimaondFilterData.color.includes(
                                  color.MasterTypeValue_Id,
                                )}
                                onClick={e =>
                                  onSelectColorHandler(
                                    e.target.checked,
                                    color.MasterTypeValue_Id,
                                  )
                                }
                              />
                            );
                          },
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Cut</Accordion.Header>
                    <Accordion.Body>
                      <div className="common_checkbox_wrapper">
                        {diamondFilterDetail?.mixCutList?.map((cut, index) => {
                          return (
                            <Form.Check
                              type="checkbox"
                              key={`mix_cut_${index}`}
                              name="cut"
                              id={cut.MasterTypeValue_Id}
                              label={cut.DisplayName}
                              readOnly
                              checked={mixDimaondFilterData.cut.includes(
                                cut.MasterTypeValue_Id,
                              )}
                              onClick={e =>
                                onSelectCutHandler(
                                  e.target.checked,
                                  cut.MasterTypeValue_Id,
                                )
                              }
                            />
                          );
                        })}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Clarity</Accordion.Header>
                    <Accordion.Body>
                      <div className="common_checkbox_wrapper">
                        {diamondFilterDetail?.mixClarityList?.map(
                          (clarity, index) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                key={`mix_clarity_${index}`}
                                name="clarity"
                                id={clarity.MasterTypeValue_Id}
                                label={clarity.DisplayName}
                                readOnly
                                checked={mixDimaondFilterData.clarity.includes(
                                  clarity.MasterTypeValue_Id,
                                )}
                                onClick={e =>
                                  onSelectClarityHandler(
                                    e.target.checked,
                                    clarity.MasterTypeValue_Id,
                                  )
                                }
                              />
                            );
                          },
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>Price/ct</Accordion.Header>
                    <Accordion.Body>
                      <RangeSlider
                        min={0}
                        max={1000000}
                        value={[
                          mixDimaondFilterData.priceF,
                          mixDimaondFilterData.priceT,
                        ]}
                        onInput={e => {
                          onChangePriceHandler(e);
                          debounceHandlePriceTextChange(
                            e,
                            mixDimaondFilterData,
                          );
                        }}
                      />
                      <div className="range_value d-flex justify-content-between align-content-center">
                        <div className="from_wrap w-50">
                          <input
                            type="number"
                            onWheel={e => e.target.blur()}
                            className="value"
                            value={
                              mixDimaondFilterData?.priceF
                                ? mixDimaondFilterData.priceF
                                : 0
                            }
                            onKeyDown={disableCalcuSymbol}
                            onChange={e => {
                              const value = Number(e.target.value) || 0;
                              if (value >= 0 && value <= 1000000) {
                                setMixDimaondFilterData(prevState => ({
                                  ...prevState,
                                  priceF: value,
                                }));
                                debounceHandlePriceTextChange(
                                  [value, mixDimaondFilterData.priceT],
                                  mixDimaondFilterData,
                                );
                              }
                            }}
                          />
                          <span className="doller_sign">$</span>
                        </div>
                        <div className="from_wrap to_wrap w-50">
                          <input
                            type="number"
                            onWheel={e => e.target.blur()}
                            className="value"
                            value={
                              mixDimaondFilterData?.priceT
                                ? mixDimaondFilterData.priceT
                                : 0
                            }
                            onKeyDown={disableCalcuSymbol}
                            onChange={e => {
                              const value = Number(e.target.value) || 0;
                              if (value >= 0 && value <= 1000000) {
                                setMixDimaondFilterData(prevState => ({
                                  ...prevState,
                                  priceT: value,
                                }));
                                debounceHandlePriceTextChange(
                                  [mixDimaondFilterData.priceF, value],
                                  mixDimaondFilterData,
                                );
                              }
                            }}
                          />
                          <span className="doller_sign">$</span>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>Weight</Accordion.Header>
                    <Accordion.Body>
                      <RangeSlider
                        min={0}
                        max={1000}
                        value={[
                          mixDimaondFilterData.fromWeight,
                          mixDimaondFilterData.toWeight,
                        ]}
                        onInput={e => {
                          onChangeWeightHandler(e);
                          debounceHandleWeightTextChange(
                            e,
                            mixDimaondFilterData,
                          );
                        }}
                      />
                      <div className="range_value d-flex justify-content-between align-content-center">
                        <div className="from_wrap carat_sign w-50">
                          <input
                            type="number"
                            onWheel={e => e.target.blur()}
                            className="value"
                            value={
                              mixDimaondFilterData?.fromWeight
                                ? mixDimaondFilterData.fromWeight
                                : 0
                            }
                            onKeyDown={disableCalcuSymbol}
                            onChange={e => {
                              const value = Number(e.target.value) || 0;
                              if (value >= 0 && value <= 1000) {
                                setMixDimaondFilterData(prevState => ({
                                  ...prevState,
                                  fromWeight: value,
                                }));
                                debounceHandlePriceTextChange(
                                  [value, mixDimaondFilterData.priceT],
                                  mixDimaondFilterData,
                                );
                              }
                            }}
                          />
                          <span>ct</span>
                        </div>
                        <div className="from_wrap to_wrap carat_sign w-50">
                          <input
                            type="number"
                            onWheel={e => e.target.blur()}
                            className="value"
                            value={
                              mixDimaondFilterData?.toWeight
                                ? mixDimaondFilterData.toWeight
                                : 0
                            }
                            onKeyDown={disableCalcuSymbol}
                            onChange={e => {
                              const value = Number(e.target.value) || 0;
                              if (value >= 0 && value <= 1000000) {
                                setMixDimaondFilterData(prevState => ({
                                  ...prevState,
                                  toWeight: value,
                                }));
                                debounceHandlePriceTextChange(
                                  [mixDimaondFilterData.priceF, value],
                                  mixDimaondFilterData,
                                );
                              }
                            }}
                          />
                          <span>ct</span>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                      <div className="common_checkbox_wrapper ">
                        {diamondFilterDetail?.mixLocation?.map(
                          (location, index) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                key={`mix_location_${index}`}
                                name="location"
                                id={location.MasterTypeValue_Id}
                                label={location.DisplayName}
                                readOnly
                                checked={mixDimaondFilterData.location.includes(
                                  location.MasterTypeValue_Id,
                                )}
                                onClick={e =>
                                  onSelectLocationHandler(
                                    e.target.checked,
                                    location.MasterTypeValue_Id,
                                  )
                                }
                              />
                            );
                          },
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Accordion>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>Growth Type</Accordion.Header>
                    <Accordion.Body>
                      <div className="common_checkbox_wrapper ">
                        {diamondFilterDetail?.mixGrowthTypeList?.map(
                          (growthType, index) => {
                            return (
                              <Form.Check
                                type="checkbox"
                                key={`mix_growth_type_${index}`}
                                name="growthType"
                                id={growthType.MasterTypeValue_Id}
                                label={growthType.DisplayName}
                                readOnly
                                checked={mixDimaondFilterData.growthType.includes(
                                  growthType.MasterTypeValue_Id,
                                )}
                                onClick={e =>
                                  onSelectGrowthTypeHandler(
                                    e.target.checked,
                                    growthType.MasterTypeValue_Id,
                                  )
                                }
                              />
                            );
                          },
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
            <Col xl={9} lg={12}>
              <div className="parcel_top_wrap mb10 mb0-lg action_button_wrap d-flex flex-wrap justify-content-between">
                <Col lg={5} className="mt5">
                  <div className="check_input_wraper">
                    <ul className="flex-nowrap">
                      <li className="ml0-lg mb5">
                        <div className="checkbox_wrapper radio_wrapper">
                          <Form.Check
                            type="radio"
                            name="diamondType"
                            id="LabGrownDiamond"
                            readOnly
                            label="Lab Grown Diamond"
                            checked={
                              mixDimaondFilterData.diamond_Type === 'LABGROWN'
                            }
                            onClick={() => {
                              if (
                                mixDimaondFilterData.diamond_Type !== 'LABGROWN'
                              ) {
                                dispatch(setDiamondType('LABGROWN'));
                                setMixDimaondFilterData(prevState => ({
                                  ...prevState,
                                  diamond_Type: 'LABGROWN',
                                }));
                                dispatch(
                                  getMixDimaondFilterDataList({
                                    ...mixDimaondFilterData,
                                    diamond_Type: 'LABGROWN',
                                  }),
                                );
                              }
                            }}
                          />
                        </div>
                      </li>
                      <li className="ml0-lg mb5">
                        <div className="checkbox_wrapper radio_wrapper">
                          <Form.Check
                            type="radio"
                            name="diamondType"
                            id="NaturalDiamond"
                            readOnly
                            label="Natural Diamond"
                            checked={
                              mixDimaondFilterData.diamond_Type === 'NATURAL'
                            }
                            onClick={() => {
                              if (
                                mixDimaondFilterData.diamond_Type !== 'NATURAL'
                              ) {
                                dispatch(setDiamondType('NATURAL'));
                                setMixDimaondFilterData(prevState => ({
                                  ...prevState,
                                  diamond_Type: 'NATURAL',
                                }));
                                dispatch(
                                  getMixDimaondFilterDataList({
                                    ...mixDimaondFilterData,
                                    diamond_Type: 'NATURAL',
                                  }),
                                );
                              }
                            }}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={7} className="mt5">
                  <ul className="action_button_wrap d-flex flex-wrap justify-content-lg-end align-items-center">
                    <li className="mr5 w-auto">
                      <Button
                        variant="primary"
                        size="sm"
                        className="px20 px10-xs btn_shadow"
                        disabled={
                          selectedMixDiamondList?.length === 0 ||
                          addToCartJewelleryLoading
                        }
                        onClick={() =>
                          onAddToCartMixDiamondHandler(selectedMixDiamondList)
                        }
                      >
                        Add To Cart
                      </Button>
                    </li>
                    <li className="mr5">
                      <Button
                        variant="primary"
                        size="sm"
                        className="px20 px10-xs btn_shadow"
                        disabled={
                          selectedMixDiamondList?.length === 0 ||
                          addToWatchMixLoading
                        }
                        onClick={() =>
                          onAddToWishHandler(selectedMixDiamondList)
                        }
                      >
                        Add To Wishlist
                      </Button>
                    </li>
                    <li className="mr5">
                      <div className="diamond_sorting_wrap parcel_select">
                        <Form.Group
                          controlId="exampleForm.ControlInput1"
                          className="form_group"
                        >
                          <Select
                            aria-label="Default select example"
                            className="react_custom_select_Wrapper square"
                            value={shortByOptionObj}
                            isSearchable={false}
                            isDisabled={mixDiamondApiLoader}
                            options={shortByOption}
                            onChange={e => {
                              if (mixDimaondFilterData.shortBy !== e?.value) {
                                setMixDimaondFilterData(prevState => ({
                                  ...prevState,
                                  shortBy: e?.value,
                                }));
                                dispatch(
                                  getMixDimaondFilterDataList({
                                    ...mixDimaondFilterData,
                                    shortBy: e?.value,
                                  }),
                                );
                              }
                            }}
                            placeholder="Sort By"
                            styles={customStyles}
                          />
                        </Form.Group>
                      </div>
                    </li>
                  </ul>
                </Col>
              </div>
              <div className="filter_by_list mb15 mt5">
                <ul className="d-flex flex-nowrap">
                  <li>
                    <div className="list_grid_button">
                      <Button
                        variant="outline-secondary"
                        className={listGridInDiamond === 'Grid' ? 'active' : ''}
                        onClick={() => setListGridInDiamond('Grid')}
                      >
                        <img src={Grid} alt="" /> Visual
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className={listGridInDiamond === 'List' ? 'active' : ''}
                        onClick={() => setListGridInDiamond('List')}
                      >
                        <img src={List} alt="" /> List
                      </Button>
                    </div>
                  </li>
                  <li className="ml0-lg mb-0">
                    <div className="filter_button_wrap d-block d-xl-none">
                      <Button
                        variant="outline-secondary"
                        className="ff_Mulish text-nowrap"
                        onClick={handleShow}
                      >
                        <span className="d-md-block d-none">More Filters</span>
                        <img
                          src={FilterIcon}
                          className="mr0 ms-md-3 ms-0"
                          alt=""
                        />
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="parcel_box_wrap">
                <Row className="g-4 rowX mt-0">
                  {listGridInDiamond === 'Grid' ? (
                    <>
                      {mixDiamondApiLoader && loadingDiamondGridView}
                      {currentData?.length > 0 && (
                        <ParcelGoodsGridView
                          currentData={currentData}
                          LikeImage={LikeImage}
                          HeartIcon={HeartIcon}
                          onWatchHandler={onWatchHandler}
                          onSelectDiamond={onSelectDiamond}
                          onInquiryHandler={onInquiryHandler}
                          NoImageAvailable={NoImageAvailable}
                          handleImageError={handleImageError}
                          addToWatchMixLoading={addToWatchMixLoading}
                          onClickMixDiamondDetail={onClickMixDiamondDetail}
                          onAddToCartMixDiamondHandler={
                            onAddToCartMixDiamondHandler
                          }
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {mixDiamondApiLoader && loadingDiamondListView}
                      {currentData?.length > 0 && (
                        <ParcelGoodsListView
                          currentData={currentData}
                          onSelectDiamond={onSelectDiamond}
                          NoImageAvailable={NoImageAvailable}
                          handleImageError={handleImageError}
                          onClickMixDiamondDetail={onClickMixDiamondDetail}
                        />
                      )}
                    </>
                  )}
                  {!mixDiamondApiLoader && currentData?.length === 0 && (
                    <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
                      <img src={recordsNotFound} alt="Records Not Found" />
                      <h4 className="ff_Mulish">Data Not Found</h4>
                    </div>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal
        show={inquiryPopUp}
        onHide={onHideInquiryPopUp}
        size="lg"
        centered
        dialogClassName="terms_condition_model"
      >
        <Modal.Header closeButton>
          <h6 className="m-0 ">Inquiry</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="terms_condition_wrap">
            <div className="square_input_wrapper">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Any other suggetion"
                  value={mixDiamondInquiryRemark.value}
                  onChange={e =>
                    setMixDiamondInquiryRemark({
                      ...mixDiamondInquiryRemark,
                      value: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </div>
          </div>
          <ul className="d-flex align-items-center justify-content-center">
            <li>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onHideInquiryPopUp}
              >
                Cancel
              </Button>
            </li>
            <li>
              <Button
                variant="primary"
                size="sm"
                className=" ml5"
                onClick={onSubmitMixDiamondInquiry}
              >
                Submit
              </Button>
            </li>
          </ul>
        </Modal.Body>
      </Modal>
      <Offcanvas show={filterShow} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="jewellery_filter parcel_goods_filter">
            <h5>
              Filter
              <span onClick={handlClearFilter}>
                <img src={ResetIcon} className="mr0 ml30" alt="reset-icon" />
              </span>
            </h5>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Shape</Accordion.Header>
                <Accordion.Body>
                  <div className="filter_shape_checkbox shape_select">
                    <ul>
                      {diamondFilterDetail?.mixShapeList?.map(
                        (shapeObj, index) => {
                          return (
                            <li key={`shape_li_${index}`}>
                              <div className="custom_checkbox_shape">
                                <input
                                  type="checkbox"
                                  id={shapeObj.MasterTypeValue_Code}
                                  name={shapeObj.MasterTypeValue_Code}
                                  key={`shape_${index}`}
                                  checked={mixDimaondFilterData?.shape_ID?.includes(
                                    shapeObj.MasterTypeValue_Id,
                                  )}
                                  readOnly
                                  onClick={e =>
                                    onShapeSelectChange(
                                      e,
                                      shapeObj.MasterTypeValue_Id,
                                    )
                                  }
                                />
                                <label htmlFor={shapeObj.MasterTypeValue_Code}>
                                  <span>
                                    <img
                                      src={`http://72.61.170.111:8088/uploads/Diamonds/${shapeObj.MasterTypeValue_Code?.replaceAll(
                                        ' ',
                                        '',
                                      )}.svg`}
                                      alt={shapeObj.MasterTypeValue_Code}
                                      onError={handleImageError}
                                    />
                                    <h5>{shapeObj.MasterTypeValue_Code}</h5>
                                  </span>
                                </label>
                              </div>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Size</Accordion.Header>
                <Accordion.Body>
                  <div className="jewellery_sorting_wrap">
                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      className="form_group"
                    >
                      <Select
                        isMulti
                        isSearchable={true}
                        className="react_custom_select_Wrapper square "
                        options={mixSizeOptionList}
                        placeholder="Select Size"
                        value={mixDimaondFilterData.size}
                        onChange={onChangeSizeHandler}
                        styles={customStyles}
                      />
                    </Form.Group>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Color</Accordion.Header>
                <Accordion.Body>
                  <div className="common_checkbox_wrapper ">
                    {diamondFilterDetail?.mixColorWhiteList?.map(
                      (color, index) => {
                        return (
                          <Form.Check
                            type="checkbox"
                            key={`mix_color_${index}`}
                            name="color"
                            id={color.MasterTypeValue_Id}
                            label={color.DisplayName}
                            readOnly
                            checked={mixDimaondFilterData.color.includes(
                              color.MasterTypeValue_Id,
                            )}
                            onClick={e =>
                              onSelectColorHandler(
                                e.target.checked,
                                color.MasterTypeValue_Id,
                              )
                            }
                          />
                        );
                      },
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Cut</Accordion.Header>
                <Accordion.Body>
                  <div className="common_checkbox_wrapper ">
                    {diamondFilterDetail?.mixCutList?.map((cut, index) => {
                      return (
                        <Form.Check
                          type="checkbox"
                          key={`mix_cut_${index}`}
                          name="cut"
                          id={cut.MasterTypeValue_Id}
                          label={cut.DisplayName}
                          readOnly
                          checked={mixDimaondFilterData.cut.includes(
                            cut.MasterTypeValue_Id,
                          )}
                          onClick={e =>
                            onSelectCutHandler(
                              e.target.checked,
                              cut.MasterTypeValue_Id,
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Clarity</Accordion.Header>
                <Accordion.Body>
                  <div className="common_checkbox_wrapper ">
                    {diamondFilterDetail?.mixClarityList?.map(
                      (clarity, index) => {
                        return (
                          <Form.Check
                            type="checkbox"
                            key={`mix_clarity_${index}`}
                            name="clarity"
                            id={clarity.MasterTypeValue_Id}
                            label={clarity.DisplayName}
                            readOnly
                            checked={mixDimaondFilterData.clarity.includes(
                              clarity.MasterTypeValue_Id,
                            )}
                            onClick={e =>
                              onSelectClarityHandler(
                                e.target.checked,
                                clarity.MasterTypeValue_Id,
                              )
                            }
                          />
                        );
                      },
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Price/ct</Accordion.Header>
                <Accordion.Body>
                  <RangeSlider
                    min={0}
                    max={1000000}
                    value={[
                      mixDimaondFilterData.priceF,
                      mixDimaondFilterData.priceT,
                    ]}
                    onInput={e => {
                      onChangePriceHandler(e);
                      debounceHandlePriceTextChange(e, mixDimaondFilterData);
                    }}
                  />
                  <div className="range_value d-flex justify-content-between align-content-center ">
                    <div className="from_wrap w-50">
                      <input
                        type="number"
                        className="value"
                        onWheel={e => e.target.blur()}
                        value={
                          mixDimaondFilterData?.priceF
                            ? mixDimaondFilterData.priceF
                            : 0
                        }
                        onKeyDown={disableCalcuSymbol}
                        onChange={e => {
                          const value = Number(e.target.value) || 0;
                          if (value >= 0 && value <= 1000000) {
                            setMixDimaondFilterData(prevState => ({
                              ...prevState,
                              priceF: value,
                            }));
                            debounceHandlePriceTextChange(
                              [value, mixDimaondFilterData.priceT],
                              mixDimaondFilterData,
                            );
                          }
                        }}
                      />
                      <span className="doller_sign">$</span>
                    </div>
                    <div className="from_wrap to_wrap w-50">
                      <input
                        type="number"
                        className="value"
                        onWheel={e => e.target.blur()}
                        value={
                          mixDimaondFilterData?.priceT
                            ? mixDimaondFilterData.priceT
                            : 0
                        }
                        onKeyDown={disableCalcuSymbol}
                        onChange={e => {
                          const value = Number(e.target.value) || 0;
                          if (value >= 0 && value <= 1000000) {
                            setMixDimaondFilterData(prevState => ({
                              ...prevState,
                              priceT: value,
                            }));
                            debounceHandlePriceTextChange(
                              [mixDimaondFilterData.priceF, value],
                              mixDimaondFilterData,
                            );
                          }
                        }}
                      />
                      <span className="doller_sign">$</span>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Weight</Accordion.Header>
                <Accordion.Body>
                  <RangeSlider
                    min={0}
                    max={1000}
                    value={[
                      mixDimaondFilterData.fromWeight,
                      mixDimaondFilterData.toWeight,
                    ]}
                    onInput={e => {
                      onChangeWeightHandler(e);
                      debounceHandleWeightTextChange(e, mixDimaondFilterData);
                    }}
                  />
                  <div className="range_value d-flex justify-content-between align-content-center">
                    <div className="from_wrap carat_sign w-50">
                      <input
                        type="number"
                        className="value"
                        onWheel={e => e.target.blur()}
                        value={
                          mixDimaondFilterData?.fromWeight
                            ? mixDimaondFilterData.fromWeight
                            : 0
                        }
                        onKeyDown={disableCalcuSymbol}
                        onChange={e => {
                          const value = Number(e.target.value) || 0;
                          if (value >= 0 && value <= 1000) {
                            setMixDimaondFilterData(prevState => ({
                              ...prevState,
                              fromWeight: value,
                            }));
                            debounceHandlePriceTextChange(
                              [value, mixDimaondFilterData.priceT],
                              mixDimaondFilterData,
                            );
                          }
                        }}
                      />
                      <span>ct</span>
                    </div>
                    <div className="from_wrap to_wrap carat_sign w-50">
                      <input
                        type="number"
                        className="value"
                        onWheel={e => e.target.blur()}
                        value={
                          mixDimaondFilterData?.toWeight
                            ? mixDimaondFilterData.toWeight
                            : 0
                        }
                        onKeyDown={disableCalcuSymbol}
                        onChange={e => {
                          const value = Number(e.target.value) || 0;
                          if (value >= 0 && value <= 1000000) {
                            setMixDimaondFilterData(prevState => ({
                              ...prevState,
                              toWeight: value,
                            }));
                            debounceHandlePriceTextChange(
                              [mixDimaondFilterData.priceF, value],
                              mixDimaondFilterData,
                            );
                          }
                        }}
                      />
                      <span>ct</span>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="6">
                <Accordion.Header>Location</Accordion.Header>
                <Accordion.Body>
                  <div className="common_checkbox_wrapper ">
                    {diamondFilterDetail?.mixLocation?.map(
                      (location, index) => {
                        return (
                          <Form.Check
                            type="checkbox"
                            key={`mix_location_${index}`}
                            name="location"
                            id={location.MasterTypeValue_Id}
                            label={location.DisplayName}
                            readOnly
                            checked={mixDimaondFilterData.location.includes(
                              location.MasterTypeValue_Id,
                            )}
                            onClick={e =>
                              onSelectLocationHandler(
                                e.target.checked,
                                location.MasterTypeValue_Id,
                              )
                            }
                          />
                        );
                      },
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="7">
                <Accordion.Header>Growth Type</Accordion.Header>
                <Accordion.Body>
                  <div className="common_checkbox_wrapper ">
                    {diamondFilterDetail?.mixGrowthTypeList?.map(
                      (growthType, index) => {
                        return (
                          <Form.Check
                            type="checkbox"
                            key={`mix_growth_type_${index}`}
                            name="growthType"
                            id={growthType.MasterTypeValue_Id}
                            label={growthType.DisplayName}
                            readOnly
                            checked={mixDimaondFilterData.growthType.includes(
                              growthType.MasterTypeValue_Id,
                            )}
                            onClick={e =>
                              onSelectGrowthTypeHandler(
                                e.target.checked,
                                growthType.MasterTypeValue_Id,
                              )
                            }
                          />
                        );
                      },
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </main>
  );
}
