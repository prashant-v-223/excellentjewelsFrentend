import {
  addToCartJewellery,
  setIsAddToCartJewellery,
} from 'Components/Redux/reducers/jewellery.slice';
import {
  addToCartListInLocalJewelery,
  setIsAddToCartSettingWise,
} from 'Components/Redux/reducers/offlineList.slice';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import CartIcon from '../../Assets/Images/cart.svg';
import SelectedDiamond from '../../Assets/Images/selected-diamond.svg';
import SelectedRing from '../../Assets/Images/selected-ring.svg';
import JewelleryImgSlider from '../Jewellery/JewelleryImgSlider';

function ViewCompleted({
  dispatch,
  userData,
  jewelleryRingSize,
  isAddToCartJewellery,
  countryListByRingSize,
  onChangeStepForSetting,
  selectedDiamondForSetting,
  selectedRingSizeForSetting,
  selectedCountryForRingSize,
  selectedJewelleryForSetting,
  setSelectedRingSizeForSetting,
  setSelectedCountryForRingSize,
}) {
  const { isAddToCartSettingWise } = useSelector(
    ({ offlineList }) => offlineList,
  );
  const { addToCartJewelleryLoading } = useSelector(
    ({ jewellery }) => jewellery,
  );
  const [isClickAddToCart, setIsClickAddToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAddToCartJewellery) {
      dispatch(setIsAddToCartJewellery(false));
      navigate('/cart');
    }
  }, [isAddToCartJewellery, dispatch, navigate]);

  useEffect(() => {
    if (isAddToCartSettingWise) {
      dispatch(setIsAddToCartSettingWise(false));
      navigate('/cart');
    }
  }, [isAddToCartSettingWise, dispatch, navigate]);

  const {
    Weight,
    Shape,
    Diamond_Type,
    Cost_Amt,
    Color,
    Clarity,
    Cut,
    Polish,
    Symm,
    FlrIntens,
    Measurement,
    Table_Diameter_Per,
    Total_Depth_Per,
    CrownAngle,
    CrownHeight,
    PavillionAngle,
    PavillionHeight,
    KeyToSymbols,
    StarLength,
    LowerHalve,
    GirdleName,
    GirdleCon,
    CuletSize,
    Girdle_Per,
    Lab_Report_Comment,
    Tinge,
    Milkey,
    Eyeclean,
    BIC,
    HnA,
    BIS,
    WIC,
    WIS,
    CVD_HPHT,
  } = selectedDiamondForSetting || {};

  const { JewelleryDetail } = selectedJewelleryForSetting || {};

  const onAddToCartJewelleryWithSetting = useCallback(() => {
    if (
      Object?.keys(selectedDiamondForSetting)?.length > 0 &&
      Object?.keys(selectedJewelleryForSetting)?.length > 0 &&
      Object?.keys(selectedRingSizeForSetting)?.length > 0
    ) {
      if (userData?.UserID) {
        const obj = {
          Stock_ID: selectedDiamondForSetting?.Stock_ID
            ? selectedDiamondForSetting?.Stock_ID
            : 0,
          userId: userData?.UserID ? userData?.UserID : 0,
          Diamond_Type: selectedDiamondForSetting?.Diamond_Type
            ? selectedDiamondForSetting.Diamond_Type
            : '',
          Jewellery_Stock_ID: selectedJewelleryForSetting?.JewelleryDetail
            ?.Stock_ID
            ? selectedJewelleryForSetting.JewelleryDetail.Stock_ID
            : 0,
          Metal_ID: selectedJewelleryForSetting?.JewelleryDetail?.Metal_ID
            ? selectedJewelleryForSetting.JewelleryDetail.Metal_ID
            : 0,
          Color_And_Clarity_Id: 0,
          Color_Id: selectedJewelleryForSetting?.DiamondDetail?.Color_ID
            ? selectedJewelleryForSetting.DiamondDetail.Color_ID
            : 0,
          Clarity_Id: selectedJewelleryForSetting?.DiamondDetail?.Clarity_ID
            ? selectedJewelleryForSetting.DiamondDetail.Clarity_ID
            : 0,
          Qty: 1,
          Sale_Rate: selectedJewelleryForSetting?.JewelleryDetail?.Setting_Rate
            ? selectedJewelleryForSetting.JewelleryDetail.Setting_Rate
            : 0,
          WithStone: true,
          Total_Metal_Weight: selectedJewelleryForSetting?.JewelleryDetail
            ?.Total_Metal_Weight
            ? selectedJewelleryForSetting.JewelleryDetail.Total_Metal_Weight
            : 0,
          Engraving: true,
          PriceType: '',
          Setting_ID: 1,
          Size: selectedRingSizeForSetting?.value
            ? selectedRingSizeForSetting.value?.toString()
            : 0,
          isSettingWise: true,
        };
        dispatch(addToCartJewellery(obj));
      } else {
        const obj = {
          Stock_ID: selectedDiamondForSetting?.Stock_ID
            ? selectedDiamondForSetting?.Stock_ID
            : 0,
          userId: userData?.UserID ? userData?.UserID : 0,
          Diamond_Type: selectedDiamondForSetting?.Diamond_Type
            ? selectedDiamondForSetting.Diamond_Type
            : '',
          Jewellery_Stock_ID: selectedJewelleryForSetting?.JewelleryDetail
            ?.Stock_ID
            ? selectedJewelleryForSetting.JewelleryDetail.Stock_ID
            : 0,
          Metal_ID: selectedJewelleryForSetting?.JewelleryDetail?.Metal_ID
            ? selectedJewelleryForSetting.JewelleryDetail.Metal_ID
            : 0,
          Color_And_Clarity_Id: 0,
          Color_Id: selectedJewelleryForSetting?.DiamondDetail?.Color_ID
            ? selectedJewelleryForSetting.DiamondDetail.Color_ID
            : 0,
          Clarity_Id: selectedJewelleryForSetting?.DiamondDetail?.Clarity_ID
            ? selectedJewelleryForSetting.DiamondDetail.Clarity_ID
            : 0,
          Qty: 1,
          Sale_Rate: selectedJewelleryForSetting?.JewelleryDetail?.Setting_Rate
            ? selectedJewelleryForSetting.JewelleryDetail.Setting_Rate
            : 0,
          Amount: `${Number(
            (selectedDiamondForSetting?.Cost_Amt
              ? selectedDiamondForSetting.Cost_Amt
              : 0) +
              (selectedJewelleryForSetting?.JewelleryDetail?.Setting_Rate
                ? selectedJewelleryForSetting.JewelleryDetail.Setting_Rate
                : 0),
          )?.toFixed(2)}`,
          WithStone: true,
          Total_Metal_Weight: selectedJewelleryForSetting?.JewelleryDetail
            ?.Total_Metal_Weight
            ? selectedJewelleryForSetting.JewelleryDetail.Total_Metal_Weight
            : 0,
          Engraving: true,
          PriceType: '',
          Setting_ID: 1,
          Size: selectedRingSizeForSetting?.value
            ? selectedRingSizeForSetting.value?.toString()
            : 0,
          isSettingWise: true,
          Jewellery_Name: selectedJewelleryForSetting?.JewelleryDetail
            ?.Jewellery_Name
            ? selectedJewelleryForSetting.JewelleryDetail.Jewellery_Name
            : '',
          Weight: selectedDiamondForSetting?.Weight
            ? selectedDiamondForSetting.Weight
            : 0,
          Shape: selectedDiamondForSetting?.Shape
            ? selectedDiamondForSetting.Shape
            : '',
          Stone_No: selectedDiamondForSetting?.Stone_No
            ? selectedDiamondForSetting.Stone_No
            : '',
          Stone_Img_url: selectedDiamondForSetting?.Stone_Img_url
            ? selectedDiamondForSetting.Stone_Img_url
            : '',
          Lab_Report_No: selectedDiamondForSetting?.Lab_Report_No
            ? selectedDiamondForSetting.Lab_Report_No
            : '',
          Cut: selectedDiamondForSetting?.Cut
            ? selectedDiamondForSetting.Cut
            : '',
          Color: selectedDiamondForSetting?.Color
            ? selectedDiamondForSetting.Color
            : '',
          Clarity: selectedDiamondForSetting?.Clarity
            ? selectedDiamondForSetting.Clarity
            : '',
          JWL_Image_URL: selectedJewelleryForSetting?.ImagesAndVideos?.[0]
            ?.Img_Video_Url
            ? selectedJewelleryForSetting.ImagesAndVideos[0].Img_Video_Url
            : '',
          Jewellery_No: selectedJewelleryForSetting?.JewelleryDetail
            ?.Jewellery_No
            ? selectedJewelleryForSetting.JewelleryDetail.Jewellery_No
            : '',
          Gold_Type: selectedJewelleryForSetting?.JewelleryDetail
            ?.Metal_PurityColor
            ? selectedJewelleryForSetting.JewelleryDetail.Metal_PurityColor
            : '',
          StockStatus: selectedJewelleryForSetting?.JewelleryDetail?.StockStatus
            ? selectedJewelleryForSetting?.JewelleryDetail.StockStatus
            : '',
        };
        dispatch(
          addToCartListInLocalJewelery({ jeweleryList: obj, Setting_ID: 1 }),
        );
      }
    }
  }, [
    userData,
    dispatch,
    selectedDiamondForSetting,
    selectedRingSizeForSetting,
    selectedJewelleryForSetting,
  ]);

  return (
    <>
      <section className="jewellety_detail_wrapper pb80 pb10-lg">
        <Container>
          <Row>
            <Col md={4}>
              <JewelleryImgSlider
                jewelleryDetailData={selectedJewelleryForSetting}
              />
            </Col>
            <Col md={8}>
              <div className="jewellery_price_wrapper">
                <h5 className="fs_20 mb10 text_dark ff_Mulish">
                  {JewelleryDetail?.Jewellery_Name
                    ? JewelleryDetail.Jewellery_Name
                    : ''}{' '}
                  With{' '}
                  {`${Weight ? `${Weight} - carat ` : ''}${
                    Shape ? Shape + ' Shape ' : ''
                  }${Diamond_Type ? Diamond_Type + ' Diamond' : ''}`}
                </h5>
                <h4 className="fw_700 mb10 text_colorC ff_Mulish">{`$${Number(
                  (Cost_Amt ? Cost_Amt : 0) +
                    (JewelleryDetail?.Setting_Rate
                      ? JewelleryDetail.Setting_Rate
                      : 0),
                )?.toFixed(2)}`}</h4>
                <div className="selected_diamond_wrap">
                  <div className="selected_diamond_in d-flex mb25 mb10-md">
                    <div className="select_img">
                      <img src={SelectedRing} alt="" />
                    </div>
                    <div className="selected_diamond_info">
                      <p className="mb10 mb5-md fw_300 fs_16 ff_Mulish">
                        {JewelleryDetail?.Metal_PurityColor &&
                          `${JewelleryDetail.Metal_PurityColor} Gold`}{' '}
                        {JewelleryDetail?.Sub_Type
                          ? `${JewelleryDetail.Sub_Type} Ring`
                          : '-'}
                      </p>
                      <h6 className="fs_16 ff_Mulish">
                        {`$${
                          JewelleryDetail?.Setting_Rate
                            ? Number(JewelleryDetail.Setting_Rate)?.toFixed(2)
                            : `0.00`
                        }`}{' '}
                        <span
                          onClick={() =>
                            window.location.pathname === '/setting-diamond-wise'
                              ? onChangeStepForSetting(3)
                              : onChangeStepForSetting(1)
                          }
                        >
                          Change
                        </span>
                      </h6>
                    </div>
                  </div>
                  <div className="selected_diamond_in d-flex mb25 mb10-md">
                    <div className="select_img">
                      <img src={SelectedDiamond} alt="" />
                    </div>
                    <div className="selected_diamond_info">
                      <p className="mb-1 fw_300 fs_16 ff_Mulish">
                        {`${Weight ? `${Weight} - carat ` : ''}${
                          Shape ? Shape + ' Shape ' : ''
                        }${Color ? Color + ' ' : ''}${Cut ? Cut + ' - ' : ''}${
                          Polish ? Polish + ' - ' : ''
                        }${Symm ? Symm + '' : ''}`}
                      </p>
                      <p className="mb10 fw_300 fs_16 ff_Mulish">
                        {Diamond_Type ? Diamond_Type + ' Diamond ' : ''}
                      </p>
                      <h6 className="fs_16 ff_Mulish">
                        {' '}
                        {`$${
                          Cost_Amt ? Number(Cost_Amt)?.toFixed(2) : `0.00`
                        }`}{' '}
                        <span
                          onClick={() =>
                            window.location.pathname === '/setting-diamond-wise'
                              ? onChangeStepForSetting(1)
                              : onChangeStepForSetting(3)
                          }
                        >
                          Change
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-sm-flex ring_size_wrap">
                  <div className="ring_size mb25 mb10-md pr15 pr0-xs">
                    <h6 className="fs_16 mb15 mb10-md text_colorC ff_Mulish">
                      Ring Size Country
                    </h6>
                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      className="form_group"
                    >
                      <Select
                        aria-label="Default select example"
                        className="react_custom_select_Wrapper square ff_Mulish"
                        value={selectedCountryForRingSize}
                        onChange={e => {
                          setSelectedCountryForRingSize(e);
                          selectedRingSizeForSetting &&
                            setSelectedRingSizeForSetting({});
                        }}
                        options={countryListByRingSize}
                        placeholder="Select Country"
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
                      />
                    </Form.Group>
                    {isClickAddToCart && !selectedCountryForRingSize && (
                      <span className="text-error ff_Mulish">
                        Please choose ring size country!
                      </span>
                    )}
                  </div>
                  <div className="ring_size mb25 mb10-md">
                    <h6 className="fs_16 mb15 mb10-md text_colorC ff_Mulish">
                      Ring Size
                    </h6>
                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      className="form_group"
                    >
                      <Select
                        aria-label="Default select example"
                        className="react_custom_select_Wrapper square ff_Mulish"
                        value={selectedRingSizeForSetting}
                        onChange={e => {
                          setSelectedRingSizeForSetting(e);
                        }}
                        options={jewelleryRingSize}
                        placeholder="Select Size"
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
                      />
                    </Form.Group>
                    {isClickAddToCart && !selectedRingSizeForSetting && (
                      <span className="text-error">
                        Please choose ring size!
                      </span>
                    )}
                  </div>
                </div>

                <ul className="action_button_wrap d-flex align-items-center mt25">
                  <li className="mr10">
                    <Button
                      variant="primary"
                      className="pl20 pr20 btn_shadow"
                      disabled={addToCartJewelleryLoading}
                      onClick={() => {
                        setIsClickAddToCart(true);
                        if (selectedRingSizeForSetting?.value) {
                          onAddToCartJewelleryWithSetting();
                        }
                      }}
                    >
                      <img src={CartIcon} className="white_img" alt="" />
                      Add To Cart
                    </Button>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="product_detail_tab_wrapper pb100 pb10-lg">
        <Container>
          <div className="tab_design_two  ff_Mulish">
            <Tabs defaultActiveKey="SettingDetails" id="product_detail">
              <Tab eventKey="SettingDetails" title="Setting Details">
                <div className="stone_detail_wrapper">
                  <h4 className="ff_Mulish">Setting Information</h4>
                  <div className="stone_detail_wrapper_inner">
                    <div className="g-2 row">
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Sku Number</td>
                                <td>
                                  {JewelleryDetail?.Jewellery_No
                                    ? JewelleryDetail.Jewellery_No
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Ring Styles</td>
                                <td>
                                  {JewelleryDetail?.Sub_Type
                                    ? JewelleryDetail.Sub_Type
                                    : '-'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Metal</td>
                                <td>
                                  {JewelleryDetail?.Metal_PurityColor
                                    ? `${JewelleryDetail.Metal_PurityColor} Gold`
                                    : '-'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="DiamondDetails" title="Diamond Details">
                <div className="stone_detail_wrapper">
                  <h4>Grading Details</h4>
                  <div className="stone_detail_wrapper_inner">
                    <div className="g-2 row">
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Shape</td>
                                <td>{Shape ? Shape : '-'}</td>
                              </tr>
                              <tr>
                                <td>Carat</td>
                                <td>{Weight ? Weight : '-'}</td>
                              </tr>
                              <tr>
                                <td>Color</td>
                                <td>{Color ? Color : '-'}</td>
                              </tr>
                              <tr>
                                <td>Clarity</td>
                                <td>{Clarity ? Clarity : '-'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Cut</td>
                                <td>{Cut ? Cut : '-'}</td>
                              </tr>
                              <tr>
                                <td>Polish</td>
                                <td>{Polish ? Polish : '-'}</td>
                              </tr>
                              <tr>
                                <td>Symmetry</td>
                                <td>{Symm ? Symm : '-'}</td>
                              </tr>
                              <tr>
                                <td>Fluorescence</td>
                                <td>{FlrIntens ? FlrIntens : '-'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stone_detail_wrapper">
                  <h4>Measurement Mapping</h4>
                  <div className="stone_detail_wrapper_inner">
                    <div className="g-2 row">
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Measurements</td>
                                <td>{Measurement ? `${Measurement}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Table %</td>
                                <td>
                                  {Table_Diameter_Per
                                    ? `${Table_Diameter_Per}%`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Depth %</td>
                                <td>
                                  {Total_Depth_Per
                                    ? `${Total_Depth_Per}%`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>CA-CH</td>
                                <td>
                                  {CrownAngle ? `${CrownAngle}°` : '-'}-{' '}
                                  {CrownHeight ? `${CrownHeight}°` : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>PA-PH</td>
                                <td>
                                  {PavillionAngle ? `${PavillionAngle}°` : '-'}{' '}
                                  -{' '}
                                  {PavillionHeight
                                    ? `${PavillionHeight}°`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Key To Symbol</td>
                                <td>
                                  {KeyToSymbols ? `${KeyToSymbols}` : '-'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Star/LH</td>
                                <td>
                                  {StarLength ? `${StarLength}°` : '-'}/
                                  {LowerHalve ? `${LowerHalve}°` : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Girdle</td>
                                <td>{GirdleName ? `${GirdleName}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Girdle Condition</td>
                                <td>{GirdleCon ? `${GirdleCon}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Culet</td>
                                <td>{CuletSize ? `${CuletSize}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Girdle %</td>
                                <td>{Girdle_Per ? `${Girdle_Per}%` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Report Comment</td>
                                <td>
                                  {Lab_Report_Comment
                                    ? `${Lab_Report_Comment}`
                                    : '-'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stone_detail_wrapper">
                  <h4>Inclusion Details</h4>
                  <div className="stone_detail_wrapper_inner">
                    <div className="g-2 row">
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Tinge</td>
                                <td>{Tinge ? `${Tinge}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Milky</td>
                                <td>{Milkey ? `${Milkey}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Eyeclean</td>
                                <td>{Eyeclean ? `${Eyeclean}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>BIC</td>
                                <td>{BIC ? `${BIC}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>H&amp;A</td>
                                <td>{HnA ? `${HnA}` : '-'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>BIS</td>
                                <td>{BIS ? `${BIS}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>WIC</td>
                                <td>{WIC ? `${WIC}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>WIS</td>
                                <td>{WIS ? `${WIS}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Growth Type</td>
                                <td>{CVD_HPHT ? `${CVD_HPHT}` : '-'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </section>
    </>
  );
}
export default memo(ViewCompleted);
