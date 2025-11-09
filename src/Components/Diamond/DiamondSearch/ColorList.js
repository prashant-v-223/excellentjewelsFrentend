import { memo, useCallback } from 'react';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Select from 'react-select';

function ColorList({
  dispatch,
  values,
  setFieldValue,
  handleChange,
  diamondFilterData,
  setIsFancyColor,
  setSearchDiamondSavedData,
  searchDiamondSavedData,
  setDiamondFilterData,
  diamondDetailListLoading,
}) {
  const handleColorWhiteToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        colorWhiteList: diamondFilterData.colorWhiteList.map(item => {
          if (item.Display_Order === id) {
            return { ...item, classToggle: !item.classToggle };
          }
          return item;
        }),
      });
    },
    [diamondFilterData, setDiamondFilterData],
  );

  return (
    <div className="search_inner_wrap align-items-start">
      <div className="search_label">
        <h6>Color</h6>
      </div>
      <div className="search_content">
        <div className="fancy_color_tab_wrapper">
          <div className="tab_design_one">
            <Tabs
              id="fancy_color_tab"
              activeKey={values.colorType}
              onSelect={k => {
                if (k === '1') {
                  setFieldValue('colorType', 1);
                  setFieldValue('fancyColor', '');
                  setFieldValue('fancyIntensity', '');
                  setFieldValue('fancyOvertone', '');
                  dispatch(setIsFancyColor(1));
                  dispatch(
                    setSearchDiamondSavedData({
                      ...searchDiamondSavedData,
                      colorType: 1,
                      fancyColor: '',
                      fancyIntensity: '',
                      fancyOvertone: '',
                    }),
                  );
                } else {
                  setFieldValue('colorType', 2);
                  setFieldValue('whiteColor', []);
                  dispatch(setIsFancyColor(2));
                  dispatch(
                    setSearchDiamondSavedData({
                      ...searchDiamondSavedData,
                      colorType: 2,
                      whiteColor: [],
                    }),
                  );
                }
              }}
            >
              <Tab eventKey="1" title="White" name="colorType">
                <div className="check_input_wraper">
                  <ul className="scroll_wrapper1 flex-nowrap">
                    {diamondFilterData?.colorWhiteList?.map((item, index) => {
                      return (
                        <li key={`color_white_${index}`}>
                          <div className="checkbox_wrapper">
                            <Form.Check
                              type="checkbox"
                              id={item.MasterTypeValue_Code}
                              name={item.MasterTypeValue_Code}
                              label={item.MasterTypeValue_Code}
                              checked={values.whiteColor.includes(
                                item.MasterTypeValue_Code,
                              )}
                              readOnly
                              onClick={e => {
                                handleColorWhiteToggle(item.Display_Order);
                                const { checked } = e.target;
                                if (checked) {
                                  if (
                                    values.whiteColor.includes(
                                      item.MasterTypeValue_Code,
                                    )
                                  ) {
                                    const newarr = values.whiteColor.filter(
                                      item2 =>
                                        item2 !== item.MasterTypeValue_Code,
                                    );
                                    setFieldValue('whiteColor', newarr);
                                    dispatch(
                                      setSearchDiamondSavedData({
                                        ...searchDiamondSavedData,
                                        colorType: values.colorType,
                                        whiteColor: newarr?.toString(),
                                      }),
                                    );
                                  } else {
                                    setFieldValue('whiteColor', [
                                      ...values.whiteColor,
                                      item.MasterTypeValue_Code,
                                    ]);
                                    dispatch(
                                      setSearchDiamondSavedData({
                                        ...searchDiamondSavedData,
                                        colorType: values.colorType,
                                        whiteColor: [
                                          ...values.whiteColor,
                                          item.MasterTypeValue_Code,
                                        ].toString(),
                                      }),
                                    );
                                  }
                                } else {
                                  setFieldValue(
                                    'whiteColor',
                                    values.whiteColor.filter(
                                      v => v !== item.MasterTypeValue_Code,
                                    ),
                                  );
                                  dispatch(
                                    setSearchDiamondSavedData({
                                      ...searchDiamondSavedData,
                                      colorType: values.colorType,
                                      whiteColor: values.whiteColor
                                        .filter(
                                          v => v !== item.MasterTypeValue_Code,
                                        )
                                        .toString(),
                                    }),
                                  );
                                }
                              }}
                            />
                          </div>
                        </li>
                      );
                    })}
                    {diamondDetailListLoading && (
                      <div className="skelleton_Wrapper">
                        <Skeleton height={40} style={{ width: '70%' }} />
                      </div>
                    )}
                  </ul>
                </div>
              </Tab>
              <Tab eventKey="2" title="Fancy" name="colorType">
                <div className="check_input_wraper">
                  <Row className="gy-2">
                    <Col md={4}>
                      <Select
                        className="react_custom_select_Wrapper"
                        placeholder="Fancy Color"
                        value={values.fancyColor}
                        onChange={e => {
                          let selectedObj = {
                            target: {
                              name: 'fancyColor',
                              value: e,
                            },
                          };
                          handleChange('fancyColor')(selectedObj);
                          let finalFancyColor = selectedObj.target.value.map(
                            item => {
                              return item.value;
                            },
                          );
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              colorType: values.colorType,
                              fancyColor: finalFancyColor.toString(),
                            }),
                          );
                        }}
                        isMulti
                        options={diamondFilterData?.fancycolorList}
                        styles={{
                          backgroundColor: 'red',
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
                    </Col>
                    <Col md={4}>
                      <Select
                        className="react_custom_select_Wrapper"
                        placeholder="Fancy Intensity"
                        value={values.fancyIntensity}
                        onChange={e => {
                          let selectedObj = {
                            target: {
                              name: 'fancyIntensity',
                              value: e,
                            },
                          };
                          handleChange('fancyIntensity')(selectedObj);
                          let finalFancyIntensity =
                            selectedObj.target.value.map(item => {
                              return item.value;
                            });
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              colorType: values.colorType,
                              fancyIntensity: finalFancyIntensity.toString(),
                            }),
                          );
                        }}
                        isMulti
                        options={diamondFilterData?.fancyintensityList}
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
                    </Col>
                    <Col md={4}>
                      <Select
                        className="react_custom_select_Wrapper"
                        placeholder="Fancy overtone"
                        value={values.fancyOvertone}
                        onChange={e => {
                          let selectedObj = {
                            target: {
                              name: 'fancyOvertone',
                              value: e,
                            },
                          };
                          handleChange('fancyOvertone')(selectedObj);
                          let finalFancyOvertone = selectedObj.target.value.map(
                            item => {
                              return item.value;
                            },
                          );
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              colorType: values.colorType,
                              fancyOvertone: finalFancyOvertone.toString(),
                            }),
                          );
                        }}
                        isMulti
                        options={diamondFilterData?.fancyovertonList}
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
                    </Col>
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(ColorList);
