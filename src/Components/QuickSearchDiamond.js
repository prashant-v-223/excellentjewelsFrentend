import SVGInject from '@iconfu/svg-inject';
import { Formik } from 'formik';
import { disableCalcuSymbol } from 'Helper/CommonHelper';
import { memo, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResetIcon from '../Assets/Images/reset.svg';
import {
  getPayload,
  initialValuesForDiamondSearch,
} from './../Helper/CommonHelper';
import CaratList from './Diamond/DiamondSearch/CaratList';
import ClarityList from './Diamond/DiamondSearch/ClarityList';
import ColorList from './Diamond/DiamondSearch/ColorList';
import MakeList from './Diamond/DiamondSearch/MakeList';
import ShapeList from './Diamond/DiamondSearch/ShapeList';
import {
  setIsFancyColor,
  setIsModifySearchForDiamond,
  setSearchDiamondSavedData,
} from './Redux/reducers/dashboard.slice';
import { setDiamondType } from './Redux/reducers/offlineList.slice';
import LocationList from './Diamond/DiamondSearch/LocationList';
import { OptimizedImage } from 'utils/performanceUtils';

function QuickSearchDiamond({ diamondFilterDetail }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quickSearchRef = useRef(null);
  const { isColorType, searchDiamondSavedData } = useSelector(
    ({ dashboard }) => dashboard,
  );
  const { diamondType } = useSelector(({ offlineList }) => offlineList);
  const { diamondDetailListLoading } = useSelector(({ common }) => common);
  const [diamondFilterData, setDiamondFilterData] = useState(null);
  const [weightToggle, setWeightToggle] = useState(false);
  const initialValues = {
    ...initialValuesForDiamondSearch,
    colorType: isColorType,
    diamondType: diamondType,
  };
  const [serchDiamondFinalValue, setSerchDiamondFinalValue] =
    useState(initialValues);

  useEffect(() => {
    let slider = [];
    document.querySelector('.scroll_wrapper') &&
      slider.push(document.querySelector('.scroll_wrapper'));
    document.querySelector('.scroll_wrapper0') &&
      slider.push(document.querySelector('.scroll_wrapper0'));
    document.querySelector('.scroll_wrapper1') &&
      slider.push(document.querySelector('.scroll_wrapper1'));
    document.querySelector('.scroll_wrapper2') &&
      slider.push(document.querySelector('.scroll_wrapper2'));
    document.querySelector('.scroll_wrapper3') &&
      slider.push(document.querySelector('.scroll_wrapper3'));
    document.querySelector('.scroll_wrapper4') &&
      slider.push(document.querySelector('.scroll_wrapper4'));
    document.querySelector('.scroll_wrapper5') &&
      slider.push(document.querySelector('.scroll_wrapper5'));
    document.querySelector('.scroll_wrapper6') &&
      slider.push(document.querySelector('.scroll_wrapper6'));
    document.querySelector('.scroll_wrapper7') &&
      slider.push(document.querySelector('.scroll_wrapper7'));
    let isDown = false;
    let startX;
    let scrollLeft;
    slider?.forEach(item => {
      item.addEventListener('mousedown', e => {
        isDown = true;
        item.classList.add('active');
        startX = e.pageX - item.offsetLeft;
        scrollLeft = item.scrollLeft;
      });
      item.addEventListener('mouseleave', () => {
        isDown = false;
        item.classList.remove('active');
      });
      item.addEventListener('mouseup', () => {
        isDown = false;
        item.classList.remove('active');
      });
      item.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - item.offsetLeft;
        const walk = (x - startX) * 1;
        item.scrollLeft = scrollLeft - walk;
      });
    });
  }, []);

  useEffect(() => {
    if (Object.keys(diamondFilterDetail)?.length > 0) {
      setDiamondFilterData(diamondFilterDetail);
    }
  }, [diamondFilterDetail]);

  useEffect(() => {
    SVGInject(document.querySelectorAll('img.injectable'));
  }, [diamondFilterData?.shapeList]);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={serchDiamondFinalValue}
      innerRef={quickSearchRef}
      onSubmit={values => {
        dispatch(setIsModifySearchForDiamond(true));
        let newObj = getPayload(values);
        dispatch(
          setSearchDiamondSavedData({
            ...newObj,
            checkboxId: values.checkboxId,
          }),
        );
        navigate('/diamond');
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div className="quick_search_inner">
            <div className="search_inner_wrap">
              <div className="check_input_wraper">
                <ul>
                  <li>
                    <div className="checkbox_wrapper radio_wrapper">
                      <Form.Check
                        type="radio"
                        name="diamondType"
                        id="LabGrownDiamond"
                        readOnly
                        label="Lab Grown Diamond"
                        checked={values.diamondType === 'LABGROWN'}
                        onClick={() => {
                          if (values.diamondType !== 'LABGROWN') {
                            quickSearchRef &&
                              quickSearchRef.current.resetForm();
                            setDiamondFilterData(diamondFilterDetail);
                            let newObj = getPayload({
                              ...initialValuesForDiamondSearch,
                              diamondType: 'LABGROWN',
                            });
                            dispatch(setSearchDiamondSavedData({ ...newObj }));
                            handleChange('diamondType')('LABGROWN');
                            dispatch(setDiamondType('LABGROWN'));
                          }
                        }}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="checkbox_wrapper radio_wrapper">
                      <Form.Check
                        type="radio"
                        name="diamondType"
                        id="NaturalDiamond"
                        readOnly
                        label="Natural Diamond"
                        checked={values.diamondType === 'NATURAL'}
                        onClick={() => {
                          if (values.diamondType !== 'NATURAL') {
                            quickSearchRef &&
                              quickSearchRef.current.resetForm();
                            setDiamondFilterData(diamondFilterDetail);
                            let newObj = getPayload({
                              ...initialValuesForDiamondSearch,
                              diamondType: 'NATURAL',
                            });
                            dispatch(setSearchDiamondSavedData({ ...newObj }));
                            handleChange('diamondType')('NATURAL');
                            dispatch(setDiamondType('NATURAL'));
                          }
                        }}
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="search_button_wrap d-none d-lg-block">
                <Button
                  className="btn-outline-primary mr20"
                  onClick={() => {
                    quickSearchRef && quickSearchRef.current.resetForm();
                    setDiamondFilterData(diamondFilterDetail);
                    setSerchDiamondFinalValue(initialValues);
                    let newObj = getPayload({
                      ...initialValuesForDiamondSearch,
                      diamondType: diamondType,
                    });
                    dispatch(setSearchDiamondSavedData({ ...newObj }));
                    handleChange('diamondType')(diamondType);
                  }}
                >
                  <img src={ResetIcon} alt="" /> Reset Filter
                </Button>
                <Button type="submit">Search</Button>
              </div>
            </div>
            <ShapeList
              values={values}
              dispatch={dispatch}
              setFieldValue={setFieldValue}
              diamondFilterData={diamondFilterData}
              setDiamondFilterData={setDiamondFilterData}
              searchDiamondSavedData={searchDiamondSavedData}
              diamondDetailListLoading={diamondDetailListLoading}
              setSearchDiamondSavedData={setSearchDiamondSavedData}
            />
            <CaratList
              dispatch={dispatch}
              values={values}
              weightToggle={weightToggle}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              setWeightToggle={setWeightToggle}
              diamondFilterData={diamondFilterData}
              disableCalcuSymbol={disableCalcuSymbol}
              setDiamondFilterData={setDiamondFilterData}
              setSearchDiamondSavedData={setSearchDiamondSavedData}
              searchDiamondSavedData={searchDiamondSavedData}
            />
            <ColorList
              dispatch={dispatch}
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              diamondFilterData={diamondFilterData}
              setIsFancyColor={setIsFancyColor}
              setSearchDiamondSavedData={setSearchDiamondSavedData}
              searchDiamondSavedData={searchDiamondSavedData}
              diamondDetailListLoading={diamondDetailListLoading}
              setDiamondFilterData={setDiamondFilterData}
            />
            <ClarityList
              dispatch={dispatch}
              values={values}
              setFieldValue={setFieldValue}
              diamondFilterData={diamondFilterData}
              setDiamondFilterData={setDiamondFilterData}
              setSearchDiamondSavedData={setSearchDiamondSavedData}
              searchDiamondSavedData={searchDiamondSavedData}
              diamondDetailListLoading={diamondDetailListLoading}
            />
            <MakeList
              dispatch={dispatch}
              values={values}
              setFieldValue={setFieldValue}
              diamondFilterData={diamondFilterData}
              setDiamondFilterData={setDiamondFilterData}
              searchDiamondSavedData={searchDiamondSavedData}
              setSearchDiamondSavedData={setSearchDiamondSavedData}
              diamondDetailListLoading={diamondDetailListLoading}
            />
            <LocationList
              dispatch={dispatch}
              values={values}
              setFieldValue={setFieldValue}
              diamondFilterData={diamondFilterData}
              setDiamondFilterData={setDiamondFilterData}
              setSearchDiamondSavedData={setSearchDiamondSavedData}
              searchDiamondSavedData={searchDiamondSavedData}
              diamondDetailListLoading={diamondDetailListLoading}
            />
            <div className="search_button_wrap pt10 d-block d-lg-none">
              <Button
                className="btn-outline-primary mr20 mr5-md"
                onClick={() => {
                  quickSearchRef && quickSearchRef.current.resetForm();
                  setDiamondFilterData(diamondFilterDetail);
                  setSerchDiamondFinalValue(initialValues);
                  let newObj = getPayload({
                    ...initialValuesForDiamondSearch,
                    diamondType: diamondType,
                  });
                  dispatch(setSearchDiamondSavedData({ ...newObj }));
                  handleChange('diamondType')(diamondType);
                }}
              >
                <img src={ResetIcon} alt="" /> Reset Filter
              </Button>
              <Button type="submit">Search</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default memo(QuickSearchDiamond);
