import { memo, useMemo } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import LikeImage from '../../Assets/Images/heart-red.svg';
import HeartIcon from '../../Assets/Images/heart.svg';
import { OptimizedImage } from 'utils/performanceUtils';

const JewelleryGridView = ({
  jewelType,
  currentData,
  handleImageError,
  addToWatchLoading,
  onSelectJewellery,
  onClickToAddWatchList,
  addToCartJewelleryList,
  onClickJewelleryDetail,
  addToCartJewelleryLoading,
  onSelectJewelleryForSetting,
}) => {
  const renderRow = useMemo(() => {
    return currentData.map((x, i) => {
      return (
        <JewelleryGridContainer
          {...x}
          key={i}
          row={x}
          index={i}
          jewelType={jewelType}
          handleImageError={handleImageError}
          addToWatchLoading={addToWatchLoading}
          onSelectJewellery={onSelectJewellery}
          onClickToAddWatchList={onClickToAddWatchList}
          addToCartJewelleryList={addToCartJewelleryList}
          onClickJewelleryDetail={onClickJewelleryDetail}
          addToCartJewelleryLoading={addToCartJewelleryLoading}
          onSelectJewelleryForSetting={onSelectJewelleryForSetting}
        />
      );
    });
  }, [
    jewelType,
    currentData,
    handleImageError,
    addToWatchLoading,
    onSelectJewellery,
    onClickToAddWatchList,
    addToCartJewelleryList,
    onClickJewelleryDetail,
    addToCartJewelleryLoading,
    onSelectJewelleryForSetting,
  ]);
  return <>{renderRow}</>;
};

const JewelleryGridContainer = ({
  row,
  index,
  isCheck,
  Is_Like,
  jewelType,
  Stock_ID,
  Sale_Rate,
  StockStatus,
  Setting_Rate,
  Img_Video_Url,
  Jewellery_Name,
  handleImageError,
  onSelectJewellery,
  addToWatchLoading,
  Metal_PurityColor,
  Total_Stone_Weight,
  onClickToAddWatchList,
  addToCartJewelleryList,
  onClickJewelleryDetail,
  addToCartJewelleryLoading,
  onSelectJewelleryForSetting,
}) => {
  const JewelleryImageTd = useMemo(() => {
    return (
      <div className="jewellery_img_wrapper">
        {jewelType === 'jewellery_list' ? (
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
        ) : (
          <div
            className="jewellery_image"
            onClick={() => onSelectJewelleryForSetting(Stock_ID)}
          >
            <img
              src={Img_Video_Url}
              alt="Jewellery"
              onError={handleImageError}
            />
          </div>
        )}
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
        {jewelType === 'jewellery_list' && (
          <div className="wishlist_icon">
            <Button
              variant="link"
              disabled={addToWatchLoading}
              onClick={() => onClickToAddWatchList(row)}
            >
              <img src={Is_Like ? LikeImage : HeartIcon} alt="like" />
            </Button>
          </div>
        )}
      </div>
    );
  }, [
    row,
    Is_Like,
    Stock_ID,
    jewelType,
    StockStatus,
    Img_Video_Url,
    handleImageError,
    addToWatchLoading,
    onClickToAddWatchList,
    onClickJewelleryDetail,
    onSelectJewelleryForSetting,
  ]);

  const checkBoxTab = useMemo(() => {
    return (
      <Form.Check
        type="checkbox"
        readOnly
        id="selectProduct"
        name="selectProduct"
        checked={isCheck}
        onClick={e => onSelectJewellery(row)}
      />
    );
  }, [isCheck, row, onSelectJewellery]);

  const jewelleryTitle = useMemo(() => {
    return (
      <div className="jewellery_title">
        {jewelType === 'jewellery_list' ? (
          <h5>
            <span onClick={() => onClickJewelleryDetail(Stock_ID)}>
              {Jewellery_Name}
              {Metal_PurityColor} Gold(
              {Total_Stone_Weight ? `${Total_Stone_Weight}ct` : 0})
            </span>
          </h5>
        ) : (
          <h5>
            <span onClick={() => onSelectJewelleryForSetting(Stock_ID)}>
              {Jewellery_Name}
              {Metal_PurityColor} Gold(
              {Total_Stone_Weight ? `${Total_Stone_Weight}ct` : 0})
            </span>
          </h5>
        )}
        {/* {checkBoxTab} */}
      </div>
    );
  }, [
    jewelType,
    Stock_ID,
    // checkBoxTab,
    Jewellery_Name,
    Metal_PurityColor,
    Total_Stone_Weight,
    onClickJewelleryDetail,
    onSelectJewelleryForSetting,
  ]);

  const jewelleryStatus = useMemo(() => {
    return (
      <div className="jewellery_status_wrap">
        <div className="row g-2 align-items-center">
          <div className="button_botttom_wrap">
            <div className="price ">
              <h6 className="m-0 ff_Mulish">
                $
                {jewelType === 'choose_setting'
                  ? Sale_Rate
                    ? Number(Sale_Rate || 0)?.toFixed(2)
                    : '0.00'
                  : Sale_Rate
                  ? Number(Sale_Rate || 0)?.toFixed(2)
                  : '0.00'}
              </h6>
            </div>
            {jewelType === 'jewellery_list' && (
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
            )}
          </div>
        </div>
      </div>
    );
  }, [
    row,
    jewelType,
    Sale_Rate,
    Setting_Rate,
    addToCartJewelleryList,
    addToCartJewelleryLoading,
  ]);

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
        xl={jewelType === 'choose_setting' ? '3' : '4'}
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
  }, [index, jewelType, JewelleryImageTd, jewelleryDetailTd]);
  return <>{renderTd}</>;
};

export default memo(JewelleryGridView);
