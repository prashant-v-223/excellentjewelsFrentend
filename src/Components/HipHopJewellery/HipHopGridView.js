import React, { memo, useMemo } from 'react';
import { Button, Col } from 'react-bootstrap';
import LikeImage from '../../Assets/Images/heart-red.svg';
import HeartIcon from '../../Assets/Images/heart.svg';

const HipHopGridView = ({
  currentData,
  handleImageError,
  addToWatchLoading,
  onClickToAddWatchList,
  addToCartJewelleryList,
  onClickJewelleryDetail,
  addToCartJewelleryLoading,
}) => {
  const renderRow = useMemo(() => {
    return currentData.map((x, i) => {
      return (
        <HipHopJewelleryGridContainer
          {...x}
          key={i}
          row={x}
          index={i}
          handleImageError={handleImageError}
          addToWatchLoading={addToWatchLoading}
          onClickToAddWatchList={onClickToAddWatchList}
          addToCartJewelleryList={addToCartJewelleryList}
          onClickJewelleryDetail={onClickJewelleryDetail}
          addToCartJewelleryLoading={addToCartJewelleryLoading}
        />
      );
    });
  }, [
    currentData,
    handleImageError,
    addToWatchLoading,
    onClickToAddWatchList,
    addToCartJewelleryList,
    onClickJewelleryDetail,
    addToCartJewelleryLoading,
  ]);
  return <>{renderRow}</>;
};

const HipHopJewelleryGridContainer = ({
  row,
  index,
  Is_Like,
  Stock_ID,
  Sale_Rate,
  StockStatus,
  Img_Video_Url,
  Jewellery_Name,
  handleImageError,
  addToWatchLoading,
  Metal_PurityColor,
  Total_Stone_Weight,
  onClickToAddWatchList,
  addToCartJewelleryList,
  onClickJewelleryDetail,
  addToCartJewelleryLoading,
}) => {
  const JewelleryImageTd = useMemo(() => {
    return (
      <div className="jewellery_img_wrapper">
        <div
          className="jewellery_image"
          onClick={() => onClickJewelleryDetail(Stock_ID)}
        >
          <img
            src={Img_Video_Url}
            alt="Jewellery"
            loading="lazy"
            onError={handleImageError}
          />
        </div>

        <div className="jewellery_status_inner">
          <span
            className={
              StockStatus === 'AVAILABLE'
                ? 'available ff_Mulish'
                : StockStatus === 'ONHOLD'
                ? ' on_hold ff_Mulish'
                : StockStatus === 'ONMEMO'
                ? 'on_memo ff_Mulish'
                : ''
            }
          >
            {StockStatus === 'AVAILABLE'
              ? 'A'
              : StockStatus === 'ONHOLD'
              ? ' H'
              : StockStatus === 'ONMEMO'
              ? 'M'
              : ''}
          </span>
        </div>

        <div className="wishlist_icon">
          <Button
            variant="link"
            disabled={addToWatchLoading}
            onClick={() => onClickToAddWatchList(row)}
          >
            <img src={Is_Like ? LikeImage : HeartIcon} alt="like" />
          </Button>
        </div>
      </div>
    );
  }, [
    row,
    Is_Like,
    Stock_ID,
    StockStatus,
    Img_Video_Url,
    handleImageError,
    addToWatchLoading,
    onClickToAddWatchList,
    onClickJewelleryDetail,
  ]);

  const jewelleryTitle = useMemo(() => {
    return (
      <div className="jewellery_title">
        <h5>
          <span onClick={() => onClickJewelleryDetail(Stock_ID)}>
            {Jewellery_Name}
            {Metal_PurityColor} Gold(
            {Total_Stone_Weight ? `${Total_Stone_Weight}ct` : 0})
          </span>
        </h5>
      </div>
    );
  }, [
    Stock_ID,
    Jewellery_Name,
    Metal_PurityColor,
    Total_Stone_Weight,
    onClickJewelleryDetail,
  ]);

  const jewelleryStatus = useMemo(() => {
    return (
      <div className="jewellery_status_wrap">
        <div className="row g-2 align-items-center">
          <div className="button_botttom_wrap">
            <div className="price ">
              <h6 className="m-0 ff_Mulish">
                ${Sale_Rate ? Number(Sale_Rate || 0)?.toFixed(2) : '0.00'}
              </h6>
            </div>
            <div className="text-end jewellery_btn">
              <Button
                variant="outline-primary"
                size="sm"
                className="fs_14"
                disabled={addToCartJewelleryLoading}
                onClick={() => addToCartJewelleryList(row)}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [row, Sale_Rate, addToCartJewelleryList, addToCartJewelleryLoading]);

  const jewelleryDetailTd = useMemo(() => {
    return (
      <div className="jewellery_detail_text">
        {jewelleryTitle}
        {jewelleryStatus}
      </div>
    );
  }, [jewelleryTitle, jewelleryStatus]);

  const renderTd = useMemo(() => {
    return (
      <Col
        key={`jewellery_stock_list_${index}`}
        md={4}
        xs={6}
        className="jewellery_item_col"
      >
        <div className="jewellery_box_wrapper">
          {JewelleryImageTd}
          {jewelleryDetailTd}
        </div>
      </Col>
    );
  }, [index, JewelleryImageTd, jewelleryDetailTd]);
  return <>{renderTd}</>;
};

export default memo(HipHopGridView);
