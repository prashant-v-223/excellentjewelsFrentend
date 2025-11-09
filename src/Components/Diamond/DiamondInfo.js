 import {
  getCartStockCount,
  getStockCopytoClipboardString,
  sendDiamondDetailMail,
  setSearchDiamondFilterList2,
  getSimilarStockList,
} from 'Components/Redux/reducers/dashboard.slice';
import {
  addToCartList,
  addToCompareList,
  addToHoldList,
  addToWatchList,
  getWatchStockListCount,
  setIsAddToCartList,
  setIsAddToWatchList,
  removeToWatchList,
} from 'Components/Redux/reducers/myAccount.slice';
import {
  addToCartListInLocal,
  addToComapareListInLocalList,
  addToWishListInLocalList,
  removeFromWishListInLocal,
} from 'Components/Redux/reducers/offlineList.slice';
import { getSessionData } from 'Helper/AuthTokenHelper';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Icons
import PhoneIcon from '../../Assets/Images/call-expert.svg';
import CartIcon from '../../Assets/Images/cart.svg';
import availabilityIcon from '../../Assets/Images/check-availability.svg';
import CompareIcon from '../../Assets/Images/compare.svg';
import MailIcon from '../../Assets/Images/mail.svg';
import WhatsappIcon from '../../Assets/Images/whatsapp.svg';
import HeartIcon from '../../Assets/Images/wishliat.svg';

import SimilarStone from './SimilarStone';
import { OptimizedImage } from 'utils/performanceUtils';

const DiamondInfo = ({
  stoneNo,
  stoneId,
  deviceType,
  diamondType,
  stockDetailDnaList,
  searchDiamondFilterList2,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 991;

  // Redux selectors
  const { userData } = useSelector(({ auth }) => auth);
  const {
    isAddToCartList,
    isAddToWatchList,
    addToCartLoading,
    addToHoldLoading,
    addToWatchLoading,
    addToCompareLoading,
    addToCartDaimondLoading,
  } = useSelector(({ myAccount }) => myAccount);
  const { wishDiamondList, diamondCartList } = useSelector(
    ({ offlineList }) => offlineList
  );

  // Local state
  const [whatsAppHref, setWhatsAppHref] = useState('#');
  const [diamondSimilarProducts, setDiamondSimilarProducts] = useState([]);
  const [isSelectSimilarProduct, setIsSelectSimilarProduct] = useState(false);

  // Check if item is in cart
  const isItemInCart = useMemo(() => {
    if (!stoneId) return false;

    const naturalCart = diamondCartList?.naturalDiamond || [];
    const labGrownCart = diamondCartList?.labGrownDiamond || [];
    const allCartItems = [...naturalCart, ...labGrownCart];

    return allCartItems.some(
      item =>
        item._id === stoneId ||
        item.Stock_ID === stoneId ||
        item.Stone_No === stoneNo
    );
  }, [stoneId, stoneNo, diamondCartList]);

  // Check if item is in wishlist
  const isItemInWishlist = useMemo(() => {
    if (!stoneId) return false;

    const naturalWishlist = wishDiamondList?.naturalDiamond || [];
    const labGrownWishlist = wishDiamondList?.labGrownDiamond || [];
    const allWishlistItems = [...naturalWishlist, ...labGrownWishlist];

    const item = allWishlistItems.find(
      wishItem =>
        wishItem._id === stoneId ||
        wishItem.Stock_ID === stoneId ||
        wishItem.Stone_No === stoneNo
    );

    return item?.Is_Like || false;
  }, [stoneId, stoneNo, wishDiamondList]);

  // Handle WhatsApp share
  const handleShareToWhatsApp = useCallback(
    async stoneNumber => {
      const { payload } = await dispatch(
        getStockCopytoClipboardString({
          UserID: userData?.UserID || 0,
          StoneNo: stoneNumber,
        })
      );
      if (payload?.data) {
        const message = encodeURIComponent(payload.data);
        const phoneNumber = '+919586971689';
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        setWhatsAppHref(whatsappLink);
      }
    },
    [dispatch, userData]
  );

  // Get similar diamond list
  const getSimilarDiamondList = useCallback(async () => {
    const userDataToken = getSessionData();
    const { payload } = await dispatch(
      getSimilarStockList({
        StoneNumber: stoneNo,
        UserID: userDataToken?.UserID || 0,
        DiamondType: diamondType,
      })
    );

    if (payload?.data?.length > 0) {
      const naturalWishlist = wishDiamondList?.naturalDiamond || [];
      const labGrownWishlist = wishDiamondList?.labGrownDiamond || [];
      const allWishlistItems = [...naturalWishlist, ...labGrownWishlist];
      
      const wishlistStockIds = new Set(
        allWishlistItems.map(item => item._id || item.Stock_ID)
      );

      const data = payload.data.map(item => ({
        ...item,
        Is_Like: wishlistStockIds.has(item._id || item.Stock_ID),
      }));

      setDiamondSimilarProducts(data);
    }
  }, [dispatch, stoneNo, diamondType, wishDiamondList]);

  // Update wishlist status in search results
  const updateRowWatch = useCallback(
    (stockId, isLiked) => {
      if (searchDiamondFilterList2?.size > 0) {
        const newSearchDiamondFilterList2 = new Map(searchDiamondFilterList2);
        const diamondObj = newSearchDiamondFilterList2.get(stockId);
        if (diamondObj) {
          newSearchDiamondFilterList2.set(stockId, {
            ...diamondObj,
            Is_Like: isLiked,
          });
          dispatch(setSearchDiamondFilterList2(newSearchDiamondFilterList2));
        }
      }
    },
    [dispatch, searchDiamondFilterList2]
  );

  // Update similar products wishlist status
  const updateRowWatchSimilar = useCallback(
    (stockId, value) => {
      setDiamondSimilarProducts(prevProducts =>
        prevProducts.map(item =>
          item.Stock_ID === stockId ? { ...item, Is_Like: value } : item
        )
      );
    },
    []
  );

  // Add to cart handler
  const onAddToCartHandler = useCallback(() => {
    if (!stoneId || !diamondType) return;

    // Check if already in cart
    if (isItemInCart) return;

    if (userData?.UserID) {
      dispatch(
        addToCartList({
          StockIDs: stoneId,
          CustomerID: userData.UserID,
          diamondType: diamondType,
        })
      );
    } else {
      dispatch(
        addToCartListInLocal({
          diamondCartList: [{ ...stockDetailDnaList }],
          diamondType: diamondType,
        })
      );
    }
  }, [
    dispatch,
    userData,
    diamondType,
    stoneId,
    stockDetailDnaList,
    isItemInCart,
  ]);

  // Add to hold handler
  const onAddToHoldHandler = useCallback(() => {
    if (!stoneId || !diamondType) return;

    if (userData?.UserID) {
      dispatch(
        addToHoldList({
          StockIDs: stoneId,
          CustomerID: userData.UserID,
          diamondType: diamondType,
        })
      );
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userData, diamondType, stoneId]);

  // Toggle wishlist for main item
  const onAddToWishHandler = useCallback(async () => {
    if (!stoneId || !diamondType) return;

    const stockId = stoneId || stockDetailDnaList?.Stock_ID;

    if (userData?.UserID) {
      if (isItemInWishlist) {
        // Remove from wishlist
        const { payload } = await dispatch(
          removeToWatchList({
            StockIDs: stockId,
            CustomerID: userData.UserID,
            diamondType: diamondType,
            displayType: 'diamond',
          })
        );
        if (payload?.data?.IsSuccess) {
          updateRowWatch(stockId, false);
          dispatch(setIsAddToWatchList(true));
        }
      } else {
        // Add to wishlist
        const { payload } = await dispatch(
          addToWatchList({
            StockIDs: stockId,
            CustomerID: userData.UserID,
            diamondType: diamondType,
            displayType: 'diamond',
          })
        );
        if (payload?.data?.IsSuccess) {
          updateRowWatch(stockId, true);
          dispatch(setIsAddToWatchList(true));
        }
      }
    } else {
      if (isItemInWishlist) {
        // Remove from local wishlist
        dispatch(
          removeFromWishListInLocal({
            diamondWishList: [{ ...stockDetailDnaList, Is_Like: false, isLiked: false }],
            diamondType: diamondType,
          })
        );
        updateRowWatch(stockId, false);
      } else {
        // Add to local wishlist
        dispatch(
          addToWishListInLocalList({
            diamondWishList: [{ ...stockDetailDnaList, Is_Like: true, isLiked: true }],
            diamondType: diamondType,
          })
        );
        updateRowWatch(stockId, true);
      }
    }
  }, [
    stoneId,
    dispatch,
    userData,
    diamondType,
    updateRowWatch,
    stockDetailDnaList,
    isItemInWishlist,
  ]);
  // Toggle wishlist for similar items
  const onAddToWishHandlerSimilar = useCallback(
    async (diamond, type) => {
      if (!diamond || Object.keys(diamond).length === 0 || type !== 'similar') {
        return;
      }

      const stockId = diamond.Stock_ID || diamond._id;
      const isCurrentlyLiked = diamond?.Is_Like;

      if (userData?.UserID) {
        if (isCurrentlyLiked) {
          // Remove from wishlist
          await dispatch(
            removeToWatchList({
              StockIDs: stockId.toString(),
              CustomerID: userData.UserID,
              diamondType: diamond.Diamond_Type,
              displayType: 'diamond',
            })
          );
          setIsSelectSimilarProduct(true);
        } else {
          // Add to wishlist
          await dispatch(
            addToWatchList({
              StockIDs: diamond.Stone_No || stockId.toString(),
              CustomerID: userData.UserID,
              diamondType: diamond.Diamond_Type,
              displayType: 'diamond',
            })
          );
          setIsSelectSimilarProduct(true);
        }
      } else {
        if (isCurrentlyLiked) {
          // Remove from local wishlist
          dispatch(
            removeFromWishListInLocal({
              diamondWishList: [{ ...diamond, Is_Like: true, isLiked: true}],
              diamondType: diamond.Diamond_Type,
            })
          );
          updateRowWatchSimilar(stockId, false);
        } else {
          // Add to local wishlist
          dispatch(
            addToWishListInLocalList({
              diamondWishList: [{ ...diamond, Is_Like: true, isLiked: true }],
              diamondType: diamond.Diamond_Type,
            })
          );
          updateRowWatchSimilar(stockId, true);
        }
      }
    },
    [userData?.UserID, dispatch, updateRowWatchSimilar]
  );

  // Add to compare handler
  const onAddToCompareHandler = useCallback(() => {
    if (!stoneId || !diamondType) return;

    if (userData?.UserID) {
      dispatch(
        addToCompareList({
          StockIDs: stoneId,
          CustomerID: userData.UserID,
          diamondType: diamondType,
        })
      );
    } else {
      dispatch(
        addToComapareListInLocalList({
          diamondCompareList: [{ ...stockDetailDnaList }],
          diamondType: diamondType,
        })
      );
    }
  }, [dispatch, userData, diamondType, stoneId, stockDetailDnaList]);

  // Navigate to diamond detail
  const onClickToDiamondDetail = useCallback(
    (stockId, diamondType) => {
      navigate(`/diamond-detail?stoneNo=${stockId}&diamondType=${diamondType}`);
    },
    [navigate]
  );

  // Effects
  useEffect(() => {
    if (stoneNo) {
      handleShareToWhatsApp(stoneNo);
      getSimilarDiamondList();
    }
  }, [stoneNo, handleShareToWhatsApp, getSimilarDiamondList]);

  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData.UserID }));
      dispatch(setIsAddToWatchList(false));
    }
    if (isSelectSimilarProduct) {
      getSimilarDiamondList();
      setIsSelectSimilarProduct(false);
    }
  }, [dispatch, userData, isAddToWatchList, isSelectSimilarProduct, getSimilarDiamondList]);

  useEffect(() => {
    if (isAddToCartList && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData.UserID }));
      dispatch(setIsAddToCartList(false));
    }
  }, [dispatch, isAddToCartList, userData]);

  // Render tooltip wrapper
  const renderWithTooltip = useCallback(
    (key, placement, tooltipText, children) => {
      if (deviceType === 'browser' && !isMobile) {
        return (
          <OverlayTrigger
            key={key}
            placement={placement}
            overlay={<Tooltip id={key}>{tooltipText}</Tooltip>}
          >
            {children}
          </OverlayTrigger>
        );
      }
      return children;
    },
    [deviceType, isMobile]
  );

  return (
    <>
      <Col xl={8} lg={6}>
        <div className="diamond_detail_contemt_wrap">
          {/* Title and Status */}
          <div className="d-flex align-items-center justify-content-between border-bottom-color">
            <h6 className="fs_18 mb0 fw_500 ff_Mulish">
              {stockDetailDnaList?.Weight
                ? `${stockDetailDnaList.Weight}carat, `
                : ''}
              {stockDetailDnaList?.Shape
                ? `${stockDetailDnaList.Shape} Shape `
                : ''}
              {stockDetailDnaList?.Diamond_Type
                ? `${stockDetailDnaList.Diamond_Type} Diamond`
                : ''}
            </h6>
            <div className="text-start text-sm-end">
              {stockDetailDnaList?.StockStatus && (
                <h6
                  className={`mb0 fw_500 ff_Mulish ${
                    stockDetailDnaList.StockStatus === 'AVAILABLE'
                      ? 'available'
                      : stockDetailDnaList.StockStatus === 'ONHOLD'
                        ? 'on_hold'
                        : stockDetailDnaList.StockStatus === 'ONMEMO'
                          ? 'on_memo'
                          : ''
                  }`}
                >
                  {stockDetailDnaList.StockStatus}
                </h6>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <ul className="action_button_wrap d-flex flex-wrap align-items-center mt10 mb20">
            <li>
              <Button
                variant="primary"
                size="sm"
                className="pl20 pr20 btn_cart ff_Mulish"
                disabled={addToCartLoading || isItemInCart}
                onClick={onAddToCartHandler}
              >
                <img src={CartIcon} className="white_img" alt="" />
                {isItemInCart ? 'In Cart' : 'Add To Cart'}
              </Button>
            </li>
            <li>
              <Button
                variant="outline-primary"
                size="sm"
                className="pl20 pr20 btn_shadow confirm_btn btn_cart ff_Mulish"
                disabled={addToHoldLoading}
                onClick={onAddToHoldHandler}
              >
                <img src={availabilityIcon} className="white_img" alt="" />
                <span>Confirm Availability</span>
              </Button>
            </li>
            {renderWithTooltip(
              'wishlist',
              'bottom',
              isItemInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist',
              <li>
                <Button
                  variant={isItemInWishlist ? 'primary' : 'outline-primary'}
                  size="sm"
                  className="rounded-circle btn_round icon_button p0"
                  disabled={addToWatchLoading}
                  onClick={onAddToWishHandler}
                >
                  <img src={HeartIcon} className="mr0" alt="" />
                </Button>
              </li>
            )}
            {renderWithTooltip(
              'compare',
              'bottom',
              'Add to Compare',
              <li>
                <Button
                  variant="outline-primary"
                  className="rounded-circle btn_round icon_button btn-sm p0"
                  disabled={addToCompareLoading}
                  onClick={onAddToCompareHandler}
                >
                  <img src={CompareIcon} className="mr0" alt="" />
                </Button>
              </li>
            )}
            {renderWithTooltip(
              'whatsapp',
              'bottom',
              'Chat on Whatsapp',
              <li>
                <a
                  href={whatsAppHref}
                  className="btn btn-outline-primary rounded-circle btn_round icon_button btn-sm p0"
                  target={whatsAppHref === '#' ? '_self' : '_blank'}
                  rel="noreferrer"
                >
                  <img src={WhatsappIcon} className="mr0" alt="" />
                </a>
              </li>
            )}
            {renderWithTooltip(
              'Email',
              'bottom',
              'Share on email',
              <li>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-circle btn_round icon_button p0"
                  onClick={() => {
                    if (stoneNo && diamondType) {
                      if (userData?.UserID && userData.Login_Name) {
                        dispatch(
                          sendDiamondDetailMail({
                            StoneNumber: stoneNo,
                            UserID: userData.UserID,
                            UserName: userData.Login_Name,
                            Diamond_Type: diamondType,
                          })
                        );
                      } else {
                        navigate('/login');
                      }
                    }
                  }}
                >
                  <img src={MailIcon} className="mr0" alt="" />
                </Button>
              </li>
            )}
            {renderWithTooltip(
              'expert',
              'bottom',
              'Call to Expert',
              <li>
                <a
                  href="tel:+91-8200127828"
                  className="btn btn-outline-primary rounded-circle btn_round icon_button btn-sm p0"
                >
                  <img src={PhoneIcon} className="mr0" alt="" />
                </a>
              </li>
            )}
          </ul>

          {/* Basic Details */}
          <div className="detail_top_wrapper">
            <ul>
              <li>
                Stone No
                <span className="text-uppercase">
                  {stockDetailDnaList?.Stone_No || '-'}
                </span>
              </li>
              <li>
                Lab
                <span>{stockDetailDnaList?.Lab || '-'}</span>
              </li>
              <li>
                Certificate No{' '}
                <span
                  onClick={() =>
                    stockDetailDnaList?.StoneCertificate_Url &&
                    window.open(stockDetailDnaList.StoneCertificate_Url, '_blank')
                  }
                >
                  {stockDetailDnaList?.Lab_Report_No ? (
                    <b className="cursor_pointer text_colorC">
                      {stockDetailDnaList.Lab_Report_No}
                    </b>
                  ) : (
                    '-'
                  )}
                </span>
              </li>
              <li>
                Price / Rate
                <span>
                  ${stockDetailDnaList?.Cost_Rate || 0}
                </span>
              </li>
              <li>
                Amount
                <span>
                  ${stockDetailDnaList?.Cost_Amt || 0}
                </span>
              </li>
              <li>
                Location
                <span>{stockDetailDnaList?.Location || '-'}</span>
              </li>
            </ul>
          </div>

          {/* Grading Details */}
          <div className="stone_detail_wrapper">
            <h4>Grading Details</h4>
            <div className="stone_detail_wrapper_inner">
              <Row className="g-2">
                <Col md={6}>
                  <div className="additional_detail_box">
                    <table>
                      <tbody>
                        <tr>
                          <td>Shape</td>
                          <td>{stockDetailDnaList?.Shape || '-'}</td>
                        </tr>
                        <tr>
                          <td>Size</td>
                          <td>
                            {stockDetailDnaList?.Weight
                              ? `${stockDetailDnaList.Weight}ct`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>Color</td>
                          <td>{stockDetailDnaList?.Color || '-'}</td>
                        </tr>
                        <tr>
                          <td>Clarity</td>
                          <td>{stockDetailDnaList?.Clarity || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="additional_detail_box">
                    <table>
                      <tbody>
                        <tr>
                          <td>Cut</td>
                          <td>{stockDetailDnaList?.Cut || '-'}</td>
                        </tr>
                        <tr>
                          <td>Polish</td>
                          <td>{stockDetailDnaList?.Polish || '-'}</td>
                        </tr>
                        <tr>
                          <td>Symmetry</td>
                          <td>{stockDetailDnaList?.Symm || '-'}</td>
                        </tr>
                        <tr>
                          <td>Fluorescence</td>
                          <td>{stockDetailDnaList?.FlrIntens || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Measurement Mapping */}
          <div className="stone_detail_wrapper">
            <h4>Measurement Mapping</h4>
            <div className="stone_detail_wrapper_inner">
              <Row className="g-2">
                <Col md={6}>
                  <div className="additional_detail_box">
                    <table>
                      <tbody>
                        <tr>
                          <td>Measurements</td>
                          <td>{stockDetailDnaList?.Measurement || '-'}</td>
                        </tr>
                        <tr>
                          <td>Table %</td>
                          <td>
                            {stockDetailDnaList?.Table_Diameter_Per
                              ? `${stockDetailDnaList.Table_Diameter_Per}%`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>Depth %</td>
                          <td>
                            {stockDetailDnaList?.Total_Depth_Per
                              ? `${stockDetailDnaList.Total_Depth_Per}%`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>CA-CH</td>
                          <td>
                            {stockDetailDnaList?.CrownAngle
                              ? `${stockDetailDnaList.CrownAngle}°`
                              : '-'}
                            -{' '}
                            {stockDetailDnaList?.CrownHeight
                              ? `${stockDetailDnaList.CrownHeight}°`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>PA-PH</td>
                          <td>
                            {stockDetailDnaList?.PavillionAngle
                              ? `${stockDetailDnaList.PavillionAngle}°`
                              : '-'}{' '}
                            -{' '}
                            {stockDetailDnaList?.PavillionHeight
                              ? `${stockDetailDnaList.PavillionHeight}°`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>Key To Symbol</td>
                          <td>{stockDetailDnaList?.KeyToSymbols || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="additional_detail_box">
                    <table>
                      <tbody>
                        <tr>
                          <td>Star/LH</td>
                          <td>
                            {stockDetailDnaList?.StarLength
                              ? `${stockDetailDnaList.StarLength}°`
                              : '-'}
                            /
                            {stockDetailDnaList?.LowerHalve
                              ? `${stockDetailDnaList.LowerHalve}°`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>Girdle</td>
                          <td>{stockDetailDnaList?.GirdleName || '-'}</td>
                        </tr>
                        <tr>
                          <td>Girdle Condition</td>
                          <td>{stockDetailDnaList?.GirdleCon || '-'}</td>
                        </tr>
                        <tr>
                          <td>Culet</td>
                          <td>{stockDetailDnaList?.CuletSize || '-'}</td>
                        </tr>
                        <tr>
                          <td>Girdle %</td>
                          <td>
                            {stockDetailDnaList?.Girdle_Per
                              ? `${stockDetailDnaList.Girdle_Per}%`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>Report Comment</td>
                          <td>{stockDetailDnaList?.Lab_Report_Comment || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          {/* Inclusion Details */}
          <div className="stone_detail_wrapper">
            <h4>Inclusion Details</h4>
            <div className="stone_detail_wrapper_inner">
              <Row className="g-2">
                <Col md={6}>
                  <div className="additional_detail_box">
                    <table>
                      <tbody>
                        <tr>
                          <td>Tinge</td>
                          <td>{stockDetailDnaList?.Tinge || '-'}</td>
                        </tr>
                        <tr>
                          <td>Milky</td>
                          <td>{stockDetailDnaList?.Milkey || '-'}</td>
                        </tr>
                        <tr>
                          <td>Eyeclean</td>
                          <td>{stockDetailDnaList?.Eyeclean || '-'}</td>
                        </tr>
                        <tr>
                          <td>BIC</td>
                          <td>{stockDetailDnaList?.BIC || '-'}</td>
                        </tr>
                        <tr>
                          <td>H&A</td>
                          <td>{stockDetailDnaList?.HnA || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="additional_detail_box">
                    <table>
                      <tbody>
                        <tr>
                          <td>BIS</td>
                          <td>{stockDetailDnaList?.BIS || '-'}</td>
                        </tr>
                        <tr>
                          <td>WIC</td>
                          <td>{stockDetailDnaList?.WIC || '-'}</td>
                        </tr>
                        <tr>
                          <td>WIS</td>
                          <td>{stockDetailDnaList?.WIS || '-'}</td>
                        </tr>
                        <tr>
                          <td>Growth Type</td>
                          <td>{stockDetailDnaList?.CVD_HPHT || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Col>

      {/* Similar Products */}
      {diamondSimilarProducts?.length > 0 && (
        <section className="recommended_you pb40">
          <Container>
            <h3 className="text-center mb40 mb10-md ff_Title text-uppercase">
              Similar <span className="text_colorC">Items</span>
            </h3>
            <SimilarStone
              diamondSimilarProducts={diamondSimilarProducts}
              addToWatchLoading={addToWatchLoading}
              addToCartDaimondLoading={addToCartDaimondLoading}
              onAddToCartHandler={onAddToCartHandler}
              onAddToWishHandler={onAddToWishHandlerSimilar}
              onClickToDiamondDetail={onClickToDiamondDetail}
            />
          </Container>
        </section>
      )}
    </>
  );
};
export default memo(DiamondInfo);
