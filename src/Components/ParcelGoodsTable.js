import _ from 'lodash';
import { memo, useCallback, useMemo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import NoImageAvailable from '../Assets/Images/notfound2.png';
import Trash from '../Assets/Images/trash.svg';
const ParcelGoodsTable = ({
  cartList = [],
  userData,
  deleteFromCartHandler,
  onClickToMixDiamondDetail,
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
          onClickToMixDiamondDetail={onClickToMixDiamondDetail}
          addToCartJewelleryLoading={addToCartJewelleryLoading}
        />
      );
    });
  }, [
    cartList,
    userData,
    handleImageError,
    deleteFromCartHandler,
    onClickToMixDiamondDetail,
    addToCartJewelleryLoading,
  ]);

  return <>{renderTable}</>;
};

const WatchContainerCartList = ({
  Cts,
  Cut,
  row,
  Size,
  Rate,
  Image,
  index,
  Color,
  Shape,
  Quality,
  Packet_Id,
  Packet_Name,
  Diamond_Type,
  handleImageError,
  deleteFromCartHandler,
  addToCartJewelleryLoading,
  onClickToMixDiamondDetail,
}) => {
  const mixDiamondProductTd = useMemo(() => {
    return (
      <div className="diamond_cart_box" key={`diamond_${index}`}>
        <h6 className="ff_Mulish">
          {Cts && `${Cts}carat `}
          {Packet_Name && Packet_Name}
          {Diamond_Type && `${Diamond_Type} Diamond Type`}
        </h6>
        <Row className="align-items-center">
          <Col sm={8}>
            <div className="diamond_product_info">
              <div
                className="diamond_img_cart cursor_pointer"
                onClick={() => onClickToMixDiamondDetail(Packet_Id)}
              >
                <img
                  src={Image ? Image : NoImageAvailable}
                  alt="CartImg"
                  onError={handleImageError}
                />
              </div>
              <div className="diamond_text_cart">
                <p className="fs_14 m0 text_extra_light ">
                  Shape : {Shape ? Shape : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Size : {Size ? Size : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Color : {Color ? Color : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Cut : {Cut ? Cut : ''}
                </p>
                <p className="fs_14 m0 text_extra_light ">
                  Quality : {Quality ? Quality : ''}
                </p>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="diamond_cart_total_wrap">
              <div className="diamond_cart_total">
                <h5 className="text_colorC d-flex align-items-center">
                  <span className="text_colorC">
                    ${Rate ? (Number(Rate) || 0)?.toFixed(2) : '0.00'}
                  </span>
                </h5>
              </div>
              <Button
                variant="light"
                className="delete_btn"
                disabled={addToCartJewelleryLoading}
                onClick={() => deleteFromCartHandler(row, 'mixDiamond')}
              >
                <img src={Trash} alt="Trash" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }, [
    Cut,
    row,
    Cts,
    Rate,
    Size,
    Image,
    index,
    Shape,
    Color,
    Quality,
    Packet_Id,
    Packet_Name,
    Diamond_Type,
    handleImageError,
    deleteFromCartHandler,
    addToCartJewelleryLoading,
    onClickToMixDiamondDetail,
  ]);
  const renderRow = useMemo(() => {
    return <div>{mixDiamondProductTd}</div>;
  }, [mixDiamondProductTd]);
  return <>{renderRow}</>;
};

export default memo(ParcelGoodsTable);
