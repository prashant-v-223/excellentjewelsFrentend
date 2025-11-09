import {
  getWatchStockListCount,
  setIsAddToWatchList,
} from 'Components/Redux/reducers/myAccount.slice';
import { memo, useEffect, useMemo } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import LeftAngle from '../../Assets/Images/left-angle.svg';
import recordsNotFound from '../../Assets/Images/records-not-found1.png';
import RightAngle from '../../Assets/Images/right-angle.svg';
import JewelleryGridView from './JewelleryGridView';
import { JewelleryListView } from './JewelleryListView';
import { OptimizedImage } from 'utils/performanceUtils';

const JewelleryList = ({
  userData,
  pageSize,
  jewelType,
  currentPage,
  setPageSize,
  currentDataObj,
  setCurrentPage,
  isAddToWatchList,
  handleImageError,
  NoImageAvailable,
  onSelectJewellery,
  listGridInDiamond,
  jewellerySearchStock,
  onClickToAddWatchList,
  addToCartJewelleryList,
  onClickJewelleryDetail,
  jewelleryFilterDataLoader,
  onSelectJewelleryForSetting,
}) => {
  const dispatch = useDispatch();
  const { addToWatchLoading } = useSelector(({ myAccount }) => myAccount);
  const { addToCartJewelleryLoading } = useSelector(
    ({ jewellery }) => jewellery,
  );
  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToWatchList(false));
    }
  }, [dispatch, userData, isAddToWatchList]);

  const loadingJewelleryGridView = useMemo(() => {
    let arr = [];
    for (let i = 0; i <= 9; i++) {
      arr.push(
        <Col
          xl={jewelType === 'choose_setting' ? '3' : '4'}
          lg={4}
          sm={6}
          key={`jewellery_skeleton_${i}`}
          className="jewellery_item_col"
        >
          <div className="jewellery_box_wrapper jewellery_skeleton_Wrappper">
            <div className="jewellery_img_wrapper">
              <Skeleton height={299} />
            </div>
            <div className="jewellery_detail_text">
              <Skeleton height={42} />
              <Skeleton
                height={22}
                style={{ width: '60%', marginBottom: '10px' }}
              />
              <Skeleton height={44} style={{ width: '80%' }} />
            </div>
          </div>
        </Col>,
      );
    }
    return arr;
  }, [jewelType]);

  const loadingJewelleryListView = useMemo(() => {
    return (
      <div className="product_list_wrapper mt-0">
        <div className="table-responsive">
          <table>
            <thead>
              <tr className="center_all_td">
                <th>Stock No</th>
                <th>Image</th>
                <th>Type</th>
                <th>Sub Type</th>
                <th>Metal</th>
                <th>Gross Weight</th>
                <th>Net Weight</th>
                <th>Total Diamond Weight</th>
                <th>Price</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={10} style={{ paddingRight: '10px' }}>
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

  return (
    <div className="jewellery_main_Wrapper">
      <Row className="g-4 rowX mt-0">
        {listGridInDiamond === 'List' ? (
          <>
            {jewelleryFilterDataLoader && loadingJewelleryListView}
            {currentDataObj?.data?.length > 0 && (
              <JewelleryListView
                currentData={currentDataObj.data}
                handleImageError={handleImageError}
                NoImageAvailable={NoImageAvailable}
                onSelectJewellery={onSelectJewellery}
                onClickJewelleryDetail={onClickJewelleryDetail}
              />
            )}
          </>
        ) : (
          <>
            {jewelleryFilterDataLoader && loadingJewelleryGridView}
            {currentDataObj?.data?.length > 0 && (
              <JewelleryGridView
                jewelType={jewelType}
                currentData={currentDataObj.data}
                handleImageError={handleImageError}
                addToWatchLoading={addToWatchLoading}
                onSelectJewellery={onSelectJewellery}
                onClickToAddWatchList={onClickToAddWatchList}
                addToCartJewelleryList={addToCartJewelleryList}
                onClickJewelleryDetail={onClickJewelleryDetail}
                addToCartJewelleryLoading={addToCartJewelleryLoading}
                onSelectJewelleryForSetting={onSelectJewelleryForSetting}
              />
            )}
          </>
        )}
      </Row>
      {currentDataObj?.data?.length > 0 && (
        <div className="pagination_Wrapper mt20">
          <Row className="align-items-center">
            <Col md={4}>
              <p className="m0">
                Displaying {currentPage} to {currentDataObj?.totalRows} of{' '}
                {jewellerySearchStock?.size || 0} items
              </p>
            </Col>
            <Col md={8}>
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
                          }
                        }}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </li>
                <li>
                  <div className="total_row">
                    <p>
                      {(currentPage - 1) * pageSize + 1}-
                      {currentPage * pageSize} of{' '}
                      <span>{jewellerySearchStock?.size || 0}</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="next_prev_page">
                    <Button variant="light" disabled={currentPage === 1}>
                      <img
                        src={LeftAngle}
                        alt="LeftAngle"
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(prevState => prevState - 1);
                          }
                        }}
                      />
                    </Button>
                    <Button
                      variant="light"
                      disabled={currentDataObj?.totalRows === currentPage}
                    >
                      <img
                        src={RightAngle}
                        alt="RightAngle"
                        onClick={() => {
                          if (currentPage < currentDataObj?.totalRows) {
                            setCurrentPage(prevState => prevState + 1);
                          }
                        }}
                      />
                    </Button>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      )}
      {!jewelleryFilterDataLoader && currentDataObj?.data?.length === 0 && (
        <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
          <img src={recordsNotFound} alt="Records Not Found" />
          <h4 className="ff_Mulish">Data Not Found</h4>
        </div>
      )}
    </div>
  );
};
export default memo(JewelleryList);
