import React, { useMemo, useRef, memo, useEffect, useState } from 'react';
import { Container, Tabs, Tab, Button, Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// import JewelaryTab1 from '../Assets/Images/jewelaryTab1.png';
import JewelaryTab1 from '../Assets/Images/Home/about-1.png';
import JewelaryTab2 from '../Assets/Images/jewelaryTab2.jpg';
import JewelaryTab3 from '../Assets/Images/jewelaryTab3.png';
import Select from 'react-select';
import { createDiamondInquiry } from './Redux/reducers/common.slice';
import { disableCalcuSymbol } from 'Helper/CommonHelper';
import { getCountryList } from './Redux/reducers/dashboard.slice';
import { getUrlParam } from 'Helper/CommonHelper';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { OptimizedImage } from 'utils/performanceUtils';

const DiamondInquiry = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { countryList } = useSelector(({ dashboard }) => dashboard);

  const { diamondFilterDetail } = useSelector(({ common }) => common);
  const { jewelleryCategoryDetail, jewelleryBaseMetal } = useSelector(
    ({ jewellery }) => jewellery,
  );
  const certifiedDiamondRef = useRef(null);
  const parcelGoodsRef = useRef(null);
  const customiseJewelleryRef = useRef(null);

  const [diamondInquiryTab, setDiamondInquiryTab] =
    useState('certifiedDiamond');

  useEffect(() => {
    if (countryList?.length === 0) {
      dispatch(getCountryList());
    }
  }, []);

  useEffect(() => {
    const tabType = getUrlParam(window.location.search, 'type');
    if (tabType === 'parcelGoods' || tabType === 'customiseJewellery') {
      setDiamondInquiryTab(tabType);
    }
  }, []);

  const certifiedDiamondSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    country: Yup.object().nullable().required('Required'),
    phoneNo: Yup.string()
      .required('Mobile number is required')
      .test('is-valid-phone', 'Mobile number is invalid', function (value) {
        return value ? isValidPhoneNumber(value) : false;
      }),
    diamondType: Yup.object().nullable().required('Required'),
  });
  const parcelGoodsdSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    country: Yup.object().nullable().required('Required'),
    phoneNo: Yup.string()
      .required('Mobile number is required')
      .test('is-valid-phone', 'Mobile number is invalid', function (value) {
        return value ? isValidPhoneNumber(value) : false;
      }),
    diamondType: Yup.object().nullable().required('Required'),
  });
  const customiseJewellerySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    country: Yup.object().nullable().required('Required'),
    phoneNo: Yup.string()
      .required('Mobile number is required')
      .test('is-valid-phone', 'Mobile number is invalid', function (value) {
        return value ? isValidPhoneNumber(value) : false;
      }),
    diamondType: Yup.object().nullable().required('Required'),
  });

  const countryListData = useMemo(() => {
    const countryData =
      countryList?.map(item => {
        return {
          label: item.Text,
          value: item.Text,
        };
      }) || [];
    return countryData;
  }, [countryList]);
  const customStyles = {
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
  };
  const initialValuesCertifiedDiamond = {
    name: '',
    email: '',
    country: '',
    phoneNo: '',
    shape: '',
    sizeFrom: '',
    sizeTo: '',
    color: '',
    clarity: '',
    lab: '',
    cut: '',
    polish: '',
    symmetry: '',
    diamondType: '',
    growthType: '',
    suggetion: '',
  };
  const initialValuesParcelGoods = {
    name: '',
    email: '',
    country: '',
    phoneNo: '',
    shape: '',
    sizeFrom: '',
    sizeTo: '',
    color: '',
    clarity: '',
    qtyCrt: '',
    qtyPcs: '',
    measurement: '',
    diamondType: '',
    growthType: '',
    suggetion: '',
  };
  const initialValuesCustomiseJewellery = {
    name: '',
    email: '',
    country: '',
    phoneNo: '',
    type: '',
    metalType: '',
    size: '',
    stoneDetails: '',
    qtyPcs: '',
    budgetSuggetion: '',
    diamondType: '',
    growthType: '',
    suggetion: '',
  };
  const diamondTemplateDetail = useMemo(() => {
    let shapeList =
      diamondFilterDetail?.shapeList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || [];
    let caratSizeList =
      diamondFilterDetail?.caratSizeList?.map(item => {
        return {
          label: `${item.CaratSizeFrom} - ${item.CaratSizeTo}`,
          value: `${item.CaratSizeFrom} - ${item.CaratSizeTo}`,
        };
      }) || [];
    let colorList =
      diamondFilterDetail?.colorWhiteList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || [];
    let clarityList =
      diamondFilterDetail?.clarityList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || [];
    let labList =
      diamondFilterDetail?.labList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || [];
    let cutList =
      diamondFilterDetail?.cutList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || [];
    let polishList =
      diamondFilterDetail?.polishList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || [];
    let symmetryList =
      diamondFilterDetail?.symmetryList?.map(item => {
        return {
          label: item.MasterTypeValue_Code,
          value: item.MasterTypeValue_Code,
        };
      }) || [];
    let diamondTypeList = [
      { label: 'Lab Grown', value: 'Lab Grown' },
      { label: 'Natural', value: 'Natural' },
    ];
    let grownthTypeList = [
      { label: 'CVD', value: 'CVD' },
      { label: 'HPHT', value: 'HPHT' },
    ];
    return {
      shapeList,
      caratSizeList,
      colorList,
      clarityList,
      labList,
      cutList,
      polishList,
      symmetryList,
      diamondTypeList,
      grownthTypeList,
    };
  }, [diamondFilterDetail]);

  const jewelleryTemplateDetail = useMemo(() => {
    let jewelleryTypeData = [...jewelleryCategoryDetail];
    jewelleryTypeData =
      jewelleryTypeData?.map(item => {
        return {
          label: item.MasterTypeValue,
          value: item.MasterTypeValue,
        };
      }) || [];
    return jewelleryTypeData;
  }, [jewelleryCategoryDetail]);

  const metalTypeData = useMemo(() => {
    let jewelleryMetalData = [...jewelleryBaseMetal];
    jewelleryMetalData = jewelleryMetalData?.map(item => {
      return {
        label: `${item.PurityCodeName} ${item.ColorCodeName}`,
        value: `${item.PurityCodeName} ${item.ColorCodeName}`,
      };
    });
    return jewelleryMetalData;
  }, [jewelleryBaseMetal]);

  return (
    <main>
      <section className="persnalize_jewelary_wrapper pt80 pb100 pt60-xl pb50-xl pt30-lg">
        <Container>
          <h3 className="text-center mb50 mb15-xs ff_Title">
            Share Your Personalized{' '}
            <span className="text_colorC">Demand/Requirements</span>
          </h3>
          <div className="tab_design_two">
            <Tabs
              activeKey={diamondInquiryTab}
              id="personalize_jewellary"
              onSelect={event => {
                if (event === 'certifiedDiamond') {
                  setDiamondInquiryTab('certifiedDiamond');
                  certifiedDiamondRef &&
                    certifiedDiamondRef.current.resetForm();
                } else if (event === 'parcelGoods') {
                  setDiamondInquiryTab('parcelGoods');
                  parcelGoodsRef && parcelGoodsRef.current.resetForm();
                } else {
                  setDiamondInquiryTab('customiseJewellery');
                  customiseJewelleryRef &&
                    customiseJewelleryRef.current.resetForm();
                }
              }}
            >
              <Tab eventKey="certifiedDiamond" title="Certified Diamond">
                <Formik
                  initialValues={initialValuesCertifiedDiamond}
                  innerRef={certifiedDiamondRef}
                  validationSchema={certifiedDiamondSchema}
                  onSubmit={async (values, { resetForm }) => {
                    const getString = data => {
                      let arr = [];
                      data?.length > 0 &&
                        data?.forEach(element => {
                          arr.push(element.value);
                        });
                      return arr?.toString() || '';
                    };
                    const inquiryRequest = `${
                      values?.country
                        ? 'Country : ' + values.country?.value + '\n'
                        : ''
                    }${
                      values?.shape
                        ? 'Shape : ' + getString(values.shape) + '\n'
                        : ''
                    }${
                      values?.sizeFrom || values?.sizeTo
                        ? `Size : ${
                            Number(values?.sizeFrom) && Number(values?.sizeTo)
                              ? Number(values?.sizeFrom) +
                                '-' +
                                Number(values?.sizeTo)
                              : Number(values?.sizeFrom)
                              ? Number(values?.sizeFrom)
                              : Number(values?.sizeTo)
                          } \n`
                        : ''
                    }${
                      values?.color
                        ? 'Color : ' + getString(values.color) + '\n'
                        : ''
                    }${
                      values?.clarity
                        ? 'Clarity : ' + getString(values.clarity) + '\n'
                        : ''
                    }${
                      values?.lab ? 'Lab : ' + getString(values.lab) + '\n' : ''
                    }${
                      values?.cut ? 'Cut : ' + getString(values.cut) + '\n' : ''
                    }${
                      values?.polish
                        ? 'Polish : ' + getString(values.polish) + '\n'
                        : ''
                    }${
                      values?.symmetry
                        ? 'Symmetry : ' + getString(values.symmetry) + '\n'
                        : ''
                    }${
                      values?.diamondType
                        ? 'DiamondType : ' + values.diamondType?.value + '\n'
                        : ''
                    }${
                      values?.growthType
                        ? 'GrowthType : ' + values.growthType?.value + '\n'
                        : ''
                    }${
                      values?.suggetion ? 'Message : ' + values.suggetion : ''
                    }`;
                    const obj = {
                      FullName: values.name,
                      Email_ID: values.email,
                      Phone_No: values.phoneNo,
                      Message: inquiryRequest,
                      Subject: values.diamondType?.value
                        ? values.diamondType.value
                        : '',
                    };
                    dispatch(createDiamondInquiry(obj));
                    certifiedDiamondRef &&
                      certifiedDiamondRef.current.resetForm();
                  }}
                >
                  {({ handleSubmit, setFieldValue, handleChange, values }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row className="custom_row">
                        <Col md={7}>
                          <div className="Personalize_jewelary_form">
                            <div className="square_input_wrapper">
                              <Row>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Control
                                      type="text"
                                      name="name"
                                      value={values?.name}
                                      onChange={e =>
                                        handleChange('name')(e.target.value)
                                      }
                                      placeholder="Enter Your Name"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="name" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput2"
                                  >
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      value={values?.email}
                                      onChange={e =>
                                        handleChange('email')(e.target.value)
                                      }
                                      placeholder="Enter Your Email"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="email" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput3"
                                  >
                                    <Select
                                      aria-label="Default select example"
                                      className="react_custom_select_Wrapper square"
                                      value={values?.country}
                                      onChange={e => {
                                        let selectedObj = {
                                          target: { name: 'country', value: e },
                                        };
                                        handleChange('country')(selectedObj);
                                      }}
                                      options={countryListData}
                                      placeholder="Country"
                                      styles={customStyles}
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="country" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput3"
                                  >
                                    <PhoneInput
                                      defaultCountry="IN"
                                      name="phoneNo"
                                      value={values.phoneNo}
                                      onChange={e => {
                                        setFieldValue('phoneNo', e ? e : '');
                                      }}
                                      placeholder="Enter Your Contact no"
                                      className="form-control"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="phoneNo" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Form.Control
                                    type="number"
                                    name="sizeFrom"
                                    onWheel={e => e.target.blur()}
                                    value={values?.sizeFrom}
                                    onKeyDown={disableCalcuSymbol}
                                    min={0}
                                    onChange={e => {
                                      handleChange('sizeFrom')(e.target.value);
                                    }}
                                    placeholder="Enter Carat Size From"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Form.Control
                                    type="number"
                                    name="sizeTo"
                                    onWheel={e => e.target.blur()}
                                    value={values?.sizeTo}
                                    onKeyDown={disableCalcuSymbol}
                                    min={0}
                                    onChange={e => {
                                      handleChange('sizeTo')(e.target.value);
                                    }}
                                    placeholder="Enter Carat Size To"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.shape}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'shape', value: e },
                                      };
                                      handleChange('shape')(selectedObj);
                                    }}
                                    isMulti
                                    options={diamondTemplateDetail?.shapeList}
                                    placeholder="Shape"
                                    styles={customStyles}
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.color}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'color', value: e },
                                      };
                                      handleChange('color')(selectedObj);
                                    }}
                                    isMulti
                                    styles={customStyles}
                                    options={diamondTemplateDetail?.colorList}
                                    placeholder="Color"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.clarity}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'clarity', value: e },
                                      };
                                      handleChange('clarity')(selectedObj);
                                    }}
                                    isMulti
                                    styles={customStyles}
                                    options={diamondTemplateDetail?.clarityList}
                                    placeholder="Clarity"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.lab}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'lab', value: e },
                                      };
                                      handleChange('lab')(selectedObj);
                                    }}
                                    isMulti
                                    styles={customStyles}
                                    options={diamondTemplateDetail?.labList}
                                    placeholder="Lab"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.cut}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'cut', value: e },
                                      };
                                      handleChange('cut')(selectedObj);
                                    }}
                                    isMulti
                                    styles={customStyles}
                                    options={diamondTemplateDetail?.cutList}
                                    placeholder="Cut"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.polish}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'polish', value: e },
                                      };
                                      handleChange('polish')(selectedObj);
                                    }}
                                    isMulti
                                    styles={customStyles}
                                    options={diamondTemplateDetail?.polishList}
                                    placeholder="Polish"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.symmetry}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'symmetry', value: e },
                                      };
                                      handleChange('symmetry')(selectedObj);
                                    }}
                                    isMulti
                                    options={
                                      diamondTemplateDetail?.symmetryList
                                    }
                                    styles={customStyles}
                                    placeholder="Symmetry"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.diamondType}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: {
                                          name: 'diamondType',
                                          value: e,
                                        },
                                      };
                                      if (e?.value === 'Natural') {
                                        handleChange('growthType')('');
                                      }
                                      handleChange('diamondType')(selectedObj);
                                    }}
                                    options={
                                      diamondTemplateDetail?.diamondTypeList
                                    }
                                    styles={customStyles}
                                    placeholder="Diamond Type"
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="diamondType" />
                                  </span>
                                </Col>
                                {values?.diamondType?.value === 'Lab Grown' && (
                                  <Col md={6} className="mb20 mb10-lg">
                                    <Select
                                      aria-label="Default select example"
                                      className="react_custom_select_Wrapper square"
                                      value={values?.growthType}
                                      onChange={e => {
                                        let selectedObj = {
                                          target: {
                                            name: 'growthType',
                                            value: e,
                                          },
                                        };
                                        handleChange('growthType')(selectedObj);
                                      }}
                                      styles={customStyles}
                                      options={
                                        diamondTemplateDetail?.grownthTypeList
                                      }
                                      placeholder="Growth Type"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="diamondType" />
                                    </span>
                                  </Col>
                                )}
                                <Col md={12}>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                  >
                                    <Form.Control
                                      as="textarea"
                                      rows={4}
                                      placeholder="Any other suggetion"
                                      value={values?.suggetion}
                                      onChange={e =>
                                        handleChange('suggetion')(
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <div className="text-center">
                                <Button
                                  variant="primary"
                                  className="btn_shadow"
                                  type="button"
                                  onClick={() =>
                                    certifiedDiamondRef &&
                                    certifiedDiamondRef.current.handleSubmit()
                                  }
                                >
                                  Submit Request
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={5}>
                          <div className="jewelry_img_wrap">
                            <img
                              src={JewelaryTab1}
                              alt=""
                              width="100%"
                              height="auto"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Tab>
              <Tab eventKey="parcelGoods" title="Parcel Goods">
                <Formik
                  initialValues={initialValuesParcelGoods}
                  innerRef={parcelGoodsRef}
                  validationSchema={parcelGoodsdSchema}
                  onSubmit={async (values, { resetForm }) => {
                    const getString = data => {
                      let arr = [];
                      data?.length > 0 &&
                        data?.forEach(element => {
                          arr.push(element.value);
                        });
                      return arr?.toString() || '';
                    };
                    const inquiryRequest = `${
                      values?.country
                        ? 'Country : ' + values.country?.value + '\n'
                        : ''
                    }${
                      values?.shape
                        ? 'Shape : ' + getString(values.shape) + '\n'
                        : ''
                    }${
                      values?.sizeFrom || values?.sizeTo
                        ? `Size : ${
                            Number(values?.sizeFrom) && Number(values?.sizeTo)
                              ? Number(values?.sizeFrom) +
                                '-' +
                                Number(values?.sizeTo)
                              : Number(values?.sizeFrom)
                              ? Number(values?.sizeFrom)
                              : Number(values?.sizeTo)
                          } \n`
                        : ''
                    }${
                      values?.color
                        ? 'Color : ' + getString(values.color) + '\n'
                        : ''
                    }${
                      values?.clarity
                        ? 'Clarity : ' + getString(values.clarity) + '\n'
                        : ''
                    }${
                      values?.qtyCrt
                        ? 'Total Carats : ' + values.qtyCrt + '\n'
                        : ''
                    }${
                      values?.qtyPcs
                        ? 'Total Pcs : ' + values.qtyPcs + '\n'
                        : ''
                    }${
                      values?.measurement
                        ? 'Measurement : ' + values.measurement + '\n'
                        : ''
                    }${
                      values?.diamondType
                        ? 'DiamondType : ' + values.diamondType?.value + '\n'
                        : ''
                    }${
                      values?.growthType
                        ? 'GrowthType : ' + values.growthType?.value + '\n'
                        : ''
                    }${
                      values?.suggetion ? 'Message : ' + values.suggetion : ''
                    }`;
                    const obj = {
                      FullName: values.name,
                      Email_ID: values.email,
                      Phone_No: values.phoneNo,
                      Message: inquiryRequest,
                      Subject: values.diamondType?.value
                        ? values.diamondType.value
                        : '',
                    };
                    dispatch(createDiamondInquiry(obj));
                    parcelGoodsRef && parcelGoodsRef.current.resetForm();
                  }}
                >
                  {({ handleSubmit, setFieldValue, handleChange, values }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row className="custom_row">
                        <Col md={7}>
                          <div className="Personalize_jewelary_form">
                            <div className="square_input_wrapper">
                              <Row>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput5"
                                  >
                                    <Form.Control
                                      type="text"
                                      name="name"
                                      value={values?.name}
                                      onChange={e =>
                                        handleChange('name')(e.target.value)
                                      }
                                      placeholder="Enter Your Name"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="name" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput6"
                                  >
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      value={values?.email}
                                      onChange={e =>
                                        handleChange('email')(e.target.value)
                                      }
                                      placeholder="Enter Your Email"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="email" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput3"
                                  >
                                    <Select
                                      aria-label="Default select example"
                                      className="react_custom_select_Wrapper square"
                                      value={values?.country}
                                      onChange={e => {
                                        let selectedObj = {
                                          target: { name: 'country', value: e },
                                        };
                                        handleChange('country')(selectedObj);
                                      }}
                                      options={countryListData}
                                      placeholder="Country"
                                      styles={customStyles}
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="country" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput7"
                                  >
                                    <PhoneInput
                                      defaultCountry="IN"
                                      name="phoneNo"
                                      value={values.phoneNo}
                                      onChange={e => {
                                        setFieldValue('phoneNo', e ? e : '');
                                      }}
                                      placeholder="Enter Your Contact no"
                                      className="form-control"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="phoneNo" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Form.Control
                                    type="number"
                                    name="sizeFrom"
                                    onWheel={e => e.target.blur()}
                                    value={values?.sizeFrom}
                                    onKeyDown={disableCalcuSymbol}
                                    min={0}
                                    onChange={e => {
                                      handleChange('sizeFrom')(e.target.value);
                                    }}
                                    placeholder="Enter Carat Size From"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Form.Control
                                    type="number"
                                    name="sizeTo"
                                    onWheel={e => e.target.blur()}
                                    value={values?.sizeTo}
                                    onKeyDown={disableCalcuSymbol}
                                    min={0}
                                    onChange={e => {
                                      handleChange('sizeTo')(e.target.value);
                                    }}
                                    placeholder="Enter Carat Size To"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.shape}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'shape', value: e },
                                      };
                                      handleChange('shape')(selectedObj);
                                    }}
                                    isMulti
                                    options={diamondTemplateDetail?.shapeList}
                                    placeholder="Shape"
                                    styles={customStyles}
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.color}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'color', value: e },
                                      };
                                      handleChange('color')(selectedObj);
                                    }}
                                    isMulti
                                    options={diamondTemplateDetail?.colorList}
                                    placeholder="Color"
                                    styles={customStyles}
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.clarity}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'clarity', value: e },
                                      };
                                      handleChange('clarity')(selectedObj);
                                    }}
                                    styles={customStyles}
                                    isMulti
                                    options={diamondTemplateDetail?.clarityList}
                                    placeholder="Clarity"
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput9"
                                  >
                                    <Form.Control
                                      type="number"
                                      name="qtyCrt"
                                      min={0}
                                      onWheel={e => e.target.blur()}
                                      value={values?.qtyCrt}
                                      onKeyDown={disableCalcuSymbol}
                                      onChange={e => {
                                        handleChange('qtyCrt')(e.target.value);
                                      }}
                                      placeholder="Quantity (Total Carats)"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput8"
                                  >
                                    <Form.Control
                                      type="number"
                                      name="qtyPcs"
                                      onWheel={e => e.target.blur()}
                                      value={values?.qtyPcs}
                                      min={0}
                                      onKeyDown={event => {
                                        if (
                                          event.key === '-' ||
                                          event.key === '+' ||
                                          event.key === '*' ||
                                          event.key === '/' ||
                                          event.key === '.'
                                        ) {
                                          event.preventDefault();
                                        }
                                      }}
                                      onChange={e => {
                                        handleChange('qtyPcs')(e.target.value);
                                      }}
                                      placeholder="Quantity (Pcs.)"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput11"
                                  >
                                    <Form.Control
                                      type="text"
                                      name="measurement"
                                      value={values?.measurement}
                                      onChange={e => {
                                        handleChange('measurement')(
                                          e.target.value,
                                        );
                                      }}
                                      placeholder="MM Size ( Measurements )"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.diamondType}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: {
                                          name: 'diamondType',
                                          value: e,
                                        },
                                      };
                                      handleChange('diamondType')(selectedObj);
                                    }}
                                    styles={customStyles}
                                    options={
                                      diamondTemplateDetail?.diamondTypeList
                                    }
                                    placeholder="Diamond Type"
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="diamondType" />
                                  </span>
                                </Col>
                                {values?.diamondType?.value === 'Lab Grown' && (
                                  <Col md={6} className="mb20 mb10-lg">
                                    <Select
                                      aria-label="Default select example"
                                      className="react_custom_select_Wrapper square"
                                      value={values?.growthType}
                                      onChange={e => {
                                        let selectedObj = {
                                          target: {
                                            name: 'growthType',
                                            value: e,
                                          },
                                        };
                                        handleChange('growthType')(selectedObj);
                                      }}
                                      styles={customStyles}
                                      options={
                                        diamondTemplateDetail?.grownthTypeList
                                      }
                                      placeholder="Growth Type"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="diamondType" />
                                    </span>
                                  </Col>
                                )}
                                <Col md={12}>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea2"
                                  >
                                    <Form.Control
                                      as="textarea"
                                      rows={4}
                                      placeholder="Any other suggetion"
                                      value={values?.suggetion}
                                      onChange={e =>
                                        handleChange('suggetion')(
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <div className="text-center">
                                <Button
                                  variant="primary"
                                  className="btn_shadow"
                                  type="button"
                                  onClick={() =>
                                    parcelGoodsRef &&
                                    parcelGoodsRef.current.handleSubmit()
                                  }
                                >
                                  Submit Request
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={5}>
                          <div className="jewelry_img_wrap">
                            <img
                              src={JewelaryTab2}
                              alt=""
                              width="100%"
                              height="auto"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Tab>
              <Tab eventKey="customiseJewellery" title="Customise Jewellery">
                <Formik
                  initialValues={initialValuesCustomiseJewellery}
                  innerRef={customiseJewelleryRef}
                  validationSchema={customiseJewellerySchema}
                  onSubmit={async (values, { resetForm }) => {
                    const getString = data => {
                      let arr = [];
                      data?.length > 0 &&
                        data?.forEach(element => {
                          arr.push(element.value);
                        });
                      return arr?.toString() || '';
                    };
                    const inquiryRequest = `${
                      values?.country
                        ? 'Country : ' + values.country?.value + '\n'
                        : ''
                    }${
                      values?.type ? 'Type : ' + values.type?.value + '\n' : ''
                    }${
                      values?.metalType
                        ? 'Metal Type : ' + values.metalType?.value + '\n'
                        : ''
                    }${values?.size ? 'Size : ' + values.size + '\n' : ''}${
                      values?.stoneDetails
                        ? 'Stone Detail : ' + values.stoneDetails + '\n'
                        : ''
                    }${
                      values?.qtyPcs ? 'Quantity : ' + values.qtyPcs + '\n' : ''
                    }${
                      values?.budgetSuggetion
                        ? 'Budget Suggetion : ' + values.budgetSuggetion + '\n'
                        : ''
                    }${
                      values?.diamondType
                        ? 'DiamondType : ' + values.diamondType?.value + '\n'
                        : ''
                    }${
                      values?.growthType
                        ? 'GrowthType : ' + values.growthType?.value + '\n'
                        : ''
                    }${
                      values?.suggetion ? 'Message : ' + values.suggetion : ''
                    }`;
                    const obj = {
                      FullName: values.name,
                      Email_ID: values.email,
                      Phone_No: values.phoneNo,
                      Message: inquiryRequest,
                      Subject: values.diamondType?.value
                        ? values.diamondType.value
                        : '',
                    };
                    dispatch(createDiamondInquiry(obj));
                    customiseJewelleryRef &&
                      customiseJewelleryRef.current.resetForm();
                  }}
                >
                  {({ handleSubmit, setFieldValue, handleChange, values }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row className="custom_row">
                        <Col md={7}>
                          <div className="Personalize_jewelary_form">
                            <div className="square_input_wrapper">
                              <Row>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput5"
                                  >
                                    <Form.Control
                                      type="text"
                                      name="name"
                                      value={values?.name}
                                      onChange={e =>
                                        handleChange('name')(e.target.value)
                                      }
                                      placeholder="Enter Your Name"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="name" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput6"
                                  >
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      value={values?.email}
                                      onChange={e =>
                                        handleChange('email')(e.target.value)
                                      }
                                      placeholder="Enter Your Email"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="email" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput3"
                                  >
                                    <Select
                                      aria-label="Default select example"
                                      className="react_custom_select_Wrapper square"
                                      value={values?.country}
                                      onChange={e => {
                                        let selectedObj = {
                                          target: { name: 'country', value: e },
                                        };
                                        handleChange('country')(selectedObj);
                                      }}
                                      options={countryListData}
                                      placeholder="Country"
                                      styles={customStyles}
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="country" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput7"
                                  >
                                    <PhoneInput
                                      defaultCountry="IN"
                                      name="phoneNo"
                                      value={values.phoneNo}
                                      onChange={e => {
                                        setFieldValue('phoneNo', e ? e : '');
                                      }}
                                      placeholder="Enter Your Contact no"
                                      className="form-control"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="phoneNo" />
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.type}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'type', value: e },
                                      };
                                      handleChange('type')(selectedObj);
                                    }}
                                    options={jewelleryTemplateDetail}
                                    placeholder="Jewellery Type"
                                    styles={customStyles}
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.metalType}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: { name: 'metalType', value: e },
                                      };
                                      handleChange('metalType')(selectedObj);
                                    }}
                                    options={metalTypeData}
                                    placeholder="Metal Type"
                                    styles={customStyles}
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Form.Control
                                    type="text"
                                    name="size"
                                    value={values?.size}
                                    onChange={e =>
                                      handleChange('size')(e.target.value)
                                    }
                                    placeholder="Size Details ( E.g, Ring Size Etc )"
                                  />
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Form.Control
                                    type="text"
                                    name="stoneDetails"
                                    value={values?.stoneDetails}
                                    onChange={e =>
                                      handleChange('stoneDetails')(
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Stone Details"
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput8"
                                  >
                                    <Form.Control
                                      type="number"
                                      name="qtyPcs"
                                      onWheel={e => e.target.blur()}
                                      value={values?.qtyPcs}
                                      onKeyDown={event => {
                                        if (
                                          event.key === '-' ||
                                          event.key === '+' ||
                                          event.key === '*' ||
                                          event.key === '/' ||
                                          event.key === '.'
                                        ) {
                                          event.preventDefault();
                                        }
                                      }}
                                      min={0}
                                      onChange={e => {
                                        handleChange('qtyPcs')(e.target.value);
                                      }}
                                      placeholder="Quantity"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group
                                    className="mb20 mb10-lg"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Control
                                      type="text"
                                      name="budgetSuggetion"
                                      value={values?.budgetSuggetion}
                                      onChange={e =>
                                        handleChange('budgetSuggetion')(
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Budget Suggestion"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6} className="mb20 mb10-lg">
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square"
                                    value={values?.diamondType}
                                    onChange={e => {
                                      let selectedObj = {
                                        target: {
                                          name: 'diamondType',
                                          value: e,
                                        },
                                      };
                                      handleChange('diamondType')(selectedObj);
                                    }}
                                    styles={customStyles}
                                    options={
                                      diamondTemplateDetail?.diamondTypeList
                                    }
                                    placeholder="Diamond Type"
                                  />
                                  <span className="text-error">
                                    <ErrorMessage name="diamondType" />
                                  </span>
                                </Col>
                                {values?.diamondType?.value === 'Lab Grown' && (
                                  <Col md={6} className="mb20 mb10-lg">
                                    <Select
                                      aria-label="Default select example"
                                      className="react_custom_select_Wrapper square"
                                      value={values?.growthType}
                                      onChange={e => {
                                        let selectedObj = {
                                          target: {
                                            name: 'growthType',
                                            value: e,
                                          },
                                        };
                                        handleChange('growthType')(selectedObj);
                                      }}
                                      styles={customStyles}
                                      options={
                                        diamondTemplateDetail?.grownthTypeList
                                      }
                                      placeholder="Growth Type"
                                    />
                                    <span className="text-error">
                                      <ErrorMessage name="diamondType" />
                                    </span>
                                  </Col>
                                )}
                                <Col md={12}>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                  >
                                    <Form.Control
                                      as="textarea"
                                      rows={4}
                                      placeholder="Any other suggetion"
                                      value={values?.suggetion}
                                      onChange={e =>
                                        handleChange('suggetion')(
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <div className="text-center">
                                <Button
                                  variant="primary"
                                  className="btn_shadow"
                                  type="button"
                                  onClick={() =>
                                    customiseJewelleryRef &&
                                    customiseJewelleryRef.current.handleSubmit()
                                  }
                                >
                                  Submit Request
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={5}>
                          <div className="jewelry_img_wrap">
                            <img src={JewelaryTab3} alt="" />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(DiamondInquiry);
