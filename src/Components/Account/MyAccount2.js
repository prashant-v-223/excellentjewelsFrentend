import React, { useState, useEffect, memo, useMemo } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AccountSidebar from './AccountSidebar';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Formik } from 'formik';
import {
  changePassword,
  editMyProfileDetail,
  getMyProfileDetail,
  setIsPasswordChanged,
  setIsProfileEdit,
} from '../Redux/reducers/myAccount.slice';
import * as Yup from 'yup';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';
import { getCountryList } from 'Components/Redux/reducers/dashboard.slice';
import { stringRegex } from 'Components/Signup';

const MyAccount2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const myProfileEditRef = useRef(null);
  const changePassEditRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const { countryList } = useSelector(({ dashboard }) => dashboard);
  const {
    myProfileDetailList,
    isProfileEdit,
    isPasswordChanged,
    editMyProfileLoading,
  } = useSelector(({ myAccount }) => myAccount);

  const initialValues = {
    loginName: '',
    fName: '',
    lName: '',
    contactNo: '',
    contactNo2: '',
    emailID: '',
    emailID2: '',
    companyName: '',
    shippingAddress: '',
    country: '',
    state: '',
    city: '',
  };
  const passwordValue = {
    Login_Pass: '',
    Login_Pass_New: '',
    Login_Pass_Confirm: '',
  };
  const [myProfileData, setMyProfileData] = useState(initialValues);

  useEffect(() => {
    if (countryList?.length === 0) {
      dispatch(getCountryList());
    }
  }, [dispatch, countryList]);

  useEffect(() => {
    if (userData?.UserID) {
      dispatch(getMyProfileDetail({ UserID: userData?.UserID }));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (Object.keys(myProfileDetailList)?.length > 0) {
      const name =
        myProfileDetailList?.Full_Name &&
        myProfileDetailList?.Full_Name?.split(' ');
      setMyProfileData({
        loginName: myProfileDetailList?.Login_Name,
        fName: name[0] ? name[0] : '',
        lName: name[1] ? name[1] : '',
        contactNo: myProfileDetailList?.Contact_No,
        contactNo2: myProfileDetailList?.Contact_No2
          ? myProfileDetailList.Contact_No2
          : '',
        emailID: myProfileDetailList?.Email_ID,
        emailID2: myProfileDetailList?.Email_ID2
          ? myProfileDetailList.Email_ID2
          : '',
        companyName: myProfileDetailList?.Company_Name,
        shippingAddress: myProfileDetailList?.Address_1,
        city: myProfileDetailList?.City_Name
          ? myProfileDetailList.City_Name
          : '',
        state: myProfileDetailList?.State_Name
          ? myProfileDetailList.State_Name
          : '',
        country:
          myProfileDetailList?.Country_Id && myProfileDetailList?.Country_Name
            ? {
                label: myProfileDetailList.Country_Name,
                value: myProfileDetailList.Country_Id,
              }
            : '',
      });
    }
  }, [myProfileDetailList]);

  const finalCountry = useMemo(() => {
    const countryData =
      countryList?.map(data => {
        return { label: data.Text, value: data.Value };
      }) || [];
    return countryData;
  }, [countryList]);

  useEffect(() => {
    if (isProfileEdit) {
      dispatch(setIsProfileEdit(false));
      myProfileEditRef && myProfileEditRef.current.resetForm();
      dispatch(getMyProfileDetail({ UserID: userData?.UserID }));
    }
  }, [dispatch, isProfileEdit]);

  useEffect(() => {
    if (isPasswordChanged) {
      dispatch(setIsPasswordChanged(false));
      changePassEditRef && changePassEditRef.current.resetForm();
    }
  }, [dispatch, isPasswordChanged]);

  const SubmitSchma = Yup.object().shape({
    fName: Yup.string().required('Required'),
    lName: Yup.string().required('Required'),
    contactNo: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Phone number is invalid', function (value) {
        return value ? isValidPhoneNumber(value) : false;
      }),
    contactNo2: Yup.string()
      .required('Alternative phone number is required')
      .test(
        'is-valid-phone',
        'Alternative phone number is invalid',
        function (value) {
          return value ? isValidPhoneNumber(value) : false;
        },
      ),
    companyName: Yup.string().required('Required'),
    emailID: Yup.string().email('Invalid email').required('Required'),
    emailID2: Yup.string().email('Invalid email').required('Required'),
    shippingAddress: Yup.string().required('Required'),
  });
  const PasswordSubmitSchma = Yup.object().shape({
    Login_Pass: Yup.string().required('Required'),
    Login_Pass_New: Yup.string()
      .required('Required')
      .min(5, 'Your password is too short.')
      .matches(/^[a-zA-Z0-9@#!$*^&]/, 'Password can length must ne 9.'),
    Login_Pass_Confirm: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('Login_Pass_New')], 'Passwords must match'),
  });
  return (
    <main>
      <section className="my_account_wrapper pt50 pt10-lg pb100 pb50-md pb80-lg">
        <div className="px-3">
          <Row className="rowX">
            <Col xxl={2} lg={3}>
              <AccountSidebar />
            </Col>
            <Col xxl={10} lg={9}>
              <Formik
                enableReinitialize={true}
                innerRef={myProfileEditRef}
                initialValues={myProfileData}
                validationSchema={SubmitSchma}
                onSubmit={values => {
                  dispatch(
                    editMyProfileDetail({
                      ...myProfileDetailList,
                      Full_Name: values.fName + ' ' + values.lName || '',
                      FName: values.fName || '',
                      LName: values.lName || '',
                      Email_ID: values.emailID || '',
                      Contact_No: values.contactNo || '',
                      Company_Name: values.companyName || '',
                      Contact_No2: values.contactNo2 || '',
                      Email_ID2: values.emailID2 || '',
                      Address_1: values.shippingAddress || '',
                      Country_Id: values.country?.value || '',
                      Country_Name: values.country?.label || '',
                      State_Name: values.state || '',
                      State_Id: 0,
                      City_Name: values.city || '',
                      City_Id: 0,
                    }),
                  );
                }}
              >
                {({ values, handleChange, setFieldValue, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="edit_profile_wrap mb10">
                      <h6 className="mb30 mb15-xs ff_Mulish">Edit Profile</h6>
                      <Row>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              Login Name
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type="text"
                              name="loginName"
                              value={values.loginName}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              Company Name
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type="text"
                              placeholder="Enter Company Name"
                              name="companyName"
                              value={values.companyName}
                              onChange={e =>
                                handleChange('companyName')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="companyName" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              First name
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type="text"
                              placeholder="Enter First Name"
                              name="fName"
                              value={values.fName}
                              onChange={e =>
                                handleChange('fName')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="fName" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              Last name
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type="text"
                              placeholder="Enter Last Name"
                              name="lName"
                              value={values.lName}
                              onChange={e =>
                                handleChange('lName')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="lName" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              Phone Number
                            </Form.Label>
                            <PhoneInput
                              className="ff_Mulish form-control"
                              name="contactNo"
                              defaultCountry="IN"
                              placeholder="Enter Phone Number"
                              value={values.contactNo}
                              onChange={e =>
                                setFieldValue('contactNo', e ? e : '')
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="contactNo" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              Email address
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type="email"
                              name="emailID"
                              placeholder="Enter the Email"
                              value={values.emailID}
                              onChange={e =>
                                handleChange('emailID')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="emailID" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              Alternative Phone Number
                            </Form.Label>
                            <PhoneInput
                              className="ff_Mulish form-control"
                              name="contactNo2"
                              defaultCountry="IN"
                              placeholder="Enter Alternative Phone Number"
                              value={values.contactNo2}
                              onChange={e =>
                                setFieldValue('contactNo2', e ? e : '')
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="contactNo2" />
                            </span>
                          </Form.Group>
                        </Col>

                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb20 mb15-sm">
                            <Form.Label className="ff_Mulish">
                              Add Alternative Email address
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type="email"
                              placeholder="Enter Email address"
                              name="emailID2"
                              value={values.emailID2}
                              onChange={e =>
                                handleChange('emailID2')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="emailID2" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="form_group">
                          <Select
                            placeholder="Select Country"
                            className="react_custom_select_Wrapper square"
                            id="Country"
                            value={values.country}
                            onChange={async e => {
                              setFieldValue('country', e);
                            }}
                            options={finalCountry}
                            styles={{
                              option: (base, { isSelected, isFocused }) => ({
                                ...base,
                                backgroundColor: isSelected
                                  ? '#be8d28' // Background color for selected option
                                  : isFocused
                                  ? 'rgb(200, 200, 200)' // Background color for hovered option
                                  : '#fff', // Default background color for options
                                color: '#000', // Text color for options
                              }),
                            }}
                          />

                          <span className="text-error">
                            <ErrorMessage name="country" />
                          </span>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb20 mb15-lg form_group">
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
                          <Form.Group className="mb20 mb15-lg form_group">
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
                      </Row>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="primary"
                        className="rounded btn_shadow"
                        type="submit"
                        name="profileSave"
                        disabled={editMyProfileLoading}
                      >
                        Save Profile
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={passwordValue}
                innerRef={changePassEditRef}
                validationSchema={PasswordSubmitSchma}
                onSubmit={values => {
                  dispatch(
                    changePassword({
                      ...values,
                      Cust_ID: userData?.UserID,
                      WebStore_ID: userData?.WebStore_ID,
                    }),
                  );
                }}
              >
                {({ handleSubmit, handleChange, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="change_passward_wrap mb10 mt20">
                      <h6 className="mb30 mb15-xs ff_Mulish">
                        Change Passward
                      </h6>
                      <Row>
                        <Col sm={6}>
                          <Form.Group
                            className="custom_form_group mb20 mb15-sm"
                            id="password"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="ff_Mulish">
                              Old Passward
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              name="Login_Pass"
                              value={values.Login_Pass}
                              onChange={e => {
                                handleChange(e.target.name)(e.target.value);
                              }}
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
                              <ErrorMessage name="Login_Pass" />
                            </span>
                          </Form.Group>
                          <Form.Group
                            className="custom_form_group mb20 mb15-sm"
                            id="password"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="ff_Mulish">
                              New Password
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type={newShowPassword ? 'text' : 'password'}
                              placeholder="Password"
                              name="Login_Pass_New"
                              value={values.Login_Pass_New}
                              onChange={e => {
                                handleChange(e.target.name)(e.target.value);
                              }}
                            />
                            <span
                              className="eye_icon"
                              onClick={() =>
                                setNewShowPassword(!newShowPassword)
                              }
                            >
                              <i
                                className={
                                  newShowPassword
                                    ? 'fa-solid fa-eye-slash'
                                    : 'fa-solid fa-eye'
                                }
                              ></i>
                            </span>
                            <span className="text-error">
                              <ErrorMessage name="Login_Pass_New" />
                            </span>
                          </Form.Group>
                          <Form.Group
                            className="mb20 mb15-sm custom_form_group"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label className="ff_Mulish">
                              Confirm Password
                            </Form.Label>
                            <Form.Control
                              className="ff_Mulish"
                              type={confirmPassword ? 'text' : 'password'}
                              placeholder="Confirm Password"
                              name="Login_Pass_Confirm"
                              value={values.Login_Pass_Confirm}
                              onChange={e => {
                                handleChange(e.target.name)(e.target.value);
                              }}
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
                          </Form.Group>
                          <span className="text-error">
                            <ErrorMessage name="Login_Pass_Confirm" />
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="primary"
                        className="rounded btn_shadow"
                        type="submit"
                        name="passwordSave"
                      >
                        Save Password
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  );
};
export default memo(MyAccount2);
