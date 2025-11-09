import {
  setIsModifySearchForDiamond,
  setIsRefreshSearchApi,
  setSearchDiamondFilterList2,
  setSearchDiamondSavedData,
  setSelectedDiamondList,
} from 'Components/Redux/reducers/dashboard.slice';
import {
  addToCartList,
  getWatchStockListCount,
  setIsAddToWatchList,
} from 'Components/Redux/reducers/myAccount.slice';
import { addToCartListInLocal } from 'Components/Redux/reducers/offlineList.slice';
import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import compareIcon from '../../Assets/Images/compare.svg';
import DiamondGridView from './DiamondGridView';
import DiamondListView from './DiamondListView';
import DiamondSearch from './DiamondSearch/index.js';
import DiamondTopButton from './DiamondTopButton';
import { addToCartJewellery } from 'Components/Redux/reducers/jewellery.slice';

const Diamond = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isRefreshSearchApi,
    selectedDiamondList,
    searchResultTotalRows,
    searchDiamondSavedData,
    searchResultTotalRecords,
    searchDiamondFilterListLoading,
    searchDiamondFilterList2 ,
  } = useSelector(({ dashboard }) => dashboard);
  const data = useSelector(({ dashboard }) => dashboard);
  
  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const { diamondType } = useSelector(({ offlineList }) => offlineList);
  const [isSearchDiamond, setIsSearchDiamond] = useState(false);
  const { diamondFilterDetail, diamondDetailListLoading } = useSelector(
    ({ common }) => common,
  );
  const isAddToWatchList = useSelector(({ myAccount }) => myAccount);
  console.log("isAddToWatchList",isAddToWatchList);
  const [listGridInDiamond, setListGridInDiamond] = useState('Grid');
  const diamondTableRef = useRef(null);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToWatchList(false));
    }
  }, [dispatch, userData, isAddToWatchList]);

  const onSelectDiamond = useCallback(
    row => {
      const newSearchDiamondFilterList2 = new Map(searchDiamondFilterList2);
      newSearchDiamondFilterList2.set(row.Stock_ID, {
        ...row,
        isCheck: !row.isCheck,
      });
      const newSelectedDiamondList = _.filter(
        [...newSearchDiamondFilterList2.values()],
        item => {
          if (item.isCheck) {
            return item;
          }
        },
      );
      console.log("newSearchDiamondFilterList2",diamondType);
      
      dispatch(setSearchDiamondFilterList2(newSearchDiamondFilterList2));
      dispatch(setSelectedDiamondList(newSelectedDiamondList));
    },
    [dispatch, searchDiamondFilterList2],
  );

  const onExpandDiamond = useCallback(
    row => {
      const newSearchDiamondFilterList2 = new Map(searchDiamondFilterList2);
      newSearchDiamondFilterList2.set(row.Stock_ID, {
        ...row,
        isExpanded: !row.isExpanded,
      });
      dispatch(setSearchDiamondFilterList2(newSearchDiamondFilterList2));
    },
    [dispatch, searchDiamondFilterList2],
  );
  
  const currentData = useMemo(() => {
    return  [...searchDiamondFilterList2.values()]
  }, [searchDiamondFilterList2]);

  const onClickToDiamondDetail = useCallback(
    (Stone_No, Diamond_Type) => {
      if (Stone_No && Diamond_Type) {
        navigate(
          `/diamond-detail?stoneNo=${Stone_No}&diamondType=${Diamond_Type}`,
          {
            state: {
              callbackUrl: `${location.pathname}${location.search}`,
            },
          },
        );
      }
      dispatch(setIsModifySearchForDiamond(true));
      dispatch(setIsRefreshSearchApi(false));
    },
    [dispatch, navigate, location],
  );

  const onAddToCartHandler = useCallback(
    async cartListData => {
      if (cartListData?.length > 0) {
        let cartList = cartListData?.map(item => item.Stock_ID);
        if (userData?.UserID) {
          await dispatch(
            addToCartJewellery({
              Jewellery_Stock_ID: cartList.toString(),
              Cust_ID: userData?.UserID,
              diamondType: diamondType,
            }),
          );
        } else {
          await dispatch(
            addToCartListInLocal({
              diamondCartList: cartListData,
              diamondType: diamondType,
            }),
          );
        }
      }
    },
    [dispatch, userData, diamondType],
  );

  return (
    <main>
      <section className="diamond_search_wrapper bg_light pt40 pb40 pb20-xl pt20-xl">
        <Container>
          <h3 className="text-center mb40 mb15-lg ff_Title text-uppercase">
            Search for <span className="text_colorC">Diamonds</span>
          </h3>
          <DiamondSearch
            pageSize={pageSize}
            userData={userData}
            isSettingWise={false}
            diamondType={diamondType}
            setCurrentPage={setCurrentPage}
            diamondTableRef={diamondTableRef}
            isRefreshSearchApi={isRefreshSearchApi}
            setIsSearchDiamond={setIsSearchDiamond}
            diamondFilterDetail={diamondFilterDetail}
            setIsRefreshSearchApi={setIsRefreshSearchApi}
            searchDiamondSavedData={searchDiamondSavedData}
            diamondDetailListLoading={diamondDetailListLoading}
            setIsModifySearchForDiamond={setIsModifySearchForDiamond}
            searchDiamondFilterListLoading={searchDiamondFilterListLoading}
          />
        </Container>
      </section>
      <div
        ref={diamondTableRef}
        className={
          listGridInDiamond === 'Grid'
            ? 'diamond_grid_wrapper pt30 pt15-lg pb10'
            : 'diamond_grid_wrapper diamond_list_wrapper pt30 pt15-lg pb10'
        }
      >
        <Container>
          <Row>
            <Col xl={12} lg={12}>
              <DiamondTopButton
                pageSize={pageSize}
                userData={userData}
                diamondType={diamondType}
                setCurrentPage={setCurrentPage}
                listGridInDiamond={listGridInDiamond}
                onAddToCartHandler={onAddToCartHandler}
                selectedDiamondList={selectedDiamondList}
                setListGridInDiamond={setListGridInDiamond}
                searchDiamondSavedData={searchDiamondSavedData}
                searchDiamondFilterList2={searchDiamondFilterList2}
                setSearchDiamondSavedData={setSearchDiamondSavedData}
                setSearchDiamondFilterList2={setSearchDiamondFilterList2}
                searchDiamondFilterListLoading={searchDiamondFilterListLoading}
              />
              <div className="product_list_grid_wrapper">
                {listGridInDiamond === 'Grid' ? (
                  <DiamondGridView
                    userData={userData}
                    pageSize={pageSize}
                    currentData={currentData}
                    setPageSize={setPageSize}
                    currentPage={currentPage}
                    diamondType={diamondType}
                    redirectUrl={'/diamond-detail'}
                    setCurrentPage={setCurrentPage}
                    diamondTableRef={diamondTableRef}
                    onSelectDiamond={onSelectDiamond}
                    isSearchDiamond={isSearchDiamond}
                    onAddToCartHandler={onAddToCartHandler}
                    searchResultTotalRows={searchResultTotalRows}
                    searchDiamondSavedData={searchDiamondSavedData}
                    onClickToDiamondDetail={onClickToDiamondDetail}
                    searchResultTotalRecords={searchResultTotalRecords}
                    searchDiamondFilterList2={searchDiamondFilterList2}
                    setSearchDiamondFilterList2={setSearchDiamondFilterList2}
                    searchDiamondFilterListLoading={
                      searchDiamondFilterListLoading
                    }
                  />
                ) : (
                  <DiamondListView
                    isViewCheckBox={true}
                    currentData={currentData}
                    userData={userData}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    currentPage={currentPage}
                    diamondType={diamondType}
                    setCurrentPage={setCurrentPage}
                    diamondTableRef={diamondTableRef}
                    onSelectDiamond={onSelectDiamond}
                    isSearchDiamond={isSearchDiamond}
                    onExpandDiamond={onExpandDiamond}
                    searchResultTotalRows={searchResultTotalRows}
                    onClickToDiamondDetail={onClickToDiamondDetail}
                    searchDiamondSavedData={searchDiamondSavedData}
                    searchResultTotalRecords={searchResultTotalRecords}
                    searchDiamondFilterListLoading={
                      searchDiamondFilterListLoading
                    }
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="compare_button d-none d-sm-block"
        onClick={() => navigate('/compare')}
      >
        <span>Compare</span> <img src={compareIcon} alt="" />
      </div>
    </main>
  );
};
export default memo(Diamond);
