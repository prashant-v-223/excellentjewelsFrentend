import React, { memo } from 'react';
import { Col } from 'react-bootstrap';
import RangeSlider from 'react-range-slider-input';

function RangeWiseFilter({ values, setFieldValue }) {
  return (
    <>
      <Col lg={3} sm={6}>
        <div className="filter_box  mt0 mt5-xl mb20 mb5-xl">
          <h6 className="mb20 mb10-xl ff_Mulish">Table</h6>
          <RangeSlider
            value={[values.tableTo, values.tableFrom]}
            min={0}
            max={100}
            onInput={e => {
              setFieldValue('tableTo', e[0]);
              setFieldValue('tableFrom', e[1]);
            }}
          />
          <div className="range_value d-flex justify-content-between align-content-center">
            <div className="value">
              <span className=" ff_Mulish">
                {values.tableTo ? values.tableTo : 0}
              </span>
              %
            </div>
            <div className="value">
              <span className=" ff_Mulish">
                {values.tableFrom ? values.tableFrom : 0}
              </span>
              %
            </div>
          </div>
        </div>
      </Col>
      <Col lg={3} sm={6}>
        <div className="filter_box  mt0 mt5-xl mb20 mb5-xl">
          <h6 className="mb20 mb10-xl ff_Mulish">Depth</h6>
          <RangeSlider
            value={[values.tableDepthT, values.tableDepthF]}
            min={0}
            max={100}
            onInput={e => {
              setFieldValue('tableDepthT', e[0]);
              setFieldValue('tableDepthF', e[1]);
            }}
          />
          <div className="range_value d-flex justify-content-between align-content-center">
            <div className="value">
              <span className="ff_Mulish">
                {values.tableDepthT ? values.tableDepthT : 0}
              </span>
              %
            </div>
            <div className="value">
              <span className="ff_Mulish">
                {values.tableDepthF ? values.tableDepthF : 0}
              </span>
              %
            </div>
          </div>
        </div>
      </Col>
      <Col lg={3} sm={6}>
        <div className="filter_box  mt0 mt5-xl mb20 mb5-xl">
          <h6 className="mb20 mb10-xl ff_Mulish">L/W Ratio</h6>
          <RangeSlider
            value={[values.lowerHalfTo, values.lowerHalfFrom]}
            min={0.0}
            max={100.0}
            step={0.1}
            onInput={e => {
              setFieldValue('lowerHalfTo', e[0]);
              setFieldValue('lowerHalfFrom', e[1]);
            }}
          />
          <div className="range_value d-flex justify-content-between align-content-center">
            <div className="value ff_Mulish">
              <span className="ff_Mulish">
                {values.lowerHalfTo ? values.lowerHalfTo : 0}
              </span>
            </div>
            <div className="value ff_Mulish">
              <span className="ff_Mulish">
                {values.lowerHalfFrom ? values.lowerHalfFrom : 0}
              </span>
            </div>
          </div>
        </div>
      </Col>
      <Col lg={3} sm={6}>
        <div className="filter_box  mt0 mt5-xl mb20 mb5-xl">
          <h6 className="mb20 mb10-xl ff_Mulish">Length</h6>
          <RangeSlider
            value={[values.lengthTo, values.lengthFrom]}
            min={0}
            max={100}
            onInput={e => {
              setFieldValue('lengthTo', e[0]);
              setFieldValue('lengthFrom', e[1]);
            }}
          />
          <div className="range_value d-flex justify-content-between align-content-center">
            <div className="value ff_Mulish">
              <span className="ff_Mulish">
                {values.lengthTo ? values.lengthTo : 0}
              </span>
              mm
            </div>
            <div className="value ff_Mulish">
              <span className="ff_Mulish">
                {values.lengthFrom ? values.lengthFrom : 0}
              </span>
              mm
            </div>
          </div>
        </div>
      </Col>
      <Col lg={3} sm={6}>
        <div className="filter_box  mt0 mt5-xl mb20 mb5-xl">
          <h6 className="mb20 mb10-xl ff_Mulish">Height</h6>
          <RangeSlider
            value={[values.depthTo, values.depthFrom]}
            min={0}
            max={100}
            onInput={e => {
              setFieldValue('depthTo', e[0]);
              setFieldValue('depthFrom', e[1]);
            }}
          />
          <div className="range_value d-flex justify-content-between align-content-center">
            <div className="value ff_Mulish">
              <span className=" ff_Mulish">
                {values.depthTo ? values.depthTo : 0}
              </span>
              mm
            </div>
            <div className="value ff_Mulish">
              <span className=" ff_Mulish">
                {values.depthFrom ? values.depthFrom : 0}
              </span>
              mm
            </div>
          </div>
        </div>
      </Col>
      <Col lg={3} sm={6}>
        <div className="filter_box  mt0 mt5-xl mb20 mb5-xl">
          <h6 className="mb20 mb10-xl ff_Mulish">Crown Angle</h6>
          <RangeSlider
            value={[values.crownAngleTo, values.crownAngleFrom]}
            min={0}
            max={100}
            onInput={e => {
              setFieldValue('crownAngleTo', e[0]);
              setFieldValue('crownAngleFrom', e[1]);
            }}
          />
          <div className="range_value d-flex justify-content-between align-content-center">
            <div className="value ff_Mulish">
              <span>{values.crownAngleTo ? values.crownAngleTo : 0}</span>°
            </div>
            <div className="value ff_Mulish">
              <span>{values.crownAngleFrom ? values.crownAngleFrom : 0}</span>°
            </div>
          </div>
        </div>
      </Col>
      <Col lg={3} sm={6}>
        <div className="filter_box  mt0 mt5-xl mb20 mb5-xl">
          <h6 className="mb20 mb10-xl ff_Mulish">Pavilion Angle</h6>
          <RangeSlider
            value={[values.pavilionAngleTo, values.pavilionAngleFrom]}
            min={0}
            max={100}
            onInput={e => {
              setFieldValue('pavilionAngleTo', e[0]);
              setFieldValue('pavilionAngleFrom', e[1]);
            }}
          />
          <div className="range_value d-flex justify-content-between align-content-center">
            <div className="value ff_Mulish">
              <span>{values.pavilionAngleTo ? values.pavilionAngleTo : 0}</span>
              °
            </div>
            <div className="value ff_Mulish">
              <span>
                {values.pavilionAngleFrom ? values.pavilionAngleFrom : 0}
              </span>
              °
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}
export default memo(RangeWiseFilter);
