import React, { memo, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import JewelleryImgSlider from '../Jewellery/JewelleryImgSlider';
import JewelleryInfo from '../Jewellery/JewelleryInfo';
import { useSelector } from 'react-redux';

const ChooseYourSettingDetail = ({
  LeftAngel,
  chooseStepSelect,
  jewelleryRingSize,
  countryListByRingSize,
  onChangeStepForSetting,
  selectedDiamondForSetting,
  selectedRingSizeForSetting,
  selectedCountryForRingSize,
  selectedJewelleryForSetting,
  setSelectedRingSizeForSetting,
  setSelectedCountryForRingSize,
  onSelectJewelleryDetailForSetting,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { jewelleryDetailData } = useSelector(({ jewellery }) => jewellery);
  const { userData } = useSelector(({ auth }) => auth);
  return (
    <section className="jewellety_detail_wrapper pt40 pt20-lg pb40 pt0-md pb50-md">
      <Container>
        <div
          className="back_arrow ff_Mulish"
          onClick={() => onChangeStepForSetting(chooseStepSelect - 1)}
        >
          <img src={LeftAngel} alt="LeftAngel" />
          Back to Search
        </div>
        <Row className="g-4">
          <Col xl={4} lg={5}>
            <JewelleryImgSlider jewelleryDetailData={jewelleryDetailData} />
          </Col>
          <JewelleryInfo
            userData={userData}
            isSettingWise={true}
            jewelleryRingSize={jewelleryRingSize}
            jewelleryDetailData={jewelleryDetailData}
            countryListByRingSize={countryListByRingSize}
            selectedDiamondForSetting={selectedDiamondForSetting}
            selectedRingSizeForSetting={selectedRingSizeForSetting}
            selectedCountryForRingSize={selectedCountryForRingSize}
            selectedJewelleryForSetting={selectedJewelleryForSetting}
            setSelectedRingSizeForSetting={setSelectedRingSizeForSetting}
            setSelectedCountryForRingSize={setSelectedCountryForRingSize}
            onSelectJewelleryDetailForSetting={
              onSelectJewelleryDetailForSetting
            }
          />
        </Row>
      </Container>
    </section>
  );
};
export default memo(ChooseYourSettingDetail);
