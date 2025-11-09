import _ from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
function CaratList({
  dispatch,
  values,
  weightToggle,
  handleChange,
  setFieldValue,
  setWeightToggle,
  diamondFilterData,
  disableCalcuSymbol,
  setDiamondFilterData,
  setSearchDiamondSavedData,
  searchDiamondSavedData,
}) {
  const [selectedCaratSize, setSelectedCaratSize] = useState(
    diamondFilterData?.caratSizeList || [],
  );
  useEffect(() => {
    if (weightToggle) {
      setSelectedCaratSize(diamondFilterData?.caratSizeList || []);
    } else {
      setSelectedCaratSize([]);
    }
  }, [weightToggle]);

  const handleChangeCaratFrom = useCallback(
    value => {
      dispatch(
        setSearchDiamondSavedData({
          ...searchDiamondSavedData,
          caratSizeIds: value,
        }),
      );
    },
    [dispatch, searchDiamondSavedData, setSearchDiamondSavedData],
  );
  const caratFromTextChange = useCallback(
    _.debounce(handleChangeCaratFrom, 800),
  );
  const handleChangeCaratTo = useCallback(
    (sizeFrom, value) => {
      dispatch(
        setSearchDiamondSavedData({
          ...searchDiamondSavedData,
          caratSizeIds: sizeFrom + '-' + value,
        }),
      );
    },
    [dispatch, searchDiamondSavedData, setSearchDiamondSavedData],
  );
  const handleWeightToggle = useCallback(
    index => {
      const updatedCaratSizeList = selectedCaratSize.map((item, index2) => {
        if (index2 === index) {
          return { ...item, classToggle: !item.classToggle };
        }
        return item;
      });
      setSelectedCaratSize(updatedCaratSizeList);
    },
    [selectedCaratSize],
  );

  const handleClearFilter = useCallback(() => {
    setDiamondFilterData({
      ...diamondFilterData,
      caratSizeList: diamondFilterData.caratSizeList.map(item => {
        return { ...item, classToggle: false };
      }),
    });
  }, [diamondFilterData, setDiamondFilterData]);

  const caratToTextChange = useCallback(_.debounce(handleChangeCaratTo, 800));

  return (
    <>
      <Col lg={6}>
        <div className="search_inner_wrap">
          <div className="search_label">
            <h6>Size</h6>
          </div>
          <div className="search_content">
            <div className="input_box_wrapper caret_serach_wrapper">
              {!values.caratSizeIds && !weightToggle && (
                <ul>
                  <li>
                    <Form.Group
                      className="form_group"
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Control
                        type="number"
                        onWheel={e => e.target.blur()}
                        placeholder="From"
                        name="sizeFrom"
                        value={values.sizeFrom}
                        onKeyDown={disableCalcuSymbol}
                        onChange={e => {
                          if (Number(e.target.value) >= 0) {
                            handleChange('sizeFrom')(e.target.value);
                            handleChange('caratSizeIds')('');
                            caratFromTextChange(e.target.value);
                          }
                        }}
                      />
                    </Form.Group>
                  </li>
                  <li>
                    <Form.Group
                      className="form_group"
                      controlId="exampleForm.ControlInput4"
                    >
                      <Form.Control
                        type="number"
                        onWheel={e => e.target.blur()}
                        name="sizeTo"
                        placeholder="To"
                        value={values.sizeTo}
                        onKeyDown={disableCalcuSymbol}
                        onChange={e => {
                          if (Number(e.target.value) >= 0) {
                            handleChange('sizeTo')(e.target.value);
                            handleChange('caratSizeIds')('');
                            caratToTextChange(values.sizeFrom, e.target.value);
                          }
                        }}
                      />
                    </Form.Group>
                  </li>
                </ul>
              )}
              {(weightToggle || values.caratSizeIds !== '') && (
                <ul className="carat_wrapper">
                  <li>
                    <Form.Group
                      className="form_group"
                      controlId="exampleForm.ControlInput4"
                    >
                      <Form.Control
                        type="text"
                        name="caratSizeIds"
                        value={values.caratSizeIds}
                      />
                    </Form.Group>
                  </li>
                </ul>
              )}
              <Button
                variant="primary"
                id="weight-tab"
                size="sm"
                onClick={() => {
                  setWeightToggle(!weightToggle);
                }}
              >
                Size
              </Button>
              {weightToggle && (
                <div className="weight_dropdown">
                  <div className="row">
                    {selectedCaratSize?.map((item, index) => {
                      return (
                        <div className="col-sm-6" key={`carat_${index}`}>
                          <div className="weight_dropdown_row">
                            <div className="checkbox_wdropdown">
                              <Form.Check
                                type="checkbox"
                                id={item.CaratSizeTo}
                                name={item.CaratSizeTo}
                                readOnly
                                value={values.caratSizeIds}
                                checked={item.classToggle ? true : false}
                                onChange={() => {
                                  handleWeightToggle(index);
                                }}
                              />
                              <label
                                htmlFor={item.CaratSizeTo}
                                className={
                                  item.classToggle === true ? 'active' : ''
                                }
                              >
                                {item.CaratSizeTo}
                              </label>
                            </div>
                            <input
                              type="number"
                              onWheel={e => e.target.blur()}
                              className="form-control"
                              id="sizeFrom"
                              name="sizeFrom"
                              placeholder=""
                              min="0"
                              max="100"
                              value={item.classToggle && item.CaratSizeFrom}
                              onChange={e => {
                                handleChange('sizeFrom')(e.target.value);
                                dispatch(
                                  setSearchDiamondSavedData({
                                    ...searchDiamondSavedData,
                                    caratSizeIds: e.target.value,
                                  }),
                                );
                              }}
                            />
                            <span>-</span>
                            <input
                              type="number"
                              onWheel={e => e.target.blur()}
                              className="form-control"
                              id="sizeTo"
                              min="0"
                              max="100"
                              placeholder=""
                              value={item.classToggle && item.CaratSizeTo}
                              onChange={e => {
                                handleChange('sizeTo')(e.target.value);
                                dispatch(
                                  setSearchDiamondSavedData({
                                    ...searchDiamondSavedData,
                                    caratSizeIds:
                                      values.sizeFrom + '-' + e.target.value,
                                  }),
                                );
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="dropdown_btn_wrap">
                    <Button
                      variant="primary"
                      className=" mr10"
                      size="sm"
                      onClick={() => {
                        let dummyData = [];
                        selectedCaratSize?.forEach(item => {
                          if (item.classToggle) {
                            dummyData.push(
                              `${item.CaratSizeFrom}-${item.CaratSizeTo}`,
                            );
                          }
                        });
                        setDiamondFilterData({
                          ...diamondFilterData,
                          caratSizeList: selectedCaratSize,
                        });
                        handleChange('caratSizeIds')(dummyData.toString());
                        handleChange('sizeFrom')('0');
                        handleChange('sizeTo')('0');
                        setWeightToggle(!weightToggle);
                        dispatch(
                          setSearchDiamondSavedData({
                            ...searchDiamondSavedData,
                            caratSizeIds: dummyData.toString(),
                          }),
                        );
                      }}
                    >
                      Ok
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="  mr10"
                      size="sm"
                      onClick={() => {
                        handleChange('caratSizeIds')('');
                        setWeightToggle(!weightToggle);
                        handleClearFilter();
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="outline-primary"
                      className=" mr10"
                      size="sm"
                      onClick={() => setWeightToggle(!weightToggle)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>
      {window.location.pathname !== '/' && (
        <Col lg={4}>
          <div className="search_inner_wrap">
            <div className="search_label">
              <h6>Certificate No</h6>
            </div>
            <div className="search_content">
              <div className="input_box_wrapper caret_serach_wrapper Certificate_wrap">
                <ul className="pe-0">
                  <li>
                    <Form.Group
                      className="form_group"
                      controlId="exampleForm.ControlInput31"
                    >
                      <Form.Control
                        type="text"
                        name="stoneNos"
                        onKeyDown={disableCalcuSymbol}
                        value={values.stoneNos}
                        placeholder="Certificate No."
                        onBlur={e => {
                          const str =
                            values.stoneNos?.trim()?.replaceAll(' ', ',') || '';
                          setFieldValue('stoneNos', str);
                        }}
                        onChange={e => handleChange('stoneNos')(e.target.value)}
                      />
                    </Form.Group>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      )}
    </>
  );
}
export default memo(CaratList);
