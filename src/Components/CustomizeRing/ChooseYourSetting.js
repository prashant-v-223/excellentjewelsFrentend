import {
  getJewelleryFilterData,
  getJewellerySizeListByTypewise,
  setJewelleryFilterData,
} from 'Components/Redux/reducers/jewellery.slice';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NoImageAvailableOnShape from '../../Assets/Images/diamond-not-found.svg';
import YellowGold from '../../Assets/Images/gold.svg';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import RoseGold from '../../Assets/Images/rose-gold.svg';
import WhiteGold from '../../Assets/Images/white_gold.svg';
import JewelleryList from '../Jewellery/JewelleryList';
import { getJewelleryCategoryId } from 'Helper/CommonHelper';
import DefaultSubTypeImage from '../../Assets/Images/ring_icons/default-ring.svg';
import { getJewelleryParameterListByName } from 'Components/Redux/reducers/jewellery.slice';

const ChooseYourSetting = ({
  onSelectJewelleryForSetting,
  setIsSearchForJewellerySettingWise,
}) => {
  useEffect(() => {
    dispatch(getJewelleryParameterListByName('SHAPE, LOCATION'));
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const {
    jewelleryCategory,
    jewelleryBaseMetal,
    jewelleryFilterData,
    jewellerySearchStock = new Map(),
    jewelleryCategoryDetail,
    jewelleryParameterDetail,
    jewelleryFilterDataLoader,
    isSearchForJewellerySettingWise,
  } = useSelector(({ jewellery }) => jewellery);
  const { selectedDiamondForSetting } = useSelector(({ setting }) => setting);

  const { sub_Type_ID, metal_type, sortBy } = jewelleryFilterData || {};

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (jewelleryCategory?.length > 0) {
      setJewelleryFilterData(prevState => ({
        ...prevState,
        category_ID: getJewelleryCategoryId(jewelleryCategory, 'finejewellery'),
      }));
    }
  }, [jewelleryCategory]);

  const handleSubTypeError = useCallback(event => {
    event.target.src = DefaultSubTypeImage;
  }, []);

  const onSelectSubCategory = useCallback(
    (isChecked, MasterSubTypeValue_Code) => {
      let productTypeIdArr = [...sub_Type_ID] || [];
      if (isChecked) {
        if (productTypeIdArr.includes(MasterSubTypeValue_Code)) {
          productTypeIdArr = productTypeIdArr.filter(
            item2 => item2 !== MasterSubTypeValue_Code,
          );
        } else {
          productTypeIdArr = [...productTypeIdArr, MasterSubTypeValue_Code];
        }
      } else {
        productTypeIdArr = productTypeIdArr.filter(
          v => v !== MasterSubTypeValue_Code,
        );
      }
      dispatch(setJewelleryFilterData({ sub_Type_ID: productTypeIdArr }));
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          searchBy: 'Setting',
          sub_Type_ID: productTypeIdArr,
        }),
      );
    },
    [dispatch, jewelleryFilterData, sub_Type_ID],
  );

  const jewelleryStyle = useMemo(() => {
    let jeweleryStyleData =
      jewelleryCategoryDetail?.length > 0 ? [...jewelleryCategoryDetail] : [];

    jeweleryStyleData =
      jeweleryStyleData?.filter(
        item => item?.MasterTypeValue?.toLowerCase() === 'ring',
      )?.[0]?.SubType || [];

    if (jeweleryStyleData?.length > 0) {
      return jeweleryStyleData?.map((item, subIndex) => {
        return (
          <li key={`jewellery_${subIndex}`}>
            <div className="ring_setting_radio ring-setting-style">
              <input
                type="checkbox"
                key={`style_${subIndex}`}
                id={`ring_style_${item.MasterSubTypeValue}`}
                name="ring_setting"
                readOnly
                checked={sub_Type_ID?.includes(item.MasterSubTypeValue_Code)}
                onClick={e =>
                  onSelectSubCategory(
                    e.target.checked,
                    item.MasterSubTypeValue_Code,
                  )
                }
              />
              <label htmlFor={`ring_style_${item.MasterSubTypeValue}`}>
                <sapn>
                  <img
                    src={`http://72.61.170.111:8088/Content/DomainData/excellentjewels.com:8080/img/Jewellery/Style/${item.MasterSubTypeValue_Code}.svg`}
                    alt={item.MasterSubTypeValue_Code}
                    onError={handleSubTypeError}
                  />
                  <h5>{item.MasterSubTypeValue}</h5>
                </sapn>
              </label>
            </div>
          </li>
        );
      });
    }
  }, [
    jewelleryCategoryDetail,
    sub_Type_ID,
    handleSubTypeError,
    onSelectSubCategory,
  ]);

  const onSelectMetalHandler = useCallback(
    (isChecked, GoldType_Id) => {
      let metalTypeArr = [...metal_type];
      if (isChecked) {
        if (metalTypeArr.includes(GoldType_Id)) {
          metalTypeArr = metalTypeArr.filter(item2 => item2 !== GoldType_Id);
        } else {
          metalTypeArr = [...metalTypeArr, GoldType_Id];
        }
      } else {
        metalTypeArr = metalTypeArr.filter(v => v !== GoldType_Id);
      }
      dispatch(setJewelleryFilterData({ metal_type: metalTypeArr }));
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          searchBy: 'Setting',
          metal_type: metalTypeArr,
        }),
      );
    },
    [dispatch, jewelleryFilterData, metal_type],
  );

  const jewelleryMetalType = useMemo(() => {
    let jeweleryMetalData =
      jewelleryBaseMetal?.length > 0 ? [...jewelleryBaseMetal] : [];
    if (jeweleryMetalData?.length > 0) {
      return jeweleryMetalData?.map((metal, subIndex) => {
        return (
          <SwiperSlide key={`metal_check_${subIndex}`}>
            <div className="ring_setting_radio">
              <input
                type="checkbox"
                key={`style_${subIndex}`}
                id={`ring_metal_type_${metal.GoldType_Id}`}
                name="ring_setting"
                readOnly
                checked={metal_type.includes(metal.GoldType_Id)}
                onClick={e =>
                  onSelectMetalHandler(e.target.checked, metal.GoldType_Id)
                }
              />
              <label htmlFor={`ring_metal_type_${metal.GoldType_Id}`}>
                {metal?.ColorCodeName && (
                  <img
                    src={
                      metal?.ColorCodeName === 'P' ||
                        metal?.ColorCodeName === 'R'
                        ? RoseGold
                        : metal?.ColorCodeName === 'W'
                          ? WhiteGold
                          : YellowGold
                    }
                    alt=""
                  />
                )}
                <span> {metal.PurityCodeName}</span>
              </label>
            </div>
          </SwiperSlide>
        );
      });
    }
    return '';
  }, [jewelleryBaseMetal, metal_type, onSelectMetalHandler]);

  useEffect(() => {
    if (
      jewelleryCategoryDetail?.length > 0 &&
      jewelleryCategory?.length > 0 &&
      Object?.keys(jewelleryParameterDetail)?.length > 0
    ) {
      if (!isSearchForJewellerySettingWise) {
        let shapeType = '';
        let jeweleryType =
          jewelleryCategoryDetail?.filter(
            item => item?.MasterTypeValue?.toLowerCase() === 'ring',
          )?.[0]?.MasterTypeValue_Code || [];
        if (selectedDiamondForSetting?.Shape) {
          shapeType =
            jewelleryParameterDetail?.shapeList?.find(
              item =>
                item?.MasterTypeValue_Code === selectedDiamondForSetting.Shape,
            )?.MasterTypeValue_Id || '';
        }
        if (jeweleryType) {
          dispatch(
            getJewelleryFilterData({
              ...jewelleryFilterData,
              searchBy: 'Setting',
              type_ID: jeweleryType,
              shape_ID: shapeType ? [shapeType] : [],
              category_ID: getJewelleryCategoryId(
                jewelleryCategory,
                'finejewellery',
              ),
            }),
          );
          dispatch(
            setJewelleryFilterData({
              type_ID: jeweleryType,
              shape_ID: shapeType ? [shapeType] : [],
            }),
          );
          dispatch(getJewellerySizeListByTypewise('RING'));
          dispatch(
            setJewelleryFilterData({
              type_ID: jeweleryType,
            }),
          );
          dispatch(setIsSearchForJewellerySettingWise(true));
        }
      }
    }
  }, [
    dispatch,
    jewelleryCategory,
    jewelleryCategoryDetail,
    jewelleryParameterDetail,
    isSearchForJewellerySettingWise,
  ]);

  const currentDataObj = useMemo(() => {
    let jewellerySearchStockData =
      jewellerySearchStock?.size > 0 ? [...jewellerySearchStock.values()] : [];
    let totalPages = 0;
    if (jewellerySearchStockData?.length > 0) {
      jewellerySearchStockData = jewellerySearchStockData?.slice(
        0 + (currentPage * pageSize - pageSize),
        currentPage * pageSize,
      );
      totalPages = Math.ceil(jewellerySearchStock.size / pageSize);
    }
    return { data: jewellerySearchStockData, totalRows: totalPages };
  }, [currentPage, pageSize, jewellerySearchStock]);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);
  const handleImageErrorOnShape = useCallback(event => {
    event.target.src = NoImageAvailableOnShape;
  }, []);

  const onShapeSelectChange = useCallback(
    (e, shapeObj) => {
      let shapeIdArr =
        jewelleryFilterData?.shape_ID?.length > 0
          ? [...jewelleryFilterData.shape_ID]
          : [];
      if (e.target.checked) {
        if (shapeIdArr.includes(shapeObj.MasterTypeValue_Id)) {
          shapeIdArr = shapeIdArr.filter(
            item2 => item2 !== shapeObj.MasterTypeValue_Id,
          );
        } else {
          shapeIdArr = [...shapeIdArr, shapeObj.MasterTypeValue_Id];
        }
      } else {
        shapeIdArr = shapeIdArr.filter(v => v !== shapeObj.MasterTypeValue_Id);
      }
      dispatch(setJewelleryFilterData({ shape_ID: shapeIdArr }));
      dispatch(
        getJewelleryFilterData({
          ...jewelleryFilterData,
          searchBy: 'Setting',
          shape_ID: shapeIdArr,
        }),
      );
    },
    [dispatch, jewelleryFilterData],
  );

  return (
    <>
      <section className="engagement_ring_setting bg_light pt40 pt10-md pb10-md pb40">
        <Container>
          <h5 className="text-center mb25 mb10-lg ff_Mulish">
            Engagement Rings Settings
          </h5>
          <div className="jewellery_setting_wrapper">
            {/*   <div className="style_wrapper">
              <h6>Setting Style</h6>
              <ul>{jewelleryStyle}</ul>
            </div>
            <div className="style_wrapper flex-column filter_shape_checkbox shape_select jewellery_shape_wrapper">
              <h6>Shape</h6>
              <ul>
                {jewelleryParameterDetail?.shapeList?.map((shapeObj, index) => {
                  return (
                    <li key={`shape_li_${index}`}>
                      <div className="custom_checkbox_shape">
                        <input
                          type="checkbox"
                          id={shapeObj.MasterTypeValue_Code}
                          name={shapeObj.MasterTypeValue_Code}
                          key={`shape_${index}`}
                          checked={jewelleryFilterData?.shape_ID?.includes(
                            shapeObj.MasterTypeValue_Id,
                          )}
                          disabled={
                            window.location.pathname === '/setting-diamond-wise'
                          }
                          readOnly
                          onClick={e => onShapeSelectChange(e, shapeObj)}
                        />
                        <label htmlFor={shapeObj.MasterTypeValue_Code}>
                          <span>
                            <img
                              src={`${
                                process.env.REACT_APP_DOMAIN
                              }/Content/DomainData/${
                                process.env.REACT_APP_DOMAIN_WITHOUT_HTTP
                              }/img/Diamonds/Active/${shapeObj.MasterTypeValue_Code?.replaceAll(
                                ' ',
                                '',
                              )}.svg`}
                              alt={shapeObj.MasterTypeValue_Code}
                              onError={handleImageError}
                            />
                            <h5>{shapeObj.MasterTypeValue_Code}</h5>
                          </span>
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div> */}
            <Row>
              <Col md={12}>
                <div className="style_wrapper ff_Mulish">
                  <h6 className="ff_Mulish">Setting Style</h6>
                  <div className="style_inner_wrapper">
                    <ul>{jewelleryStyle}</ul>
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="style_wrapper flex-column filter_shape_checkbox shape_select jewellery_shape_wrapper">
                  <h6 className="ff_Mulish">Shape</h6>
                  <div className="style_inner_wrapper ff_Mulish">
                    <ul>
                      {jewelleryParameterDetail?.shapeList?.map(
                        (shapeObj, index) => {
                          return (
                            <li key={`shape_li_${index}`}>
                              <div className="custom_checkbox_shape cursor-pointer">
                                <input
                                  type="checkbox"
                                  id={shapeObj.MasterTypeValue_Code}
                                  name={shapeObj.MasterTypeValue_Code}
                                  key={`shape_${index}`}
                                  checked={jewelleryFilterData?.shape_ID?.includes(
                                    shapeObj.MasterTypeValue_Id,
                                  )}
                                  disabled={
                                    window.location.pathname ===
                                    '/setting-diamond-wise'
                                  }
                                  readOnly
                                  onClick={e =>
                                    onShapeSelectChange(e, shapeObj)
                                  }
                                />
                                <label htmlFor={shapeObj.MasterTypeValue_Code}>
                                  <span>
                                    <img
                                      src={`http://72.61.170.111:8088/uploads/Diamonds/${shapeObj.MasterTypeValue_Code}.svg`}
                                      alt={shapeObj.MasterTypeValue_Code}
                                      onError={handleImageErrorOnShape}
                                    />
                                    <h5>{shapeObj.MasterTypeValue_Code}</h5>
                                  </span>
                                </label>
                              </div>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="style_wrapper filter_ring_checkbox ff_Mulish">
                  <h6 className="ff_Mulish">Metal</h6>
                  <Swiper
                    spaceBetween={10}
                    autoHeight={false}
                    slidesPerView={'auto'}
                    navigation={true}
                    modules={[Navigation]}
                    className="px-sm-0 ring_size_filter"
                  >
                    {jewelleryMetalType}
                  </Swiper>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section className="jewellery_listing_Wrapper pt50 pb10 pt30-xs">
        <Container>
          <Row className="align-items-center mb25 mb10-lg jewellery_top_Wrapper">
            <Col sm={6}>
              <div className="d-flex align-items-center total_filter_button">
                <p className="mb0 fs_16 text_dark mr20 ff_Mulish">
                  {jewellerySearchStock?.size > 0 && (
                    <span>
                      {' '}
                      {jewellerySearchStock?.size
                        ? jewellerySearchStock?.size
                        : 0}{' '}
                      Products found
                    </span>
                  )}
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <ul className="select_filter_wrap">
                <li>
                  <div className="jewellery_sorting_wrap">
                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      className="form_group"
                    >
                      <Select
                        aria-label="Default select example"
                        className="react_custom_select_Wrapper square ff_Mulish"
                        value={sortBy}
                        options={[
                          { label: 'Price - Low to High', value: 'ASC' },
                          { label: 'Price - High to Low', value: 'DESC' },
                        ]}
                        onChange={e => {
                          if (e.value !== sortBy.value) {
                            dispatch(setJewelleryFilterData({ sortBy: e }));
                            dispatch(
                              getJewelleryFilterData({
                                ...jewelleryFilterData,
                                searchBy: 'Setting',
                                sortBy: e,
                              }),
                            );
                          }
                        }}
                        styles={{
                          option: (base, { isSelected }) => {
                            return {
                              ...base,
                              backgroundColor: isSelected ? '#be8d28' : '#fff',
                              ':hover': {
                                backgroundColor: 'rgb(200, 200, 200)',
                              },
                              color: '#000',
                            };
                          },
                        }}
                        placeholder="Sort By"
                      />
                    </Form.Group>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
          <JewelleryList
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            jewelType="choose_setting"
            currentDataObj={currentDataObj}
            setCurrentPage={setCurrentPage}
            handleImageError={handleImageError}
            jewellerySearchStock={jewellerySearchStock}
            jewelleryFilterDataLoader={jewelleryFilterDataLoader}
            onSelectJewelleryForSetting={onSelectJewelleryForSetting}
          />
        </Container>
      </section>
    </>
  );
};
export default memo(ChooseYourSetting);
