import {
  getMixWatchStockList,
  removeToWatchMixDimaondList,
  setIsAddToWatchMixList,
  setWatchListCurrentData,
} from 'Components/Redux/reducers/common.slice';
import { getCartStockCount } from 'Components/Redux/reducers/dashboard.slice';
import {
  addToCartJewellery,
  setIsAddToCartJewellery,
} from 'Components/Redux/reducers/jewellery.slice';
import {
  addToCartList,
  addToHoldList,
  getWatchStockList,
  getWatchStockListCount,
  removeToWatchList,
  setIsAddToCartList,
  setIsAddToWatchList,
  setIsRefreshGetWatchListApi,
} from 'Components/Redux/reducers/myAccount.slice';
import {
  addToCartListInLocal,
  addToCartListInLocalJewelery,
  addToCartMixListInLocal,
  removeFromWishListInLocal,
  removeFromWishListInLocalJewelery,
  removeFromWishMixListInLocal,
  setDiamondType,
  setWatchDisplayViewType,
} from 'Components/Redux/reducers/offlineList.slice';
import { getSessionData } from 'Helper/AuthTokenHelper';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CartIcon from '../../Assets/Images/cart.svg';
import holdDiamondIcon from '../../Assets/Images/hold-diamond-icon.svg';
import recordsNotFound from '../../Assets/Images/records-not-found1.png';
import trashBlueIcon from '../../Assets/Images/trash-blue.svg';
import MixWatchListTableData from './MixWatchListTableData';
import WatchListTableData from './WatchListTableData';
import WatchListTableDataForJewellery from './WatchListTableDataForJewellery';

const WatchListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const {
    watchMixStockLoading,
    isAddToWatchMixList,
    watchListCurrentData = new Map(),
  } = useSelector(({ common }) => common);
  const {
    isAddToCartList,
    isAddToWatchList,
    addToCartLoading,
    addToHoldLoading,
    watchStockLoading,
    addToWatchLoading,
    isRefreshGetWatchListApi,
  } = useSelector(({ myAccount }) => myAccount);
  const {
    diamondType,
    wishDiamondList,
    wishMixDiamondList,
    watchDisplayViewType,
    jewelleryWatchListData,
  } = useSelector(({ offlineList }) => offlineList);
  const { isAddToCartJewellery, addToCartJewelleryLoading } = useSelector(
    ({ jewellery }) => jewellery,
  );
  const [selectedDiamondJewellery, setSelectedDiamondJewellery] = useState([]);

  useEffect(() => {
    if (isAddToCartList && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartList(false));
    }
  }, [dispatch, isAddToCartList, userData]);

  useEffect(() => {
    if (isAddToCartJewellery && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartJewellery(false));
    }
  }, [dispatch, isAddToCartJewellery, userData]);

  const setDataHandler = useCallback(
    (data = [], key) => {
      if (key === 'Stock_ID') {
        let map = new Map();
        let list = data || [];
        list = _.map(list, o => _.extend({ isCheck: false }, o));
        list?.forEach(x => map.set(x?._id, x));

        dispatch(setWatchListCurrentData(map));
      } else if (key === 'Packet_Id') {
        let map = new Map();
        let list = data || [];
        list = _.map(list, o => _.extend({ isCheck: false }, o));
        list?.forEach(x => map.set(x?._id, x));
        dispatch(setWatchListCurrentData(map));
      }
    },
    [dispatch],
  );

  const getWatchListData = useCallback(
    async (watchDisplayViewType = 'diamond', diamondType = 'NATURAL') => {
      if (watchDisplayViewType === 'diamond') {
        const { payload } = await dispatch(
          getWatchStockList({
            userId: userData?.UserID,
            diamondType: diamondType,
            displayType: watchDisplayViewType,
          }),
        );
        payload?.data?.rows?.length > 0
          ? setDataHandler(payload.data.rows, 'Stock_ID')
          : setDataHandler([], 'Stock_ID');
      } else if (watchDisplayViewType === 'mixDiamond') {
        const { payload } = await dispatch(
          getMixWatchStockList({
            userId: userData?.UserID,
            diamondType: diamondType,
          }),
        );
        payload?.data?.length > 0
          ? setDataHandler(payload.data, 'Packet_Id')
          : setDataHandler([], 'Packet_Id');
      } else {
        const { payload } = await dispatch(
          getWatchStockList({
            userId: userData?.UserID,
            displayType: watchDisplayViewType,
          }),
        );
        payload?.data?.length > 0
          ? setDataHandler(payload.data, 'Stock_ID')
          : setDataHandler([], 'Stock_ID');
      }
    },
    [dispatch, setDataHandler, userData?.UserID],
  );

  useEffect(() => {
    if (isRefreshGetWatchListApi && userData?.UserID) {
      getWatchListData(watchDisplayViewType, diamondType);
    }
    /*  return () => {
      window.location.pathname !== '/diamond-detail' &&
        !isRefreshGetWatchListApi &&
        dispatch(setIsRefreshGetWatchListApi(true));
    }; */
  }, [dispatch, userData, isRefreshGetWatchListApi]);

  useEffect(() => {
    const isLogin = getSessionData();
    if (!isLogin) {
      if (watchDisplayViewType === 'diamond' && diamondType === 'LABGROWN') {
        setDataHandler(wishDiamondList.labGrownDiamond, 'Stock_ID');
      } else if (
        watchDisplayViewType === 'diamond' &&
        diamondType === 'NATURAL'
      ) {
        setDataHandler(wishDiamondList.naturalDiamond, 'Stock_ID');
      } else if (watchDisplayViewType === 'jewellery') {
        setDataHandler(jewelleryWatchListData, 'Stock_ID');
      } else if (
        watchDisplayViewType === 'mixDiamond' &&
        diamondType === 'LABGROWN'
      ) {
        setDataHandler(wishMixDiamondList.labGrownDiamond, 'Packet_Id');
      } else if (
        watchDisplayViewType === 'mixDiamond' &&
        diamondType === 'NATURAL'
      ) {
        setDataHandler(wishMixDiamondList.naturalDiamond, 'Packet_Id');
      }
    }
  }, [wishDiamondList, jewelleryWatchListData, wishMixDiamondList]);

  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      getWatchListData(watchDisplayViewType, diamondType);
      dispatch(setIsAddToWatchList(false));
      setSelectedDiamondJewellery([]);
    }
  }, [dispatch, userData, isAddToWatchList]);

  useEffect(() => {
    if (isAddToWatchMixList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      getWatchListData(watchDisplayViewType, diamondType);
      dispatch(setIsAddToWatchMixList(false));
      setSelectedDiamondJewellery([]);
    }
  }, [dispatch, userData, isAddToWatchMixList]);

  const onSelectDiamond = useCallback(
    (row, key) => {
      const newCurrentData = new Map(watchListCurrentData);
      key === 'Stock_ID'
        ? newCurrentData.set(row._id, {
          ...row,
          isCheck: !row.isCheck,
        })
        : newCurrentData.set(row._id, {
          ...row,
          isCheck: !row.isCheck,
        });
      const newSelectedCurrentData = _.filter(
        [...newCurrentData.values()],
        item => {
          return item;
        },
      );;

      dispatch(setWatchListCurrentData(newCurrentData));
      setSelectedDiamondJewellery(newSelectedCurrentData);
    },
    [dispatch, watchListCurrentData],
  );

  const onChangeDiamondType = useCallback(
    type => {
      if (diamondType !== type) {
        if (userData?.UserID) {
          // watchDisplayViewType === 'diamond'
          //   ? getWatchListData(watchDisplayViewType, type) :
          getWatchListData(watchDisplayViewType, type);
        } else if (
          type === 'LABGROWN' &&
          watchDisplayViewType === 'diamond' &&
          wishDiamondList?.labGrownDiamond
        ) {
          setDataHandler(wishDiamondList.labGrownDiamond, 'Stock_ID');
        } else if (
          type === 'NATURAL' &&
          watchDisplayViewType === 'diamond' &&
          wishDiamondList?.naturalDiamond
        ) {
          setDataHandler(wishDiamondList.naturalDiamond, 'Stock_ID');
        } else if (
          type === 'LABGROWN' &&
          watchDisplayViewType === 'mixDiamond' &&
          wishMixDiamondList?.labGrownDiamond
        ) {
          setDataHandler(wishMixDiamondList.labGrownDiamond, 'Packet_Id');
        } else if (
          type === 'NATURAL' &&
          watchDisplayViewType === 'mixDiamond' &&
          wishMixDiamondList?.naturalDiamond
        ) {
          setDataHandler(wishMixDiamondList.naturalDiamond, 'Packet_Id');
        }
        dispatch(setDiamondType(type));
        setSelectedDiamondJewellery([]);
      }
    },
    [
      dispatch,
      userData,
      diamondType,
      setDataHandler,
      wishDiamondList,
      getWatchListData,
      wishMixDiamondList,
      watchDisplayViewType,
    ],
  );
  const onAddToHoldHandler = useCallback(() => {
    if (selectedDiamondJewellery?.length > 0) {
      let cartList = selectedDiamondJewellery?.map(item => item.Stock_ID);
      dispatch(
        addToHoldList({
          StockIDs: cartList.toString(),
          CustomerID: userData?.UserID,
          diamondType: diamondType,
        }),
      );
    }
  }, [dispatch, selectedDiamondJewellery, userData, diamondType]);

  const onAddToCartHandler = useCallback(() => {
    if (selectedDiamondJewellery?.length > 0) {
      let cartList = selectedDiamondJewellery?.filter(el => el.isCheck).map(item => item.Stock_ID || item.Stock_ID);
      console.log("cartList", cartList, selectedDiamondJewellery);

      if (userData?.UserID) {
        dispatch(
          addToCartList({
            StockIDs: cartList.toString(),
            CustomerID: userData?.UserID,
            diamondType: diamondType,
          }),
        );
        setTimeout(() => {
          getWatchListData(watchDisplayViewType, diamondType);
          dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
        }, 1000);
      } else {
        dispatch(
          addToCartListInLocal({
            diamondCartList: selectedDiamondJewellery,
            diamondType: diamondType,
          }),
        );
      }
    }
  }, [dispatch, selectedDiamondJewellery, userData, diamondType]);

  const onAddToCartMixDiamondHandler = useCallback(() => {
    if (selectedDiamondJewellery?.length > 0) {
      let cartListMixDiamond = selectedDiamondJewellery?.map(
        item => item.Packet_Id,
      );
      if (userData?.UserID) {
        dispatch(
          addToCartJewellery({
            packetId: cartListMixDiamond.toString(),
            userId: userData?.UserID,
          }),
        );
      } else {
        let cartListMixDiamond = selectedDiamondJewellery?.map(item => {
          return {
            Cut: item?.Cut ? item.Cut : '',
            Cts: item?.Cts ? item.Cts : '',
            Rate: item?.Running_Price ? item.Running_Price : '',
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
  }, [dispatch, selectedDiamondJewellery, userData, diamondType]);

  const onAddToCartJewelleryHandler = useCallback(async () => {
    if (selectedDiamondJewellery?.length > 0) {
      for (let i = 0; i < selectedDiamondJewellery.length; i++) {
        const element = selectedDiamondJewellery[i];
        if (userData?.UserID) {
          await dispatch(
            addToCartJewellery({
              ...element,
              userId: userData?.UserID,
              Jewellery_Stock_ID: element?.Stock_ID ? element.Stock_ID : 0,
              isOnlyJewellery: true,
            }),
          );
        } else {
          dispatch(
            addToCartListInLocalJewelery({
              jeweleryList: {
                ...element,
                isOnlyJewellery: true,
                Jewellery_Stock_ID: element?.Stock_ID ? element.Stock_ID : 0,
              },
            }),
          );
        }
      }
    }
  }, [dispatch, selectedDiamondJewellery, userData]);

  const onRemoveDiamondFromWishHandler = useCallback(async () => {
    if (selectedDiamondJewellery?.length > 0) {
      let wishList = selectedDiamondJewellery?.filter(el => el.isCheck).map(item => item.Stock_ID);
      console.log("wishList", wishList);
      if (userData?.UserID) {
        dispatch(
          removeToWatchList({
            StockIDs: wishList.toString(),
            CustomerID: userData?.UserID,
            diamondType: diamondType,
            displayType: watchDisplayViewType,
          }),
        );
      } else {
        const selectedDiamondData = selectedDiamondJewellery?.map(item => {
          return { ...item, Is_Like: false };
        });
        dispatch(
          removeFromWishListInLocal({
            diamondWishList: selectedDiamondData,
            diamondType: diamondType,
          }),
        );
      }
    }
  }, [
    dispatch,
    userData,
    diamondType,
    watchDisplayViewType,
    selectedDiamondJewellery,
  ]);

  const onRemoveMixDiamondFromWishHandler = useCallback(async () => {
    if (selectedDiamondJewellery?.length > 0) {
      let mixDiamondWishList = selectedDiamondJewellery?.map(
        item => item.Packet_Id,
      );
      if (userData?.UserID) {
        dispatch(
          removeToWatchMixDimaondList({
            packetId: mixDiamondWishList.toString(),
            userId: userData?.UserID,
          }),
        );
      } else {
        const selectedDiamondData = selectedDiamondJewellery?.map(item => {
          return { ...item, Is_Like: false };
        });
        dispatch(
          removeFromWishMixListInLocal({
            mixDiamondWishList: selectedDiamondData,
            diamondType: diamondType,
          }),
        );
      }
    }
  }, [dispatch, userData, diamondType, selectedDiamondJewellery]);

  const onRemoveJewelleryFromWishHandler = useCallback(async () => {
    if (selectedDiamondJewellery?.length > 0) {
      let wishList = selectedDiamondJewellery?.filter(el => el.isCheck).map(item => item.Stock_ID);
      console.log("wishList", wishList);
      if (userData?.UserID) {
        dispatch(
          removeToWatchList({
            StockIDs: wishList.toString(),
            CustomerID: userData?.UserID,
          }),
        );
      } else {
        const selectedDiamondData = selectedDiamondJewellery?.map(item => {
          return { ...item, Is_Like: false };
        });
        dispatch(
          removeFromWishListInLocalJewelery({
            jeweleryList: selectedDiamondData,
          }),
        );
      }
    }
  }, [dispatch, userData, selectedDiamondJewellery]);

  const onClickToMixDiamondDetail = useCallback(
    packetId => {
      if (packetId) {
        navigate(`/parcel-goods-detail?packetId=${packetId}`);
      }
      dispatch(setIsRefreshGetWatchListApi(false));
    },
    [dispatch, navigate],
  );

  const onClickToDiamondDetail = useCallback(
    Stone_No => {
      if (Stone_No) {
        navigate(
          `/diamond-detail?stoneNo=${Stone_No}&diamondType=${diamondType}`,
          {
            state: {
              callbackUrl: `${location.pathname}${location.search}`,
            },
          },
        );
      }
      dispatch(setIsRefreshGetWatchListApi(false));
    },
    [dispatch, navigate, diamondType, location],
  );

  const onClickToJewelleryDetail = useCallback(
    stockId => {
      if (stockId) {
        navigate(`/jewellery-detail?stockId=${stockId}`);
      }
      dispatch(setIsRefreshGetWatchListApi(false));
    },
    [dispatch, navigate],
  );

  const onChangeDisplayType = useCallback(
    type => {
      if (type !== watchDisplayViewType) {
        if (userData?.UserID) {
          type === 'diamond'
            ? getWatchListData(type, diamondType)
            : type === 'mixDiamond'
              ? getWatchListData(type, diamondType)
              : getWatchListData(type, diamondType);
        } else if (type === 'diamond' && diamondType === 'LABGROWN') {
          setDataHandler(wishDiamondList.labGrownDiamond, 'Stock_ID');
        } else if (type === 'diamond' && diamondType === 'NATURAL') {
          setDataHandler(wishDiamondList.naturalDiamond, 'Stock_ID');
        } else if (type === 'mixDiamond' && diamondType === 'LABGROWN') {
          setDataHandler(wishMixDiamondList.labGrownDiamond, 'Packet_Id');
        } else if (type === 'mixDiamond' && diamondType === 'NATURAL') {
          setDataHandler(wishMixDiamondList.naturalDiamond, 'Packet_Id');
        } else if (type === 'jewellery') {
          setDataHandler(jewelleryWatchListData, 'Stock_ID');
        }
        dispatch(setWatchDisplayViewType(type));
        setSelectedDiamondJewellery([]);
      }
    },
    [
      dispatch,
      userData,
      diamondType,
      setDataHandler,
      wishDiamondList,
      getWatchListData,
      wishMixDiamondList,
      watchDisplayViewType,
      jewelleryWatchListData,
    ],
  );
  return (
    <main>
      <div className="watch_list_wrap  pb40 pt80 pt40-lg">
        <h3 className="mb25 text-center ff_Title">My Watchlist</h3>
        <Container>
          <>
            <div className="tab_design_three">
              <div className="tab_button">
                <button
                  className={
                    watchDisplayViewType === 'diamond'
                      ? 'tab_inner_btn border-end-0 active'
                      : 'tab_inner_btn border-end-0'
                  }
                  onClick={() => onChangeDisplayType('diamond')}
                >
                  Diamond
                </button>
                <button
                  className={
                    watchDisplayViewType === 'jewellery'
                      ? 'tab_inner_btn border-start-0 active'
                      : 'tab_inner_btn border-start-0'
                  }
                  onClick={() => onChangeDisplayType('jewellery')}
                >
                  Jewellery
                </button>
                <button
                  className={
                    watchDisplayViewType === 'mixDiamond'
                      ? 'tab_inner_btn border-start-0 active'
                      : 'tab_inner_btn border-start-0'
                  }
                  onClick={() => onChangeDisplayType('mixDiamond')}
                >
                  Parcel Goods
                </button>
              </div>
            </div>
            {watchDisplayViewType === 'diamond' ? (
              <>
                <div className="search_inner_wrap justify-content-between">
                  <div className="check_input_wraper scroll_wrapper p-0">
                    <ul>
                      <li>
                        <div className="checkbox_wrapper radio_wrapper">
                          <Form.Check
                            type="radio"
                            name="labGrownDiamond"
                            id="LabGrownDiamond"
                            readOnly
                            label="Lab Grown Diamond"
                            checked={diamondType === 'LABGROWN'}
                            onClick={() => onChangeDiamondType('LABGROWN')}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="checkbox_wrapper radio_wrapper">
                          <Form.Check
                            type="radio"
                            name="labGrownDiamond"
                            id="NaturalDiamond"
                            readOnly
                            label="Natural Diamond"
                            checked={diamondType === 'NATURAL'}
                            onClick={() => onChangeDiamondType('NATURAL')}
                            className="mr5"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                  {!watchStockLoading && watchListCurrentData?.size > 0 && (
                    <div className="watchlist_action_wrapper">
                      <ul className="action_button_wrap d-flex align-items-center justify-content-end">
                        <li className="ml0 w-auto">
                          <Button
                            variant="outline-primary"
                            className="small_padding"
                            onClick={onAddToCartHandler}
                            disabled={
                              selectedDiamondJewellery?.length === 0 ||
                              addToCartLoading
                            }
                          >
                            <img src={CartIcon} alt="Cart Icon" /> Add to cart
                          </Button>
                        </li>
                        {Object.keys(userData)?.length > 0 && (
                          <li className="ml5">
                            <Button
                              variant="outline-primary"
                              className="small_padding"
                              onClick={onAddToHoldHandler}
                              disabled={
                                selectedDiamondJewellery?.length === 0 ||
                                addToHoldLoading
                              }
                            >
                              <img
                                src={holdDiamondIcon}
                                alt="hold Diamond Icon"
                              />{' '}
                              Add to hold
                            </Button>
                          </li>
                        )}
                        <li className="ml5">
                          <Button
                            variant="outline-primary"
                            className="small_padding"
                            onClick={onRemoveDiamondFromWishHandler}
                            disabled={
                              selectedDiamondJewellery?.length === 0 ||
                              addToWatchLoading
                            }
                          >
                            <img src={trashBlueIcon} alt="trash Blue Icon" />{' '}
                            Remove from Watchlist
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="product_list_wrapper">
                  {!watchStockLoading && watchListCurrentData?.size > 0 && (
                    <>
                      <div className="table-responsive">
                        <WatchListTableData
                          onSelectDiamond={onSelectDiamond}
                          currentData={
                            watchListCurrentData?.size > 0
                              ? [...watchListCurrentData.values()]
                              : []
                          }
                          onClickToDiamondDetail={onClickToDiamondDetail}
                        />
                      </div>
                    </>
                  )}
                  {watchStockLoading && (
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr className="center_all_td">
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Image</th>
                            <th>Shape</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Clarity</th>
                            <th>Cut</th>
                            <th>Pol</th>
                            <th>Sym</th>
                            <th>Fluor</th>
                            <th>Lab</th>
                            <th>Certi. No</th>
                            <th>Disc</th>
                            <th>Price</th>
                            <th>Measurement</th>
                            <th>Depth</th>
                            <th>Table</th>
                            <th>Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={20} style={{ paddingRight: '10px' }}>
                              <div className="skelleton_Wrapper">
                                <Skeleton
                                  height={60}
                                  count={8}
                                  style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {!watchStockLoading && watchListCurrentData?.size === 0 && (
                    <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
                      <img src={recordsNotFound} alt="Records Not Found" />
                      <h4 className="ff_Mulish">Data Not Found</h4>
                    </div>
                  )}
                </div>
              </>
            ) : watchDisplayViewType === 'jewellery' ? (
              <>
                <div className="search_inner_wrap  d-flex justify-content-end">
                  {!watchStockLoading && watchListCurrentData?.size > 0 && (
                    <div className="watchlist_action_wrapper">
                      <ul className="action_button_wrap d-flex align-items-center justify-content-end">
                        <li className="ml0 w-auto">
                          <Button
                            variant="outline-primary"
                            className="small_padding"
                            onClick={onAddToCartJewelleryHandler}
                            disabled={
                              selectedDiamondJewellery?.length === 0 ||
                              addToCartJewelleryLoading
                            }
                          >
                            <img src={CartIcon} alt="Cart Icon" /> Add to cart
                          </Button>
                        </li>
                        <li className="ml10">
                          <Button
                            variant="outline-primary"
                            className="small_padding"
                            onClick={onRemoveJewelleryFromWishHandler}
                            disabled={
                              selectedDiamondJewellery?.length === 0 ||
                              addToWatchLoading
                            }
                          >
                            <img src={trashBlueIcon} alt="Trash Blue Icon" />{' '}
                            Remove from Watchlist
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="product_list_wrapper">
                  {!watchStockLoading && watchListCurrentData?.size > 0 && (
                    <>
                      <div className="table-responsive">
                        <WatchListTableDataForJewellery
                          onSelectDiamond={onSelectDiamond}
                          UserID={userData?.UserID}
                          currentData={
                            watchListCurrentData?.size > 0
                              ? [...watchListCurrentData.values()]
                              : []
                          }
                          onClickToJewelleryDetail={onClickToJewelleryDetail}
                        />
                      </div>
                    </>
                  )}
                  {watchStockLoading && (
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr className="center_all_td">
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Jewellery Name</th>
                            <th>Jewellery No</th>
                            <th>Size/Length</th>
                            <th>Type</th>
                            <th>SubType</th>
                            <th>Metal</th>
                            <th>M_Weight</th>
                            <th>D_Weight</th>
                            <th>Shape</th>
                            <th>Price</th>
                            <th>Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={21} style={{ paddingRight: '10px' }}>
                              <div className="skelleton_Wrapper">
                                <Skeleton
                                  height={60}
                                  count={8}
                                  style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {!watchStockLoading && watchListCurrentData?.size === 0 && (
                    <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
                      <img src={recordsNotFound} alt="Records Not Found" />
                      <h4 className="ff_Mulish">Data Not Found</h4>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="search_inner_wrap justify-content-between">
                  <div className="check_input_wraper scroll_wrapper p-0">
                    <ul>
                      <li>
                        <div className="checkbox_wrapper radio_wrapper">
                          <Form.Check
                            type="radio"
                            name="labGrownDiamond"
                            id="LabGrownDiamond"
                            readOnly
                            label="Lab Grown Diamond"
                            checked={diamondType === 'LABGROWN'}
                            onClick={() => onChangeDiamondType('LABGROWN')}
                          />
                        </div>
                      </li>
                      <li>
                        <div className="checkbox_wrapper radio_wrapper">
                          <Form.Check
                            type="radio"
                            name="labGrownDiamond"
                            id="NaturalDiamond"
                            readOnly
                            label="Natural Diamond"
                            checked={diamondType === 'NATURAL'}
                            onClick={() => onChangeDiamondType('NATURAL')}
                            className="mr5"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                  {!watchStockLoading && watchListCurrentData?.size > 0 && (
                    <div className="watchlist_action_wrapper">
                      <ul className="action_button_wrap d-flex align-items-center justify-content-end">
                        <li className="ml0 w-auto">
                          <Button
                            variant="outline-primary"
                            className="small_padding"
                            onClick={onAddToCartMixDiamondHandler}
                            disabled={
                              selectedDiamondJewellery?.length === 0 ||
                              addToCartLoading
                            }
                          >
                            <img src={CartIcon} alt="Cart Icon" /> Add to cart
                          </Button>
                        </li>
                        <li className="ml10">
                          <Button
                            variant="outline-primary"
                            className="small_padding"
                            onClick={onRemoveMixDiamondFromWishHandler}
                            disabled={
                              selectedDiamondJewellery?.length === 0 ||
                              addToWatchLoading
                            }
                          >
                            <img src={trashBlueIcon} alt="trash Blue Icon" />{' '}
                            Remove from Watchlist
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="product_list_wrapper">
                  {!watchMixStockLoading && watchListCurrentData?.size > 0 && (
                    <>
                      <div className="table-responsive">
                        <MixWatchListTableData
                          onSelectDiamond={onSelectDiamond}
                          currentData={
                            watchListCurrentData?.size > 0
                              ? [...watchListCurrentData.values()]
                              : []
                          }
                          onClickToMixDiamondDetail={onClickToMixDiamondDetail}
                        />
                      </div>
                    </>
                  )}
                  {watchMixStockLoading && (
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr className="center_all_td">
                            <th></th>
                            <th>Image</th>
                            <th>Packet Name</th>
                            <th>Shape</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Clarity</th>
                            <th>Cut</th>
                            <th>Growth Type</th>
                            <th>Carat</th>
                            <th>Price</th>
                            <th>Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={12} style={{ paddingRight: '10px' }}>
                              <div className="skelleton_Wrapper">
                                <Skeleton
                                  height={60}
                                  count={8}
                                  style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {!watchMixStockLoading &&
                    watchListCurrentData?.size === 0 && (
                      <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
                        <img src={recordsNotFound} alt="Records Not Found" />
                        <h4 className="ff_Mulish">Data Not Found</h4>
                      </div>
                    )}
                </div>
              </>
            )}
          </>
        </Container>
      </div>
    </main>
  );
};
export default memo(WatchListPage);
