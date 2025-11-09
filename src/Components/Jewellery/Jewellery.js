import { getCartStockCount } from 'Components/Redux/reducers/dashboard.slice';
import {
  addToCartJewellery,
  getJewelleryFilterData,
  setIsAddToCartJewellery,
  setIsJewelleryGetApi,
  setIsModifySearchForJewellery,
  setJewelleryFilterDetailByHeader,
  setJewellerySearchStock,
} from 'Components/Redux/reducers/jewellery.slice';
import {
  addToWatchList,
  removeToWatchList,
} from 'Components/Redux/reducers/myAccount.slice';
import {
  addToCartListInLocalJewelery,
  addToWatchListInLocalJewelery,
  removeFromWishListInLocalJewelery,
} from 'Components/Redux/reducers/offlineList.slice';
import { initialValuesForJewellerySearch } from 'Helper/CommonHelper';
import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Form, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import FilterIcon from '../../Assets/Images/filter.svg';
import Grid from '../../Assets/Images/grid.svg';
import List from '../../Assets/Images/list.svg';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import JewelleryFilter from './JewelleryFilter';
import JewelleryList from './JewelleryList';
import { getJewelleryCategoryId } from 'Helper/CommonHelper';

const Jewellery = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();
  const {
    isJewelleryGetApi,
    jewelleryCategory,
    jewelleryBaseMetal,
    jewellerySearchStock = new Map(),
    isAddToCartJewellery,
    jewelleryCategoryDetail,
    jewelleryParameterDetail,
    jewelleryFilterDataLoader,
    isModifySearchForJewellery,
    jewelleryFilterDetailByHeader,
  } = useSelector(({ jewellery }) => jewellery);
  const navigate = useNavigate();
  const { userData } = useSelector(({ auth }) => auth);
  const { isAddToWatchList } = useSelector(({ myAccount }) => myAccount);
  const [filtershow, setFilterShow] = useState(false);
  const handleClose = () => setFilterShow(false);
  const handleShow = () => setFilterShow(true);
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [listGridInDiamond, setListGridInDiamond] = useState('Grid');
  const [jewelleryFilterData, setJewelleryFilterData] = useState(
    initialValuesForJewellerySearch,
  );

  useEffect(() => {
    if (jewelleryCategory?.length > 0) {
      setJewelleryFilterData(prevState => ({
        ...prevState,
        category_ID: getJewelleryCategoryId(jewelleryCategory, 'finejewellery'),
      }));
    }
  }, [jewelleryCategory]);

  const currentDataObj = useMemo(() => {
    let jewellerySearchStockData =
      jewellerySearchStock?.size > 0 ? [...jewellerySearchStock.values()] : [];
    let totalPages = 0;
    if (jewellerySearchStockData?.length > 0) {
      jewellerySearchStockData = jewellerySearchStockData?.slice(
        0 + (currentPage * pageSize - pageSize),
        currentPage * pageSize,
      );
      totalPages = Math.ceil(jewellerySearchStock.size / pageSize);
    }
    return { data: jewellerySearchStockData, totalRows: totalPages };
  }, [currentPage, pageSize, jewellerySearchStock]);

  useEffect(() => {
    if (
      Object.keys(jewelleryFilterDetailByHeader)?.length === 0 &&
      Object.keys(jewelleryFilterData)?.length > 0 &&
      jewelleryCategory?.length > 0 &&
      isJewelleryGetApi
    ) {
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          category_ID: getJewelleryCategoryId(
            jewelleryCategory,
            'finejewellery',
          ),
        }),
      );
    }
  }, [dispatch, jewelleryCategory]);

  useEffect(() => {
    if (
      Object.keys(jewelleryFilterDetailByHeader)?.length > 0 &&
      jewelleryCategory?.length > 0
    ) {
      if (isModifySearchForJewellery) {
        dispatch(setIsModifySearchForJewellery(false));
        setJewelleryFilterData(prevState => ({
          ...prevState,
          type_ID: jewelleryFilterDetailByHeader.type,
          sub_Type_ID: jewelleryFilterDetailByHeader.subType,
        }));
        dispatch(
          getJewelleryFilterData({
            ...jewelleryFilterData,
            type_ID: jewelleryFilterDetailByHeader.type,
            sub_Type_ID: jewelleryFilterDetailByHeader.subType,
            category_ID: getJewelleryCategoryId(
              jewelleryCategory,
              'finejewellery',
            ),
          }),
        );
        dispatch(setJewelleryFilterDetailByHeader({}));
      } else {
        setJewelleryFilterData({
          ...jewelleryFilterData,
          ...jewelleryFilterDetailByHeader,
        });
        // dispatch(
        //   getJewelleryFilterData({
        //     ...jewelleryFilterData,
        //     ...jewelleryFilterDetailByHeader,
        //     type_ID: jewelleryFilterDetailByHeader.type,
        //     sub_Type_ID: jewelleryFilterDetailByHeader.subType,
        //   }),
        // );
      }
    }
  }, [isModifySearchForJewellery, jewelleryCategory]);

  useEffect(() => {
    if (isAddToCartJewellery && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartJewellery(false));
    }
  }, [dispatch, isAddToCartJewellery, userData]);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const onClickJewelleryDetail = useCallback(
    stockId => {
      dispatch(setIsJewelleryGetApi(false));
      navigate(`/jewellery-detail?stockId=${stockId}`);
      dispatch(setJewelleryFilterDetailByHeader(jewelleryFilterData));
    },
    [dispatch, navigate, jewelleryFilterData],
  );

  const onSelectJewellery = useCallback(
    row => {
      const newJewelleryStockList = new Map(jewellerySearchStock);
      newJewelleryStockList.set(row.Packet_Id, {
        ...row,
        isCheck: !row.isCheck,
      });
      const newSelectedMixDiamondList = _.filter(
        [...newJewelleryStockList.values()],
        item => {
          if (item.isCheck) {
            return item;
          }
        },
      );
      
      dispatch(setJewellerySearchStock(newJewelleryStockList));
      // dispatch(setSelectedMixDiamondList(newSelectedMixDiamondList));
    },
    [dispatch, jewellerySearchStock],
  );

  const updateRowWatch = useCallback(
    (row, value) => {
      const newJewellerySearchStock = new Map(jewellerySearchStock);
      newJewellerySearchStock.set(row.Stock_ID, {
        ...row,
        Is_Like: value,
      });
      dispatch(setJewellerySearchStock(newJewellerySearchStock));
    },
    [dispatch, jewellerySearchStock],
  );

  const onClickToAddWatchList = useCallback(
    async row => {
      if (userData?.UserID) {
        if (row?.Is_Like) {
          let { payload } = await dispatch(
            removeToWatchList({
              StockIDs: row.Stock_ID.toString(),
              CustomerID: userData?.UserID,
            }),
          );
          payload?.data?.IsSuccess && updateRowWatch(row, !row.Is_Like);
        } else {
          let { payload } = await dispatch(
            addToWatchList({
              StockIDs: row.Stock_ID.toString(),
              CustomerID: userData?.UserID,
            }),
          );
          payload?.data?.IsSuccess && updateRowWatch(row, !row.Is_Like);
        }
      } else {
        if (row?.Is_Like) {
          dispatch(
            removeFromWishListInLocalJewelery({
              jeweleryList: [
                {
                  ...row,
                  Amount: row?.Sale_Rate ? row.Sale_Rate : 0,
                  Jewellery_Stock_ID: row?.Stock_ID ? row.Stock_ID : 0,
                  isOnlyJewellery: true,
                  Is_Like: !row.Is_Like,
                },
              ],
            }),
          );
          updateRowWatch(row, !row.Is_Like);
        } else {
          dispatch(
            addToWatchListInLocalJewelery({
              jeweleryList: {
                ...row,
                Amount: row?.Sale_Rate ? row.Sale_Rate : 0,
                Jewellery_Stock_ID: row?.Stock_ID ? row.Stock_ID : 0,
                isOnlyJewellery: true,
                Is_Like: !row.Is_Like,
              },
            }),
          );
          updateRowWatch(row, !row.Is_Like);
        }
      }
    },
    [dispatch, updateRowWatch, userData],
  );

  const addToCartJewelleryList = useCallback(
    jewelleryItem => {
      if (userData?.UserID) {
        dispatch(
          addToCartJewellery({
            ...jewelleryItem,
            Jewellery_Stock_ID: jewelleryItem?.Stock_ID
              ? jewelleryItem.Stock_ID
              : 0,
            userId: userData?.UserID,
            isOnlyJewellery: true,
          }),
        );
      } else {
        dispatch(
          addToCartListInLocalJewelery({
            jeweleryList: {
              ...jewelleryItem,
              Amount: jewelleryItem?.Sale_Rate ? jewelleryItem.Sale_Rate : 0,
              Jewellery_Stock_ID: jewelleryItem?.Stock_ID
                ? jewelleryItem.Stock_ID
                : 0,
              isOnlyJewellery: true,
            },
          }),
        );
      }
    },
    [dispatch, userData],
  );

  return (
    <main>
      <section className="jewellery_list_wrapper pt40 pb40-xl">
        <Container>
          <h3 className="text-center mb40 mb10-md ff_Title text-uppercase">
            Search for <span className="text_colorC">Jewellery</span>
          </h3>
          <Row>
            <Col xl={3} className="d-none d-xl-block">
              <JewelleryFilter
                jewelleryBaseMetal={jewelleryBaseMetal}
                jewelleryFilterData={jewelleryFilterData}
                setJewelleryFilterData={setJewelleryFilterData}
                jewelleryFilterCategory={jewelleryCategoryDetail}
                jewelleryParameterDetail={jewelleryParameterDetail}
                initialValuesForJewellerySearch={
                  initialValuesForJewellerySearch
                }
              />
            </Col>
            <Col xl={9} lg={12}>
              <Row className="align-items-end jewellery_top_Wrapper mb15">
                <Col sm={7}>
                  <div className="total_filter_button">
                    <p className="mb5 fs_16 text_dark mr20">
                      {jewellerySearchStock?.size > 0 && (
                        <span>
                          {' '}
                          {jewellerySearchStock?.size
                            ? jewellerySearchStock?.size
                            : 0}{' '}
                          Products found
                        </span>
                      )}
                    </p>
                    <div>
                      <div className="filter_by_list">
                        <ul className="flex-nowrap">
                          <li>
                            <div className="list_grid_button">
                              <Button
                                variant="outline-secondary"
                                className={
                                  listGridInDiamond === 'Grid' ? 'active' : ''
                                }
                                onClick={() => setListGridInDiamond('Grid')}
                              >
                                <img src={Grid} alt="" /> Visual
                              </Button>
                              <Button
                                variant="outline-secondary"
                                className={
                                  listGridInDiamond === 'List' ? 'active' : ''
                                }
                                onClick={() => setListGridInDiamond('List')}
                              >
                                <img src={List} alt="" /> List
                              </Button>
                            </div>
                          </li>
                          <li>
                            <div className="filter_button_wrap d-block d-xl-none">
                              <Button
                                variant="outline-secondary"
                                className="ff_Mulish text-nowrap"
                                onClick={handleShow}
                              >
                                <img
                                  src={FilterIcon}
                                  className="mr0 ml30 ml0-lg"
                                  alt=""
                                />
                              </Button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={5}>
                  <ul className="select_filter_wrap">
                    <li>
                      <div className="jewellery_sorting_wrap">
                        <Form.Group
                          controlId="exampleForm.ControlInput1"
                          className="form_group"
                        >
                          <Select
                            aria-label="Default select example"
                            className="react_custom_select_Wrapper square ff_Mulish"
                            value={jewelleryFilterData.sortBy}
                            isSearchable={false}
                            isDisabled={jewelleryFilterDataLoader}
                            options={[
                              { label: 'Price - Low to High', value: 'ASC' },
                              { label: 'Price - High to Low', value: 'DESC' },
                            ]}
                            onChange={e => {
                              if (
                                e.value !== jewelleryFilterData?.sortBy?.value
                              ) {
                                setJewelleryFilterData(prevState => ({
                                  ...prevState,
                                  sortBy: e,
                                }));
                                dispatch(
                                  getJewelleryFilterData({
                                    ...jewelleryFilterData,
                                    sortBy: e,
                                  }),
                                );
                              }
                            }}
                            placeholder="Sort By"
                            styles={{
                              option: (base, { isSelected }) => {
                                return {
                                  ...base,
                                  backgroundColor: isSelected
                                    ? '#be8d28'
                                    : '#fff',
                                  ':hover': {
                                    backgroundColor: 'rgb(200, 200, 200)',
                                  },
                                  color: '#000',
                                };
                              },
                            }}
                          />
                        </Form.Group>
                      </div>
                    </li>
                  </ul>
                </Col>
              </Row>
              <JewelleryList
                userData={userData}
                pageSize={pageSize}
                setPageSize={setPageSize}
                currentPage={currentPage}
                jewelType="jewellery_list"
                currentDataObj={currentDataObj}
                setCurrentPage={setCurrentPage}
                isAddToWatchList={isAddToWatchList}
                handleImageError={handleImageError}
                NoImageAvailable={NoImageAvailable}
                onSelectJewellery={onSelectJewellery}
                listGridInDiamond={listGridInDiamond}
                jewellerySearchStock={jewellerySearchStock}
                onClickToAddWatchList={onClickToAddWatchList}
                addToCartJewelleryList={addToCartJewelleryList}
                onClickJewelleryDetail={onClickJewelleryDetail}
                jewelleryFilterDataLoader={jewelleryFilterDataLoader}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Offcanvas show={filtershow} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <JewelleryFilter
            jewelleryBaseMetal={jewelleryBaseMetal}
            jewelleryFilterData={jewelleryFilterData}
            setJewelleryFilterData={setJewelleryFilterData}
            jewelleryFilterCategory={jewelleryCategoryDetail}
            jewelleryParameterDetail={jewelleryParameterDetail}
            initialValuesForJewellerySearch={initialValuesForJewellerySearch}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </main>
  );
};
export default memo(Jewellery);
