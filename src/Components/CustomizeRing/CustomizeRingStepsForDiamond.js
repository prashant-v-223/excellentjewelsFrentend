import React, { memo, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DiamondIcon from '../../Assets/Images/diamond-icon.svg';
import RignIcon from '../../Assets/Images/ring.svg';
import RingWithDiamondIcon from '../../Assets/Images/ring-with-diamond.svg';
import { OptimizedImage } from 'utils/performanceUtils';

const CustomizeRingStepsForDiamond = ({
  dispatch,
  chooseStepSelect,
  setChooseStepSelect,
  onResetAllStepForSetting,
  selectedDiamondForSetting,
  selectedJewelleryForSetting,
}) => {
  const { Weight, Shape, Diamond_Type, Cost_Amt } =
    selectedDiamondForSetting || {};
  const stepOneDiamondWiseSetting = useMemo(() => {
    return (
      <Col xs={4}>
        <div
          className={
            chooseStepSelect === 1 ||
            chooseStepSelect === 2 ||
            Object?.keys(selectedDiamondForSetting)?.length > 0
              ? 'customize_ring_step active'
              : 'customize_ring_step'
          }
        >
          <div className="step_text">
            <span className="ff_Mulish">1</span>
            <div className="step_price_detail">
              <h3 className="ff_Mulish mb-0">
                Choose Your Diamond
                <span className="mobile_text ff_Mulish">Diamond</span>
              </h3>
              {Object?.keys(selectedDiamondForSetting)?.length > 0 && (
                <div className="selected_item_wrap">
                  <h6 className="ff_Mulish">
                    <span className="product_title">
                      {`${Weight ? `${Weight} - carat` : ''}${
                        Shape ? Shape + ' Shape ' : ''
                      }${Diamond_Type ? Diamond_Type + ' Diamond Type ' : ''}`}
                    </span>
                    <span className="product_price">
                      {`$${Cost_Amt ? Number(Cost_Amt)?.toFixed(2) : `0.00`}`}
                    </span>
                  </h6>
                  <ul>
                    <li className="ff_Mulish">
                      <span onClick={() => dispatch(setChooseStepSelect(2))}>
                        View
                      </span>
                    </li>
                    <li className="ff_Mulish">
                      <span onClick={() => dispatch(setChooseStepSelect(1))}>
                        Change
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="step_icon">
            <img src={DiamondIcon} alt="" />
          </div>
        </div>
      </Col>
    );
  }, [
    Shape,
    Weight,
    Cost_Amt,
    dispatch,
    Diamond_Type,
    chooseStepSelect,
    setChooseStepSelect,
    selectedDiamondForSetting,
  ]);

  const stepTwoDiamondWiseSetting = useMemo(() => {
    return (
      <Col xs={4}>
        <div
          className={
            chooseStepSelect === 3 ||
            chooseStepSelect === 4 ||
            Object?.keys(selectedJewelleryForSetting)?.length > 0
              ? 'customize_ring_step active'
              : 'customize_ring_step'
          }
        >
          <div className="step_text">
            <span className="ff_Mulish">2</span>
            <div className="step_price_detail">
              <h3 className="ff_Mulish mb-0">
                Choose Your Setting
                <span className="mobile_text">Setting</span>
              </h3>
              {Object?.keys(selectedJewelleryForSetting)?.length > 0 && (
                <div className="selected_item_wrap">
                  <h6 className="ff_Mulish">
                    <span className="product_title">
                      {selectedJewelleryForSetting?.JewelleryDetail
                        ?.Jewellery_Name
                        ? selectedJewelleryForSetting.JewelleryDetail
                            .Jewellery_Name
                        : ''}
                    </span>
                    <span className="product_price">{`$${
                      selectedJewelleryForSetting?.JewelleryDetail?.Setting_Rate
                        ? Number(
                            selectedJewelleryForSetting.JewelleryDetail
                              .Setting_Rate,
                          )?.toFixed(2)
                        : `0.00`
                    }`}</span>
                  </h6>
                  <ul>
                    <li className="ff_Mulish">
                      <span onClick={() => dispatch(setChooseStepSelect(4))}>
                        View
                      </span>
                    </li>
                    <li className="ff_Mulish">
                      <span onClick={() => dispatch(setChooseStepSelect(3))}>
                        Change
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="step_icon">
            <img src={RignIcon} alt="" />
          </div>
        </div>
      </Col>
    );
  }, [
    dispatch,
    chooseStepSelect,
    setChooseStepSelect,
    selectedJewelleryForSetting,
  ]);

  const stepThirdDiamondWiseSetting = useMemo(() => {
    return (
      <Col xs={4}>
        <div
          className={
            chooseStepSelect === 5 ||
            (Object?.keys(selectedDiamondForSetting)?.length > 0 &&
              Object?.keys(selectedJewelleryForSetting)?.length > 0)
              ? 'customize_ring_step active'
              : 'customize_ring_step'
          }
        >
          <div className="step_text">
            <span className="ff_Mulish">3</span>
            <div className="step_price_detail">
              <h3 className="ff_Mulish mb-0">
                View Completed
                <span className="mobile_text">Preview</span>
              </h3>
              {Object?.keys(selectedDiamondForSetting)?.length > 0 &&
                Object?.keys(selectedJewelleryForSetting)?.length > 0 && (
                  <div className="selected_item_wrap">
                    <h6 className="ff_Mulish">
                      <span className="product_title">
                        {selectedJewelleryForSetting?.JewelleryDetail
                          ?.Jewellery_Name
                          ? selectedJewelleryForSetting.JewelleryDetail
                              .Jewellery_Name
                          : ''}{' '}
                        With{' '}
                        {`${Weight ? `${Weight} - carat ` : ''}${
                          Shape ? Shape + ' Shape ' : ''
                        }${
                          Diamond_Type ? Diamond_Type + ' Diamond Type ' : ''
                        }`}
                      </span>
                      <span className="product_price">{`$${Number(
                        (Cost_Amt ? Cost_Amt : 0) +
                          (selectedJewelleryForSetting?.JewelleryDetail
                            ?.Setting_Rate
                            ? selectedJewelleryForSetting.JewelleryDetail
                                .Setting_Rate
                            : 0),
                      )?.toFixed(2)}`}</span>
                    </h6>
                    <ul>
                      <li className="ff_Mulish">
                        <span
                          onClick={() =>
                            chooseStepSelect !== 5 &&
                            dispatch(setChooseStepSelect(5))
                          }
                        >
                          View
                        </span>
                      </li>
                      <li className="ff_Mulish">
                        <span onClick={() => onResetAllStepForSetting()}>
                          Reset
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
            </div>
          </div>
          <div className="step_icon">
            <img src={RingWithDiamondIcon} alt="" />
          </div>
        </div>
      </Col>
    );
  }, [
    Shape,
    Weight,
    Cost_Amt,
    dispatch,
    Diamond_Type,
    chooseStepSelect,
    setChooseStepSelect,
    onResetAllStepForSetting,
    selectedDiamondForSetting,
    selectedJewelleryForSetting,
  ]);

  const renderRow = useMemo(() => {
    return (
      <Container>
        <Row className="g-2 g-sm-4">
          {stepOneDiamondWiseSetting}
          {stepTwoDiamondWiseSetting}
          {stepThirdDiamondWiseSetting}
        </Row>
      </Container>
    );
  }, [
    stepOneDiamondWiseSetting,
    stepTwoDiamondWiseSetting,
    stepThirdDiamondWiseSetting,
  ]);

  return <>{renderRow}</>;
};
export default memo(CustomizeRingStepsForDiamond);
