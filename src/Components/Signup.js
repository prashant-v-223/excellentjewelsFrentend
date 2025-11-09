import { ErrorMessage, Formik } from 'formik';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as Yup from 'yup';
import SignupImg from '../Assets/Images/signup-bg.png';
import { registration, setIsRegistration } from './Redux/reducers/auth.slice';
import { getCountryList } from './Redux/reducers/dashboard.slice';

export const stringRegex = /^[a-zA-Z0-9\s,.'-]*$/;

function Signup() {
  const submitRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegistration } = useSelector(({ auth }) => auth);
  const { countryList } = useSelector(({ dashboard }) => dashboard);
  const { diamondFilterDetail } = useSelector(({ common }) => common);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [termsAndConditionPopUp, setTermsAndConditionPopUp] = useState(false);
  const initialValues = {
    companyName: '',
    firstName: '',
    lastName: '',
    natureOfBusiness: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: '',
    agree: false,
    country: '',
    state: '',
    city: '',
  };

  const termsAndConditionPopUpShow = () => setTermsAndConditionPopUp(true);
  const termsAndConditionPopUpHide = () => setTermsAndConditionPopUp(false);

  useEffect(() => {
    if (countryList?.length === 0) {
      dispatch(getCountryList());
    }
  }, [dispatch, countryList]);

  useEffect(() => {
    if (isRegistration) {
      navigate('/login');
      dispatch(setIsRegistration(false));
    }
  }, [dispatch, isRegistration, navigate]);

  const natureOfOrgListOption = useMemo(() => {
    return (
      diamondFilterDetail?.natureOfOrgList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || []
    );
  }, [diamondFilterDetail]);

  const finalCountry = useMemo(() => {
    const countryData =
      countryList?.map(data => {
        return { label: data.Text, value: data.Value };
      }) || [];
    return countryData;
  }, [countryList]);

  const validateForm = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!Yup.string().email().isValidSync(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.contactNo) {
      errors.contactNo = 'Contact number is required';
    } else if (!isValidPhoneNumber(values.contactNo)) {
      errors.contactNo = 'Contact number is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword.trim() !== values.password.trim()) {
      errors.confirmPassword = 'Both passwords need to be the same';
    }
    if (!values.country) {
      errors.country = 'Country is required';
    }
    if (!values.state) {
      errors.state = 'State is required';
    }
    if (!values.city) {
      errors.city = 'City is required';
    }
    if (!values.agree) {
      errors.agree = 'Please accept terms and condition';
    }
    return errors;
  };

  return (
    <main>
      <section className="pt30 login_wrapper signup_wrapper pb100 pb50-md">
        <h2 className="text-center pt20 mb-0 d-xl-none d-block">
          Sign <span>Up</span>
        </h2>
        <Container>
          <Row>
            <Col xl={5} className="d-none d-xl-block">
              <div className="login_img_wrap">
                <img src={SignupImg} alt="SignUpImg" />
              </div>
            </Col>
            <Col xl={7}>
              <div className="login_form_wrapper mt10 mt30-xs">
                <Formik
                  initialValues={initialValues}
                  innerRef={submitRef}
                  validate={validateForm}
                  onSubmit={async (values, { resetForm }) => {
                    dispatch(registration({ ...values }));
                    submitRef && submitRef.current.resetForm();
                  }}
                >
                  {({ handleSubmit, handleChange, values, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                      {/* <div className="google_wrapper">
                        <Button
                          variant="light"
                          className="btn_google"
                          autoFocus
                        >
                          <img src={googleIcon} alt="" /> Log In with Google
                        </Button>

                        <div className="devider">
                          <span>or</span>
                        </div>
                      </div> */}
                      {/*  <div className="supplyer_wrap mb20 mb15-lg">
                        <Form.Select
                          aria-label="Default select example"
                          className="select_wrapper"
                          name="roll"
                          value="1"
                          disabled
                        >
                          <option>Select Roll</option>
                          <option value="1">For Customer</option>
                          <option value="2">For Supplier</option>
                        </Form.Select>
                      </div> */}
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput2"
                          >
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={values.firstName}
                              onChange={e => {
                                const value = e.target.value.trim();
                                stringRegex.test(value) &&
                                  handleChange('firstName')(value);
                              }}
                              placeholder="Enter first name"
                            />
                            <span className="text-error">
                              <ErrorMessage name="firstName" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput3"
                          >
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={values.lastName}
                              onChange={e => {
                                const value = e.target.value.trim();
                                stringRegex.test(value) &&
                                  handleChange('lastName')(value);
                              }}
                              placeholder="Enter Last name"
                            />
                            <span className="text-error">
                              <ErrorMessage name="lastName" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput4"
                          >
                            <Form.Control
                              type="email"
                              name="email"
                              value={values?.email}
                              onChange={e =>
                                handleChange('email')(e.target.value)
                              }
                              placeholder="Your business email"
                            />
                            <span className="text-error">
                              <ErrorMessage name="email" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <div className="mb20 mb15-lg form_group">
                            <PhoneInput
                              defaultCountry="IN"
                              value={values.contactNo}
                              onChange={e => {
                                setFieldValue('contactNo', e ? e : '');
                              }}
                              placeholder="Enter phone number"
                              className="form-control"
                            />
                            <span className="text-error">
                              <ErrorMessage name="contactNo" />
                            </span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput0"
                          >
                            <Form.Control
                              type="text"
                              name="companyName"
                              value={values.companyName}
                              onChange={e => {
                                const value = e.target.value.trim();
                                stringRegex.test(value) &&
                                  handleChange('companyName')(value);
                              }}
                              placeholder="Enter Compony Name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Select
                              aria-label="Default select example"
                              className="react_custom_select_Wrapper square"
                              value={values?.natureOfBusiness}
                              onChange={e => {
                                let selectedObj = {
                                  target: {
                                    name: 'natureOfBusiness',
                                    value: e,
                                  },
                                };
                                handleChange('natureOfBusiness')(selectedObj);
                              }}
                              options={natureOfOrgListOption}
                              placeholder="Nature of Business"
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
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput6"
                          >
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              autoComplete="new-password"
                              value={values?.password}
                              onChange={e => {
                                handleChange('password')(e.target.value);
                              }}
                              placeholder="Password"
                            />
                            <span
                              className="eye_icon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={
                                  showPassword
                                    ? 'fa-solid fa-eye-slash'
                                    : 'fa-solid fa-eye'
                                }
                              ></i>
                            </span>
                            <span className="text-error">
                              <ErrorMessage name="password" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput7"
                          >
                            <Form.Control
                              type={confirmPassword ? 'text' : 'password'}
                              placeholder="Confirm Password"
                              name="confirmPassword"
                              value={values.confirmPassword}
                              onChange={e =>
                                handleChange('confirmPassword')(e.target.value)
                              }
                            />
                            <span
                              className="eye_icon"
                              onClick={() =>
                                setConfirmPassword(!confirmPassword)
                              }
                            >
                              <i
                                className={
                                  confirmPassword
                                    ? 'fa-solid fa-eye-slash'
                                    : 'fa-solid fa-eye'
                                }
                              ></i>
                            </span>
                            <span className="text-error">
                              <ErrorMessage name="confirmPassword" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput8"
                          >
                            <Select
                              aria-label="Default select example"
                              className="react_custom_select_Wrapper square"
                              value={values.country}
                              options={finalCountry}
                              onChange={async e => {
                                setFieldValue('country', e);
                              }}
                              placeholder="Select Country"
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
                            <span className="text-error">
                              <ErrorMessage name="country" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput9"
                          >
                            <Form.Control
                              type="text"
                              name="state"
                              value={values.state}
                              onChange={e => {
                                const value = e.target.value.trim();
                                stringRegex.test(value) &&
                                  handleChange('state')(value);
                              }}
                              placeholder="Enter State"
                            />
                            <span className="text-error">
                              <ErrorMessage name="state" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb20 mb15-lg form_group"
                            controlId="exampleForm.ControlInput10"
                          >
                            <Form.Control
                              type="text"
                              name="city"
                              value={values.city}
                              onChange={e => {
                                const value = e.target.value.trim();
                                stringRegex.test(value) &&
                                  handleChange('city')(value);
                              }}
                              placeholder="Enter City"
                            />
                            <span className="text-error">
                              <ErrorMessage name="city" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={12} className="mb40">
                          <Form.Group
                            className=" form_group input_checkbox d-flex"
                            controlId="exampleForm.ControlInput11"
                          >
                            <Form.Check
                              type="checkbox"
                              className="mr10"
                              id="terms_condition"
                              name="agree"
                              checked={values.agree}
                              readOnly
                              onClick={e => {
                                setFieldValue('agree', e.target.checked);
                              }}
                            />
                            <label htmlFor="terms_condition">
                              I accept{' '}
                              <span
                                className="text_colorC cursor_pointer"
                                onClick={termsAndConditionPopUpShow}
                              >
                                terms & condition
                              </span>
                            </label>
                          </Form.Group>
                          <span className="text-error">
                            <ErrorMessage name="agree" />
                          </span>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <Button
                          variant="primary"
                          type="submit"
                          className="btn_shadow large_padding mb20 mb15-lg"
                        >
                          Sign Up
                        </Button>
                        <p className="m0">
                          Already have an account?{' '}
                          <Link to="/login" className="text_colorC fw-bold">
                            Log In
                          </Link>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal
        show={termsAndConditionPopUp}
        onHide={termsAndConditionPopUpHide}
        size="lg"
        centered
        dialogClassName="terms_condition_model"
      >
        <Modal.Header closeButton>
          <h6 className="m-0">Terms & Conditions</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="terms_condition_wrap">
            <div className="diamond_detial_box mb-0">
              <ul>
                <li>
                  By accessing this website, we assume you accept these terms
                  and conditions. Do not continue to use [Your Company Name] if
                  you do not agree to take all of the terms and conditions
                  stated on this page.
                </li>
                <li>
                  Users are responsible for maintaining the confidentiality of
                  their account and password. You must provide accurate and
                  complete information during the account creation process.
                </li>
                <li>
                  All content, trademarks, logos, and images on this website are
                  the property of [Your Company Name] and are protected by
                  applicable copyright and trademark law.
                </li>
                <li>
                  Users are prohibited from engaging in any unlawful activities
                  on this website, including but not limited to hacking, fraud,
                  and unauthorized use of content.
                </li>
                <li>
                  We reserve the right to refuse or cancel any order for any
                  reason, including but not limited to product availability,
                  errors in pricing, or suspicion of fraudulent activity.
                </li>
                <li>
                  We may terminate user accounts for violations of these terms
                  and conditions, without prior notice.
                </li>
                <h5 className="mt20 mb20 mb15-lg">
                  Availability Of Goods and Pricing Policy
                </h5>
                <li>
                  Most of Diamonds and Jewelry items on our site are in Stock
                  and available
                </li>
                <li>
                  But still if your ordered or selected stone/Jewellery is not
                  in Stock at the time you placed an order, we will check for
                  alternative stones with same specifications and if its
                  jewellery We will be making it within a span of 12-15 Business
                  days Depend on Jewellery Design
                </li>
                <li>
                  We make sure that we make all data accurate on our website,
                  but Rarely, data may be inaccurately displayed on our site due
                  to any technical or human error.
                </li>
                <li>
                  While we make every attempt to avoid such errors they may
                  occur.{' '}
                </li>
                <li>
                  We reserve the right to correct any and all errors when they
                  do occur which may result in the closing of the item for sale.{' '}
                </li>
                <li>We will not consider inaccurate or erroneous prices.</li>
                <li>
                  In the event of a major error, we reserve the right to
                  withdraw an item for sale or order cancellation, in that case
                  you paid for item which is with high price error, we will
                  cancel the order and refund you incase we will be not able to
                  manage any alternative option with same price range
                </li>
                <li>Our prices are also subject to change without notice.</li>
                <li>We apologize for any inconvenience that this may cause.</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
}
export default memo(Signup);
