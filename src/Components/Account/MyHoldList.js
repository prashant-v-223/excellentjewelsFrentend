import WatchListTableData from 'Components/Diamond/WatchListTableData';
import { getCartStockCount } from 'Components/Redux/reducers/dashboard.slice';
import { setDiamondType } from 'Components/Redux/reducers/offlineList.slice';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CartIcon from '../../Assets/Images/cart.svg';
import CompareIcon from '../../Assets/Images/compare.svg';
import recordsNotFound from '../../Assets/Images/records-not-found1.png';
import trashBlueIcon from '../../Assets/Images/trash-blue.svg';
import {
  addToCartList,
  addToCompareList,
  getMyHoldStockList,
  getWatchStockListCount,
  removeFromHold,
  setIsAddToCartList,
  setIsAddToWatchList,
  setIsRefreshGetHoldListApi,
  setIsRemoveFromHold,
} from '../Redux/reducers/myAccount.slice';
import { OptimizedImage } from 'utils/performanceUtils';

const MyHoldList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState(new Map());
  const [selectedDiamond, setSelectedDiamond] = useState([]);
  const dispatch = useDispatch();
  const {
    myHoldStockList,
    isAddToCartList,
    isAddToWatchList,
    isRemoveFromHold,
    addToCartLoading,
    addToHoldLoading,
    addToCompareLoading,
    myHoldStockListLoading,
    isRefreshGetHoldListApi,
  } = useSelector(({ myAccount }) => myAccount);
  const { userData } = useSelector(({ auth }) => auth);
  const { diamondType } = useSelector(({ offlineList }) => offlineList);

  useEffect(() => {
    if (isRefreshGetHoldListApi && userData?.UserID) {
      dispatch(
        getMyHoldStockList({
          UserID: userData?.UserID,
          diamondType: diamondType,
        }),
      );
    }
    return () => {
      window.location.pathname !== '/diamond-detail' &&
        !isRefreshGetHoldListApi &&
        dispatch(setIsRefreshGetHoldListApi(true));
    };
  }, [dispatch, userData, isRefreshGetHoldListApi]);

  useEffect(() => {
    if (isRemoveFromHold && userData?.UserID) {
      dispatch(
        getMyHoldStockList({
          UserID: userData?.UserID,
          diamondType: diamondType,
        }),
      );
      dispatch(setIsRemoveFromHold(false));
    }
  }, [dispatch, isRemoveFromHold]);

  useEffect(() => {
    let map = new Map();
    if (myHoldStockList?.length > 0) {
      let list = [...myHoldStockList];
      list = _.map(list, o => _.extend({ isCheck: false }, o));
      list?.forEach(x => map.set(x?.Stock_ID, x));
    }
    setCurrentData(map);
  }, [myHoldStockList]);

  useEffect(() => {
    if (isAddToCartList && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartList(false));
    }
  }, [dispatch, isAddToCartList, userData]);

  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToWatchList(false));
    }
  }, [dispatch, userData, isAddToWatchList]);

  const onSelectDiamond = useCallback(
    row => {
      const newCurrentData = new Map(currentData);
      newCurrentData.set(row.Stock_ID, {
        ...row,
        isCheck: !row.isCheck,
      });
      const newSelectedCurrentData = _.filter(
        [...newCurrentData.values()],
        item => {
          if (item.isCheck) {
            return item;
          }
        },
      );
      setCurrentData(newCurrentData);
      setSelectedDiamond(newSelectedCurrentData);
    },
    [currentData],
  );

  const onChangeDiamondType = useCallback(
    type => {
      if (diamondType !== type) {
        if (userData?.UserID) {
          dispatch(
            getMyHoldStockList({
              diamondType: type,
              UserID: userData?.UserID,
            }),
          );
        }
        dispatch(setDiamondType(type));
      }
    },
    [dispatch, diamondType, userData],
  );

  const onAddToCartHandler = useCallback(() => {
    if (selectedDiamond?.length > 0) {
      let cartList = selectedDiamond?.map(item => item.Stock_ID);
      if (userData?.UserID) {
        dispatch(
          addToCartList({
            StockIDs: cartList.toString(),
            CustomerID: userData?.UserID,
            diamondType: diamondType,
          }),
        );
      }
    }
  }, [dispatch, selectedDiamond, userData, diamondType]);

  const onAddToCompareHandler = useCallback(() => {
    if (selectedDiamond?.length > 0) {
      if (userData?.UserID) {
        let holdList = selectedDiamond?.map(item => item.Stock_ID);
        dispatch(
          addToCompareList({
            StockIDs: holdList.toString(),
            CustomerID: userData?.UserID,
            diamondType: diamondType,
          }),
        );
      }
    }
  }, [dispatch, userData, selectedDiamond, diamondType]);

  const onRemoveFromHoldHandler = useCallback(() => {
    if (selectedDiamond?.length > 0) {
      if (userData?.UserID) {
        let holdList = selectedDiamond?.map(item => item.Stock_ID);
        dispatch(
          removeFromHold({
            StockIDs: holdList.toString(),
            CustomerID: userData?.UserID,
            diamondType: diamondType,
          }),
        );
      }
    }
  }, [dispatch, userData, selectedDiamond, diamondType]);

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
      dispatch(setIsRefreshGetHoldListApi(false));
    },
    [dispatch, navigate, diamondType, location],
  );

  return (
    <main>
      <section className="take_my_ordeR_wrapper pt100 pt10-lg pb100 pb50-md pb80-lg">
        <Container>
          <h3 className="mb25 text-center ff_Title">My Hold List</h3>
          <div className="check_input_wraper scroll_wrapper mb20 mb10-md d-lg-flex align-items-center justify-content-between">
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
                  />
                </div>
              </li>
            </ul>
            {currentData?.size > 0 && (
              <div className="check_input_wraper mt10-lg">
                <ul>
                  <li>
                    <Button
                      variant="outline-primary"
                      className="small_padding"
                      disabled={
                        selectedDiamond?.length === 0 || addToCartLoading
                      }
                      onClick={onAddToCartHandler}
                    >
                      <img src={CartIcon} alt="CartIcon" /> Add to cart
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="outline-primary"
                      className="small_padding"
                      disabled={
                        selectedDiamond?.length === 0 || addToCompareLoading
                      }
                      onClick={onAddToCompareHandler}
                    >
                      <img src={CompareIcon} alt="CompareIcon" /> Add to compare
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="outline-primary"
                      className="small_padding"
                      disabled={
                        selectedDiamond?.length === 0 || addToHoldLoading
                      }
                      onClick={onRemoveFromHoldHandler}
                    >
                      <img src={trashBlueIcon} alt="CompareIcon" /> Release from
                      hold
                    </Button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="product_list_wrapper">
            {currentData?.size > 0 && (
              <div className="table-responsive">
                <WatchListTableData
                  currentData={
                    currentData?.size > 0 ? [...currentData.values()] : []
                  }
                  onSelectDiamond={onSelectDiamond}
                  diamondType={diamondType}
                  onClickToDiamondDetail={onClickToDiamondDetail}
                />
              </div>
            )}
            {myHoldStockListLoading && (
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
                      <th>Availability</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={21} style={{ paddingRight: '10px' }}>
                        <div className="skelleton_Wrapper">
                          <Skeleton
                            height={60}
                            count={6}
                            style={{ width: '100%', marginBottom: '10px' }}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {!myHoldStockListLoading && currentData?.size === 0 && (
              <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
                <img src={recordsNotFound} alt="Records Not Found" />
                <h4 className="ff_Mulish">Data Not Found</h4>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(MyHoldList);
