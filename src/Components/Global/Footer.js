import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { memo } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import Facebook from '../../Assets/Images/facebook.svg';
import Address from '../../Assets/Images/footer-address.svg';
import Mail from '../../Assets/Images/footer-mail.svg';
import Phone from '../../Assets/Images/footer-phone.svg';
import FooterLogoWhite from '../../Assets/Images/header-logo.svg';
import Instagram from '../../Assets/Images/instagram.svg';
import Linkedin from '../../Assets/Images/linkedin.svg';
import Payment1 from '../../Assets/Images/payment-2.svg';
import Payment2 from '../../Assets/Images/payment-3.svg';
import Payment3 from '../../Assets/Images/payment-13.svg';
import Payment4 from '../../Assets/Images/payment-11.svg';
import Payment5 from '../../Assets/Images/payment-6.svg';
import Payment6 from '../../Assets/Images/payment-14.svg';
import Payment7 from '../../Assets/Images/payment-8.svg';
import Payment8 from '../../Assets/Images/payment-5.svg';
import Payment9 from '../../Assets/Images/payment-7.svg';
import Payment10 from '../../Assets/Images/payment-10.svg';
import Payment11 from '../../Assets/Images/payment-9.svg';
import Payment13 from '../../Assets/Images/payment-1.svg';
import Payment12 from '../../Assets/Images/payment-4.svg';
import Payment14 from '../../Assets/Images/payment-12.png';
import Pinterest from '../../Assets/Images/pinterest.svg';
import Youtube from '../../Assets/Images/youtube.svg';
import { OptimizedImage } from 'utils/performanceUtils';

const Footer = () => {
  return (
    <>
      <footer>
        <section className="newsletter_wrapper">
          <Container>
            <div className="newsletter_wrapper_inner px20 pt60 pb60 pt50-md pb50-md pt30-xs pb30-xs">
              <div className="newsletter_wrapper_form">
                <h3 className="mb10 ff_Title text-uppercase">
                  Sign up for our
                  <span className="text_colorC"> Newsletter </span>
                </h3>
                <div className="newsletter_Form_wrap mb20">
                  <Form>
                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      className="form_group_wrap ff_Mulish"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Email address..."
                      />
                    </Form.Group>
                    <Button variant="primary">Explore</Button>
                  </Form>
                </div>
                <p className="m0 ff_Mulish">
                  Sign up for our Newsletter and immerse yourself in a world of
                  brilliance. Be the one to discover New Arrivals, exclusive
                  diamonds, and captivating jewelry designs.Receive the latest
                  updates and access the best deals, ensuring you stay adorned
                  with the epitome of elegance.
                </p>
              </div>
            </div>
          </Container>
        </section>
        <section className="main_footer bg_colorJ">
          <div className="footer_link_wrapper">
            <Container>
              <Row>
                <Col lg={2}>
                  <div className="footer_logo">
                    <img src={FooterLogoWhite} alt="" />
                  </div>
                </Col>
                <Col lg={6}>
                  <Row className="pt30-md pb30-md">
                    <Col md={6}>
                      <div className="footer_link">
                        <h6 className="ff_Mulish">Contact Us</h6>
                        <div className="tab_wrap">
                          <Tabs
                            defaultActiveKey="hongKong"
                            id="uncontrolled-tab-example"
                            className="ff_Mulish"
                          >
                            <Tab eventKey="hongKong" title="Hong Kong">
                              <ul>
                                <li>
                                  <span className="icon_add">
                                    <img src={Address} alt="Addressicon" />
                                  </span>
                                  <Link
                                    to="https://maps.app.goo.gl/1ECNX7xo758U5XR39"
                                    target="_blank"
                                    className="ff_Mulish"
                                  >
                                    EXCELLENT CORPORATION HK LIMITED <br />
                                    RM 1024, Beverley Commercial Centre 87 to
                                    105 Chatham Road South, TST, Hong Kong
                                  </Link>
                                </li>
                                <li>
                                  <span className="icon_add">
                                    <img src={Phone} alt="Phoneicon" />
                                  </span>
                                  <div>
                                    <Link
                                      to="tel:+85262634864"
                                      className="w-auto me-1 ff_Mulish"
                                    >
                                      +852-6263 4864
                                    </Link>
                                    <span>/</span>
                                    <Link
                                      to="tel:+85246833011"
                                      className="w-auto ms-1 ff_Mulish"
                                    >
                                      +852 46833011
                                    </Link>
                                  </div>
                                </li>
                                <li>
                                  <span className="icon_add">
                                    <img src={Mail} alt="Phoneicon" />
                                  </span>
                                  <Link
                                    to="mailto:sales@excellentjewels.com"
                                    className="ff_Mulish"
                                  >
                                    sales@excellentjewels.com
                                  </Link>
                                </li>
                              </ul>
                            </Tab>
                            <Tab eventKey="india" title="India">
                              <ul>
                                <li>
                                  <span className="icon_add">
                                    <img src={Address} alt="Addressicon" />
                                  </span>
                                    <Link
                                        to="https://maps.app.goo.gl/7KFM4Za1Mtg4mhU58"
                                        target="_blank"
                                        className="ff_Mulish"
                                    >
                                      EXCELLENT JEWELS PRIVATE LIMITED <br />
                                      A-210, 2nd FLOOR, MILLENIUM POINT, A-WING,
                                      Gulam Baba Mill Compound,Lal Darwaja Station
                                      Rd, Near SURAT RAILWAY STATION, Surat, Gujarat
                                      395003
                                    </Link>
                                </li>
                                <li>
                                  <span className="icon_add">
                                    <img src={Phone} alt="Phoneicon" />
                                  </span>
                                  <Link
                                    to="tel:+919727971689"
                                    className="w-auto ff_Mulish  me-1 "
                                  >
                                    +91-9727971689
                                  </Link>
                                  <span>/</span>
                                  <Link
                                    to="tel:+918200127828 ms-1 "
                                    className="w-auto ff_Mulish"
                                  >
                                    +91-8200127828
                                  </Link>
                                </li>
                                <li>
                                  <span className="icon_add">
                                    <img src={Mail} alt="Phoneicon" />
                                  </span>
                                  <Link
                                    to="mailto:sales@excellentjewels.com"
                                    className="ff_Mulish"
                                  >
                                    sales@excellentjewels.com
                                  </Link>
                                </li>
                              </ul>
                            </Tab>
                            <Tab eventKey="thailand" title="Thailand">
                              <ul>
                                <li>
                                  <span className="icon_add">
                                    <img src={Address} alt="Addressicon" />
                                  </span>
                                  <Link
                                    to="https://maps.app.goo.gl/88gE1eWA4SxaxFcHA"
                                    target="_blank"
                                    className="ff_Mulish"
                                  >
                                    EXCELLENT JEWELRY CO., LTD <br />
                                    1st Floor, 62/5-6 soi pramote (yasu),
                                    Surawong road Bangrak Bangkok 10500,
                                    Thailand
                                  </Link>
                                </li>
                                <li>
                                  <span className="icon_add">
                                    <img src={Phone} alt="Phoneicon" />
                                  </span>
                                  <Link
                                    to="tel:+66956039297"
                                    className="w-auto me-1 ff_Mulish"
                                  >
                                    +66 956039297
                                  </Link>
                                </li>
                                <li>
                                  <span className="icon_add">
                                    <img src={Mail} alt="Phoneicon" />
                                  </span>
                                  <Link
                                    to="mailto:sales@excellentjewels.com"
                                    className="ff_Mulish"
                                  >
                                    sales@excellentjewels.com
                                  </Link>
                                </li>
                              </ul>
                            </Tab>
                          </Tabs>
                        </div>
                      </div>
                    </Col>
                    <Col sm={3} xs={6}>
                      <div className="footer_link">
                        <h6 className="ff_Mulish">About</h6>
                        <ul>
                          <li>
                            <Link to="/about-us" className="ff_Mulish">
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link to="/contact-us" className="ff_Mulish">
                              Contact Us
                            </Link>
                          </li>
                          <li>
                            <Link to="/education" className="ff_Mulish">
                              Education
                            </Link>
                          </li>
                          <li>
                            <Link to="/faqs" className="ff_Mulish">
                              FAQs
                            </Link>
                          </li>
                          <li>
                            <Link to="/events" className="ff_Mulish">
                              Events
                            </Link>
                          </li>
                          <li>
                            <Link to="/share-demand" className="ff_Mulish">
                              Share Demand
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col sm={3} xs={6}>
                      <div className="footer_link">
                        <h6 className="ff_Mulish">Quick Links</h6>
                        <ul>
                          <li>
                            <Link
                              to="/return-and-refund-policy"
                              className="ff_Mulish"
                            >
                              Return & Refund Policy
                            </Link>
                          </li>
                          <li>
                            <Link to="/privacy-policy" className="ff_Mulish">
                              Privacy Policy
                            </Link>
                          </li>
                          <li>
                            <Link to="/shipping-policy" className="ff_Mulish">
                              Shipping Policy
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/terms-and-conditions"
                              className="ff_Mulish"
                            >
                              Terms & Condition
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={4}>
                  <div className="footer_link social_icon_wrap">
                    <h6 className="ff_Mulish">Follow us On</h6>
                    <ul className="social_icon">
                      <li>
                        <Link
                          to="https://www.facebook.com/profile.php?id=100093144622388"
                          target="_blank"
                        >
                          <img src={Facebook} alt="" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://www.instagram.com/excellentjewels"
                          target="_blank"
                        >
                          <img src={Instagram} alt="" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://linkedin.com/in/gaurang-vasoya-509953bb"
                          target="_blank"
                        >
                          <img src={Linkedin} alt="" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://in.pinterest.com/excellentcorporationlgd"
                          target="_blank"
                        >
                          <img src={Pinterest} alt="" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://www.youtube.com/@ExcellentCorporationlgd"
                          target="_blank"
                        >
                          <img src={Youtube} alt="" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="payment_link">
                    <ul className="pay_icon">
                      <li>
                        <Link className="d-flex">
                          <img src={Payment1} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment2} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment3} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment4} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment5} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment6} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment7} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment8} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment9} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment10} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment11} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment12} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex">
                          <img src={Payment13} alt="" className="w-100 h-100" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="copyright_wrapper">
            <Container>
              <p className="text-center m0 ff_Mulish">
                Copyright © 2025 Excellent Jewels Private Limited. All Rights
                Reserved
              </p>
            </Container>
          </div>
        </section>
      </footer>
      <div className="chat-wrapper">
        <TawkMessengerReact
          propertyId="https://tawk.to/chat/65b37b018d261e1b5f5829c5/1hl2hh02j"
          widgetId="1hl2hh02j"
        />
      </div>
    </>
  );
};
export default memo(Footer);
