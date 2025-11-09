import { memo, useCallback } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MakeList = ({
  dispatch,
  values,
  setFieldValue,
  diamondFilterData,
  setDiamondFilterData,
  searchDiamondSavedData,
  setSearchDiamondSavedData,
  diamondDetailListLoading,
}) => {
  const handleCutToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        cutList: diamondFilterData.cutList.map(item => {
          if (item.Display_Order === id) {
            return { ...item, classToggle: !item.classToggle };
          }
          return item;
        }),
      });
    },
    [diamondFilterData, setDiamondFilterData],
  );
  const handlePolishToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        polishList: diamondFilterData.polishList.map(item => {
          if (item.Display_Order === id) {
            return { ...item, classToggle: !item.classToggle };
          }
          return item;
        }),
      });
    },
    [diamondFilterData, setDiamondFilterData],
  );
  const handleSymmetryToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        symmetryList: diamondFilterData.symmetryList.map(item => {
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
    <>
      <div className="search_inner_wrap">
        <div className="search_label">
          <h6>Make</h6>
        </div>
        <div className="search_content">
          <div className="check_input_wraper">
            <ul>
              <li>
                <div className="checkbox_wrapper">
                  <Form.Check
                    type="checkbox"
                    id="a_3EX"
                    name="myCheckbox"
                    label="3EX"
                    checked={values.checkboxId === 'a_3EX'}
                    readOnly
                    onClick={() => {
                      if (values.checkboxId === 'a_3EX') {
                        setFieldValue('checkboxId', '');
                        setFieldValue('cut', '');
                        setFieldValue('polish', '');
                        setFieldValue('symmetry', '');
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            cut: '',
                            polish: '',
                            symmetry: '',
                          }),
                        );
                      } else {
                        setFieldValue('checkboxId', 'a_3EX');
                        setFieldValue('cut', ['EX', 'ID']);
                        setFieldValue('polish', ['EX', 'ID']);
                        setFieldValue('symmetry', ['EX', 'ID']);
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            cut: ['EX', 'ID'].toString(),
                            polish: ['EX', 'ID'].toString(),
                            symmetry: ['EX', 'ID'].toString(),
                          }),
                        );
                      }
                    }}
                    onChange={() => {
                      setDiamondFilterData({
                        ...diamondFilterData,
                        cutList: diamondFilterData.cutList.map(item => {
                          if (
                            item.DisplayName === 'EX' ||
                            item.DisplayName === 'ID'
                          ) {
                            if (item.DisplayName === 'EX') {
                              if (values.checkboxId === 'a_3VG_Plus') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            } else {
                              if (values.checkboxId === 'a_3VG_Plus') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            }
                          } else {
                            return {
                              ...item,
                              classToggle: false,
                            };
                          }
                        }),
                        symmetryList: diamondFilterData.symmetryList.map(
                          item => {
                            if (
                              item.DisplayName === 'EX' ||
                              item.DisplayName === 'ID'
                            ) {
                              if (item.DisplayName === 'EX') {
                                if (values.checkboxId === 'a_3VG_Plus') {
                                  return {
                                    ...item,
                                    classToggle: item.classToggle,
                                  };
                                } else {
                                  return {
                                    ...item,
                                    classToggle: !item.classToggle,
                                  };
                                }
                              } else {
                                if (values.checkboxId === 'a_3VG_Plus') {
                                  return {
                                    ...item,
                                    classToggle: item.classToggle,
                                  };
                                } else {
                                  return {
                                    ...item,
                                    classToggle: !item.classToggle,
                                  };
                                }
                              }
                            } else {
                              return {
                                ...item,
                                classToggle: false,
                              };
                            }
                          },
                        ),
                        polishList: diamondFilterData.polishList.map(item => {
                          if (
                            item.DisplayName === 'EX' ||
                            item.DisplayName === 'ID'
                          ) {
                            if (item.DisplayName === 'EX') {
                              if (values.checkboxId === 'a_3VG_Plus') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            } else {
                              if (values.checkboxId === 'a_3VG_Plus') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            }
                          } else {
                            return {
                              ...item,
                              classToggle: false,
                            };
                          }
                        }),
                      });
                    }}
                  />
                </div>
              </li>
              <li>
                <div className="checkbox_wrapper">
                  <Form.Check
                    type="checkbox"
                    label="3VG"
                    id="a_3VG"
                    name="myCheckbox"
                    checked={values.checkboxId === 'a_3VG'}
                    readOnly
                    onClick={() => {
                      if (values.checkboxId === 'a_3VG') {
                        setFieldValue('checkboxId', '');
                        setFieldValue('cut', '');
                        setFieldValue('polish', '');
                        setFieldValue('symmetry', '');
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            cut: '',
                            polish: '',
                            symmetry: '',
                          }),
                        );
                      } else {
                        setFieldValue('checkboxId', 'a_3VG');
                        if (
                          values.cut.includes('VG') ||
                          values.polish.includes('VG') ||
                          values.symmetry.includes('VG')
                        ) {
                          const newarrCut = values.cut.filter(
                            item2 => item2 == 'VG',
                          );
                          const newarrPolish = values.polish.filter(
                            item2 => item2 == 'VG',
                          );
                          const newarrSymmetry = values.symmetry.filter(
                            item2 => item2 == 'VG',
                          );
                          setFieldValue('symmetry', newarrSymmetry);
                          setFieldValue('polish', newarrPolish);
                          setFieldValue('cut', newarrCut);
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              cut: newarrCut?.toString(),
                              polish: newarrPolish?.toString(),
                              symmetry: newarrSymmetry?.toString(),
                            }),
                          );
                        } else {
                          setFieldValue('cut', ['VG']);
                          setFieldValue('polish', ['VG']);
                          setFieldValue('symmetry', ['VG']);
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              cut: ['VG'].toString(),
                              polish: ['VG'].toString(),
                              symmetry: ['VG'].toString(),
                            }),
                          );
                        }
                      }
                    }}
                    onChange={() => {
                      setDiamondFilterData({
                        ...diamondFilterData,
                        cutList: diamondFilterData.cutList.map(item => {
                          if (item.DisplayName === 'VG') {
                            if (values.checkboxId === 'a_3VG_Plus') {
                              return {
                                ...item,
                                classToggle: item.classToggle,
                              };
                            } else {
                              return {
                                ...item,
                                classToggle: !item.classToggle,
                              };
                            }
                          } else {
                            return {
                              ...item,
                              classToggle: false,
                            };
                          }
                        }),
                        symmetryList: diamondFilterData.symmetryList.map(
                          item => {
                            if (item.DisplayName === 'VG') {
                              if (values.checkboxId === 'a_3VG_Plus') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            } else {
                              return {
                                ...item,
                                classToggle: false,
                              };
                            }
                          },
                        ),
                        polishList: diamondFilterData.polishList.map(item => {
                          if (item.DisplayName === 'VG') {
                            if (values.checkboxId === 'a_3VG_Plus') {
                              return {
                                ...item,
                                classToggle: item.classToggle,
                              };
                            } else {
                              return {
                                ...item,
                                classToggle: !item.classToggle,
                              };
                            }
                          } else {
                            return {
                              ...item,
                              classToggle: false,
                            };
                          }
                        }),
                      });
                    }}
                  />
                </div>
              </li>
              <li>
                <div className="checkbox_wrapper">
                  <Form.Check
                    type="checkbox"
                    label="3VG+"
                    id="a_3VG_Plus"
                    name="myCheckbox"
                    checked={values.checkboxId === 'a_3VG_Plus'}
                    readOnly
                    onClick={() => {
                      if (values.checkboxId === 'a_3VG_Plus') {
                        setFieldValue('checkboxId', '');
                        setFieldValue('cut', '');
                        setFieldValue('polish', '');
                        setFieldValue('symmetry', '');
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            cut: '',
                            polish: '',
                            symmetry: '',
                          }),
                        );
                      } else {
                        setFieldValue('checkboxId', 'a_3VG_Plus');
                        setFieldValue('cut', ['EX', 'VG', 'ID']);
                        setFieldValue('polish', ['EX', 'VG', 'ID']);
                        setFieldValue('symmetry', ['EX', 'VG', 'ID']);
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            cut: ['EX', 'VG', 'ID'].toString(),
                            polish: ['EX', 'VG', 'ID'].toString(),
                            symmetry: ['EX', 'VG', 'ID'].toString(),
                          }),
                        );
                      }
                    }}
                    onChange={() => {
                      setDiamondFilterData({
                        ...diamondFilterData,
                        cutList: diamondFilterData.cutList.map(item => {
                          if (
                            item.DisplayName === 'EX' ||
                            item.DisplayName === 'VG' ||
                            item.DisplayName === 'ID'
                          ) {
                            if (item.DisplayName === 'EX') {
                              if (values.checkboxId === 'a_3EX') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            } else if (item.DisplayName === 'ID') {
                              if (values.checkboxId === 'a_3EX') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            } else {
                              if (values.checkboxId === 'a_3VG') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            }
                          } else {
                            return {
                              ...item,
                              classToggle: false,
                            };
                          }
                        }),
                        symmetryList: diamondFilterData.symmetryList.map(
                          item => {
                            if (
                              item.DisplayName === 'EX' ||
                              item.DisplayName === 'VG' ||
                              item.DisplayName === 'ID'
                            ) {
                              if (item.DisplayName === 'EX') {
                                if (values.checkboxId === 'a_3EX') {
                                  return {
                                    ...item,
                                    classToggle: item.classToggle,
                                  };
                                } else {
                                  return {
                                    ...item,
                                    classToggle: !item.classToggle,
                                  };
                                }
                              } else if (item.DisplayName === 'ID') {
                                if (values.checkboxId === 'a_3EX') {
                                  return {
                                    ...item,
                                    classToggle: item.classToggle,
                                  };
                                } else {
                                  return {
                                    ...item,
                                    classToggle: !item.classToggle,
                                  };
                                }
                              } else {
                                if (values.checkboxId === 'a_3VG') {
                                  return {
                                    ...item,
                                    classToggle: item.classToggle,
                                  };
                                } else {
                                  return {
                                    ...item,
                                    classToggle: !item.classToggle,
                                  };
                                }
                              }
                            } else {
                              return {
                                ...item,
                                classToggle: false,
                              };
                            }
                          },
                        ),
                        polishList: diamondFilterData.polishList.map(item => {
                          if (
                            item.DisplayName === 'EX' ||
                            item.DisplayName === 'VG' ||
                            item.DisplayName === 'ID'
                          ) {
                            if (item.DisplayName === 'EX') {
                              if (values.checkboxId === 'a_3EX') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            } else if (item.DisplayName === 'ID') {
                              if (values.checkboxId === 'a_3EX') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            } else {
                              if (values.checkboxId === 'a_3VG') {
                                return {
                                  ...item,
                                  classToggle: item.classToggle,
                                };
                              } else {
                                return {
                                  ...item,
                                  classToggle: !item.classToggle,
                                };
                              }
                            }
                          } else {
                            return {
                              ...item,
                              classToggle: false,
                            };
                          }
                        }),
                      });
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Row>
        <Col xl={4}>
          <div className="search_inner_wrap">
            <div className="search_label">
              <h6>Cut</h6>
            </div>
            <div className="search_content">
              <div className="check_input_wraper">
                <ul className="flex-nowrap scroll_wrapper3">
                  {diamondFilterData?.cutList?.map((item, index) => {
                    return (
                      <li key={`cut_${index}`}>
                        <div className="checkbox_wrapper">
                          <Form.Check
                            type="checkbox"
                            id={`cut_${item.MasterTypeValue_Code}`}
                            name={item.MasterTypeValue_Code}
                            label={item.MasterTypeValue_Code}
                            checked={item.classToggle ? true : false}
                            readOnly
                            onChange={e => {
                              handleCutToggle(item.Display_Order);
                              const { checked } = e.target;
                              if (checked) {
                                if (
                                  values.cut.includes(item.MasterTypeValue_Code)
                                ) {
                                  const newarr = values.cut.filter(
                                    item2 =>
                                      item2 !== item.MasterTypeValue_Code,
                                  );
                                  setFieldValue('cut', newarr);
                                  dispatch(
                                    setSearchDiamondSavedData({
                                      ...searchDiamondSavedData,
                                      cut: newarr?.toString(),
                                    }),
                                  );
                                } else {
                                  setFieldValue('cut', [
                                    ...values.cut,
                                    item.MasterTypeValue_Code,
                                  ]);
                                  dispatch(
                                    setSearchDiamondSavedData({
                                      ...searchDiamondSavedData,
                                      cut: [
                                        ...values.cut,
                                        item.MasterTypeValue_Code,
                                      ].toString(),
                                    }),
                                  );
                                }
                              } else {
                                setFieldValue(
                                  'cut',
                                  values.cut.filter(
                                    v => v !== item.MasterTypeValue_Code,
                                  ),
                                );
                                dispatch(
                                  setSearchDiamondSavedData({
                                    ...searchDiamondSavedData,
                                    cut: values.cut
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
                      <Skeleton height={40} style={{ width: '40%' }} />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={4}>
          <div className="search_inner_wrap">
            <div className="search_label polish_label">
              <h6>Polish</h6>
            </div>
            <div className="search_content">
              <div className="check_input_wraper">
                <ul className="flex-nowrap scroll_wrapper4">
                  {diamondFilterData?.polishList?.map((item, index) => {
                    return (
                      <li key={`polish_${index}`}>
                        <div className="checkbox_wrapper">
                          <Form.Check
                            type="checkbox"
                            id={`polish_${item.MasterTypeValue_Code}`}
                            name={item.MasterTypeValue_Code}
                            label={item.MasterTypeValue_Code}
                            checked={item.classToggle ? true : false}
                            readOnly
                            onChange={e => {
                              handlePolishToggle(item.Display_Order);
                              const { checked } = e.target;
                              if (checked) {
                                if (
                                  values.polish.includes(
                                    item.MasterTypeValue_Code,
                                  )
                                ) {
                                  const newarr = values.polish.filter(
                                    item2 =>
                                      item2 !== item.MasterTypeValue_Code,
                                  );
                                  setFieldValue('polish', newarr);
                                  dispatch(
                                    setSearchDiamondSavedData({
                                      ...searchDiamondSavedData,
                                      polish: newarr?.toString(),
                                    }),
                                  );
                                } else {
                                  setFieldValue('polish', [
                                    ...values.polish,
                                    item.MasterTypeValue_Code,
                                  ]);
                                  dispatch(
                                    setSearchDiamondSavedData({
                                      ...searchDiamondSavedData,
                                      polish: [
                                        ...values.polish,
                                        item.MasterTypeValue_Code,
                                      ].toString(),
                                    }),
                                  );
                                }
                              } else {
                                setFieldValue(
                                  'polish',
                                  values.polish.filter(
                                    v => v !== item.MasterTypeValue_Code,
                                  ),
                                );
                                dispatch(
                                  setSearchDiamondSavedData({
                                    ...searchDiamondSavedData,
                                    polish: values.polish
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
                      <Skeleton height={40} style={{ width: '50%' }} />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={4}>
          <div className="search_inner_wrap">
            <div className="search_label symmetry_label">
              <h6>Symmetry</h6>
            </div>
            <div className="search_content">
              <div className="check_input_wraper">
                <ul className="flex-nowrap scroll_wrapper5">
                  {diamondFilterData?.symmetryList?.map((item, index) => {
                    return (
                      <li key={`symmetry_${index}`}>
                        <div className="checkbox_wrapper">
                          <Form.Check
                            type="checkbox"
                            id={`symmetry_${item.MasterTypeValue_Code}`}
                            name={item.MasterTypeValue_Code}
                            label={item.MasterTypeValue_Code}
                            checked={item.classToggle ? true : false}
                            readOnly
                            onChange={e => {
                              handleSymmetryToggle(item.Display_Order);
                              const { checked } = e.target;
                              if (checked) {
                                if (
                                  values.symmetry.includes(
                                    item.MasterTypeValue_Code,
                                  )
                                ) {
                                  const newarr = values.symmetry.filter(
                                    item2 =>
                                      item2 !== item.MasterTypeValue_Code,
                                  );
                                  setFieldValue('symmetry', newarr);
                                  dispatch(
                                    setSearchDiamondSavedData({
                                      ...searchDiamondSavedData,
                                      symmetry: newarr?.toString(),
                                    }),
                                  );
                                } else {
                                  setFieldValue('symmetry', [
                                    ...values.symmetry,
                                    item.MasterTypeValue_Code,
                                  ]);
                                }
                                dispatch(
                                  setSearchDiamondSavedData({
                                    ...searchDiamondSavedData,
                                    symmetry: [
                                      ...values.symmetry,
                                      item.MasterTypeValue_Code,
                                    ].toString(),
                                  }),
                                );
                              } else {
                                setFieldValue(
                                  'symmetry',
                                  values.symmetry.filter(
                                    v => v !== item.MasterTypeValue_Code,
                                  ),
                                );
                                dispatch(
                                  setSearchDiamondSavedData({
                                    ...searchDiamondSavedData,
                                    symmetry: values.symmetry
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
                      <Skeleton height={40} style={{ width: '30%' }} />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default memo(MakeList);
