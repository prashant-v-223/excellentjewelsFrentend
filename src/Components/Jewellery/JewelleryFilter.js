import { getJewelleryFilterData } from 'Components/Redux/reducers/jewellery.slice';
import { disableCalcuSymbol } from 'Helper/CommonHelper';
import _ from 'lodash';
import React, { memo, useCallback } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import RangeSlider from 'react-range-slider-input';
import { useDispatch } from 'react-redux';
import NoImageAvailable from '../../Assets/Images/diamond-not-found.svg';
import ResetIcon from '../../Assets/Images/reset.svg';

const JewelleryFilter = ({
  jewelleryBaseMetal,
  jewelleryFilterData,
  setJewelleryFilterData,
  jewelleryFilterCategory,
  jewelleryParameterDetail,
  initialValuesForJewellerySearch,
}) => {
  const dispatch = useDispatch();

  const onSelectCategory = useCallback(
    async MasterTypeValue => {
      let jMasterTypeValue_IdValue = '';
      if (
        jewelleryFilterData?.type_ID &&
        jewelleryFilterData.type_ID === MasterTypeValue
      ) {
        jMasterTypeValue_IdValue = '';
        setJewelleryFilterData(prevState => ({
          ...prevState,
          type_ID: '',
          sub_Type_ID: [],
        }));
      } else {
        
        jMasterTypeValue_IdValue = MasterTypeValue;
        setJewelleryFilterData(prevState => ({
          ...prevState,
          type_ID: MasterTypeValue,
          sub_Type_ID: [],
        }));
      }
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          type_ID: jMasterTypeValue_IdValue,
          sub_Type_ID: [],
        }),
      );
    },
    [dispatch, jewelleryFilterData, setJewelleryFilterData],
  );

  const onSelectSubCategory = useCallback(
    (isChecked, MasterSubTypeValue) => {
      let productTypeIdArr =
        jewelleryFilterData?.sub_Type_ID?.length > 0
          ? [...jewelleryFilterData.sub_Type_ID]
          : [];
      if (isChecked) {
        if (productTypeIdArr.includes(MasterSubTypeValue)) {
          productTypeIdArr = productTypeIdArr.filter(
            item2 => item2 !== MasterSubTypeValue,
          );
        } else {
          productTypeIdArr = [...productTypeIdArr, MasterSubTypeValue];
        }
      } else {
        productTypeIdArr = productTypeIdArr?.filter(
          v => v !== MasterSubTypeValue,
        );
      }
      setJewelleryFilterData(prevState => ({
        ...prevState,
        sub_Type_ID: productTypeIdArr,
      }));
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          sub_Type_ID: productTypeIdArr,
        }),
      );
    },
    [dispatch, jewelleryFilterData, setJewelleryFilterData],
  );

  const onChangePriceHandler = useCallback(
    value => {
      setJewelleryFilterData(prevState => ({
        ...prevState,
        priceF: value[0],
        priceT: value[1],
      }));
    },
    [setJewelleryFilterData],
  );

  const handlePriceSearchChange = useCallback(
    (value, jewelleryFilterValue) => {
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterValue,
          priceF: value[0],
          priceT: value[1],
        }),
      );
    },
    [dispatch],
  );

  const debounceHandlePriceTextChange = React.useCallback(
    _.debounce(handlePriceSearchChange, 800),
    [],
  );

  const handleWeightSearchChange = useCallback(
    (value, jewelleryFilterValue) => {
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterValue,
          weightF: value[0],
          weightT: value[1],
        }),
      );
    },
    [dispatch],
  );

  const debounceHandleWeightTextChange = React.useCallback(
    _.debounce(handleWeightSearchChange, 800),
    [],
  );

  const onChangeWeightHandler = useCallback(
    value => {
      setJewelleryFilterData(prevState => ({
        ...prevState,
        weightF: value[0],
        weightT: value[1],
      }));
    },
    [setJewelleryFilterData],
  );

  const onShapeSelectChange = useCallback(
    (e, shapeObj) => {
      let shapeIdArr =
        jewelleryFilterData?.shape_ID?.length > 0
          ? [...jewelleryFilterData.shape_ID]
          : [];
      if (e.target.checked) {
        if (shapeIdArr.includes(shapeObj.MasterTypeValue_Id)) {
          shapeIdArr = shapeIdArr.filter(
            item2 => item2 !== shapeObj.MasterTypeValue_Id,
          );
        } else {
          shapeIdArr = [...shapeIdArr, shapeObj.MasterTypeValue_Id];
        }
      } else {
        shapeIdArr = shapeIdArr.filter(v => v !== shapeObj.MasterTypeValue_Id);
      }
      setJewelleryFilterData(prevState => ({
        ...prevState,
        shape_ID: shapeIdArr,
      }));
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          shape_ID: shapeIdArr,
        }),
      );
    },
    [dispatch, jewelleryFilterData, setJewelleryFilterData],
  );

  const onSelectMetalHandler = useCallback(
    (isChecked, GoldType_Id) => {
      let metalTypeArr =
        jewelleryFilterData?.metal_type?.length > 0
          ? [...jewelleryFilterData.metal_type]
          : [];
      if (isChecked) {
        if (metalTypeArr.includes(GoldType_Id)) {
          metalTypeArr = metalTypeArr?.filter(item2 => item2 !== GoldType_Id);
        } else {
          metalTypeArr = [...metalTypeArr, GoldType_Id];
        }
      } else {
        metalTypeArr = metalTypeArr?.filter(v => v !== GoldType_Id);
      }
      setJewelleryFilterData(prevState => ({
        ...prevState,
        metal_type: metalTypeArr,
      }));
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          metal_type: metalTypeArr,
        }),
      );
    },
    [dispatch, jewelleryFilterData, setJewelleryFilterData],
  );

  const onSelectLocationHandler = useCallback(
    (isChecked, locationId) => {
      let locationArr =
        jewelleryFilterData?.location?.length > 0
          ? [...jewelleryFilterData.location]
          : [];
      if (isChecked) {
        if (locationArr.includes(locationId)) {
          locationArr = locationArr?.filter(item2 => item2 !== locationId);
        } else {
          locationArr = [...locationArr, locationId];
        }
      } else {
        locationArr = locationArr?.filter(v => v !== locationId);
      }
      setJewelleryFilterData(prevState => ({
        ...prevState,
        location: locationArr,
      }));
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          location: locationArr,
        }),
      );
    },
    [dispatch, jewelleryFilterData, setJewelleryFilterData],
  );

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const handlClearFilter = useCallback(() => {
    setJewelleryFilterData(initialValuesForJewellerySearch);
    dispatch(getJewelleryFilterData(initialValuesForJewellerySearch));
  }, [dispatch, initialValuesForJewellerySearch, setJewelleryFilterData]);

  return (
    <div className="jewellery_filter">
      <h5>
        Filter
        <span onClick={handlClearFilter}>
          <img src={ResetIcon} alt="reset-icon" />
        </span>
      </h5>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body>
            <Accordion
              className="inner_accordian"
              activeKey={
                jewelleryFilterData?.type_ID
                  ? jewelleryFilterData?.type_ID?.toString()
                  : ''
              }
            >
              {jewelleryFilterCategory?.map((item, index) => {
                return (
                  <Accordion.Item
                    key={`category_${index}`}
                    eventKey={item?.MasterTypeValue?.toString()}
                  >
                    <Accordion.Header
                      className={
                        jewelleryFilterData?.type_ID ===
                        item?.MasterTypeValue
                          ? 'active'
                          : ''
                      }
                      onClick={() =>
                        onSelectCategory(item?.MasterTypeValue)
                      }
                    >
                      {item?.MasterTypeValue ? item.MasterTypeValue : ''}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="common_checkbox_wrapper">
                        {item?.SubType?.map((subItem, subIndex) => {
                          return (
                            <Form.Check
                              type="checkbox"
                              key={`sub_category_${subIndex}`}
                              name="product_Type_ID"
                              id={subItem.MasterSubTypeValue}
                              label={subItem.MasterSubTypeValue}
                              readOnly
                              checked={jewelleryFilterData?.sub_Type_ID?.includes(
                                subItem?.MasterSubTypeValue,
                              )}
                              onClick={e =>
                                onSelectSubCategory(
                                  e.target.checked,
                                  subItem?.MasterSubTypeValue,
                                )
                              }
                            />
                          );
                        })}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            <RangeSlider
              value={[jewelleryFilterData.priceF, jewelleryFilterData.priceT]}
              min={0}
              max={1000000}
              onInput={e => {
                onChangePriceHandler(e);
                debounceHandlePriceTextChange(e, jewelleryFilterData);
              }}
            />
            <div className="range_value d-flex justify-content-between align-content-center">
              <div className="from_wrap w-50">
                <input
                  type="number"
                  onWheel={e => e.target.blur()}
                  className="value"
                  value={
                    jewelleryFilterData?.priceF ? jewelleryFilterData.priceF : 0
                  }
                  onKeyDown={disableCalcuSymbol}
                  onChange={e => {
                    const value = Number(e.target.value) || 0;
                    if (value >= 0 && value <= 1000000) {
                      setJewelleryFilterData(prevState => ({
                        ...prevState,
                        priceF: value,
                      }));
                      debounceHandlePriceTextChange(
                        [value, jewelleryFilterData.priceT],
                        jewelleryFilterData,
                      );
                    }
                  }}
                />
                <span>$</span>
              </div>
              <div className="from_wrap to_wrap w-50">
                <input
                  type="number"
                  onWheel={e => e.target.blur()}
                  className="value"
                  value={
                    jewelleryFilterData?.priceT ? jewelleryFilterData.priceT : 0
                  }
                  onKeyDown={disableCalcuSymbol}
                  onChange={e => {
                    const value = Number(e.target.value) || 0;
                    if (value >= 0 && value <= 1000000) {
                      setJewelleryFilterData(prevState => ({
                        ...prevState,
                        priceT: value,
                      }));
                      debounceHandlePriceTextChange(
                        [jewelleryFilterData.priceF, value],
                        jewelleryFilterData,
                      );
                    }
                  }}
                />
                <span>$</span>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Gold Weight</Accordion.Header>
          <Accordion.Body>
            <RangeSlider
              value={[jewelleryFilterData.weightF, jewelleryFilterData.weightT]}
              min={0}
              max={100}
              onInput={e => {
                onChangeWeightHandler(e);
                debounceHandleWeightTextChange(e, jewelleryFilterData);
              }}
            />
            <div className="range_value d-flex justify-content-between align-content-center">
              <div className="from_wrap gram_sign w-50">
                <input
                  type="text"
                  className="value"
                  value={
                    jewelleryFilterData?.weightF
                      ? jewelleryFilterData.weightF
                      : 0
                  }
                  onKeyDown={disableCalcuSymbol}
                  onChange={e => {
                    const value = Number(e.target.value) || 0;
                    if (value >= 0 && value <= 2000) {
                      setJewelleryFilterData(prevState => ({
                        ...prevState,
                        weightF: value,
                      }));
                      debounceHandleWeightTextChange(
                        [value, jewelleryFilterData.weightT],
                        jewelleryFilterData,
                      );
                    }
                  }}
                />
                <span>gm</span>
              </div>
              <div className="from_wrap to_wrap gram_sign w-50">
                <input
                  type="text"
                  className="value"
                  value={
                    jewelleryFilterData?.weightT
                      ? jewelleryFilterData.weightT
                      : 0
                  }
                  onKeyDown={disableCalcuSymbol}
                  onChange={e => {
                    const value = Number(e.target.value) || 0;
                    if (value >= 0 && value <= 2000) {
                      setJewelleryFilterData(prevState => ({
                        ...prevState,
                        weightT: value,
                      }));
                      debounceHandleWeightTextChange(
                        [jewelleryFilterData.weightF, value],
                        jewelleryFilterData,
                      );
                    }
                  }}
                />
                <span>gm</span>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Shape</Accordion.Header>
          <Accordion.Body>
            <div className="filter_shape_checkbox shape_select jewellery_shape_wrapper">
              <ul>
                {jewelleryParameterDetail?.shapeList?.map((shapeObj, index) => {
                  return (
                    <li key={`shape_li_${index}`}>
                      <div className="custom_checkbox_shape">
                        <input
                          type="checkbox"
                          id={shapeObj.MasterTypeValue_Code}
                          name={shapeObj.MasterTypeValue_Code}
                          key={`shape_${index}`}
                          checked={jewelleryFilterData?.shape_ID?.includes(
                            shapeObj.MasterTypeValue_Id,
                          )}
                          readOnly
                          onClick={e => onShapeSelectChange(e, shapeObj)}
                        />
                        <label htmlFor={shapeObj.MasterTypeValue_Code}>
                          <span>
                            <img
                              src={`http://72.61.170.111:8088/uploads/Diamonds/${shapeObj.MasterTypeValue_Code?.replaceAll(
                                ' ',
                                '',
                              )}.svg`}
                              alt={shapeObj.MasterTypeValue_Code}
                              onError={handleImageError}
                            />
                            <h5>{shapeObj.MasterTypeValue_Code}</h5>
                          </span>
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Metal</Accordion.Header>
          <Accordion.Body>
            <div className="common_checkbox_wrapper">
              {jewelleryBaseMetal?.map((metal, index) => {
                return (
                  <Form.Check
                    type="checkbox"
                    key={`metal_${index}`}
                    name="metal_type"
                    id={`metal_${metal.GoldType_Id}`}
                    label={`${metal.PurityCodeName} ${metal.ColorCodeName}`}
                    readOnly
                    checked={jewelleryFilterData.metal_type.includes(
                      metal.GoldType_Id,
                    )}
                    onClick={e =>
                      onSelectMetalHandler(e.target.checked, metal.GoldType_Id)
                    }
                  />
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="5" className="pb0">
          <Accordion.Header>Location</Accordion.Header>
          <Accordion.Body>
            <div className="common_checkbox_wrapper">
              {jewelleryParameterDetail?.locationList?.map(
                (location, index) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      key={`location_${index}`}
                      name="location"
                      id={`location_${location.MasterTypeValue_Id}`}
                      label={location.MasterTypeValue_Code}
                      readOnly
                      checked={jewelleryFilterData.location.includes(
                        location.MasterTypeValue_Id,
                      )}
                      onClick={e =>
                        onSelectLocationHandler(
                          e.target.checked,
                          location.MasterTypeValue_Id,
                        )
                      }
                    />
                  );
                },
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default memo(JewelleryFilter);
