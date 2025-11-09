import { getMyOrderList } from 'Components/Redux/reducers/order.slice';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ViewCart from '../../Assets/Images/view-cart.svg';
import recordsNotFound from '../../Assets/Images/records-not-found1.png';
import AccountSidebar from './AccountSidebar';

const MyOrders = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const { myOrderList, myOrderListLoading } = useSelector(({ order }) => order);

  const [myOrderFilter, setMyOrderFilter] = useState({
    stoneNos: '',
    fromDate: '',
    toDate: '',
    orderType: '',
    sort: 'desc',
    diamondType: '',
  });
  useEffect(() => {
    if (userData?.UserID) {
      dispatch(getMyOrderList({ ...myOrderFilter, UserID: userData?.UserID }));
    }
  }, [dispatch, userData]);

  const orderTypeOption = [
    { label: 'Pending', value: 'pending' },
    { label: 'Cancel', value: 'cancel' },
    { label: 'Approved', value: 'approved' },
    { label: 'Approved (RFP)', value: 'approved (rfp)' },
    { label: 'Delivered', value: 'delivered' },
  ];

  const handleSubmit = useCallback(() => {
    dispatch(
      getMyOrderList({
        ...myOrderFilter,
        UserID: userData?.UserID,
        orderType: myOrderFilter.orderType ? myOrderFilter.orderType.value : '',
      }),
    );
  }, [dispatch, myOrderFilter, userData]);

  const myOrderListDetail = useMemo(() => {
    if (myOrderList?.length > 0) {
      return myOrderList.map((item, key) => {
        const {
          OrderNo,
          OrderDate,
          Total_Pcs,
          Final_Amt,
          Cancel_Amt,
          Payable_Amt,
          Shipping_Amt,
          _StatusColorCode,
          WebOrder_Status,
          WebOrder_ID,
        } = item;
        return (
          <tr key={`order_list_${key}`} className="center_all_td">
            <td>{OrderNo ? OrderNo : '-'}</td>
            <td>{OrderDate ? OrderDate : '-'}</td>
            <td>{Total_Pcs ? Total_Pcs : '-'}</td>
            <td>{Final_Amt ? Final_Amt : '-'}</td>
            <td>{Shipping_Amt ? `$ ${Shipping_Amt}` : '-'}</td>
            <td>{Payable_Amt ? `$ ${Payable_Amt}` : '-'}</td>
            <td>{Cancel_Amt ? `$ ${Cancel_Amt}` : '-'}</td>
            <td>
              <span
                className="badge"
                style={{
                  background: _StatusColorCode ? _StatusColorCode : '',
                }}
              >
                {WebOrder_Status ? WebOrder_Status : '-'}
              </span>
            </td>
            <td className="text-center view_img">
              <Link to={`/order-detail?orderId=${OrderNo}`}>
                <img src={ViewCart} alt="ViewCart" />
              </Link>
            </td>
          </tr>
        );
      });
    }
  }, [myOrderList]);

  return (
    <main>
      <section className="my_orders_wrapper pt50 pt10-lg pb100 pb50-md pb80-lg">
        <div className="px-3">
          <Row className="rowX">
            <Col xxl={2} lg={3}>
              <AccountSidebar />
            </Col>
            <Col xxl={10} lg={9}>
              <div className="my_order_wrap">
                <h6 className="mb30 mb15-xs ff_Mulish">My Order</h6>
                <div className="my_order_top mb-4">
                  <ul>
                    <li className="d-flex flex-column">
                      <label className="ff_Mulish">From</label>
                      <DatePicker
                        selected={myOrderFilter.fromDate}
                        onChange={date => {
                          setMyOrderFilter({
                            ...myOrderFilter,
                            fromDate: date,
                            toDate:
                              myOrderFilter.toDate &&
                              date > myOrderFilter.toDate
                                ? null
                                : myOrderFilter.toDate,
                          });
                        }}
                        selectsStart
                        startDate={myOrderFilter.fromDate}
                        endDate={myOrderFilter.toDate}
                        maxDate={myOrderFilter.toDate || new Date()}
                        placeholderText="From"
                        className="form-control"
                      />
                    </li>
                    <li className="d-flex flex-column">
                      <label className="ff_Mulish">To</label>
                      <DatePicker
                        selected={myOrderFilter.toDate}
                        onChange={date =>
                          setMyOrderFilter({
                            ...myOrderFilter,
                            toDate: date,
                          })
                        }
                        selectsEnd
                        startDate={myOrderFilter.fromDate}
                        endDate={myOrderFilter.toDate}
                        minDate={myOrderFilter.fromDate}
                        maxDate={new Date()}
                        placeholderText="To"
                        className="form-control" // Bootstrap class
                      />
                    </li>
                    <li className="custom_status">
                      <label className="ff_Mulish">Status</label>
                      <Select
                        aria-label="Default select example"
                        className="react_custom_select_Wrapper square ff_Mulish"
                        value={myOrderFilter.orderType}
                        onChange={e => {
                          setMyOrderFilter({
                            ...myOrderFilter,
                            orderType: e,
                          });
                        }}
                        options={orderTypeOption}
                        placeholder="Status"
                        styles={{
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
                        }}
                      />
                    </li>
                    <li>
                      <label className="ff_Mulish">Order No.</label>
                      <Form.Control
                        type="text"
                        name="orderNo"
                        value={myOrderFilter.stoneNos}
                        onChange={e =>
                          setMyOrderFilter({
                            ...myOrderFilter,
                            stoneNos: e.target.value,
                          })
                        }
                      />
                    </li>
                    <li>
                      <Button
                        variant="primary"
                        size="sm"
                        className="btn_shadow"
                        onClick={handleSubmit}
                      >
                        Search
                      </Button>
                    </li>
                  </ul>
                </div>
                {myOrderListLoading && (
                  <div className="product_list_wrapper my_order_table_wrap">
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr className="center_all_td">
                            <th>Order No.</th>
                            <th>Date</th>
                            <th>Total Items</th>
                            <th>Total Amt</th>
                            <th>Shipping Amt</th>
                            <th>Payable Amt</th>
                            <th>Cancel Amt</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={9} style={{ paddingRight: '10px' }}>
                              <div className="skelleton_Wrapper">
                                <Skeleton
                                  height={60}
                                  count={6}
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
                  </div>
                )}
                {myOrderList?.length > 0 && (
                  <div className="product_list_wrapper my_order_table_wrap">
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr className="center_all_td">
                            <th>Order No.</th>
                            <th>Date</th>
                            <th>Total Items</th>
                            <th>Total Amt</th>
                            <th>Shipping Amt</th>
                            <th>Payable Amt</th>
                            <th>Cancel Amt</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{myOrderListDetail}</tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              {!myOrderListLoading && myOrderList?.length === 0 && (
                <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
                  <img src={recordsNotFound} alt="Records Not Found" />
                  <h4 className="ff_Mulish">Data Not Found</h4>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </section>
    </main>
  );
};
export default memo(MyOrders);
