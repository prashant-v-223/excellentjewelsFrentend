import React, { memo, useCallback, useMemo } from 'react';
import _ from 'lodash';
import { Button, Col, Row } from 'react-bootstrap';
import NoImageAvailable from '../Assets/Images/notfound2.png';
import Trash from '../Assets/Images/trash.svg';

const ShoppingCartTable = ({
  cartList,
  userData,
  deleteFromCartHandler,
  onClickToDiamondDetail,
  onClickToJewelleryDetail,
  addToCartJewelleryLoading,
}) => {
  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);
  const renderTable = useMemo(() => {
    return _.map(cartList, (x, i) => {
      return (
        <WatchContainerCartList
          key={i}
          {...x}
          row={x}
          index={i}
          userData={userData}
          handleImageError={handleImageError}
          deleteFromCartHandler={deleteFromCartHandler}
          onClickToDiamondDetail={onClickToDiamondDetail}
          onClickToJewelleryDetail={onClickToJewelleryDetail}
          addToCartJewelleryLoading={addToCartJewelleryLoading}
        />
      );
    });
  }, [
    cartList,
    userData,
    handleImageError,
    deleteFromCartHandler,
    onClickToDiamondDetail,
    onClickToJewelleryDetail,
    addToCartJewelleryLoading,
  ]);
  return <>{renderTable}</>;
};

const WatchContainerCartList = ({
  Lab,
  Cut,
  row,
  Type,
  Size,
  index,
  Color,
  Shape,
  Amount,
  Weight,
  Clarity,
  Cart_ID,
  userData,
  Stone_No,
  Cost_Amt,
  Gold_Type,
  Sale_Rate,
  Setting_ID,
  StockStatus,
  errorMessage,
  Setting_Rate,
  Diamond_Type,
  Jewellery_No,
  Category,
  JWL_DM_Shape,
  Lab_Report_No,
  Stone_Img_url,
  JWL_Image_URL,
  Jewell_Cart_ID,
  Jewellery_Name,
  JWL_StockStatus,
  Jewellery_Stock_ID,
  handleImageError,
  deleteFromCartHandler,
  onClickToDiamondDetail,
  onClickToJewelleryDetail,
  addToCartJewelleryLoading,
}) => {
  const diamondProductTd = useMemo(() => {
    return (
      <div
        className={
          errorMessage ? 'diamond_cart_box warning' : 'diamond_cart_box'
        }
        key={`diamond_${index}`}
      >
        <div className="status_wrapper ">
          <span
            className={
              StockStatus?.toLowerCase() === 'available'
                ? 'available'
                : StockStatus?.toLowerCase() === 'onhold'
                  ? ' on_hold'
                  : StockStatus?.toLowerCase() === 'onmemo'
                    ? 'on_memo'
                    : ''
            }
          >
            {StockStatus}
          </span>
        </div>
        <h6 className="ff_Mulish">
          {Weight ? `${Weight}-carat ` : ''}
          {Color ? `${Color} Color ` : ''}
          {Clarity ? `${Clarity} Clarity ` : ''}
          {Shape ? `${Shape} ` : ''}
          {Diamond_Type ? `${Diamond_Type} Diamond` : ''}
        </h6>
        <Row className="align-items-center">
          <Col sm={8}>
            <div className="diamond_product_info">
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
                <p className="fs_14 m0 text_extra_light text-uppercase">
                  SKU : {Stone_No ? ` ${Stone_No}` : ' -'}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Diamond Report Number : {Lab ? Lab : ''}
                  {Lab_Report_No ? ` ${Lab_Report_No}` : '-'}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Cut : {Cut ? Cut : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Color : {Color ? Color : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Clarity : {Clarity ? Clarity : ''}
                </p>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="diamond_cart_total_wrap">
              <div className="diamond_cart_total">
                <h5 className="text_colorC d-flex align-items-center">
                  <span className="text_colorC">
                    ${Cost_Amt ? (Number(Cost_Amt) || 0)?.toFixed(2) : '0.00'}
                  </span>
                </h5>
              </div>
              <Button
                variant="light"
                className="delete_btn"
                disabled={addToCartJewelleryLoading}
                onClick={() => deleteFromCartHandler(row, 'diamond')}
              >
                <img src={Trash} alt="Trash" />
              </Button>
            </div>
          </Col>
        </Row>
        {errorMessage && (
          <p className="error_message_Wrapper">{errorMessage}</p>
        )}
      </div>
    );
  }, [
    Lab,
    Cut,
    row,
    index,
    Color,
    Shape,
    Weight,
    Clarity,
    Stone_No,
    Cost_Amt,
    StockStatus,
    errorMessage,
    Diamond_Type,
    Lab_Report_No,
    Stone_Img_url,
    handleImageError,
    deleteFromCartHandler,
    onClickToDiamondDetail,
    addToCartJewelleryLoading,
  ]);

  const jewelaryProductTd = useMemo(() => {
    return (
      <div
        className={
          errorMessage ? 'jewelary_cart_box warning' : 'jewelary_cart_box'
        }
        key={`jewellery_${index}`}
      >
        <div className="status_wrapper ">
          <span
            className={
              JWL_StockStatus === 'AVAILABLE'
                ? 'available'
                : JWL_StockStatus === 'ONHOLD'
                  ? ' on_hold'
                  : JWL_StockStatus === 'ONMEMO'
                    ? 'on_memo'
                    : ''
            }
          >
            {JWL_StockStatus ? JWL_StockStatus : ''}
          </span>
        </div>
        <h6 className="ff_Mulish">{Jewellery_Name ? Jewellery_Name : ''}</h6>
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
                <p className="fs_14 mb0 text_extra_light text-uppercase">
                  SKU: {Jewellery_No ? Jewellery_No : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light">
                  Category Name: {Category ? Category : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light">
                  {Type ? Type : ''} Diamond Cut:{' '}
                  {JWL_DM_Shape ? JWL_DM_Shape : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light">
                  {Type ? Type : ''} Material:{' '}
                  {Gold_Type ? `${Gold_Type} Gold` : ''}
                </p>
                <p className="fs_14 mb0 text_extra_light">Qty : 1</p>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="jewellery_cart_total_wrap">
              <div className="jewellery_cart_total">
                <h5 className="text_colorC d-flex align-items-center">
                  <span className="text_colorC ">
                    ${Sale_Rate ? (Number(Sale_Rate) || 0)?.toFixed(2) : '0.00'}
                  </span>
                </h5>
              </div>
              <Button
                variant="light"
                className="delete_btn"
                disabled={addToCartJewelleryLoading}
                onClick={() => deleteFromCartHandler(row, 'jewellery')}
              >
                <img src={Trash} alt="Trash" />
              </Button>
            </div>
          </Col>
        </Row>
        {errorMessage && (
          <p className="error_message_Wrapper">{errorMessage}</p>
        )}
      </div>
    );
  }, [
    row,
    Type,
    index,
    Gold_Type,
    Sale_Rate,
    Jewellery_No,
    Category,
    JWL_DM_Shape,
    errorMessage,
    JWL_Image_URL,
    Jewellery_Name,
    JWL_StockStatus,
    handleImageError,
    Jewellery_Stock_ID,
    deleteFromCartHandler,
    onClickToJewelleryDetail,
    addToCartJewelleryLoading,
  ]);

  const settingProductTd = useMemo(() => {
    return (
      <div
        className={
          errorMessage
            ? 'jewelary_cart_box diamond_cart_box warning'
            : 'jewelary_cart_box diamond_cart_box'
        }
        key={`setting_${index}`}
      >
        <div className="status_wrapper ">
          <span
            className={
              StockStatus?.toLowerCase() === 'available'
                ? 'available'
                : StockStatus?.toLowerCase() === 'onhold'
                  ? ' on_hold'
                  : StockStatus?.toLowerCase() === 'onmemo'
                    ? 'on_memo'
                    : ''
            }
          >
            {StockStatus ? StockStatus : ''}
          </span>
        </div>
        <h6 className="ff_Mulish">
          {Jewellery_Name ? Jewellery_Name : ''} With{' '}
          {`${Weight ? `${Weight} - carat` : ''}${Shape ? Shape + ' Shape ' : ''
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
                  <p className="fs_14 m0 text_extra_light text-uppercase">
                    SKU : {Stone_No ? ` ${Stone_No}` : ' -'}
                  </p>
                  <p className="fs_14 m0 text_extra_light ">
                    Diamond Report Number : {Lab ? Lab : ''}
                    {Lab_Report_No ? ` ${Lab_Report_No}` : '-'}
                  </p>
                  <p className="fs_14 m0 text_extra_light ">
                    Cut : {Cut ? Cut : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ">
                    Color : {Color ? Color : ''}
                  </p>
                  <p className="fs_14 m0 text_extra_light ">
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
                  <p className="fs_14 mb0 text_extra_light text-uppercase">
                    SKU: {Jewellery_No ? Jewellery_No : ''}
                  </p>
                  <p className="fs_14 mb0 text_extra_light ">
                    Ring Metal: {Gold_Type ? `${Gold_Type} Gold` : ''}
                  </p>
                  <p className="fs_14 mb0 text_extra_light ">
                    Ring Size: {Size ? Size : ''}
                  </p>
                  <p className="fs_14 mb0 text_extra_light ">Qty : 1</p>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="jewellery_cart_total_wrap">
              <div className="jewellery_cart_total">
                <h5 className="text_colorC d-flex align-items-center ">
                  <span className="text_colorC ">
                    {!userData?.UserID
                      ? `$${Amount ? (Number(Amount) || 0)?.toFixed(2) : '0.00'
                      }`
                      : `$${Cost_Amt || Setting_Rate
                        ? (Number(Cost_Amt + Setting_Rate) || 0)?.toFixed(2)
                        : '0.00'
                      }`}
                  </span>
                </h5>
              </div>
              <Button
                variant="light"
                className="delete_btn"
                disabled={addToCartJewelleryLoading}
                onClick={() => deleteFromCartHandler(row, 'jewellery')}
              >
                <img src={Trash} alt="Trash" />
              </Button>
            </div>
          </Col>
        </Row>
        {errorMessage && (
          <p className="error_message_Wrapper">{errorMessage}</p>
        )}
      </div>
    );
  }, [
    Cut,
    Lab,
    row,
    Size,
    index,
    Shape,
    Color,
    Amount,
    Weight,
    Clarity,
    Cost_Amt,
    Stone_No,
    userData,
    Gold_Type,
    StockStatus,
    errorMessage,
    Diamond_Type,
    Jewellery_No,
    Setting_Rate,
    Lab_Report_No,
    JWL_Image_URL,
    Stone_Img_url,
    Jewellery_Name,
    handleImageError,
    Jewellery_Stock_ID,
    deleteFromCartHandler,
    onClickToDiamondDetail,
    onClickToJewelleryDetail,
    addToCartJewelleryLoading,
  ]);
  const renderRow = useMemo(() => {
    return (
      <div>
        {Setting_ID > 0
          ? settingProductTd
          : Cart_ID
            ? diamondProductTd
            : Jewell_Cart_ID
              ? jewelaryProductTd
              : ''}
      </div>
    );
  }, [
    Cart_ID,
    Setting_ID,
    Jewell_Cart_ID,
    diamondProductTd,
    jewelaryProductTd,
    settingProductTd,
  ]);
  return <>{renderRow}</>;
};

export default memo(ShoppingCartTable);
