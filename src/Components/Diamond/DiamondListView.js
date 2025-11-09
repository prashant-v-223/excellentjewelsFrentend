import React, { memo } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import LeftAngle from '../../Assets/Images/left-angle.svg';
import RightAngle from '../../Assets/Images/right-angle.svg';
import { getSearchDiamondFilterList } from 'Components/Redux/reducers/dashboard.slice';
import { useDispatch } from 'react-redux';
import DiamondListTableData from './DiamondListTableData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import recordsNotFound from '../../Assets/Images/records-not-found1.png';
import { useLocation } from 'react-router-dom';

const DiamondListView = ({
  currentData,
  userData,
  pageSize,
  setPageSize,
  currentPage,
  diamondType,
  isViewCheckBox,
  setCurrentPage,
  diamondTableRef,
  onExpandDiamond,
  onSelectDiamond,
  isSearchDiamond,
  searchResultTotalRows,
  onClickToDiamondDetail,
  searchDiamondSavedData,
  searchResultTotalRecords,
  onSelectDiamondForSetting,
  searchDiamondFilterListLoading,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <div className="product_list_wrapper">
      {currentData?.length > 0 && (
        <>
          <div className="table-responsive">
            <DiamondListTableData
              currentData={currentData}
              diamondType={diamondType}
              location={location}
              isViewCheckBox={isViewCheckBox}
              onSelectDiamond={onSelectDiamond}
              onExpandDiamond={onExpandDiamond}
              onClickToDiamondDetail={onClickToDiamondDetail}
              onSelectDiamondForSetting={onSelectDiamondForSetting}
            />
          </div>
          <div className="pagination_Wrapper">
            <Row className="align-items-center">
              <Col sm={3}>
                <p className="m0">
                  Displaying {currentPage + 1} to {searchResultTotalRows} of{' '}
                  {searchResultTotalRecords} items
                </p>
              </Col>
              <Col sm={9}>
                <ul>
                  <li>
                    <div className="row_per_page">
                      <span>Rows per page</span>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Select
                          aria-label="Default select example"
                          value={pageSize}
                          onChange={e => {
                            if (pageSize !== Number(e.target.value)) {
                              setPageSize(Number(e.target.value));
                              setCurrentPage(1);
                              dispatch(
                                getSearchDiamondFilterList({
                                  ...searchDiamondSavedData,
                                  UserID: userData?.UserID
                                    ? userData.UserID
                                    : 0,
                                  pageSize: Number(e.target.value),
                                  pageNum: 0,
                                }),
                              );
                              window.scrollTo({
                                top: diamondTableRef.current.offsetTop,
                                behavior: 'smooth',
                              });
                            }
                          }}
                        >
                          <option value="100">100</option>
                          <option value="500">500</option>
                          <option value="1000">1000</option>
                          <option value="2000">2000</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </li>
                  <li>
                    <div className="total_row">
                      <p>
                        {currentPage * pageSize + 1}-
                        {(currentPage + 1) * pageSize} of{' '}
                        <span>{searchResultTotalRecords}</span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="next_prev_page">
                      <Button
                        variant="light"
                        disabled={currentPage === 0}
                        onClick={() => {
                          if (currentPage > 0) {
                            setCurrentPage(currentPage - 1);
                            dispatch(
                              getSearchDiamondFilterList({
                                ...searchDiamondSavedData,
                                UserID: userData?.UserID ? userData.UserID : 0,
                                pageSize: pageSize,
                                pageNum: currentPage - 1,
                              }),
                            );
                            window.scrollTo({
                              top: diamondTableRef.current.offsetTop,
                              behavior: 'smooth',
                            });
                          }
                        }}
                      >
                        <img src={LeftAngle} alt="" />
                      </Button>
                      <Button
                        variant="light"
                        disabled={searchResultTotalRows === currentPage + 1}
                        onClick={() => {
                          if (currentPage < searchResultTotalRecords) {
                            setCurrentPage(currentPage + 1);
                            dispatch(
                              getSearchDiamondFilterList({
                                ...searchDiamondSavedData,
                                UserID: userData?.UserID ? userData.UserID : 0,
                                pageSize: pageSize,
                                pageNum: currentPage + 1,
                              }),
                            );
                            window.scrollTo({
                              top: diamondTableRef.current.offsetTop,
                              behavior: 'smooth',
                            });
                          }
                        }}
                      >
                        <img src={RightAngle} alt="" />
                      </Button>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </>
      )}
      {searchDiamondFilterListLoading && (
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
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {isSearchDiamond &&
        !searchDiamondFilterListLoading &&
        currentData.length === 0 && (
          <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
            <img src={recordsNotFound} alt="Records Not Found" />
            <h4 className="ff_Mulish">Data Not Found</h4>
          </div>
        )}
    </div>
  );
};
export default memo(DiamondListView);
