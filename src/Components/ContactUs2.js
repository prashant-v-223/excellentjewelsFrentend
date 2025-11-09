import { ErrorMessage, Formik } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Facebook from '../Assets/Images/facebook.svg';
import Address from '../Assets/Images/footer-address.svg';
import Mail from '../Assets/Images/footer-mail.svg';
import Phone from '../Assets/Images/footer-phone.svg';
import Instagram from '../Assets/Images/instagram.svg';
import Linkedin from '../Assets/Images/linkedin.svg';
import Pinterest from '../Assets/Images/pinterest.svg';
import Youtube from '../Assets/Images/youtube.svg';
import { contactDetail } from './Redux/reducers/auth.slice';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { OptimizedImage } from 'utils/performanceUtils';

const ContactUs2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitRef = useRef(null);
  const dispatch = useDispatch();
  const initialValues = {
    Id: 0,
    Fname: '',
    Lname: '',
    Email: '',
    Message: '',
    CreatedOn: Date.now().toString(),
    PhoneNo: '',
  };
  const [selectedLocation, setSelectedLocation] = useState('hongKong');
  const SubmitSchma = Yup.object().shape({
    Email: Yup.string().email('Invalid email').required('Required'),
    Fname: Yup.string().required('Required'),
    Lname: Yup.string().required('Required'),
    PhoneNo: Yup.string()
      .required('Contact number is required')
      .test('is-valid-phone', 'Contact number is invalid', function (value) {
        return value ? isValidPhoneNumber(value) : false;
      }),
    Message: Yup.string().required('Required'),
  });

  return (
    <main>
      <div className="contact_us_wrapper pb100 pb50-md pb80-lg pt50 pt40-lg">
        <Container>
          <div className="contact_map">
            {selectedLocation === 'india' && (
              <iframe
                title="Maps"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d232.4814179475406!2d72.8319678!3d21.2039666!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04efe662a1ad9%3A0x5fbb6f7ccc113970!2sExcellent%20Corporation!5e0!3m2!1sen!2sin!4v1706782685441!5m2!1sen!2sin"
                width="600"
                height="450"
                // allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
            {selectedLocation === 'hongKong' && (
              <iframe
                title="Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.6905218137724!2d114.17467853879704!3d22.301424476503673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401f8e31be6bd%3A0x646cff9b8dfe4589!2sExcellent%20Corporation%20HK%20Limited!5e0!3m2!1sen!2sin!4v1726736062226!5m2!1sen!2sin"
                width="600"
                height="450"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
            {selectedLocation === 'thailand' && (
              <iframe
                title="Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.887675219091!2d100.51568287586481!3d13.725249697906138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299b9892ddaab%3A0x10ac3cde598b22f6!2sExcellent%20Jewelry%20Co.%2C%20Ltd!5e0!3m2!1sen!2sin!4v1726736240071!5m2!1sen!2sin"
                width="600"
                height="450"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div>
          <div className="contact_form_wrap">
            <Row className="justify-content-center">
              <Col md={10}>
                <div className="contact_form_inner_wrap">
                  <Row>
                    <Col lg={5}>
                      <h4 className="text_colorC mb25 mb5-xs ">Contact Us</h4>
                      <div className="tab_wrap">
                        <Tabs
                          defaultActiveKey="hongKong"
                          id="uncontrolled-tab-example"
                          className="ff_Mulish"
                          onSelect={value => setSelectedLocation(value)}
                        >
                          <Tab eventKey="hongKong" title="Hong Kong">
                            <ul>
                              <li>
                                <span className="icon_add">
                                  <img src={Address} alt="Addressicon" />
                                </span>
                                <Link
                                  // to="https://maps.app.goo.gl/1vFMr3Cq3hUMmJyP9"
                                  to="https://maps.app.goo.gl/1ECNX7xo758U5XR39"
                                  target="_blank"
                                  className="ff_Mulish"
                                >
                                  EXCELLENT CORPORATION HK LIMITED <br />
                                  RM 1024, Beverley Commercial Centre 87 to 105
                                  Chatham Road South, TST, Hong Kong
                                </Link>
                              </li>
                              <li>
                                <span className="icon_add">
                                  <img src={Phone} alt="Phoneicon" />
                                </span>
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
                                  // to="https://maps.app.goo.gl/1vFMr3Cq3hUMmJyP9"
                                  to="https://maps.app.goo.gl/88gE1eWA4SxaxFcHA"
                                  target="_blank"
                                  className="ff_Mulish"
                                >
                                  EXCELLENT JEWELRY CO., LTD <br />
                                  1st Floor, 62/5-6 soi pramote (yasu), Surawong
                                  road Bangrak Bangkok 10500, Thailand
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
                      <div className="follow_us_wrapper mb30-md">
                        <h4 className="text_colorC mb10 mb5-lg ">
                          Follow us on
                        </h4>
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
                    </Col>
                    <Col lg={7}>
                      <h4 className="text_colorC mb25 mb5-xs ">Get in touch</h4>
                      <Formik
                        initialValues={initialValues}
                        innerRef={submitRef}
                        validationSchema={SubmitSchma}
                        onSubmit={async (values, { resetForm }) => {
                          dispatch(contactDetail(values));
                          submitRef && submitRef.current.resetForm();
                        }}
                      >
                        {({
                          handleSubmit,
                          setFieldValue,
                          handleChange,
                          values,
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <Row>
                              <Col md={6}>
                                <Form.Group
                                  className="form_group custom_form_group mb15-xs mb10-md"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>First name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="Fname"
                                    value={values.Fname}
                                    onChange={e => {
                                      handleChange('Fname')(e.target.value);
                                    }}
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="Fname" />
                                  </span>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group
                                  className="form_group custom_form_group mb15-xs mb10-md"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Last name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="Lname"
                                    value={values.Lname}
                                    onChange={e => {
                                      handleChange('Lname')(e.target.value);
                                    }}
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="Lname" />
                                  </span>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group
                                  className="form_group custom_form_group mb15-xs mb10-md"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    name="Email"
                                    value={values.Email}
                                    onChange={e => {
                                      handleChange('Email')(e.target.value);
                                    }}
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="Email" />
                                  </span>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group
                                  className="form_group custom_form_group mb15-xs mb10-md"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Label>Contact</Form.Label>
                                  <PhoneInput
                                    className="ff_Mulish form-control"
                                    name="PhoneNo"
                                    defaultCountry="IN"
                                    placeholder="Enter Contact"
                                    value={values.PhoneNo}
                                    onChange={e =>
                                      setFieldValue('PhoneNo', e ? e : '')
                                    }
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="PhoneNo" />
                                  </span>
                                </Form.Group>
                              </Col>
                              <Col md={12}>
                                <Form.Group
                                  className="form_group custom_form_group mb15-xs mb10-md"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Label>Message</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Here..."
                                    name="Message"
                                    value={values.Message}
                                    onChange={e => {
                                      handleChange('Message')(e.target.value);
                                    }}
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="Message" />
                                  </span>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button
                              type="submit"
                              variant="primary"
                              className="rounded btn_shadow w-100"
                            >
                              Send message
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </main>
  );
};
export default memo(ContactUs2);
