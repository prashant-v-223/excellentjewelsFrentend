import {
  getCartStockCount,
  getExportStockData,
  getSearchDiamondFilterList,
} from 'Components/Redux/reducers/dashboard.slice';
import {
  addToHoldList,
  addToWatchList,
  setIsAddToCartList,
} from 'Components/Redux/reducers/myAccount.slice';
import { addToWishListInLocalList } from 'Components/Redux/reducers/offlineList.slice';
import { getPayload } from 'Helper/CommonHelper';
import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import CartIcon from '../../Assets/Images/cart.svg';
import Grid from '../../Assets/Images/grid.svg';
import holdDiamondIcon from '../../Assets/Images/hold-diamond-icon.svg';
import List from '../../Assets/Images/list.svg';
import HeartIcon from '../../Assets/Images/wishliat.svg';
const sortByOption = [
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
function DiamondTopButton({
  pageSize,
  userData,
  diamondType,
  setCurrentPage,
  listGridInDiamond,
  onAddToCartHandler,
  selectedDiamondList,
  setListGridInDiamond,
  searchDiamondSavedData,
  searchDiamondFilterList2,
  setSearchDiamondSavedData,
  setSearchDiamondFilterList2,
  searchDiamondFilterListLoading,
}) {
  const dispatch = useDispatch();
  const {
    isAddToCartList,
    addToCartLoading,
    addToHoldLoading,
    addToWatchLoading,
  } = useSelector(({ myAccount }) => myAccount);
  const [exportShow, setExportShow] = useState(false);
  const [exportType, setExportType] = useState('all');

  useEffect(() => {
    if (isAddToCartList && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartList(false));
    }
  }, [dispatch, isAddToCartList, userData]);

  const exportHandleClose = useCallback(() => {
    setExportType('all');
    setExportShow(false);
  }, []);

  const exportHandleSubmit = useCallback(() => {
    if (exportType === 'selected') {
      if (selectedDiamondList?.length > 0) {
        let selectedExportDataId = [...selectedDiamondList] || [];
        selectedExportDataId = _.map(selectedExportDataId, 'Stock_ID');
        exportHandleClose();
        dispatch(
          getExportStockData({
            SelectedStone: selectedExportDataId.toString(),
            UserID: userData?.UserID ? userData?.UserID : 0,
            diamondType: diamondType,
          }),
        );
      }
    } else {
      if (searchDiamondFilterList2?.size > 0) {
        let allExportDataId = [...searchDiamondFilterList2.values()];
        allExportDataId = _.map(allExportDataId, 'Stock_ID');
        exportHandleClose();
        dispatch(
          getExportStockData({
            SelectedStone: allExportDataId.toString(),
            UserID: userData?.UserID ? userData?.UserID : 0,
            diamondType: diamondType,
          }),
        );
      }
    }
  }, [
    dispatch,
    userData,
    exportType,
    searchDiamondFilterList2,
    selectedDiamondList,
    diamondType,
    exportHandleClose,
  ]);

  const exportHandleShow = () => setExportShow(true);
  const onAddToHoldHandler = useCallback(() => {
    if (selectedDiamondList?.length > 0) {
      let cartList = selectedDiamondList?.map(item => item.Stock_ID);
      dispatch(
        addToHoldList({
          StockIDs: cartList.toString(),
          CustomerID: userData?.UserID,
          diamondType: diamondType,
        }),
      );
    }
  }, [dispatch, selectedDiamondList, userData, diamondType]);
  const onAddToWishHandler = useCallback(async () => {
    if (selectedDiamondList?.length > 0) {
      let wishList = selectedDiamondList?.map(item => item.Stock_ID);
      if (userData?.UserID) {
        const { payload } = await dispatch(
          addToWatchList({
            StockIDs: wishList.toString(),
            CustomerID: userData?.UserID,
            diamondType: diamondType,
            displayType: 'diamond',
          }),
        );
        if (payload?.data?.IsSuccess) {
          const newSearchDiamondFilterList2 = new Map(searchDiamondFilterList2);
          wishList?.forEach(item => {
            let diamondObj = newSearchDiamondFilterList2.get(item);
            newSearchDiamondFilterList2.set(item, {
              ...diamondObj,
              Is_Like: true,
              isCheck: !true,
            });
          });

          dispatch(setSearchDiamondFilterList2(newSearchDiamondFilterList2));
        }
      } else {
        const selectedDiamondData = selectedDiamondList?.map(item => {
          return { ...item, Is_Like: true };
        });
        dispatch(
          addToWishListInLocalList({
            diamondWishList: selectedDiamondData,
            diamondType: diamondType,
          }),
        );
        const newSearchDiamondFilterList2 = new Map(searchDiamondFilterList2);
        wishList?.forEach(item => {
          let diamondObj = newSearchDiamondFilterList2.get(item);
          newSearchDiamondFilterList2.set(item, {
            ...diamondObj,
            Is_Like: true,
            isCheck: !true,
          });
        });
        dispatch(setSearchDiamondFilterList2(newSearchDiamondFilterList2));
      }
    }
  }, [
    dispatch,
    selectedDiamondList,
    userData,
    diamondType,
    searchDiamondFilterList2,
    setSearchDiamondFilterList2,
  ]);

  const sortByOptionObj = useMemo(() => {
    const sortingValue = sortByOption?.find(
      item => item.value === searchDiamondSavedData.shortBy,
    );
    return sortingValue || null;
  }, [searchDiamondSavedData.shortBy]);

  return (
    <>
      <Row className="mb25 mb15-lg">
        <Col xxl={5}>
          <div className="filter_by_list mb10-xl">
            <ul>
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
              <li className="w-auto">
                <div className="diamond_sorting_wrap">
                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    className="form_group"
                  >
                    <Select
                      aria-label="Default select example"
                      className="react_custom_select_Wrapper square"
                      value={sortByOptionObj}
                      isSearchable={false}
                      options={sortByOption}
                      styles={customStyles}
                      isDisabled={searchDiamondFilterListLoading}
                      onChange={e => {
                        if (searchDiamondSavedData.shortBy !== e?.value) {
                          const newObjPayload = getPayload({
                            ...searchDiamondSavedData,
                            shortBy: e?.value,
                          });
                          dispatch(setSearchDiamondSavedData(newObjPayload));
                          setCurrentPage(0);
                          dispatch(
                            getSearchDiamondFilterList({
                              ...newObjPayload,
                              UserID: userData?.UserID ? userData.UserID : 0,
                              pageSize,
                              pageNum: 0,
                            }),
                          );
                        }
                      }}
                      placeholder="Sort By"
                    />
                  </Form.Group>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col xxl={7}>
          <ul className="action_button_wrap d-flex align-items-center justify-content-end">
            <li className="ml10 ml0-xl mrauto-xl w-auto">
              <Button
                variant="primary"
                onClick={exportHandleShow}
                className=" small_padding"
                disabled={searchDiamondFilterListLoading}
              >
                Export
              </Button>
            </li>
            <li className="ml10">
              <Button
                variant="outline-primary"
                className=" small_padding"
                onClick={() => onAddToCartHandler(selectedDiamondList)}
                disabled={selectedDiamondList?.length === 0 || addToCartLoading}
              >
                <img src={CartIcon} alt="" />{' '}
                <span className="d-md-block d-none">Add to cart</span>
              </Button>
            </li>
            {Object.keys(userData)?.length > 0 && (
              <li className="ml10">
                <Button
                  variant="outline-primary"
                  className=" small_padding"
                  onClick={onAddToHoldHandler}
                  disabled={
                    selectedDiamondList?.length === 0 || addToHoldLoading
                  }
                >
                  <img src={holdDiamondIcon} alt="" />
                  Confirm Availability
                </Button>
              </li>
            )}
            <li className="ml10">
              <Button
                variant="outline-primary"
                className=" small_padding"
                onClick={onAddToWishHandler}
                disabled={
                  selectedDiamondList?.length === 0 || addToWatchLoading
                }
              >
                <img src={HeartIcon} alt="" /> Add to wishlist
              </Button>
            </li>
          </ul>
        </Col>
      </Row>
      <Modal show={exportShow} onHide={exportHandleClose} centered>
        <Modal.Header closeButton>
          <h6 className="ff_Mulish">Export Type</h6>
        </Modal.Header>
        <Modal.Body>
          <div className=" radio_wrapper d-flex">
            <Form.Check
              type="radio"
              name="exportType"
              className="mr25 ff_Mulish"
              id="all"
              readOnly
              label="All"
              checked={exportType === 'all'}
              onClick={() => setExportType('all')}
            />
            <Form.Check
              type="radio"
              name="exportType"
              id="selected"
              readOnly
              disabled={selectedDiamondList?.length === 0}
              checked={exportType === 'selected'}
              onClick={() => setExportType('selected')}
              label="Selected"
              className="ff_Mulish"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            className=" small_padding"
            size="sm"
            onClick={exportHandleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className=" small_padding"
            size="sm"
            onClick={exportHandleSubmit}
          >
            Export
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default memo(DiamondTopButton);
