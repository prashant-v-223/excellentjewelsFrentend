import React, { useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BlueDiamond from '../../Assets/Images/blue.svg';
import PurpleDiamond from '../../Assets/Images/purple.svg';
import PinkDiamond from '../../Assets/Images/pink.svg';
import YellowDiamond from '../../Assets/Images/yellow.svg';
import GreenDiamond from '../../Assets/Images/green.svg';
import BlackDiamond from '../../Assets/Images/black.svg';
import OrangeDiamond from '../../Assets/Images/orange.svg';
import RedDiamond from '../../Assets/Images/red.svg';
import GrayDiamond from '../../Assets/Images/gray.svg';
import { OptimizedImage } from 'utils/performanceUtils';
export const DiamondHeaderMenu = ({
  handleImageError,
  shapeListForHeader,
  onShapeSelectHandler,
  onColorSelectHandler,
  onDiamondTypeSelected,
  setNavbarHideShow,
  navbarHideShow,
}) => {
  const [isToggle, setIsToggle] = useState(true);
  const naturalWhiteDiamond = useMemo(() => {
    return (
      <Col xl={3}>
        <div className="megamenu_column">
          <h4
            onClick={() => {
              onDiamondTypeSelected('NATURAL', 1);
              setNavbarHideShow(!navbarHideShow);
            }}
            className="ff_Mulish"
          >
            Natural White Diamonds
          </h4>
          <div className="shape_select">
            <ul>
              {shapeListForHeader?.map((item, index) => {
                return (
                  <li key={`shape_${index}`}>
                    <span
                      onClick={() => {
                        onShapeSelectHandler('NATURAL', item);
                        setNavbarHideShow(!navbarHideShow);
                      }}
                    >
                      <img
                        src={`http://72.61.170.111:8088/uploads/Diamonds/${item.DisplayName?.replaceAll(
                          ' ',
                          '',
                        )}.svg`}
                        alt={item.DisplayName}
                        onError={handleImageError}
                      />
                      <h5 className="ff_Mulish">{item.DisplayName}</h5>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="text-center mt20 mt10-lg mb30-lg view_all_diamonds">
          <span
            onClick={() => onDiamondTypeSelected('NATURAL', 1)}
            className="ff_Mulish"
          >
            View All
          </span>
        </div>
      </Col>
    );
  }, [
    navbarHideShow,
    setNavbarHideShow,
    handleImageError,
    shapeListForHeader,
    onDiamondTypeSelected,
    onShapeSelectHandler,
  ]);

  const labGrownWhiteDiamond = useMemo(() => {
    return (
      <Col xl={3}>
        <div className="megamenu_column">
          <h4
            onClick={() => {
              onDiamondTypeSelected('LABGROWN', 1);
              setNavbarHideShow(!navbarHideShow);
            }}
            className="ff_Mulish"
          >
            Lab Grown White Diamonds
          </h4>
          <div className="shape_select">
            <ul>
              {shapeListForHeader?.map((item, index) => {
                return (
                  <li key={`shape_${index}`}>
                    <span
                      onClick={() => {
                        onShapeSelectHandler('LABGROWN', item);
                        setNavbarHideShow(!navbarHideShow);
                      }}
                    >
                      <img
                        src={`http://72.61.170.111:8088/uploads/Diamonds/${item.DisplayName?.replaceAll(
                          ' ',
                          '',
                        )}.svg`}
                        alt={item.DisplayName}
                        onError={handleImageError}
                      />
                      <h5 className="ff_Mulish">{item.DisplayName}</h5>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="text-center mt20 mt10-lg mb30-lg view_all_diamonds">
          <span
            onClick={() => onDiamondTypeSelected('LABGROWN', 1)}
            className="ff_Mulish"
          >
            View All
          </span>
        </div>
      </Col>
    );
  }, [
    navbarHideShow,
    setNavbarHideShow,
    shapeListForHeader,
    handleImageError,
    onDiamondTypeSelected,
    onShapeSelectHandler,
  ]);

  const naturalColorDiamond = useMemo(() => {
    return (
      <Col
        xl={3}
        style={{
          borderLeft: '1px solid #bbb',
        }}
      >
        <div className="megamenu_column">
          <h4
            className="ff_Mulish"
            onClick={() => onDiamondTypeSelected('NATURAL', 2)}
          >
            Natural Color Diamonds
          </h4>
          <div className="shape_select color_diamond">
            <ul>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'BLUE')}
                  className="ff_Mulish"
                >
                  <img
                    src={BlueDiamond}
                    alt="BlueDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Blue</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'PURPLE')}
                  className="ff_Mulish"
                >
                  <img
                    src={PurpleDiamond}
                    alt="PurpleDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Purple</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'PINK')}
                  className="ff_Mulish"
                >
                  <img
                    src={PinkDiamond}
                    alt="PinkDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Pink</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'YELLOW')}
                  className="ff_Mulish"
                >
                  <img
                    src={YellowDiamond}
                    alt="YellowDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Yellow</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'GREEN')}
                  className="ff_Mulish"
                >
                  <img
                    src={GreenDiamond}
                    alt="GreenDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Green</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'BLACK')}
                  className="ff_Mulish"
                >
                  <img
                    src={BlackDiamond}
                    alt="BlackDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Black</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'ORANGE')}
                  className="ff_Mulish"
                >
                  <img
                    src={OrangeDiamond}
                    alt="OrangeDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Orange</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'RED')}
                  className="ff_Mulish"
                >
                  <img
                    src={RedDiamond}
                    alt="RedDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Red</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('NATURAL', 'GRAY')}
                  className="ff_Mulish"
                >
                  <img
                    src={GrayDiamond}
                    alt="GrayDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Gray</h5>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt20 mt10-lg mb30-lg view_all_diamonds ff_Mulish">
          <span onClick={() => onDiamondTypeSelected('NATURAL', 2)}>
            View All
          </span>
        </div>
      </Col>
    );
  }, [handleImageError, onDiamondTypeSelected, onColorSelectHandler]);

  const labGrownColorDiamond = useMemo(() => {
    return (
      <Col xl={3} style={{ borderLeft: '1px solid #bbb' }}>
        <div className="megamenu_column">
          <h4
            onClick={() => onDiamondTypeSelected('LABGROWN', 2)}
            className="ff_Mulish"
          >
            Lab Grown Color Diamonds
          </h4>
          <div className="shape_select color_diamond">
            <ul>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'BLUE')}
                  className="ff_Mulish"
                >
                  <img
                    src={BlueDiamond}
                    alt="BlueDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Blue</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'PURPLE')}
                  className="ff_Mulish"
                >
                  <img
                    src={PurpleDiamond}
                    alt="PurpleDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Purple</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'PINK')}
                  className="ff_Mulish"
                >
                  <img
                    src={PinkDiamond}
                    alt="PinkDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Pink</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'YELLOW')}
                  className="ff_Mulish"
                >
                  <img
                    src={YellowDiamond}
                    alt="YellowDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Yellow</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'GREEN')}
                  className="ff_Mulish"
                >
                  <img
                    src={GreenDiamond}
                    alt="GreenDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Green</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'BLACK')}
                  className="ff_Mulish"
                >
                  <img
                    src={BlackDiamond}
                    alt="BlackDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Black</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'ORANGE')}
                  className="ff_Mulish"
                >
                  <img
                    src={OrangeDiamond}
                    alt="OrangeDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Orange</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'RED')}
                  className="ff_Mulish"
                >
                  <img
                    src={RedDiamond}
                    alt="RedDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Red</h5>
                </span>
              </li>
              <li>
                <span
                  onClick={() => onColorSelectHandler('LABGROWN', 'GRAY')}
                  className="ff_Mulish"
                >
                  <img
                    src={GrayDiamond}
                    alt="GrayDiamond"
                    onError={handleImageError}
                  />
                  <h5 className="ff_Mulish">Gray</h5>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt20 mt10-lg mb30-lg view_all_diamonds ff_Mulish">
          <span onClick={() => onDiamondTypeSelected('LABGROWN', 2)}>
            View All
          </span>
        </div>
      </Col>
    );
  }, [handleImageError, onDiamondTypeSelected, onColorSelectHandler]);

  const mainHeaderMenu = useMemo(() => {
    return (
      <Container>
        <Row>
          {labGrownWhiteDiamond}
          {labGrownColorDiamond}
          {naturalWhiteDiamond}
          {naturalColorDiamond}
        </Row>
      </Container>
    );
  }, [
    naturalWhiteDiamond,
    labGrownWhiteDiamond,
    naturalColorDiamond,
    labGrownColorDiamond,
  ]);

  return (
    <div
      className={
        isToggle ? 'diamond_megamenu_wrapper' : 'diamond_megamenu_wrapper hide'
      }
      onClick={() => setIsToggle(!isToggle)}
    >
      <Container>
        <Row>{mainHeaderMenu}</Row>
      </Container>
    </div>
  );
};
