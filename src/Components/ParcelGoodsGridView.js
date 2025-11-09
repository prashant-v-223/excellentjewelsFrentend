import _ from 'lodash';
import { useMemo } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

export const ParcelGoodsGridView = ({
  currentData,
  LikeImage,
  HeartIcon,
  onWatchHandler,
  onSelectDiamond,
  onInquiryHandler,
  NoImageAvailable,
  handleImageError,
  addToWatchMixLoading,
  onClickMixDiamondDetail,
  onAddToCartMixDiamondHandler,
}) => {
  const renderTable = useMemo(() => {
    return _.map(currentData, (x, i) => {
      return (
        <Col md={4} xs={6} key={`col_${i}`} className="jewellery_item_col">
          <WatchContainerGridView
            {...x}
            row={x}
            index={i}
            LikeImage={LikeImage}
            HeartIcon={HeartIcon}
            onWatchHandler={onWatchHandler}
            onSelectDiamond={onSelectDiamond}
            onInquiryHandler={onInquiryHandler}
            NoImageAvailable={NoImageAvailable}
            handleImageError={handleImageError}
            addToWatchMixLoading={addToWatchMixLoading}
            onClickMixDiamondDetail={onClickMixDiamondDetail}
            onAddToCartMixDiamondHandler={onAddToCartMixDiamondHandler}
          />
        </Col>
      );
    });
  }, [
    currentData,
    LikeImage,
    HeartIcon,
    onWatchHandler,
    onSelectDiamond,
    onInquiryHandler,
    NoImageAvailable,
    handleImageError,
    addToWatchMixLoading,
    onClickMixDiamondDetail,
    onAddToCartMixDiamondHandler,
  ]);

  return <>{renderTable}</>;
};

const WatchContainerGridView = ({
  row,
  LikeImage,
  HeartIcon,
  onWatchHandler,
  onSelectDiamond,
  onInquiryHandler,
  NoImageAvailable,
  handleImageError,
  addToWatchMixLoading,
  onClickMixDiamondDetail,
  onAddToCartMixDiamondHandler,
}) => {
  return (
    <div className="jewellery_box_wrapper parcel_box_wrapper">
      <div className="jewellery_img_wrapper">
        <div
          className="jewellery_image"
          onClick={() => onClickMixDiamondDetail(row)}
        >
          <img
            src={row?.Image_Url ? row.Image_Url : NoImageAvailable}
            onError={handleImageError}
            alt="DiamondImg"
            loading="lazy"
          />
        </div>
        <div className="wishlist_icon">
          <Button
            variant="link"
            disabled={addToWatchMixLoading}
            onClick={() => onWatchHandler(row)}
          >
            <img src={row.Is_Like ? LikeImage : HeartIcon} alt="like" />
          </Button>
        </div>
      </div>
      <div className="jewellery_detail_text mt10-lg">
        <div className="jewellery_title">
          <h5 onClick={e => onClickMixDiamondDetail(row)}>
            <span className="">
              {row?.Cts && `${row.Cts}carat`}{' '}
              {row?.Packet_Name && row.Packet_Name}{' '}
            </span>
          </h5>
          <Form.Check
            type="checkbox"
            readOnly
            id="selectProduct"
            name="selectProduct"
            checked={row.isCheck}
            onClick={() => onSelectDiamond(row)}
          />
        </div>
        <div className="button_botttom_wrap">
          <div className="price">
            <h6 className="m-0 text_colorC">
              {row?.Price ? `$${row?.Price}` : '$0'}
            </h6>
          </div>
          <ul>
            <li>
              <Button
                variant="outline-primary"
                size="sm"
                className=""
                onClick={() => onInquiryHandler(row)}
              >
                Inquiry
              </Button>
            </li>
            <li>
              <Button
                variant="primary"
                size="sm"
                className="ml5"
                onClick={() => onAddToCartMixDiamondHandler([row])}
              >
                Add To Cart
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
