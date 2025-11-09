import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AccountSidebar from './AccountSidebar';
import CartProduct from '../../Assets/Images/cart-product.jpg';
import Info from '../../Assets/Images/info-circle.svg';
import Delivery from '../../Assets/Images/delivery.svg';
import Return from '../../Assets/Images/return.svg';
import ArrowUp from '../../Assets/Images/arrow-up.svg';
import VisaCard from '../../Assets/Images/visa-card.png';
import { OptimizedImage } from 'utils/performanceUtils';

const TrackMyOrder = () => {
  return (
    <main>
      <section className="take_my_ordeR_wrapper pb100 pb10-md pb80-lg">
        <Container>
          <Row>
            <Col xxl={2} lg={3}>
              <AccountSidebar />
            </Col>
            <Col xxl={10} lg={9}>
              <h6>Track my order</h6>
              <div className="track_process_wrap mt30 mt20-xs">
                <ul>
                  <li className="done">
                    <div className="process_step">
                      <span>Order Confirmed</span>
                      <h6>Wed, 1 lth Jan</h6>
                    </div>
                  </li>
                  <li className="active">
                    <div className="process_step">
                      <span>Shipped</span>
                      <h6>Wed, 1 lth Jan</h6>
                    </div>
                  </li>
                  <li>
                    <div className="process_step">
                      <span>Out Foe Delivery</span>
                      <h6>Wed, 1 lth Jan</h6>
                    </div>
                  </li>
                  <li>
                    <div className="process_step">
                      <span>Delivered </span>
                      <h6>Wed, 1 lth Jan</h6>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order_list_wrap order_light_box">
                <div className="diamond_cart_box">
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <div className="diamond_product_info">
                        <div className="diamond_img_cart">
                          <img src={CartProduct} alt="" />
                        </div>
                        <div className="diamond_text_cart">
                          <p className="fs_14 m0 text_extra_light">
                            0.30 Carat - K - VS1
                          </p>
                          <h6 className="text_dark mb5">Good Cut- Round</h6>
                          <h5 className="m0 text_dark fs_14">
                            IGI Number
                            <span className="text_extra_light ml15">
                              4578325414
                            </span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="diamond_cart_total_wrap justify-content-end">
                        <div className="diamond_cart_total">
                          <h5 className="text_colorC d-flex align-items-center justify-content-sm-end">
                            $350{' '}
                            <span className="text_dark fs_14 ml10">
                              18% below market
                            </span>
                          </h5>
                          <p className="m0 fs_16 text-sm-end">Quantity : 1</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="diamond_cart_box">
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <div className="diamond_product_info">
                        <div className="diamond_img_cart">
                          <img src={CartProduct} alt="" />
                        </div>
                        <div className="diamond_text_cart">
                          <p className="fs_14 m0 text_extra_light">
                            0.30 Carat - K - VS1
                          </p>
                          <h6 className="text_dark mb5">Good Cut- Round</h6>
                          <h5 className="m0 text_dark fs_14">
                            IGI Number
                            <span className="text_extra_light ml15">
                              4578325414
                            </span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="diamond_cart_total_wrap justify-content-end">
                        <div className="diamond_cart_total">
                          <h5 className="text_colorC d-flex align-items-center justify-content-sm-end">
                            $350{' '}
                            <span className="text_dark fs_14 ml10">
                              18% below market
                            </span>
                          </h5>
                          <p className="m0 fs_16 text-sm-end">Quantity : 1</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="diamond_cart_box">
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <div className="diamond_product_info">
                        <div className="diamond_img_cart">
                          <img src={CartProduct} alt="" />
                        </div>
                        <div className="diamond_text_cart">
                          <p className="fs_14 m0 text_extra_light">
                            0.30 Carat - K - VS1
                          </p>
                          <h6 className="text_dark mb5">Good Cut- Round</h6>
                          <h5 className="m0 text_dark fs_14">
                            IGI Number
                            <span className="text_extra_light ml15">
                              4578325414
                            </span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="diamond_cart_total_wrap justify-content-end">
                        <div className="diamond_cart_total">
                          <h5 className="text_colorC d-flex align-items-center justify-content-sm-end">
                            $350{' '}
                            <span className="text_dark fs_14 ml10">
                              18% below market
                            </span>
                          </h5>
                          <p className="m0 fs_16 text-sm-end">Quantity : 1</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="diamond_cart_box">
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <div className="diamond_product_info">
                        <div className="diamond_img_cart">
                          <img src={CartProduct} alt="" />
                        </div>
                        <div className="diamond_text_cart">
                          <p className="fs_14 m0 text_extra_light">
                            0.30 Carat - K - VS1
                          </p>
                          <h6 className="text_dark mb5">Good Cut- Round</h6>
                          <h5 className="m0 text_dark fs_14">
                            IGI Number
                            <span className="text_extra_light ml15">
                              4578325414
                            </span>
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="diamond_cart_total_wrap justify-content-end">
                        <div className="diamond_cart_total">
                          <h5 className="text_colorC d-flex align-items-center justify-content-sm-end">
                            $350{' '}
                            <span className="text_dark fs_14 ml10">
                              18% below market
                            </span>
                          </h5>
                          <p className="m0 fs_16 text-sm-end">Quantity : 1</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="order_payment_wrap border_bottom mb25">
                <Row>
                  <Col sm={6}>
                    <h6>Payment</h6>
                    <p className="fs_14 d-flex align-items-center">
                      Visa **56
                      <img src={VisaCard} alt="CardIcon" className="ms-2" />
                    </p>
                  </Col>
                  <Col sm={6}>
                    <h6>Delivery</h6>
                    <p className="fs_14">Address</p>
                    <p className="fs_14 text_address">
                      847 Jewess Bridge Apt. 174 London, UK 474-769-3919
                    </p>
                  </Col>
                </Row>
              </div>
              <div className="order_total_wrap">
                <Row>
                  <Col md={6} sm={4}>
                    <h6 className="mb10">Need Help</h6>
                    <ul>
                      <li>
                        <p className="d-flex align-items-center">
                          <img src={Info} alt="InfoIcon" />
                          <span className="ms-1 me-3">Order Issues</span>
                          <img src={ArrowUp} alt="ArrowUp" />
                        </p>
                      </li>
                      <li>
                        <p className="d-flex align-items-center">
                          <img src={Delivery} alt="DeliveryIcon" />
                          <span className="ms-1 me-3">Delivery Info</span>
                          <img src={ArrowUp} alt="ArrowUp" />
                        </p>
                      </li>
                      <li>
                        <p className="d-flex align-items-center">
                          <img src={Return} alt="ReturnIcon" />
                          <span className="ms-1 me-3">Returns</span>
                          <img src={ArrowUp} alt="ArrowUp" />
                        </p>
                      </li>
                    </ul>
                  </Col>
                  <Col md={6} sm={8}>
                    <h6>Order Summary</h6>
                    <ul className="order_summary_wrap">
                      <li>
                        <span>Discount</span>
                        <span>$5554</span>
                      </li>
                      <li>
                        <span>Discount</span>
                        <span>(20%) - $1109.40</span>
                      </li>
                      <li>
                        <span>Shipping Charge</span>
                        <span>$0.00</span>
                      </li>
                      <li>
                        <span>Tax</span>
                        <span>+$221.88</span>
                      </li>
                      <li>
                        <span>Total</span>
                        <span className="text_dark">$254780.00</span>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default memo(TrackMyOrder);
