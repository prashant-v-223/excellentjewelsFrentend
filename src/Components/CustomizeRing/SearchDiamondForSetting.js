import _ from 'lodash';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DiamondSearch from '../Diamond/DiamondSearch/index.js';
// import Grid from '../../Assets/Images/grid.svg';
// import List from '../../Assets/Images/list.svg';
import DiamondGridView from 'Components/Diamond/DiamondGridView.js';
import {
  getStockDetailDna,
  setIsModifySearchForDiamond,
  setIsRefreshSearchApi,
  setSelectedDiamondList,
} from 'Components/Redux/reducers/dashboard.slice';
import {
  getSearchDiamondFilterList,
  setSearchDiamondSavedData,
} from 'Components/Redux/reducers/dashboard.slice.js';
import { getPayload } from 'Helper/CommonHelper.js';
import Select from 'react-select';

const sortByOption = [
  { label: 'Price - Low to High', value: '1' },
  { label: 'Price - High to Low', value: '2' },
  { label: 'Size - Low to High', value: '3' },
  { label: 'Size - High to Low', value: '4' },
];

const SearchDiamondForSetting = ({
  userData,
  dispatch,
  setChooseStepSelect,
  setSearchDiamondFilterList2,
}) => {
  const diamondTableRef = useRef(null);
  const { diamondType } = useSelector(({ offlineList }) => offlineList);
  const { isDiamondSearchSettingWise } = useSelector(({ setting }) => setting);
  const { diamondFilterDetail, diamondDetailListLoading } = useSelector(
    ({ common }) => common,
  );
  const {
    isRefreshSearchApi,
    searchResultTotalRows,
    searchDiamondSavedData,
    searchResultTotalRecords,
    searchDiamondFilterListLoading,
    searchDiamondFilterList2 = new Map(),
  } = useSelector(({ dashboard }) => dashboard);

  const [isSearchDiamond, setIsSearchDiamond] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);
  // const [listGrid, setListGrid] = useState('Grid');

  const currentData = useMemo(() => {
    return searchDiamondFilterList2?.size > 0
      ? [...searchDiamondFilterList2.values()]
      : [];
  }, [searchDiamondFilterList2]);
  console.log("currentDat222a",currentData,searchDiamondFilterList2.values());
  

  /*   const displayVieweType = useMemo(() => {
    return (
      <Row className="mb25">
        <Col xxl={5}>
          <div className="filter_by_list mb20-xl">
            <ul>
              <li>
                <div className="list_grid_button">
                  <Button
                    variant="outline-secondary"
                    className={listGrid === 'Grid' ? 'active' : ''}
                    onClick={() => setListGrid('Grid')}
                  >
                    <img src={Grid} alt="Grid" /> Visual
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className={listGrid === 'List' ? 'active' : ''}
                    onClick={() => setListGrid('List')}
                  >
                    <img src={List} alt="List" /> List
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    );
  }, [listGrid]); */

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
      dispatch(setSearchDiamondFilterList2(newSearchDiamondFilterList2));
      dispatch(setSelectedDiamondList(newSelectedDiamondList));
    },
    [dispatch, searchDiamondFilterList2, setSearchDiamondFilterList2],
  );

  const onSelectDiamondForSetting = useCallback(
    async (stoneNoValue, diamondTypeValue) => {
      if (stoneNoValue && diamondTypeValue) {
        dispatch(setIsRefreshSearchApi(false));
        dispatch(
          setChooseStepSelect(
            window.location.pathname === '/setting-diamond-wise' ? 2 : 4,
          ),
        );
        dispatch(setIsModifySearchForDiamond(true));
        await dispatch(
          getStockDetailDna({
            StoneNo: stoneNoValue,
            UserID: userData?.UserID ? userData.UserID : 0,
          }),
        );
      }
    },
    [dispatch, userData, setChooseStepSelect],
  );

  /*  const onExpandDiamond = useCallback(
    row => {
      const newSearchDiamondFilterList2 = new Map(searchDiamondFilterList2);
      newSearchDiamondFilterList2.set(row.Stock_ID, {
        ...row,
        isExpanded: !row.isExpanded,
      });
      dispatch(setSearchDiamondFilterList2(newSearchDiamondFilterList2));
    },
    [dispatch, searchDiamondFilterList2, setSearchDiamondFilterList2],
  ); */

  const sortByOptionObj = useMemo(() => {
    const sortingValue = sortByOption?.find(
      item => item.value === searchDiamondSavedData.shortBy,
    );
    return sortingValue || null;
  }, [searchDiamondSavedData.shortBy]);

  return (
    <>
      <section className="diamond_search_wrapper bg_light pt40 pb40 pt20-xl pb20-xl">
        <Container>
          <DiamondSearch
            pageSize={pageSize}
            userData={userData}
            isSettingWise={isDiamondSearchSettingWise}
            diamondType={diamondType}
            setCurrentPage={setCurrentPage}
            diamondTableRef={diamondTableRef}
            setIsSearchDiamond={setIsSearchDiamond}
            isRefreshSearchApi={isRefreshSearchApi}
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
        /* className={
          listGrid === 'Grid'
            ? 'diamond_grid_wrapper pt30 pb10'
            : 'diamond_grid_wrapper diamond_list_wrapper pt30 pb10'
        } */
      >
        <Container>
          <Row>
            <Col xl={12} lg={12}>
              <div className="filter_by_list mb25 mb10-lg mt10-lg mt25">
                <ul className="justify-content-end">
                  <li>
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
                          onChange={e => {
                            if (searchDiamondSavedData.shortBy !== e?.value) {
                              const newObjPayload = getPayload({
                                ...searchDiamondSavedData,
                                shortBy: e?.value,
                              });
                              dispatch(
                                setSearchDiamondSavedData(newObjPayload),
                              );
                              setCurrentPage(0);
                              dispatch(
                                getSearchDiamondFilterList({
                                  ...newObjPayload,
                                  UserID: userData?.UserID
                                    ? userData.UserID
                                    : 0,
                                  pageSize,
                                  pageNum: 0,
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
              </div>
              {/* {displayVieweType} */}
              <div className="product_list_grid_wrapper pt10">
                {/* {listGrid === 'Grid' ? ( */}
                <DiamondGridView
                  redirectUrl={'/choose-diamond-detail'}
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
                  searchResultTotalRows={searchResultTotalRows}
                  searchDiamondSavedData={searchDiamondSavedData}
                  searchResultTotalRecords={searchResultTotalRecords}
                  searchDiamondFilterList2={searchDiamondFilterList2}
                  onSelectDiamondForSetting={onSelectDiamondForSetting}
                  setSearchDiamondFilterList2={setSearchDiamondFilterList2}
                  searchDiamondFilterListLoading={
                    searchDiamondFilterListLoading
                  }
                />
                {/*  ) : (
                <DiamondListView
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
                  searchDiamondSavedData={searchDiamondSavedData}
                  searchResultTotalRecords={searchResultTotalRecords}
                  onSelectDiamondForSetting={onSelectDiamondForSetting}
                  searchDiamondFilterListLoading={
                    searchDiamondFilterListLoading
                  }
                />
                )} */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default memo(SearchDiamondForSetting);
