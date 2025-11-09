import React, { memo, useCallback, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import DownArrow from '../../Assets/Images/down-arrow.svg';
import { OptimizedImage } from 'utils/performanceUtils';

const OrderDetailTable = ({
  currentData,
  myOrderDetail,
  summaryToggle,
  handleChangeToggleTab,
  onClickToDiamondDetail,
  onClickToJewelleryDetail,
}) => {
  const { diamondTab, jewelleryTab, mixDiamondTab, settingTab } = summaryToggle;
  const {
    settingOrderList,
    diamondOrderList,
    jewelleryOrderList,
    mixDiamondOrderList,
  } = currentData;
  const {
    OrderNo,
    FinalAmt,
    CustomCount,
    totalDiamAmt,
    JWLtotalCount,
    Mix_Total_Pcs,
    Mix_Total_Cts,
    totalDiamCount,
    Mix_Total_Item,
    totalDiamWeight,
    CustomJWLweight,
    Jewellery_Amount,
    Mix_Total_Amount,
    CustomDiamondweight,
  } = myOrderDetail;
  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const diamondOrderSummaryDetail = useMemo(() => {
    return (
      <div className="summary_wrap">
        <ul>
          <li className="ff_Mulish">
            <label>Order No.</label>
            <span>{OrderNo ? OrderNo : '-'}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Items</label>
            <span>{totalDiamCount ? totalDiamCount : 0}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Ct</label>
            <span>{totalDiamWeight ? `${totalDiamWeight} ct` : '-'}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Amount</label>
            <span>{totalDiamAmt ? totalDiamAmt : '$0.00'}</span>
          </li>
        </ul>
      </div>
    );
  }, [OrderNo, totalDiamCount, totalDiamWeight, totalDiamAmt]);

  const diamondRenderRow = useMemo(() => {
    return (
      <div className="order_summary_wrapper diamond_summary">
        <div
          className={
            diamondTab
              ? 'diamond_summary_header active'
              : 'diamond_summary_header'
          }
          onClick={() => handleChangeToggleTab('diamondTab', diamondTab)}
        >
          <h5 className="text-center mb0 ff_Mulish">Diamond Order Summary</h5>
          <div className="toggle_button">
            <img src={DownArrow} alt="" />
          </div>
        </div>

        {diamondTab && (
          <div className="mt10 diamond_summary_content">
            {Object.keys(myOrderDetail)?.length > 0 &&
              diamondOrderSummaryDetail}
            <div className="order_light_box mt10 mb0">
              {_.map(diamondOrderList, (x, i) => {
                return (
                  <DiamondOrderTableContainer
                    key={i}
                    {...x}
                    row={x}
                    index={i}
                    NoImageAvailable={NoImageAvailable}
                    handleImageError={handleImageError}
                    onClickToDiamondDetail={onClickToDiamondDetail}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    diamondTab,
    myOrderDetail,
    diamondOrderList,
    handleImageError,
    handleChangeToggleTab,
    onClickToDiamondDetail,
    diamondOrderSummaryDetail,
  ]);

  const mixDiamondOrderSummaryDetail = useMemo(() => {
    return (
      <div className="summary_wrap">
        <ul>
          <li className="ff_Mulish">
            <label>Order No.</label>
            <span>{OrderNo ? OrderNo : '-'}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Items</label>
            <span>{Mix_Total_Item ? Mix_Total_Item : 0}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Pcs</label>
            <span>{Mix_Total_Pcs ? Mix_Total_Pcs : 0}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Ct</label>
            <span>{Mix_Total_Cts ? `${Mix_Total_Cts} ct` : '-'}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Amount</label>
            <span>{Mix_Total_Amount ? Mix_Total_Amount : '$0.00'}</span>
          </li>
        </ul>
      </div>
    );
  }, [OrderNo, Mix_Total_Item, Mix_Total_Pcs, Mix_Total_Cts, Mix_Total_Amount]);

  const mixDiamondRenderRow = useMemo(() => {
    return (
      <div className="order_summary_wrapper diamond_summary">
        <div
          className={
            mixDiamondTab
              ? 'diamond_summary_header active'
              : 'diamond_summary_header'
          }
          onClick={() => handleChangeToggleTab('mixDiamondTab', mixDiamondTab)}
        >
          <h5 className="text-center mb0 ff_Mulish">
            Parcel Good Order Summary
          </h5>
          <div className="toggle_button">
            <img src={DownArrow} alt="" />
          </div>
        </div>

        {mixDiamondTab && (
          <div className="mt10 diamond_summary_content">
            {Object.keys(myOrderDetail)?.length > 0 &&
              mixDiamondOrderSummaryDetail}
            <div className="order_light_box mt10 mb0">
              {_.map(mixDiamondOrderList, (x, i) => {
                return (
                  <MixDiamondOrderTableContainer
                    key={i}
                    {...x}
                    row={x}
                    index={i}
                    NoImageAvailable={NoImageAvailable}
                    handleImageError={handleImageError}
                    onClickToDiamondDetail={onClickToDiamondDetail}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    mixDiamondTab,
    myOrderDetail,
    handleImageError,
    mixDiamondOrderList,
    handleChangeToggleTab,
    onClickToDiamondDetail,
    mixDiamondOrderSummaryDetail,
  ]);

  const jewelleryOrderSummaryDetail = useMemo(() => {
    return (
      <div className="summary_wrap">
        <ul>
          <li className="ff_Mulish">
            <label>Order No.</label>
            <span>{OrderNo ? OrderNo : '-'}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Items</label>
            <span>{JWLtotalCount ? JWLtotalCount : 0}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Amount</label>
            <span>{Jewellery_Amount ? Jewellery_Amount : '$0.00'}</span>
          </li>
        </ul>
      </div>
    );
  }, [OrderNo, JWLtotalCount, Jewellery_Amount]);

  const jewelleryRenderRow = useMemo(() => {
    return (
      <div className="order_summary_wrapper">
        <div
          className={
            jewelleryTab
              ? 'diamond_summary_header active'
              : 'diamond_summary_header'
          }
          onClick={() => handleChangeToggleTab('jewelleryTab', jewelleryTab)}
        >
          <h5 className="text-center mb0 ff_Mulish">Jewellery Order Summary</h5>
          <div className="toggle_button">
            <img src={DownArrow} alt="" />
          </div>
        </div>
        {jewelleryTab && (
          <div className="mt10 diamond_summary_content">
            {Object.keys(myOrderDetail)?.length > 0 &&
              jewelleryOrderSummaryDetail}
            <div className="order_light_box mt10 mb0">
              {_.map(jewelleryOrderList, (x, i) => {
                return (
                  <JewelleryOrderTableContainer
                    key={i}
                    {...x}
                    row={x}
                    index={i}
                    myOrderDetail={myOrderDetail}
                    NoImageAvailable={NoImageAvailable}
                    handleImageError={handleImageError}
                    onClickToJewelleryDetail={onClickToJewelleryDetail}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    jewelleryTab,
    myOrderDetail,
    handleImageError,
    jewelleryOrderList,
    handleChangeToggleTab,
    onClickToJewelleryDetail,
    jewelleryOrderSummaryDetail,
  ]);

  const settingOrderSummaryDetail = useMemo(() => {
    return (
      <div className="summary_wrap">
        <ul>
          <li className="ff_Mulish">
            <label>Order No.</label>
            <span>{OrderNo ? OrderNo : '-'}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Items</label>
            <span>{CustomCount ? CustomCount : 0}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Diamond Cts</label>
            <span>
              {CustomDiamondweight ? `${CustomDiamondweight} ct` : '-'}
            </span>
          </li>
          <li className="ff_Mulish">
            <label>Total Metal Weight</label>
            <span>{CustomJWLweight ? `${CustomJWLweight}gm` : '-'}</span>
          </li>
          <li className="ff_Mulish">
            <label>Total Amount</label>
            <span>{FinalAmt ? FinalAmt : '$0.00'}</span>
          </li>
        </ul>
      </div>
    );
  }, [OrderNo, CustomCount, CustomDiamondweight, CustomJWLweight, FinalAmt]);

  const settingRenderRow = useMemo(() => {
    return (
      <div className="order_summary_wrapper">
        <div
          className={
            settingTab
              ? 'diamond_summary_header active'
              : 'diamond_summary_header'
          }
          onClick={() => handleChangeToggleTab('settingTab', settingTab)}
        >
          <h5 className="text-center mb0 ff_Mulish">
            Custom Jewellery Summary
          </h5>
          <div className="toggle_button">
            <img src={DownArrow} alt="" />
          </div>
        </div>
        {settingTab && (
          <div className="mt10 diamond_summary_content">
            {Object.keys(myOrderDetail)?.length > 0 &&
              settingOrderSummaryDetail}
            <div className="order_light_box mt10 mb0">
              {_.map(settingOrderList, (x, i) => {
                return (
                  <SettingOrderTableContainer
                    key={i}
                    {...x}
                    row={x}
                    index={i}
                    myOrderDetail={myOrderDetail}
                    NoImageAvailable={NoImageAvailable}
                    handleImageError={handleImageError}
                    onClickToDiamondDetail={onClickToDiamondDetail}
                    onClickToJewelleryDetail={onClickToJewelleryDetail}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    settingTab,
    myOrderDetail,
    settingOrderList,
    handleImageError,
    handleChangeToggleTab,
    onClickToDiamondDetail,
    onClickToJewelleryDetail,
    settingOrderSummaryDetail,
  ]);

  const renderRow = useMemo(() => {
    return (
      <>
        {diamondOrderList?.length > 0 && diamondRenderRow}
        {jewelleryOrderList?.length > 0 && jewelleryRenderRow}
        {settingOrderList?.length > 0 && settingRenderRow}
        {mixDiamondOrderList?.length > 0 && mixDiamondRenderRow}
      </>
    );
  }, [
    settingOrderList,
    diamondOrderList,
    jewelleryOrderList,
    mixDiamondOrderList,
    diamondRenderRow,
    settingRenderRow,
    jewelleryRenderRow,
    mixDiamondRenderRow,
  ]);

  return <>{renderRow}</>;
};

const DiamondOrderTableContainer = ({
  Cut,
  Lab,
  Color,
  Shape,
  index,
  Weight,
  Clarity,
  Stone_No,
  Cost_Amt,
  Diamond_Type,
  Lab_Report_No,
  Stone_Img_url,
  WebOrder_Status,
  _StatusColorCode,
  NoImageAvailable,
  handleImageError,
  onClickToDiamondDetail,
}) => {
  const diamondOrderListMemo = useMemo(() => {
    return (
      <div className="diamond_cart_box" key={`diamond_${index}`}>
        <h6 className="ff_Mulish">
          {Weight ? `${Weight}-carat ` : ''}
          {Color ? `${Color} Color ` : ''}
          {Clarity ? `${Clarity} Clarity ` : ''}
          {Shape ? `${Shape} ` : ''}
          {Diamond_Type ? `${Diamond_Type} Diamond` : ''}
        </h6>
        <div className="status_wrapper">
          <span
            className="badge"
            style={{
              background: _StatusColorCode ? _StatusColorCode : '',
            }}
          >
            {WebOrder_Status ? WebOrder_Status : '-'}
          </span>
        </div>
        <Row className="align-items-center">
          <Col sm={8}>
            <div className="diamond_product_info">
              <div
                className="diamond_img_cart cursor_pointer"
                onClick={() => {
                  onClickToDiamondDetail(Stone_No, Diamond_Type);
                }}
              >
                <img
                  src={Stone_Img_url ? Stone_Img_url : NoImageAvailable}
                  alt="CartImg"
                  onError={handleImageError}
                />
              </div>
              <div className="diamond_text_cart">
                <p className="fs_14 m0 text_extra_light ff_Mulish text-uppercase">
                  SKU : {Stone_No ? ` ${Stone_No}` : ' -'}
                </p>
                <p className="fs_14 m0 text_extra_light ff_Mulish">
                  Diamond Report Number : {Lab ? Lab : ''}
                  {Lab_Report_No ? ` ${Lab_Report_No}` : '-'}
                </p>
                <p className="fs_14 m0 text_extra_light ff_Mulish">
                  Cut : {Cut ? Cut : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ff_Mulish">
                  Color : {Color ? Color : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ff_Mulish">
                  Clarity : {Clarity ? Clarity : ''}
                </p>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="diamond_cart_total_wrap">
              <div className="diamond_cart_total">
                <h5 className="text_colorC d-flex align-items-center ff_Mulish">
                  <span className="text_colorC fs_22">{Cost_Amt}</span>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }, [
    Cut,
    Lab,
    index,
    Color,
    Shape,
    Weight,
    Clarity,
    Cost_Amt,
    Stone_No,
    Diamond_Type,
    Lab_Report_No,
    Stone_Img_url,
    WebOrder_Status,
    _StatusColorCode,
    NoImageAvailable,
    handleImageError,
    onClickToDiamondDetail,
  ]);
  return <>{diamondOrderListMemo}</>;
};

const MixDiamondOrderTableContainer = ({
  Cut,
  Cts,
  Size,
  Rate,
  Color,
  Shape,
  index,
  Amount,
  Quality,
  Packet_Id,
  Packet_Name,
  Diamond_Type,
  NoImageAvailable,
  handleImageError,
  onClickToDiamondDetail,
}) => {
  const mixDiamondOrderListMemo = useMemo(() => {
    return (
      <div className="diamond_cart_box" key={`diamond_${index}`}>
        <h6 className="ff_Mulish">
          {Cts && `${Cts}carat `}
          {Packet_Name && Packet_Name}
          {Diamond_Type && `${Diamond_Type} Diamond Type`}
        </h6>
        <Row className="align-items-center">
          <Col>
            <div className="diamond_product_info">
              <div
                className="diamond_img_cart cursor_pointer"
                onClick={() => {
                  onClickToDiamondDetail(Packet_Id, Diamond_Type);
                }}
              >
                <img
                  src={Image ? Image : NoImageAvailable}
                  alt="CartImg"
                  onError={handleImageError}
                />
              </div>
              <div className="diamond_text_cart d-flex justify-content-between align-items-center flex-wrap">
                <div className="pe-2">
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Shape : {Shape ? Shape : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Size : {Size ? Size : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Color : {Color ? Color : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Cut : {Cut ? Cut : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Quality : {Quality ? Quality : ''}
                  </p>
                </div>
                <div className="price_box_left_wrap">
                  <div className="diamond_cart_total">
                    <ul className="d-flex flex-column price_box_right">
                      <li>
                        <h5 className="text_colorC">
                          <span className="text_grey ff_Mulish ">
                            Total Cts :
                          </span>
                          <span className="text_colorC  ms-1 ff_Mulish">
                            {Cts && `${Cts}carat `}
                          </span>
                        </h5>
                      </li>
                      <li>
                        <h5 className="text_colorC">
                          <span className="text_grey ff_Mulish">
                            Price P/C :
                          </span>
                          <span className="text_colorC ms-1 ff_Mulish">
                            ${Rate ? (Number(Rate) || 0)?.toFixed(2) : '0.00'}
                          </span>
                        </h5>
                      </li>
                      <li>
                        <h5 className="text_colorC">
                          <span className="text_grey ff_Mulish">
                            Total Amount :
                          </span>
                          <span className="text_colorC ms-1 ff_Mulish">
                            ${Rate ? (Number(Amount) || 0)?.toFixed(2) : '0.00'}
                          </span>
                        </h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }, [
    Cut,
    Cts,
    Size,
    Rate,
    Color,
    Shape,
    index,
    Amount,
    Quality,
    Packet_Id,
    Packet_Name,
    Diamond_Type,
    NoImageAvailable,
    handleImageError,
    onClickToDiamondDetail,
  ]);
  return <>{mixDiamondOrderListMemo}</>;
};

const JewelleryOrderTableContainer = ({
  Type,
  index,
  Price,
  Gold_Type,
  JWL_DM_Shape,
  Jewellery_No,
  Category,
  JWL_Image_URL,
  Jewellery_Name,
  WebOrder_Status,
  _StatusColorCode,
  NoImageAvailable,
  handleImageError,
  Jewellery_Stock_ID,
  onClickToJewelleryDetail,
}) => {
  const jewelaryOrderList = useMemo(() => {
    return (
      <div className="jewelary_cart_box" key={`jewellery_${index}`}>
        <div className="status_wrapper">
          <span
            className="badge"
            style={{
              background: _StatusColorCode ? _StatusColorCode : '',
            }}
          >
            {WebOrder_Status ? WebOrder_Status : '-'}
          </span>
        </div>
        <h6>{Jewellery_Name ? Jewellery_Name : ''}</h6>
        <Row className="align-items-center">
          <Col sm={8}>
            <div className="jewellery_product_info d-flex align-items-start align-items-sm-center">
              <div
                className="jewellery_img_cart cursor_pointer"
                onClick={() => onClickToJewelleryDetail(Jewellery_Stock_ID)}
              >
                <img
                  src={JWL_Image_URL ? JWL_Image_URL : NoImageAvailable}
                  alt="JewelleryImg"
                  onError={handleImageError}
                />
              </div>
              <div className="jewellery_text_cart pl15">
                <p className="fs_14 mb0 text_extra_light ff_Mulish text-uppercase">
                  SKU: {Jewellery_No ? Jewellery_No : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light">
                  Category Name: {Category ? Category : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light ff_Mulish">
                  {Type ? Type : ''} Diamond Cut:{' '}
                  {JWL_DM_Shape ? JWL_DM_Shape : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light ff_Mulish">
                  {Type ? Type : ''} Material:{' '}
                  {Gold_Type ? `${Gold_Type} Gold` : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light ff_Mulish">Qty : 1</p>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="jewellery_cart_total_wrap">
              <div className="jewellery_cart_total">
                <h5 className="text_colorC d-flex align-items-center ff_Mulish">
                  <span className="text_colorC fs_22">
                    ${Price ? (Number(Price) || 0)?.toFixed(2) : '0.00'}
                  </span>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }, [
    Type,
    index,
    Price,
    Gold_Type,
    Jewellery_No,
    Category,
    JWL_DM_Shape,
    JWL_Image_URL,
    Jewellery_Name,
    WebOrder_Status,
    _StatusColorCode,
    NoImageAvailable,
    handleImageError,
    Jewellery_Stock_ID,
    onClickToJewelleryDetail,
  ]);

  return <>{jewelaryOrderList}</>;
};

const SettingOrderTableContainer = ({
  Lab,
  Cut,
  Size,
  Color,
  index,
  Shape,
  Weight,
  Clarity,
  Stone_No,
  Gold_Type,
  GrandTotal,
  Diamond_Type,
  Jewellery_No,
  Stone_Img_url,
  JWL_Image_URL,
  Lab_Report_No,
  Jewellery_Name,
  WebOrder_Status,
  _StatusColorCode,
  NoImageAvailable,
  handleImageError,
  Jewellery_Stock_ID,
  onClickToDiamondDetail,
  onClickToJewelleryDetail,
}) => {
  const SettingOrderList = useMemo(() => {
    return (
      <div
        className="jewelary_cart_box diamond_cart_box"
        key={`setting_${index}`}
      >
        <div className="status_wrapper">
          <span
            className="badge ff_Mulish"
            style={{
              background: _StatusColorCode ? _StatusColorCode : '',
            }}
          >
            {WebOrder_Status ? WebOrder_Status : '-'}
          </span>
        </div>
        <h6 className="ff_Mulish">
          {Jewellery_Name ? Jewellery_Name : ''} With{' '}
          {`${Weight ? `${Weight} - carat ` : ''}${
            Shape ? Shape + ' Shape ' : ''
          }${Diamond_Type ? Diamond_Type + ' Diamond Type ' : ''}`}
        </h6>
        <Row className="align-items-center">
          <Col sm={8}>
            <div className="tab_design_two">
              <div className="diamond_product_info mb-2">
                <div
                  className="diamond_img_cart cursor_pointer"
                  onClick={() => onClickToDiamondDetail(Stone_No, Diamond_Type)}
                >
                  <img
                    src={Stone_Img_url ? Stone_Img_url : NoImageAvailable}
                    alt="CartImg"
                    onError={handleImageError}
                  />
                </div>
                <div className="diamond_text_cart">
                  <p className="fs_14 m0 text_extra_light ff_Mulish text-uppercase">
                    SKU : {Stone_No ? ` ${Stone_No}` : ' -'}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Diamond Report Number : {Lab ? Lab : ''}
                    {Lab_Report_No ? ` ${Lab_Report_No}` : '-'}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Cut : {Cut ? Cut : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Color : {Color ? Color : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ff_Mulish">
                    Clarity : {Clarity ? Clarity : ''}
                  </p>
                </div>
              </div>
              <div className="jewellery_product_info d-flex align-items-start align-items-sm-center">
                <div
                  className="jewellery_img_cart cursor_pointer"
                  onClick={() => onClickToJewelleryDetail(Jewellery_Stock_ID)}
                >
                  <img
                    src={JWL_Image_URL ? JWL_Image_URL : NoImageAvailable}
                    alt="JewelleryImg"
                    onError={handleImageError}
                  />
                </div>
                <div className="jewellery_text_cart pl15">
                  <p className="fs_14 mb0 text_extra_light ff_Mulish text-uppercase">
                    SKU: {Jewellery_No ? Jewellery_No : ''}
                  </p>
                  <p className="fs_14 mb0 text_extra_light ff_Mulish">
                    Ring Metal: {Gold_Type ? `${Gold_Type} Gold` : ''}
                  </p>
                  <p className="fs_14 mb0 text_extra_light ff_Mulish">
                    Ring Size: {Size ? Size : ''}
                  </p>
                  <p className="fs_14 mb0 text_extra_light ff_Mulish">
                    Qty : 1
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="jewellery_cart_total_wrap">
              <div className="jewellery_cart_total">
                <h5 className="text_colorC d-flex align-items-center">
                  <span className="text_colorC fs_22 ff_Mulish">
                    $
                    {GrandTotal
                      ? (Number(GrandTotal) || 0)?.toFixed(2)
                      : '0.00'}
                  </span>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }, [
    Lab,
    Cut,
    Size,
    Color,
    index,
    Shape,
    Weight,
    Clarity,
    Stone_No,
    Gold_Type,
    GrandTotal,
    Diamond_Type,
    Jewellery_No,
    Stone_Img_url,
    JWL_Image_URL,
    Lab_Report_No,
    Jewellery_Name,
    WebOrder_Status,
    _StatusColorCode,
    NoImageAvailable,
    handleImageError,
    Jewellery_Stock_ID,
    onClickToDiamondDetail,
    onClickToJewelleryDetail,
  ]);

  return <>{SettingOrderList}</>;
};

export default memo(OrderDetailTable);
