import _ from 'lodash';
import { memo, useMemo } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const DiamondGridViewTable = ({
  LikeImage,
  HeartIcon,
  redirectUrl,
  currentData,
  diamondType,
  onWatchHandler,
  onSelectDiamond,
  addToCartLoading,
  NoImageAvailable,
  handleImageError,
  addToWatchLoading,
  onAddToCartHandler,
  onClickToDiamondDetail,
  onSelectDiamondForSetting,
}) => {
  const renderTable = useMemo(() => {
    return (
      currentData?.length > 0 &&
      _.map(currentData, (x, i) => {
        return (
          <Col xl={3} lg={4} xs={6} key={`col_${i}`}>
            <WatchContainerDiamondGridView
              {...x}
              row={x}
              index={i}
              LikeImage={LikeImage}
              HeartIcon={HeartIcon}
              redirectUrl={redirectUrl}
              diamondType={diamondType}
              onWatchHandler={onWatchHandler}
              onSelectDiamond={onSelectDiamond}
              addToCartLoading={addToCartLoading}
              NoImageAvailable={NoImageAvailable}
              handleImageError={handleImageError}
              addToWatchLoading={addToWatchLoading}
              onAddToCartHandler={onAddToCartHandler}
              onClickToDiamondDetail={onClickToDiamondDetail}
              onSelectDiamondForSetting={onSelectDiamondForSetting}
            />
          </Col>
        );
      })
    );
  }, [
    HeartIcon,
    LikeImage,
    redirectUrl,
    currentData,
    diamondType,
    onWatchHandler,
    onSelectDiamond,
    handleImageError,
    addToCartLoading,
    NoImageAvailable,
    addToWatchLoading,
    onAddToCartHandler,
    onClickToDiamondDetail,
    onSelectDiamondForSetting,
  ]);
  return <>{renderTable}</>;
};
const WatchContainerDiamondGridView = ({
  Cut,
  row,
  title,
  Shape,
  index,
  Color,
  Weight,
  Clarity,
  Is_Like,
  isCheck,
  Cost_Amt,
  Stone_No,
  LikeImage,
  HeartIcon,
  redirectUrl,
  StockStatus,
  diamondType,
  Stone_Img_url,
  onWatchHandler,
  onSelectDiamond,
  NoImageAvailable,
  addToCartLoading,
  handleImageError,
  addToWatchLoading,
  onAddToCartHandler,
  onClickToDiamondDetail,
  onSelectDiamondForSetting,
}) => { 
  const imageTab = useMemo(() => {
    return (
      <img
        src={Stone_Img_url ? Stone_Img_url : NoImageAvailable}
        onError={handleImageError}
        className={Stone_Img_url ? 'cursor_pointer' : 'no_img cursor_pointer'}
        onClick={() => onClickToDiamondDetail(Stone_No, diamondType)}
        alt="diamondImg"
        loading="lazy"
      />
    );
  }, [
    Stone_No,
    diamondType,
    Stone_Img_url,
    NoImageAvailable,
    handleImageError,
    onClickToDiamondDetail,
  ]);

  const imageTabForSettingTab = useMemo(() => {
    return (
      <span onClick={() => onSelectDiamondForSetting(Stone_No, diamondType)}>
        <img
          src={Stone_Img_url ? Stone_Img_url : NoImageAvailable}
          onError={handleImageError}
          className={Stone_Img_url ? '' : 'no_img'}
          alt="diamondImg"
          loading="lazy"
        />
      </span>
    );
  }, [
    Stone_No,
    diamondType,
    Stone_Img_url,
    NoImageAvailable,
    handleImageError,
    onSelectDiamondForSetting,
  ]);

  const watchListTab = useMemo(() => {
    return (
      <div className="wishlist_icon">
        <Button
          variant="link"
          disabled={addToWatchLoading}
          onClick={() => onWatchHandler(row)}
        >
          <img src={Is_Like ? LikeImage : HeartIcon} alt="like" />
        </Button>
      </div>
    );
  }, [HeartIcon, LikeImage, row, Is_Like, onWatchHandler, addToWatchLoading]);

  const diamondDetailTab = useMemo(() => {
    return (
      <h6 className="ff_Mulish">
        <span onClick={() => onClickToDiamondDetail(Stone_No, diamondType)}>
          {title ? title : ''}
          {Weight ? `${Weight}carat` : ''}
          {Color ? ` - ${Color}` : ''}
          {Clarity ? ` - ${Clarity}` : ''}
          {Cut ? ` ${Cut} Cut` : ''}
          {Shape ? `- ${Shape}` : ''}
        </span>
      </h6>
    );
  }, [
    Stone_No,
    title,
    Weight,
    Color,
    Clarity,
    Cut,
    Shape,
    diamondType,
    onClickToDiamondDetail,
  ]);

  const diamondDetailForSettingTab = useMemo(() => {
    return (
      <h6 className="ff_Mulish">
        <span onClick={() => onSelectDiamondForSetting(Stone_No, diamondType)}>
          {title ? title : ''}
          {Weight ? `${Weight}carat` : ''}
          {Color ? ` - ${Color}` : ''}
          {Clarity ? ` - ${Clarity}` : ''}
          {Cut ? ` ${Cut} Cut` : ''}
          {Shape ? `- ${Shape}` : ''}
        </span>
      </h6>
    );
  }, [
    Stone_No,
    title,
    Weight,
    Color,
    Clarity,
    Cut,
    Shape,
    diamondType,
    onSelectDiamondForSetting,
  ]);

  const checkBoxTab = useMemo(() => {
    return (
      <Form.Check
        type="checkbox"
        readOnly
        id="selectProduct"
        name="selectProduct"
        checked={isCheck}
        onClick={e => onSelectDiamond(row)}
      />
    );
  }, [isCheck, row, onSelectDiamond]);

  const priceTab = useMemo(() => {
    return <h6 className="mb0 ff_Mulish fw-bold text_colorC">${Cost_Amt}</h6>;
  }, [Cost_Amt]);

  const addToCartBtnTab = useMemo(() => {
    return (
      <div className="text-end">
        <Button
          variant="outline-primary"
          size="sm"
          disabled={addToCartLoading}
          className="ff_Mulish fs_14"
          onClick={() => onAddToCartHandler([row])}
        >
          Add To Cart
        </Button>
      </div>
    );
  }, [row, onAddToCartHandler, addToCartLoading]);

  const statusTab = useMemo(() => {
    return (
      <div className="good_fair_price">
        <span
          className={
            StockStatus === 'AVAILABLE'
              ? 'available ff_Mulish'
              : StockStatus === 'ONHOLD'
              ? 'on_hold ff_Mulish'
              : StockStatus === 'ONMEMO'
              ? 'on_memo ff_Mulish'
              : ''
          }
        >
          {StockStatus === 'AVAILABLE'
            ? 'A'
            : StockStatus === 'ONHOLD'
            ? 'H'
            : StockStatus === 'ONMEMO'
            ? 'M'
            : ''}
        </span>
      </div>
    );
  }, [StockStatus]);
  const renderRow = useMemo(() => {
    return (
      <div className="product_box" key={`diamond_list_view_${index}`}>
        <div className="product_img">
          {redirectUrl === '/diamond-detail' ? imageTab : imageTabForSettingTab}
          {redirectUrl === '/diamond-detail' && watchListTab}
          {statusTab}
        </div>
        <div className="product_info">
          <div className="product_title">
            {redirectUrl === '/diamond-detail'
              ? diamondDetailTab
              : diamondDetailForSettingTab}
            {redirectUrl === '/diamond-detail' && checkBoxTab}
          </div>
          <div className="button_botttom_wrap">
            <div className="price">{priceTab}</div>
            <ul>
              <li>
                {redirectUrl === '/diamond-detail' && <> {addToCartBtnTab}</>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }, [
    index,
    imageTab,
    priceTab,
    statusTab,
    redirectUrl,
    checkBoxTab,
    watchListTab,
    addToCartBtnTab,
    diamondDetailTab,
    imageTabForSettingTab,
    diamondDetailForSettingTab,
  ]);
  return <>{renderRow}</>;
};

export default memo(DiamondGridViewTable);
