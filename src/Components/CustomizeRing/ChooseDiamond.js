import React, { useCallback, useEffect, useMemo, memo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWatchStockListCount,
  setIsAddToWatchList,
} from 'Components/Redux/reducers/myAccount.slice';
import CustomizeRingStepsForDiamond from './CustomizeRingStepsForDiamond';
import {
  setChooseStepSelect,
  setSelectedDiamondForSetting,
  setSelectedJewelleryForSetting,
  setIsResetDiamondWiseSettingFilter,
} from 'Components/Redux/reducers/setting.slice';
import DiamondImgSlider from 'Components/Diamond/DiamondImgSlider';
import DiamondInfoForSetting from './DiamondInfoForSetting';
import LeftAngel from '../../Assets/Images/left-angle.svg';
import ChooseYourSetting from './ChooseYourSetting';
import {
  getJewelleryDetailList,
  setIsSearchForJewellerySettingWise,
  setJewelleryFilterData,
} from 'Components/Redux/reducers/jewellery.slice';
import ChooseYourSettingDetail from './ChooseYourSettingDetail';
import ViewCompleted from './ViewCompleted';
import SearchDiamondForSetting from './SearchDiamondForSetting';
import { setSearchDiamondFilterList2 } from 'Components/Redux/reducers/dashboard.slice';
import { initialValuesForJewellerySearch } from 'Helper/CommonHelper';

const ChooseDiamond = () => {
  const dispatch = useDispatch();
  const {
    chooseStepSelect,
    selectedDiamondForSetting,
    selectedJewelleryForSetting,
    isResetDiamondWiseSettingFilter,
  } = useSelector(({ setting }) => setting);

  const { stockDetailDnaList, stockDetailDnaLoading } = useSelector(
    ({ dashboard }) => dashboard,
  );
  const { userData } = useSelector(({ auth }) => auth);
  const { jewellerySizeListByTypewise, isAddToCartJewellery } = useSelector(
    ({ jewellery }) => jewellery,
  );
  const { isAddToWatchList } = useSelector(({ myAccount }) => myAccount);

  const [selectedCountryForRingSize, setSelectedCountryForRingSize] =
    useState('');
  const [selectedRingSizeForSetting, setSelectedRingSizeForSetting] =
    useState('');

  const countryListByRingSize = useMemo(() => {
    let jewellerySizeListByTypewiseData =
      jewellerySizeListByTypewise?.length > 0
        ? [...jewellerySizeListByTypewise]
        : [];
    jewellerySizeListByTypewiseData = jewellerySizeListByTypewiseData?.map(
      item => {
        return {
          label: item?.Country_Name,
          value: item?.Country_Id,
        };
      },
    );
    return jewellerySizeListByTypewiseData;
  }, [jewellerySizeListByTypewise]);

  const jewelleryRingSize = useMemo(() => {
    if (
      Object.keys(selectedCountryForRingSize)?.length > 0 &&
      jewellerySizeListByTypewise?.length > 0
    ) {
      const countryWiseRingSize = jewellerySizeListByTypewise.find(
        item => item.Country_Id === selectedCountryForRingSize.value,
      );
      if (countryWiseRingSize?.SizeList?.length > 0) {
        return countryWiseRingSize?.SizeList?.map(item => {
          return {
            label: item?.Size_Value,
            value: item?.Size_Code,
          };
        });
      }
      return countryWiseRingSize?.SizeList || [];
    }
    return [];
  }, [selectedCountryForRingSize, jewellerySizeListByTypewise]);

  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToWatchList(false));
    }
  }, [dispatch, userData, isAddToWatchList]);

  const onSelectJewelleryForSetting = useCallback(
    async stockId => {
      if (stockId) {
        dispatch(setChooseStepSelect(4));
        await dispatch(getJewelleryDetailList(stockId));
      }
    },
    [dispatch],
  );

  const onSelectJewelleryDetailForSetting = useCallback(
    row => {
      dispatch(setChooseStepSelect(5));
      dispatch(setSelectedJewelleryForSetting(row));
    },
    [dispatch],
  );

  const onChangeStepForSetting = useCallback(
    step => {
      dispatch(setChooseStepSelect(step));
    },
    [dispatch],
  );

  const onResetAllStepForSetting = useCallback(() => {
    /* if (window.location.pathname !== '/diamond') {
      chooseStepSelect === 1 &&
        window.location.pathname === '/setting-diamond-wise' &&
        dispatch(setIsResetDiamondFilter(true));
      dispatch(setSearchDiamondSavedData(''));
      dispatch(setIsModifySearchForDiamond(false));
    } */
    dispatch(setJewelleryFilterData(initialValuesForJewellerySearch));
    // dispatch(setIsDiamondSearchSettingWise(false));
    // dispatch(setSearchDiamondFilterList2([]));
    dispatch(setIsSearchForJewellerySettingWise(false));
    Object.keys(selectedDiamondForSetting)?.length > 0 &&
      dispatch(setSelectedDiamondForSetting({}));
    Object.keys(selectedJewelleryForSetting)?.length > 0 &&
      dispatch(setSelectedJewelleryForSetting({}));
    /* Object.keys(selectedRingSizeForSetting)?.length > 0 &&
      dispatch(setSelectedRingSizeForSetting({})); */
    dispatch(setSearchDiamondFilterList2([]));
    dispatch(setChooseStepSelect(1));
  }, [
    dispatch,
    // chooseStepSelect,
    selectedDiamondForSetting,
    selectedJewelleryForSetting,
    // selectedRingSizeForSetting,
  ]);

  useEffect(() => {
    return () => {
      onResetAllStepForSetting();
    };
  }, []);

  useEffect(() => {
    if (isResetDiamondWiseSettingFilter) {
      onResetAllStepForSetting();
      dispatch(setIsResetDiamondWiseSettingFilter(false));
    }
  }, [dispatch, isResetDiamondWiseSettingFilter]);

  return (
    <main>
      <section className="customize_ring_steps pt50 pt20-lg pb50 pb30-lg pb20-md">
        <CustomizeRingStepsForDiamond
          dispatch={dispatch}
          chooseStepSelect={chooseStepSelect}
          setChooseStepSelect={setChooseStepSelect}
          onResetAllStepForSetting={onResetAllStepForSetting}
          selectedDiamondForSetting={selectedDiamondForSetting}
          selectedJewelleryForSetting={selectedJewelleryForSetting}
        />
      </section>
      {chooseStepSelect === 1 ? (
        <SearchDiamondForSetting
          dispatch={dispatch}
          userData={userData}
          setChooseStepSelect={setChooseStepSelect}
          setSearchDiamondFilterList2={setSearchDiamondFilterList2}
        />
      ) : chooseStepSelect === 2 ? (
        <>
          <section className="diamond_detail_wrapper pt40 pb10">
            <Container>
              <div
                className="back_arrow ff_Mulish"
                onClick={() => onChangeStepForSetting(1)}
              >
                <img src={LeftAngel} alt="LeftAngel" />
                Back to Search
              </div>
              <Row>
                <Col xl={4} lg={6}>
                  <DiamondImgSlider
                    stockDetailDnaList={stockDetailDnaList}
                    stockDetailDnaLoading={stockDetailDnaLoading}
                  />
                </Col>
                <Col xl={8} lg={6}>
                  <DiamondInfoForSetting
                    dispatch={dispatch}
                    stockDetailDnaList={stockDetailDnaList}
                    onChangeStepForSetting={onChangeStepForSetting}
                    selectedJewelleryForSetting={selectedJewelleryForSetting}
                    setSelectedDiamondForSetting={setSelectedDiamondForSetting}
                    setSelectedJewelleryForSetting={
                      setSelectedJewelleryForSetting
                    }
                    setIsSearchForJewellerySettingWise={
                      setIsSearchForJewellerySettingWise
                    }
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </>
      ) : chooseStepSelect === 3 ? (
        <ChooseYourSetting
          onSelectJewelleryForSetting={onSelectJewelleryForSetting}
          setIsSearchForJewellerySettingWise={
            setIsSearchForJewellerySettingWise
          }
        />
      ) : chooseStepSelect === 4 ? (
        <ChooseYourSettingDetail
          LeftAngel={LeftAngel}
          chooseStepSelect={chooseStepSelect}
          jewelleryRingSize={jewelleryRingSize}
          countryListByRingSize={countryListByRingSize}
          onChangeStepForSetting={onChangeStepForSetting}
          selectedCountryForRingSize={selectedCountryForRingSize}
          selectedRingSizeForSetting={selectedRingSizeForSetting}
          setSelectedCountryForRingSize={setSelectedCountryForRingSize}
          setSelectedRingSizeForSetting={setSelectedRingSizeForSetting}
          onSelectJewelleryDetailForSetting={onSelectJewelleryDetailForSetting}
        />
      ) : chooseStepSelect === 5 ? (
        <ViewCompleted
          dispatch={dispatch}
          userData={userData}
          jewelleryRingSize={jewelleryRingSize}
          isAddToCartJewellery={isAddToCartJewellery}
          countryListByRingSize={countryListByRingSize}
          onChangeStepForSetting={onChangeStepForSetting}
          selectedDiamondForSetting={selectedDiamondForSetting}
          selectedCountryForRingSize={selectedCountryForRingSize}
          selectedRingSizeForSetting={selectedRingSizeForSetting}
          selectedJewelleryForSetting={selectedJewelleryForSetting}
          setSelectedRingSizeForSetting={setSelectedRingSizeForSetting}
          setSelectedCountryForRingSize={setSelectedCountryForRingSize}
        />
      ) : (
        ''
      )}
    </main>
  );
};
export default memo(ChooseDiamond);
