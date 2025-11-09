import React, { memo, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import RoundShape from '../../../Assets/Images/Home/shape/round.png';
import PrincessShape from '../../../Assets/Images/Home/shape/princess.png';
import CushionShape from '../../../Assets/Images/Home/shape/cushion.png';
import OvalShape from '../../../Assets/Images/Home/shape/oval.png';
import EmeraldShape from '../../../Assets/Images/Home/shape/emerald.png';
import HeartShape from '../../../Assets/Images/Home/shape/heart.png';
import PearShape from '../../../Assets/Images/Home/shape/pear.png';
import MarquiseShape from '../../../Assets/Images/Home/shape/marquise.png';
import AsscherShape from '../../../Assets/Images/Home/shape/asscher.png';
import RadiantShape from '../../../Assets/Images/Home/shape/radient.png';
import BaguettesShape from '../../../Assets/Images/Home/shape/buggite.png';
import TapperedShape from '../../../Assets/Images/Home/shape/tappered-baguettes.png';
import {
  roundShapeMeasurement,
  princessShapeMeasurement,
  cushionShapeMeasurement,
  ovalShapeMeasurement,
  emeraldShapeMeasurement,
  heartShapeMeasurement,
  pearShapeMeasurement,
  marquiseShapeMeasurement,
  asscherShapeMeasurement,
  radiantShapeMeasurement,
  straightBuguetteShapeMeasurement,
  tapperedBuguetteShapeMeasurement,
} from 'Helper/CommonHelper';
import GoBackToEducation from '../GoBackToEducation';
import { OptimizedImage } from 'utils/performanceUtils';

const DiamondWeightChats = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedShape, setSelectedShape] = useState('Round');

  const tableOfData = useMemo(() => {
    const data =
      selectedShape === 'Round'
        ? roundShapeMeasurement
        : selectedShape === 'Princess'
        ? princessShapeMeasurement
        : selectedShape === 'Cushion'
        ? cushionShapeMeasurement
        : selectedShape === 'Oval'
        ? ovalShapeMeasurement
        : selectedShape === 'Emerald'
        ? emeraldShapeMeasurement
        : selectedShape === 'Heart'
        ? heartShapeMeasurement
        : selectedShape === 'Pear'
        ? pearShapeMeasurement
        : selectedShape === 'Marquise'
        ? marquiseShapeMeasurement
        : selectedShape === 'Asscher'
        ? asscherShapeMeasurement
        : selectedShape === 'Radiant'
        ? radiantShapeMeasurement
        : selectedShape === 'Straight Buguette'
        ? straightBuguetteShapeMeasurement
        : selectedShape === 'Tappered Buguette'
        ? tapperedBuguetteShapeMeasurement
        : [];
    if (data?.length > 0) {
      const showTable = dataItem => {
        return (
          <>
            <Col md={4}>
              <Table>
                <thead>
                  <tr>
                    <th className="ff_Mulish">{selectedShape} MM Size</th>
                    <th className="ff_Mulish">{selectedShape} Carat Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {dataItem?.map(item => {
                    return (
                      <tr>
                        <td className="ff_Mulish">{item.size}</td>
                        <td className="ff_Mulish">{item.weight}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </>
        );
      };
      if (data?.length > 3) {
        let arr = [0, 0, 0];
        let a = Number((data.length / 3).toFixed(2));
        if ((a - Math.trunc(a))?.toFixed(2) === '0.33') {
          arr = [
            Math.trunc(a) + 1,
            Math.trunc(a) + Math.trunc(a) + 1,
            Math.trunc(a) + Math.trunc(a) + Math.trunc(a) + 1,
          ];
        } else if ((a - Math.trunc(a))?.toFixed(2) === '0.67') {
          arr = [
            Math.trunc(a) + 1,
            Math.trunc(a) + 1 + Math.trunc(a) + 1,
            Math.trunc(a) + Math.trunc(a) + 1 + Math.trunc(a) + 1,
          ];
        } else {
          arr = [a, a + a, a + a + a];
        }
        return (
          <Row>
            {arr.map((item, i) => {
              return showTable(data.slice(arr[i - 1], arr[i]));
            })}
          </Row>
        );
      } else {
        return <Row>{showTable(data)}</Row>;
      }
    } else {
      return '';
    }
  }, [selectedShape]);

  return (
    <main>
      <section className="education_diamond_wrap pt40-lg pt50 pb80 pb30-md pb80-lg">
        <Container>
          <GoBackToEducation />
          <div className="diamond_detial_box">
            <h4 className="text_colorC mb30 mb10-md">
              Diamond MM to Carat Weight Chats
            </h4>
            <div className="shape_wrapper_education">
              <ul>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="round"
                      name="education_shape"
                      checked={selectedShape === 'Round'}
                      onClick={() => setSelectedShape('Round')}
                    />
                    <label htmlFor="round">
                      <img src={RoundShape} alt="" />
                      <span>Round</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="princess"
                      name="education_shape"
                      checked={selectedShape === 'Princess'}
                      onClick={() => setSelectedShape('Princess')}
                    />
                    <label htmlFor="princess">
                      <img src={PrincessShape} alt="" />
                      <span>Princess</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="cushion"
                      name="education_shape"
                      checked={selectedShape === 'Cushion'}
                      onClick={() => setSelectedShape('Cushion')}
                    />
                    <label htmlFor="cushion">
                      <img src={CushionShape} alt="" />
                      <span>Cushion</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="oval"
                      name="education_shape"
                      checked={selectedShape === 'Oval'}
                      onClick={() => setSelectedShape('Oval')}
                    />
                    <label htmlFor="oval">
                      <img src={OvalShape} alt="" />
                      <span>Oval</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="emerald"
                      name="education_shape"
                      checked={selectedShape === 'Emerald'}
                      onClick={() => setSelectedShape('Emerald')}
                    />
                    <label htmlFor="emerald">
                      <img src={EmeraldShape} alt="" />
                      <span>Emerald</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="heart"
                      name="education_shape"
                      checked={selectedShape === 'Heart'}
                      onClick={() => setSelectedShape('Heart')}
                    />
                    <label htmlFor="heart">
                      <img src={HeartShape} alt="" />
                      <span>Heart</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="pear"
                      name="education_shape"
                      checked={selectedShape === 'Pear'}
                      onClick={() => setSelectedShape('Pear')}
                    />
                    <label htmlFor="pear">
                      <img src={PearShape} alt="" />
                      <span>Pear</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="marquise"
                      name="education_shape"
                      checked={selectedShape === 'Marquise'}
                      onClick={() => setSelectedShape('Marquise')}
                    />
                    <label htmlFor="marquise">
                      <img src={MarquiseShape} alt="" />
                      <span>Marquise</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="asscher"
                      name="education_shape"
                      checked={selectedShape === 'Asscher'}
                      onClick={() => setSelectedShape('Asscher')}
                    />
                    <label htmlFor="asscher">
                      <img src={AsscherShape} alt="" />
                      <span>Asscher</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="radiant"
                      name="education_shape"
                      checked={selectedShape === 'Radiant'}
                      onClick={() => setSelectedShape('Radiant')}
                    />
                    <label htmlFor="radiant">
                      <img src={RadiantShape} alt="" />
                      <span>Radiant</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="baguettes"
                      name="education_shape"
                      checked={selectedShape === 'Straight Buguette'}
                      onClick={() => setSelectedShape('Straight Buguette')}
                    />
                    <label htmlFor="baguettes">
                      <img src={BaguettesShape} alt="" />
                      <span>Baguettes</span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-group">
                    <input
                      type="radio"
                      id="tappered"
                      name="education_shape"
                      checked={selectedShape === 'Tappered Buguette'}
                      onClick={() => setSelectedShape('Tappered Buguette')}
                    />
                    <label htmlFor="tappered">
                      <img src={TapperedShape} alt="" />
                      <span>Tappered</span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div className="size_table_wrapper">
              <h5 className="text-center ff_Mulish mt30 mb20">
                {selectedShape} Cut Diamond Size Chart (MM)
              </h5>
              {tableOfData}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(DiamondWeightChats);
