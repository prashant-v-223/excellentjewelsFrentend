import { ErrorMessage, Formik } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as Yup from 'yup';
import {
  getCityList,
  getCountryList,
  getStateList,
} from '../Redux/reducers/dashboard.slice';
import {
  editAdditionalInfo,
  editMyProfileDetail,
  getMyProfileDetail,
} from '../Redux/reducers/myAccount.slice';
import AccountSidebar from './AccountSidebar';

const MyAccont = () => {
  const submitRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector(({ auth }) => auth);
  const [finalCountryList, setFinalCountryList] = useState([]);
  const [finalStateList, setFinalStateList] = useState([]);
  const [finalCityList, setFinalCityList] = useState([]);
  const { countryList, stateList, cityList } = useSelector(
    ({ dashboard }) => dashboard,
  );
  const { myProfileDetailList } = useSelector(({ myAccount }) => myAccount);

  const initialValues = {
    fullName: '',
    FName: '',
    LName: '',
    Login_Name: '',
    Contact_No: '',
    Company_Name: '',
    profile_image: '',
    Address_1: '',
    Address_2: '',
    country: '',
    state: '',
    city: '',
    WhatsApp_No: '',
    Email_ID: '',
  };
  let finalcountry = [];
  let finalstate = [];
  let finalcity = [];
  let finalCountryData = [];
  let finalStateData = [];
  let finalCityData = [];
  const [myProfileData, setMyProfileData] = useState(initialValues);

  useEffect(() => {
    if (userData?.UserID) {
      dispatch(getMyProfileDetail({ UserID: userData?.UserID }));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (myProfileDetailList?._countryList?.length > 0) {
      finalcountry = myProfileDetailList?._countryList?.map(data => {
        return { label: data.Text, value: data.Value };
      });
      setFinalCountryList(finalcountry);
      if (
        myProfileDetailList?._countryList?.length > 0 &&
        myProfileDetailList?._stateList?.length > 0
      ) {
        finalstate = myProfileDetailList?._stateList?.map(data => {
          return { label: data.Text, value: data.Value };
        });
        setFinalStateList(finalstate);
      }
      if (
        myProfileDetailList?._countryList?.length > 0 &&
        myProfileDetailList?._stateList?.length > 0 &&
        myProfileDetailList?._cityList?.length > 0
      ) {
        finalcity = myProfileDetailList?._cityList?.map(data => {
          return { label: data.Text, value: data.Value };
        });
        setFinalCityList(finalcity);
      }
    } else {
      if (myProfileDetailList?.Country_Id === 0) {
        dispatch(getCountryList());
      }
      finalcountry = countryList?.map(data => {
        return { label: data.Text, value: data.Value };
      });
      setFinalCountryList(finalcountry);
    }
    finalCountryData = finalcountry?.filter(data => {
      return data.value === myProfileDetailList?.Country_Id.toString();
    });
    finalCityData = finalcity.filter(data => {
      return data.value === myProfileDetailList?.City_Id.toString();
    });
    finalStateData = finalstate?.filter(data => {
      return data.value === myProfileDetailList?.State_Id.toString();
    });

    setMyProfileData({
      fullName: myProfileDetailList?.Full_Name,
      FName: myProfileDetailList?.FName,
      LName: myProfileDetailList?.LName,
      Login_Name: myProfileDetailList?.Login_Name,
      Contact_No: myProfileDetailList?.Contact_No,
      Company_Name: myProfileDetailList?.Company_Name,
      Address_1: myProfileDetailList?.Address_1,
      Address_2: myProfileDetailList?.Address_2,
      country: finalCountryData && finalCountryData[0],
      state: finalStateData && finalStateData[0],
      city: finalCityData && finalCityData[0],
      Cust_ID: myProfileDetailList?.Cust_ID,
      WebStore_ID: myProfileDetailList?.WebStore_ID,
      Full_Name: myProfileDetailList?.Full_Name,
      Country_Id: myProfileDetailList?.Country_Id,
      State_Id: myProfileDetailList?.State_Id,
      City_Id: myProfileDetailList?.City_Id,
      Country_Name: myProfileDetailList?.Country_Name,
      State_Name: myProfileDetailList?.State_Name,
      City_Name: myProfileDetailList?.City_Name,
      Profile_Photo: myProfileDetailList?.Profile_Photo,
      _countryList: myProfileDetailList?._countryList,
      _stateList: myProfileDetailList?._stateList,
      _cityList: myProfileDetailList?._cityList,
      WhatsApp_No: myProfileDetailList?.WhatsApp_No,
      Email_ID: myProfileDetailList?.Email_ID,
    });
  }, [myProfileDetailList]);

  useEffect(() => {
    finalcountry = countryList?.map(data => {
      return { label: data.Text, value: data.Value };
    });
    setFinalCountryList(finalcountry);
  }, [countryList]);
  useEffect(() => {
    finalstate = stateList?.map(data => {
      return { label: data.Text, value: data.Value };
    });
    setFinalStateList(finalstate);
  }, [stateList]);

  useEffect(() => {
    finalcity = cityList?.map(data => {
      return { label: data.Text, value: data.Value };
    });
    setFinalCityList(finalcity);
  }, [cityList]);

  const SubmitSchma = Yup.object().shape({
    FName: Yup.string().required('Required'),
    LName: Yup.string().required('Required'),
    Login_Name: Yup.string().required('Required'),
    Contact_No: Yup.string()
      .required('Required')
      .matches(/^[0-9]{10}$/, 'Mobile number must contain 10 digits'),
    Company_Name: '',
    profile_image: '',
    Address_1: Yup.string().required('Required'),
    Address_2: Yup.string().required('Required'),
    country: Yup.object()
      .shape({
        label: Yup.string().required('Required'),
        value: Yup.string().required('Required'),
      })
      .nullable(),
    state: Yup.object()
      .shape({
        label: Yup.string().required('Required'),
        value: Yup.string().required('Required'),
      })
      .nullable(),
    city: Yup.object()
      .shape({
        label: Yup.string().required('Required'),
        value: Yup.string().required('Required'),
      })
      .nullable(),
    WhatsApp_No: Yup.string()
      .required('Required')
      .matches(/^[0-9]{10}$/, 'Mobile number must contain 10 digits'),
    Email_ID: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <main>
      <section className="my_account_wrapper  pb100 pb50-md pb80-lg">
        <div className="px-3">
          <Row className="rowX">
            <Col xxl={2} lg={3}>
              <AccountSidebar />
            </Col>
            <Col xxl={10} lg={9}>
              <Formik
                enableReinitialize={true}
                innerRef={submitRef}
                initialValues={myProfileData}
                validationSchema={SubmitSchma}
                onSubmit={async (values, { resetForm }) => {
                  dispatch(
                    editMyProfileDetail({
                      WebStore_ID: userData?.WebStore_ID,
                      Cust_ID: userData?.UserID || '',
                      Full_Name: values.FName + ' ' + values.LName || '',
                      FName: values.FName || '',
                      LName: values.LName || '',
                      Login_Name: values.Login_Name || '',
                      Contact_No: values.Contact_No || '',
                      Company_Name: values.Company_Name || '',
                      Country_Id: parseInt(values.country.value) || 0,
                      State_Id: parseInt(values.state.value) || 0,
                      City_Id: parseInt(values.city.value) || 0,
                      Country_Name: values.country.label || '',
                      State_Name: values.state.label || '',
                      City_Name: values.city.label || '',
                      WhatsApp_No: values.WhatsApp_No || '',
                      Email_ID: values.Email_ID || '',
                    }),
                  );
                  dispatch(
                    editAdditionalInfo({
                      UserID: userData?.UserID,
                      Address_1: values.Address_1,
                      Address_2: values.Address_2,
                    }),
                  );
                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="edit_profile_wrap mb10">
                      <h6 className="mb30 mb15-xs">Edit Profile</h6>
                      <Row>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter First Name"
                              name="FName"
                              value={values.FName}
                              onChange={e =>
                                handleChange('FName')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="FName" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Last Name"
                              name="LName"
                              value={values.LName}
                              onChange={e =>
                                handleChange('LName')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="LName" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={12}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>Company name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Company Name"
                              name="Company_Name"
                              value={values.Company_Name}
                              onChange={e =>
                                handleChange('Company_Name')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="Company_Name" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="number"
                              onWheel={e => e.target.blur()}
                              placeholder="Enter Phone Number"
                              name="Contact_No"
                              value={values.Contact_No}
                              onChange={e =>
                                handleChange('Contact_No')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="Contact_No" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>WhatsApp Number</Form.Label>
                            <Form.Control
                              type="number"
                              onWheel={e => e.target.blur()}
                              placeholder="Enter WhatsApp Number"
                              name="WhatsApp_No"
                              value={values.WhatsApp_No}
                              onChange={e =>
                                handleChange('WhatsApp_No')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="WhatsApp_No" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter Email address"
                              value={values.Email_ID}
                              onChange={e =>
                                handleChange('Email_ID')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="Email_ID" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>Login Name</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter Login Name"
                              value={values.Login_Name}
                              name="Login_Name"
                              onChange={e =>
                                handleChange('Login_Name')(e.target.value)
                              }
                              disabled
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Address"
                              name="Address_1"
                              value={values.Address_1}
                              onChange={e =>
                                handleChange('Address_1')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="Address_1" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group className="form_group custom_form_group mb25 mb15-sm">
                            <Form.Label>Address 1</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Address"
                              value={values.Address_2}
                              name="Address_2"
                              onChange={e =>
                                handleChange('Address_2')(e.target.value)
                              }
                            />
                            <span className="text-error">
                              <ErrorMessage name="Address_2" />
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Select
                            placeholder="Select Country"
                            className="mb25 s"
                            id="Country"
                            value={values.country}
                            onChange={(e, index) => {
                              let selectedObj = {
                                target: {
                                  name: 'country',
                                  value: e,
                                },
                              };

                              handleChange('country')(selectedObj);
                              dispatch(
                                getStateList({
                                  CountryID: parseInt(
                                    selectedObj.target.value.value,
                                  ),
                                }),
                              );
                            }}
                            options={finalCountryList}
                          />
                          <span className="text-error">
                            <ErrorMessage name="country" />
                          </span>
                        </Col>
                        <Col md={4}>
                          <Select
                            placeholder="Select State"
                            id="State"
                            value={values.state}
                            className="mb25 form_group"
                            onChange={(e, index) => {
                              let selectedObj = {
                                target: {
                                  name: 'state',
                                  value: e,
                                },
                              };

                              handleChange('state')(selectedObj);
                              dispatch(
                                getCityList({
                                  CountryID: parseInt(values.country?.value),
                                  StateID: parseInt(
                                    selectedObj.target.value.value,
                                  ),
                                }),
                              );
                            }}
                            options={finalStateList}
                          />
                          <span className="text-error">
                            <ErrorMessage name="state" />
                          </span>
                        </Col>
                        <Col md={4}>
                          <Select
                            placeholder="Select city"
                            id="City"
                            className="gray"
                            value={values.city}
                            onChange={(e, index) => {
                              let selectedObj = {
                                target: {
                                  name: 'city',
                                  value: e,
                                },
                              };

                              handleChange('city')(selectedObj);
                            }}
                            options={finalCityList}
                          />
                          <span className="text-error">
                            <ErrorMessage name="city" />
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="primary"
                        className="rounded btn_shadow"
                        type="submit"
                      >
                        Save Changes
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
export default memo(MyAccont);
