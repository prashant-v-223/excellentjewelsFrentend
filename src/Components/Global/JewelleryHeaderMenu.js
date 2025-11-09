import { useCallback, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HeaderIcon1 from '../../Assets/Images/own-icon-1.png';
import NoImageAvailable from '../../Assets/Images/ring_icons/default-ring.svg';
import { OptimizedImage } from 'utils/performanceUtils';

export const JewelleryHeaderMenu = ({
  jewelleryType,
  startWithSettingWise,
  jewelleryListForHeader,
  onJewelleryTypeSelected,
  onJewellerySubTypeSelected,
  startWithNaturalDiamondSetting,
  startWithLabGrownDiamondSetting,
}) => {
  const [isToggleForJewellery, setIsToggleJewellery] = useState(true);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const mainHeaderMenuForJewellery = useMemo(() => {
    return jewelleryListForHeader?.map((item, index) => {
      return (
        <div
          className={
            jewelleryType === 'fineJewellery'
              ? 'jewellery_category_inner'
              : 'jewellery_category_inner hiphop_jewellery_category_inner'
          }
          key={index}
        >
          <div className="category_title_wrap">
            <img
              src={`${process.env.REACT_APP_DOMAIN}/Content/DomainData/${
                process.env.REACT_APP_DOMAIN_WITHOUT_HTTP
              }/img/Jewellery/Menu/${item.MasterTypeValue_Code?.replaceAll(
                ' ',
                '',
              )}.svg`}
              alt={item.MasterTypeValue_Code}
              onError={handleImageError}
            />
            <h4
              onClick={() => onJewelleryTypeSelected(item, jewelleryType)}
              className="ff_Mulish text_primary"
            >
              {item?.MasterTypeValue}
            </h4>
          </div>
          <div className="shape_select">
            <ul>
              {item?.SubType?.slice(0, 5).map((subItem, subIndex) => {
                return (
                  <li key={`shape_${index}_${subIndex}`}>
                    <span
                      onClick={() =>
                        onJewellerySubTypeSelected(item, subItem, jewelleryType)
                      }
                    >
                      <h5 className="ff_Mulish">
                        {subItem.MasterSubTypeValue}
                      </h5>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    });
  }, [
    jewelleryType,
    jewelleryListForHeader,
    onJewellerySubTypeSelected,
    onJewelleryTypeSelected,
    handleImageError,
  ]);

  const renderRow = useMemo(() => {
    return (
      <div
        className={
          isToggleForJewellery
            ? 'diamond_megamenu_wrapper jewellery_megamenu_wrapper'
            : 'diamond_megamenu_wrapper jewellery_megamenu_wrapper hide'
        }
        onClick={() => setIsToggleJewellery(!isToggleForJewellery)}
      >
        <Container>
          <Row>
            {jewelleryType === 'fineJewellery' && (
              <Col xl={2}>
                <div className="custon_jewellery_menu_wrap ">
                  <div className="d-flex header_title mb-2">
                    <div className="icon">
                      <img src={HeaderIcon1} alt="" className="h-100" />
                    </div>
                    <h5 className="ff_Mulish mb-0 text_primary">
                      Build Your Own
                    </h5>
                  </div>
                </div>
                <div className="shape_select">
                  <ul>
                    <li>
                      <span>
                        <h5
                          onClick={startWithSettingWise}
                          className="ff_Mulish"
                        >
                          Start with a Setting
                        </h5>
                      </span>
                    </li>
                    <li>
                      <span onClick={startWithNaturalDiamondSetting}>
                        <h5 className="ff_Mulish">
                          Start with a Natural Diamonds
                        </h5>
                      </span>
                    </li>
                    <li>
                      <span onClick={startWithLabGrownDiamondSetting}>
                        <h5 className="ff_Mulish">
                          Start with a Lab Grown Diamonds
                        </h5>
                      </span>
                    </li>
                  </ul>
                </div>
              </Col>
            )}
            <Col xl={jewelleryType === 'fineJewellery' ? 10 : 12}>
              <div className="jewellery_category_main_wrapper">
                <h5 className="text-xl-center mb-3 ff_Mulish">
                  {/* Shop By Category */}
                  {jewelleryType === 'fineJewellery'
                    ? 'Fine Jewellery'
                    : 'Hip Hop Jewellery'}
                </h5>
                <div className="jewellery_category_wrapper ff_Mulish">
                  {mainHeaderMenuForJewellery}
                </div>
              </div>
              <div className="mt10 mt10-lg mb10-lg view_all_diamonds text-center">
                <span
                  onClick={() =>
                    onJewelleryTypeSelected('View All', jewelleryType)
                  }
                >
                  View All
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }, [
    jewelleryType,
    startWithSettingWise,
    isToggleForJewellery,
    onJewelleryTypeSelected,
    mainHeaderMenuForJewellery,
    startWithLabGrownDiamondSetting,
    startWithNaturalDiamondSetting,
  ]);
  return <>{renderRow}</>;
};
