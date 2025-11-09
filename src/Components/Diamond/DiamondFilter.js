import React, { memo, useCallback, useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import RangeSlider from 'react-range-slider-input';

const DiamondFilter = () => {
  const [value, setValue] = useState({
    table: [0, 100],
    depth: [0, 100],
    lWRatio: [0, 2.7],
    length: [3, 20],
    height: [2, 12],
    crownAngle: [23, 40],
    pavilionAngle: [38, 43],
    pricePerCarat: [0, 50000],
  });
  const onSetValue = useCallback((name, val) => {
    setValue(prev => ({ ...prev, [name]: val }));
  }, []);
  return (
    <div className="left_filter_wrapper">
      <div className="filter_inner_wrapper">
        <Accordion
          className="accordian_design_two"
          defaultActiveKey="0"
          key="0"
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Search by GIA/IGI Cert No.</Accordion.Header>
            <Accordion.Body>
              <Form className="search_box">
                <div className="saerch_input">
                  <Form.Control type="text" placeholder="Search" />
                </div>
                <div className="search_btn">
                  <Button
                    variant="primary"
                    type="submit"
                    className="rounded-pill btn_shadow"
                    size="sm"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion
          className="accordian_design_two"
          defaultActiveKey="1"
          key="1"
        >
          <Accordion.Item eventKey="1">
            <Accordion.Header>Advance Diamond Filters</Accordion.Header>
            <Accordion.Body>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Fluorescence</h6>
                <div className="check_input_wraper small">
                  <ul>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="VeryStrong"
                          label="Very Strong"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="Strong1"
                          label="Strong"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="Medium1"
                          label="Medium"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="Faint1" label="Faint" />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="None1" label="None" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Table</h6>
                <RangeSlider
                  value={value.table}
                  min={0}
                  max={100}
                  onInput={e => onSetValue('table', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    <span>{value.table[0] ? value.table[0] : 0}</span>%
                  </div>
                  <div className="value">
                    <span>{value.table[1] ? value.table[1] : 0}</span>%
                  </div>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Depth</h6>
                <RangeSlider
                  value={value.depth}
                  min={0}
                  max={100}
                  onInput={e => onSetValue('depth', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    <span>{value.depth[0] ? value.depth[0] : 0}</span>%
                  </div>
                  <div className="value">
                    <span>{value.depth[1] ? value.depth[1] : 0}</span>%
                  </div>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Polish</h6>
                <div className="check_input_wraper small">
                  <ul>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="Good" label="Good" />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="VeryGood"
                          label="Very Good"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="Excellent "
                          label="Excellent "
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Symmetry</h6>
                <div className="check_input_wraper small">
                  <ul>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="Good1" label="Good" />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="VeryGood1"
                          label="Very Good"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="Excellent1 "
                          label="Excellent "
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="Idel " label="Idel " />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">L/W Ratio</h6>
                <RangeSlider
                  value={value.lWRatio}
                  min={0}
                  max={2.75}
                  step={0.1}
                  onInput={e => onSetValue('lWRatio', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    <span>{value.lWRatio[0] ? value.lWRatio[0] : 0}</span>
                  </div>
                  <div className="value">
                    <span>{value.lWRatio[1] ? value.lWRatio[1] : 0}</span>
                  </div>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Length</h6>
                <RangeSlider
                  value={value.length}
                  min={3}
                  max={20}
                  step={1}
                  onInput={e => onSetValue('length', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    <span>{value.length[0] ? value.length[0] : 0}</span>mm
                  </div>
                  <div className="value">
                    <span>{value.length[1] ? value.length[1] : 0}</span>mm
                  </div>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Height</h6>
                <RangeSlider
                  value={value.height}
                  min={2}
                  max={12}
                  step={1}
                  onInput={e => onSetValue('height', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    <span>{value.height[0] ? value.height[0] : 0}</span>mm
                  </div>
                  <div className="value">
                    <span>{value.height[1] ? value.height[1] : 0}</span>mm
                  </div>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Crown Angle</h6>
                <RangeSlider
                  value={value.crownAngle}
                  min={23}
                  max={40}
                  step={1}
                  onInput={e => onSetValue('crownAngle', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    <span>{value.crownAngle[0] ? value.crownAngle[0] : 0}</span>
                    °
                  </div>
                  <div className="value">
                    <span>{value.crownAngle[1] ? value.crownAngle[1] : 0}</span>
                    °
                  </div>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Pavilion Angle</h6>
                <RangeSlider
                  value={value.pavilionAngle}
                  min={38}
                  max={43}
                  step={1}
                  onInput={e => onSetValue('pavilionAngle', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    <span>
                      {value.pavilionAngle[0] ? value.pavilionAngle[0] : 0}
                    </span>
                    °
                  </div>
                  <div className="value">
                    <span>
                      {value.pavilionAngle[1] ? value.pavilionAngle[1] : 0}
                    </span>
                    °
                  </div>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Girdle Thickness</h6>
                <div className="check_input_wraper small">
                  <ul>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="ExtraThin"
                          label="Extra Thin"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="VeryThin"
                          label="Very Thin"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="Thin" label="Thin" />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="Med" label="Med." />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="SlickThin"
                          label="Slick Thin"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check type="checkbox" id="Thick" label="Thick" />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="VeryThick"
                          label="Very Thick"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="checkbox_wrapper">
                        <Form.Check
                          type="checkbox"
                          id="ExtraThick"
                          label="Extra Thick"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="filter_box mb40 mb25-xl">
                <h6 className="mb20">Price Per Carat</h6>
                <RangeSlider
                  value={value.pricePerCarat}
                  min={0}
                  max={50000}
                  step={100}
                  onInput={e => onSetValue('pricePerCarat', e)}
                />
                <div className="range_value d-flex justify-content-between align-content-center">
                  <div className="value">
                    $
                    <span>
                      {value.pricePerCarat[0] ? value.pricePerCarat[0] : 0}
                    </span>
                  </div>
                  <div className="value">
                    $
                    <span>
                      {value.pricePerCarat[1] ? value.pricePerCarat[1] : 0}
                    </span>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
export default memo(DiamondFilter);
