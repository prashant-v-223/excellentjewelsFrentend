import Loader from 'Components/Global/Loader';
import { getJewelleryCopytoClipboardString } from 'Components/Redux/reducers/dashboard.slice';
import {
  addToCartJewellery,
  addToWishlist,
} from 'Components/Redux/reducers/jewellery.slice';
import {
  addToWatchList,
  getWatchStockListCount,
  setIsAddToWatchList,
  removeToWatchList,
} from 'Components/Redux/reducers/myAccount.slice';
import {
  addToCartListInLocalJewelery,
  addToWatchListInLocalJewelery,
  removeFromWishListInLocalJewelery,
} from 'Components/Redux/reducers/offlineList.slice';
import {
  setIsDiamondSearchSettingWise,
  setSelectedDiamondForSetting,
} from 'Components/Redux/reducers/setting.slice';
import { getJewellerySimillarProducts } from 'Components/Redux/reducers/jewellery.slice';
import { getJewelleryCategoryId } from 'Helper/CommonHelper';
import DOMPurify from 'dompurify';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

// Icons
import PhoneIcon from '../../Assets/Images/call-expert.svg';
import CartIcon from '../../Assets/Images/cart.svg';
import Composition from '../../Assets/Images/Jewellery/composition.svg';
import Composition2 from '../../Assets/Images/Jewellery/composition2.svg';
import PlusIcon from '../../Assets/Images/plusicon.svg';
import WhatsappIcon from '../../Assets/Images/whatsapp.svg';
import HeartIcon from '../../Assets/Images/wishliat.svg';

import SimilarJewellery from './SimilarJewellery';
import { OptimizedImage } from 'utils/performanceUtils';

const JewelleryInfo = ({
  userData,
  stockId,
  isSimilarWise,
  isSettingWise,
  jewelleryRingSize,
  jewelleryDetailData,
  jewellerySearchStock,
  countryListByRingSize,
  selectedDiamondForSetting,
  selectedCountryForRingSize,
  selectedRingSizeForSetting,
  selectedJewelleryForSetting,
  setSelectedRingSizeForSetting,
  setSelectedCountryForRingSize,
  onSelectJewelleryDetailForSetting,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 991;

  // Redux selectors
  const { isAddToWatchList, addToWatchLoading } = useSelector(
    ({ myAccount }) => myAccount
  );
  const { jewelleryWatchListData } = useSelector(
    ({ offlineList }) => offlineList
  );
  const {
    addToCartJewelleryLoading,
    jewelleryDetailLoader,
    jewelleryCategory,
    jewelleryCartList,
  } = useSelector(({ jewellery }) => jewellery);

  // Local state
  const [isShowWarning, setIsShowWarning] = useState(false);
  const [jewellerySimillarProducts, setJewellerySimillarProducts] = useState([]);
  const [isSelectSimilarProduct, setIsSelectSimilarProduct] = useState(false);
  const [whatsAppHref, setWhatsAppHref] = useState('#');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Modal handlers
  const handleClose = useCallback(() => setIsShowWarning(false), []);
  const handleShow = useCallback(() => setIsShowWarning(true), []);

  // Check if item is in cart
  const isItemInCart = useMemo(() => {
    const stockID = jewelleryDetailData?.Stock_ID || jewelleryDetailData?._id;
    if (!stockID) return false;

    const allCartItems = [
      ...(jewelleryCartList?.cartList || []),
      ...(jewelleryCartList?.mixCartList || []),
    ];

    return allCartItems.some(item => {
      const itemStockID = item.Stock_ID || item.Jewellery_Stock_ID || item.StockID || item._id;
      return itemStockID === stockID;
    });
  }, [jewelleryDetailData, jewelleryCartList]);

  // Check if item is in wishlist
  const isItemInWishlist = useMemo(() => {
    const stockID = jewelleryDetailData?.Stock_ID || jewelleryDetailData?._id;
    if (!stockID) return false;

    if (userData?.UserID) {
      // For logged-in users, check from jewellerySearchStock (assumed to be a Map)
      const item = jewellerySearchStock?.get(stockID);
      return item?.Is_Like || false;
    } else {
      // For guest users, check from local wishlist
      return jewelleryWatchListData?.some(item => {
        const itemStockID = item.Stock_ID || item._id;
        return itemStockID === stockID;
      });
    }
  }, [
    jewelleryDetailData,
    userData,
    jewellerySearchStock,
    jewelleryWatchListData,
  ]);

  // Handle setting selection
  const handleSubmit = useCallback(() => {
    dispatch(setIsDiamondSearchSettingWise(false));
    dispatch(setSelectedDiamondForSetting({}));
    onSelectJewelleryDetailForSetting(jewelleryDetailData);
    handleClose();
  }, [dispatch, jewelleryDetailData, onSelectJewelleryDetailForSetting, handleClose]);

  // Fetch similar products
  const fetchJewellerySimillarProducts = useCallback(async () => {
    if (!jewelleryCategory?.length) return;

    const Category_ID = getJewelleryCategoryId(jewelleryCategory, 'finejewellery');
    const { payload } = await dispatch(
      getJewellerySimillarProducts({ Stock_ID: stockId, Category_ID })
    );

    if (payload?.data?.length > 0) {
      const stockList = jewelleryWatchListData.map(item => item.Stock_ID);
      const data = payload.data.map(item => ({
        ...item,
        Is_Like: stockList.includes(item.Stock_ID),
      }));
      setJewellerySimillarProducts(data);
    }
  }, [dispatch, stockId, jewelleryCategory, jewelleryWatchListData]);

  // Handle WhatsApp share
  const handleShareToWhatsApp = useCallback(
    async jewelleryNo => {
      const { payload } = await dispatch(
        getJewelleryCopytoClipboardString({ JewelleryNo: jewelleryNo })
      );
      if (payload?.data) {
        const message = encodeURIComponent(payload.data);
        const phoneNumber = '+919586971689';
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        setWhatsAppHref(whatsappLink);
      }
    },
    [dispatch]
  );

  // Build API params for main jewellery
  const getParamForApi = useCallback(
    jewelleryItem => ({
      StockStatus: jewelleryItem?.JewelleryDetail?.StockStatus || '',
      Stock_ID: jewelleryItem?.JewelleryDetail?.Stock_ID || '',
      userId: userData?.UserID || 0,
      Cust_ID: userData?.UserID || 0,
      Diamond_Type: jewelleryItem?.DiamondDetail?.Diamond_Type || '',
      Jewellery_Stock_ID: jewelleryItem?.JewelleryDetail?.Stock_ID || 0,
      Metal_ID: jewelleryItem?.JewelleryDetail?.Metal_ID || 0,
      Sale_Rate: jewelleryItem?.JewelleryDetail?.Sale_Rate || 0,
      Amount: jewelleryItem?.JewelleryDetail?.Sale_Rate || 0,
      WithStone: jewelleryItem?.JewelleryDetail?.WithStone || false,
      Total_Metal_Weight: jewelleryItem?.JewelleryDetail?.Total_Metal_Weight || 0,
      Jewellery_No: jewelleryItem?.JewelleryDetail?.Jewellery_No || '',
      Jewellery_Name: jewelleryItem?.JewelleryDetail?.Jewellery_Name || '',
      Img_Video_Url:
        jewelleryItem?.ImagesAndVideos?.length > 0
          ? jewelleryItem.ImagesAndVideos[0]?.Img_Video_Url || ''
          : '',
      Shape: jewelleryItem?.DiamondDetail?.Shape || '',
      Metal_PurityColor: jewelleryItem?.JewelleryDetail?.Metal_PurityColor || '',
      Type: jewelleryItem?.JewelleryDetail?.Type || '',
      isOnlyJewellery: true,
    }),
    [userData]
  );

  // Build API params for similar jewellery
  const getParamForApiSimilar = useCallback(
    jewelleryItem => ({
      StockStatus: jewelleryItem?.StockStatus || '',
      Stock_ID: jewelleryItem?.Stock_ID || '',
      userId: userData?.UserID || 0,
      Cust_ID: userData?.UserID || 0,
      Diamond_Type: jewelleryItem?.Diamond_Type || '',
      Jewellery_Stock_ID: jewelleryItem?.Stock_ID || 0,
      Metal_ID: jewelleryItem?.Metal_ID || 0,
      Sale_Rate: jewelleryItem?.Sale_Rate || 0,
      Amount: jewelleryItem?.Sale_Rate || 0,
      WithStone: jewelleryItem?.WithStone || false,
      Total_Metal_Weight: jewelleryItem?.Total_Metal_Weight || 0,
      Jewellery_No: jewelleryItem?.Jewellery_No || '',
      Jewellery_Name: jewelleryItem?.Jewellery_Name || '',
      Img_Video_Url: jewelleryItem?.Img_Video_Url || '',
      Shape: jewelleryItem?.Shape || '',
      Metal_PurityColor: jewelleryItem?.Metal_PurityColor || '',
      Type: jewelleryItem?.Type || '',
      isOnlyJewellery: true,
    }),
    [userData]
  );

  // Add to cart handler
  const addToCartJewelleryList = useCallback(
    (jewelleryItem, type = 'main') => {
      // Check if already in cart
      const stockID = type === 'similar'
        ? jewelleryItem?.Stock_ID
        : jewelleryItem?.JewelleryDetail?.Stock_ID;

      const allCartItems = [
        ...(jewelleryCartList?.cartList || []),
        ...(jewelleryCartList?.mixCartList || []),
      ];

      const alreadyInCart = allCartItems.some(
        item =>
          item.Jewellery_Stock_ID === stockID ||
          item.Stock_ID === stockID ||
          item.StockID === stockID
      );

      if (alreadyInCart) {
        return; // Item already in cart, prevent duplicate
      }

      const obj =
        type === 'similar'
          ? getParamForApiSimilar(jewelleryItem)
          : getParamForApi(jewelleryItem);

      if (userData?.UserID) {
        dispatch(addToCartJewellery(obj));
      } else {
        dispatch(
          addToCartListInLocalJewelery({
            jeweleryList: { ...obj, Category: 'Fine Jewellery' },
          })
        );
      }
    },
    [
      getParamForApiSimilar,
      getParamForApi,
      userData?.UserID,
      dispatch,
      jewelleryCartList,
    ]
  );

  // Add/Remove wishlist handler
  const toggleWishlist = useCallback(
    async (jewelleryItem, type = 'main') => {
      const isCurrentlyLiked = type === 'similar'
        ? jewelleryItem?.Is_Like
        : isItemInWishlist;

      const stockID = type === 'similar'
        ? jewelleryItem?.Stock_ID
        : jewelleryItem?.JewelleryDetail?.Stock_ID;

      if (!stockID) return;

      if (userData?.UserID) {
        // Logged-in user
        if (isCurrentlyLiked) {
          // Remove from wishlist
          await dispatch(
            removeToWatchList({
              StockIDs: stockID.toString(),
              CustomerID: userData.UserID,
            })
          );
        } else {
          // Add to wishlist
          await dispatch(
            addToWatchList({
              StockIDs: stockID.toString(),
              CustomerID: userData.UserID,
            })
          );
        }

        if (type === 'similar') {
          setIsSelectSimilarProduct(true);
        }
      } else {
        // Guest user
        const obj = type === 'similar'
          ? getParamForApiSimilar(jewelleryItem)
          : getParamForApi({ JewelleryDetail: jewelleryItem });

        if (isCurrentlyLiked) {
          // Remove from local wishlist
          dispatch(
            removeFromWishListInLocalJewelery({
              jeweleryList: [{
                ...obj,
                Category: 'Fine Jewellery',
                Amount: obj?.Sale_Rate || 0,
                Jewellery_Stock_ID: obj?.Stock_ID || 0,
                isOnlyJewellery: true,
                Is_Like: false,
                Location: jewelleryItem?.Location || '',
              }],
            })
          );
        } else {
          // Add to local wishlist
          dispatch(
            addToWatchListInLocalJewelery({
              jeweleryList: {
                ...obj,
                Category: 'Fine Jewellery',
                Jewellery_Size: jewelleryItem?.Jewellery_Size || '',
                Sub_Type: jewelleryItem?.Sub_Type || 0,
                Total_Stone_Weight: jewelleryItem?.Total_Stone_Weight || '',
                Is_Like: true,
                Location: jewelleryItem?.Location || '',
              },
            })
          );
        }
      }
    },
    [
      userData,
      dispatch,
      getParamForApiSimilar,
      getParamForApi,
      isItemInWishlist,
    ]
  );

  // Navigate to jewellery detail
  const onClickJewelleryDetail = useCallback(
    stockId => {
      navigate(`/jewellery-detail?stockId=${stockId}`);
    },
    [navigate]
  );

  // Handle setting selection with validation
  const handleChooseSetting = useCallback(() => {
    const isDiamondShapeMismatch =
      window.location.pathname === '/setting-jewellery-wise' &&
      Object.keys(selectedDiamondForSetting || {}).length > 0 &&
      selectedDiamondForSetting?.Shape !== jewelleryDetailData?.DiamondDetail?.Shape;

    const isJewelleryShapeMismatch =
      window.location.pathname === '/setting-jewellery-wise' &&
      Object.keys(selectedJewelleryForSetting || {}).length > 0 &&
      selectedJewelleryForSetting?.DiamondDetail?.[0]?.Shape !==
      jewelleryDetailData?.DiamondDetail?.Shape;

    if (isDiamondShapeMismatch) {
      handleShow();
    } else if (isJewelleryShapeMismatch) {
      dispatch(setIsDiamondSearchSettingWise(false));
      onSelectJewelleryDetailForSetting(jewelleryDetailData);
    } else {
      onSelectJewelleryDetailForSetting(jewelleryDetailData);
    }
  }, [
    selectedDiamondForSetting,
    selectedJewelleryForSetting,
    jewelleryDetailData,
    dispatch,
    onSelectJewelleryDetailForSetting,
    handleShow,
  ]);

  // Effects
  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData.UserID }));
      dispatch(setIsAddToWatchList(false));
    }
    if (isSelectSimilarProduct) {
      fetchJewellerySimillarProducts();
      setIsSelectSimilarProduct(false);
    }
  }, [
    dispatch,
    userData,
    isAddToWatchList,
    isSelectSimilarProduct,
    fetchJewellerySimillarProducts,
  ]);

  useEffect(() => {
    if (stockId && isSimilarWise && jewelleryCategory?.length > 0) {
      fetchJewellerySimillarProducts();
    }
  }, [stockId, isSimilarWise, jewelleryCategory, fetchJewellerySimillarProducts]);

  useEffect(() => {
    if (jewelleryDetailData?.JewelleryDetail?.Jewellery_No) {
      handleShareToWhatsApp(jewelleryDetailData.JewelleryDetail.Jewellery_No);
    }
  }, [jewelleryDetailData, handleShareToWhatsApp]);

  // Warning modal
  const WarningModal = useMemo(
    () => (
      <Modal
        show={isShowWarning}
        onHide={handleClose}
        centered
        className="warning_modal"
      >
        <Modal.Body>
          <div className="warning_text">
            <p>Are you sure you want to change diamond?</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="outline-primary"
            size="md"
            className="fs_14"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            variant="primary"
            className="btn_shadow px30 px20-xl fs_14"
            size="md"
            onClick={handleSubmit}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    ),
    [isShowWarning, handleClose, handleSubmit]
  );

  // Calculate price
  const displayPrice = useMemo(() => {
    const isJewelleryDetail = window.location.pathname === '/jewellery-detail';
    const price = isJewelleryDetail
      ? jewelleryDetailData?.JewelleryDetail?.Sale_Rate
      : jewelleryDetailData?.JewelleryDetail?.Setting_Rate;
    return price ? price.toFixed(2) : '0.00';
  }, [jewelleryDetailData]);

  // Select styles
  const selectStyles = useMemo(
    () => ({
      option: (base, { isSelected }) => ({
        ...base,
        backgroundColor: isSelected ? '#be8d28' : '#fff',
        ':hover': {
          backgroundColor: 'rgb(200, 200, 200)',
        },
        color: '#000',
      }),
    }),
    []
  );

  return (
    <>
      <Col xl={8} lg={7}>
        <Row>
          {WarningModal}
          {jewelleryDetailLoader && <Loader />}
          <Col xl={12}>
            <div className="jewellery_price_wrapper jewellery_detail_right">
              {/* Title and Status */}
              <div className="d-flex justify-content-between border-bottom-color">
                <h6 className="fs_20 text_dark ff_Mulish m-0">
                  {jewelleryDetailData?.JewelleryDetail?.Jewellery_Name || ''}{' '}
                  {jewelleryDetailData?.JewelleryDetail?.Metal_PurityColor || ''}{' '}
                  Gold (
                  {jewelleryDetailData?.JewelleryDetail?.Total_Stone_Weight
                    ? `${jewelleryDetailData.JewelleryDetail.Total_Stone_Weight}ct`
                    : '0'}
                  )
                </h6>
                <div className="jewellery_badge_wrap">
                  <span
                    className={`ff_Mulish ${jewelleryDetailData?.JewelleryDetail?.StockStatus === 'AVAILABLE'
                        ? 'available'
                        : jewelleryDetailData?.JewelleryDetail?.StockStatus === 'ONHOLD'
                          ? 'on_hold'
                          : jewelleryDetailData?.JewelleryDetail?.StockStatus === 'ONMEMO'
                            ? 'on_memo'
                            : ''
                      }`}
                  >
                    {jewelleryDetailData?.JewelleryDetail?.StockStatus || ''}
                  </span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="jewellery_price d-lg-flex align-items-center mb-md-3 mb-2">
                <h4 className="fw_700 m-0 text_colorC ff_Mulish me-4">
                  ${displayPrice}
                </h4>
                <ul className="action_button_wrap d-flex flex-wrap align-items-center mt5-lg">
                  {isSettingWise ? (
                    <li className="mr10 mr0-sm">
                      <Button
                        variant="primary"
                        className="px20 px10-lg btn_shadow"
                        onClick={handleChooseSetting}
                      >
                        <img src={PlusIcon} className="white_img" alt="" />
                        Choose This Setting
                      </Button>
                    </li>
                  ) : (
                    <>
                      <li className="mr10">
                        <Button
                          variant="primary"
                          className="px20 px10-lg btn_shadow"
                          disabled={addToCartJewelleryLoading || isItemInCart}
                          onClick={() => addToCartJewelleryList(jewelleryDetailData)}
                        >
                          <img src={CartIcon} className="white_img" alt="" />
                          {isItemInCart ? 'In Cart' : 'Add To Cart'}
                        </Button>
                      </li>
                      <OverlayTrigger
                        key="wishlist"
                        placement="bottom"
                        overlay={
                          isMobile ? (
                            <></>
                          ) : (
                            <Tooltip id="AddtoWishlist">
                              {isItemInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </Tooltip>
                          )
                        }
                      >
                        <li>
                          <Button
                            variant={isItemInWishlist ? 'primary' : 'outline-primary'}
                            size="sm"
                            className="rounded-circle btn_round p0"
                            disabled={addToWatchLoading}
                            onClick={() =>
                              toggleWishlist(jewelleryDetailData?.JewelleryDetail)
                            }
                          >
                            <img src={HeartIcon} className="mr0" alt="" />
                          </Button>
                        </li>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="whatsapp"
                        placement="bottom"
                        overlay={
                          isMobile ? (
                            <></>
                          ) : (
                            <Tooltip id="ChatonWhatsapp">Chat on Whatsapp</Tooltip>
                          )
                        }
                      >
                        <li>
                          <a
                            href={whatsAppHref}
                            className="btn btn-outline-primary rounded-circle btn_round btn-sm p0"
                            target={whatsAppHref === '#' ? '_self' : '_blank'}
                            rel="noreferrer"
                          >
                            <img src={WhatsappIcon} className="mr0" alt="" />
                          </a>
                        </li>
                      </OverlayTrigger>
                      <OverlayTrigger
                        key="expert"
                        placement="bottom"
                        overlay={
                          isMobile ? (
                            <></>
                          ) : (
                            <Tooltip id="callToExpert">Call to Expert</Tooltip>
                          )
                        }
                      >
                        <li>
                          <a
                            href="tel:+91-8200127828"
                            className="btn btn-outline-primary rounded-circle btn_round btn-sm p0"
                          >
                            <img src={PhoneIcon} className="mr0" alt="" />
                          </a>
                        </li>
                      </OverlayTrigger>
                    </>
                  )}
                </ul>
              </div>

              {/* Ring Size Selection */}
              {isSettingWise && (
                <div className="d-sm-flex ring_size_wrap">
                  <div className="ring_size mb25 mb15-lg pr15 pr0-xs">
                    <h6 className="fs_16 mb15 mb10-md text_light ff_Mulish">
                      Ring Size Country
                    </h6>
                    <Form.Group
                      controlId="ringSizeCountry"
                      className="form_group"
                    >
                      <Select
                        aria-label="Select country"
                        className="react_custom_select_Wrapper square ff_Mulish"
                        value={selectedCountryForRingSize}
                        onChange={e => {
                          setSelectedCountryForRingSize(e);
                          if (selectedRingSizeForSetting) {
                            setSelectedRingSizeForSetting({});
                          }
                        }}
                        options={countryListByRingSize}
                        styles={selectStyles}
                        placeholder="Select Country"
                      />
                    </Form.Group>
                  </div>
                  <div className="ring_size mb25 mb15-md">
                    <h6 className="fs_16 mb15 mb10-md text_light ff_Mulish">
                      Ring Size
                    </h6>
                    <Form.Group controlId="ringSize" className="form_group">
                      <Select
                        aria-label="Select ring size"
                        className="react_custom_select_Wrapper square ff_Mulish"
                        value={selectedRingSizeForSetting}
                        onChange={setSelectedRingSizeForSetting}
                        options={jewelleryRingSize}
                        styles={selectStyles}
                        placeholder="Select Size"
                      />
                    </Form.Group>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="mb20 detail_wrap">
                <h6 className="mb10 ff_Mulish">
                  <img src={Composition} className="mr5" alt="" />
                  Product Details
                </h6>
                <ul>
                  <li className="ff_Mulish">
                    Sku Number:
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Jewellery_No || ''}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Metal:
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Metal_PurityColor || ''} Gold
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Category:
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Category || ''}
                    </span>
                  </li>
                  {jewelleryDetailData?.JewelleryDetail?.Jewellery_Size && (
                    <li className="ff_Mulish">
                      Size/Length:
                      <span>
                        {jewelleryDetailData.JewelleryDetail.Jewellery_Size}
                      </span>
                    </li>
                  )}
                  <li className="ff_Mulish">
                    Gross Weight:
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.GrossWeight
                        ? `${jewelleryDetailData.JewelleryDetail.GrossWeight}gm`
                        : '-'}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Metal Weight:
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Total_Metal_Weight
                        ? `${jewelleryDetailData.JewelleryDetail.Total_Metal_Weight}gm`
                        : '-'}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Total Diamond Weight:
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Total_Stone_Weight
                        ? `${jewelleryDetailData.JewelleryDetail.Total_Stone_Weight}ct`
                        : '-'}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Location:
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Location || '-'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Diamond Information */}
              {jewelleryDetailData?.DiamondDetail?.length > 0 && (
                <div className="mb20 detail_wrap">
                  <h6 className="mb10 ff_Mulish">
                    <img src={Composition2} className="mr5" alt="" />
                    Diamond Information
                  </h6>
                  <div className="product_list_wrapper">
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr className="center_all_td">
                            <th>Shape</th>
                            <th>Color</th>
                            <th>Clarity</th>
                            <th>Pcs</th>
                            <th>Weight</th>
                            <th>Diamond Type</th>
                            <th>Lab</th>
                            <th>Report No</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jewelleryDetailData.DiamondDetail.map((item, index) => (
                            <tr key={`diamond_${index}`} className="center_all_td">
                              <td>{item?.Shape || '-'}</td>
                              <td>{item?.Color || '-'}</td>
                              <td>{item?.Clarity || '-'}</td>
                              <td>{item?.Pcs || '-'}</td>
                              <td>{item?.Weight ? `${item.Weight}ct` : '-'}</td>
                              <td>{item?.Diamond_Type || '-'}</td>
                              <td>{item?.Lab || '-'}</td>
                              <td>{item?.Lab_Report_No || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              {jewelleryDetailData?.Descriptions?.length > 0 && (
                <div className="description_wrapper">
                  <h5 className="ff_Mulish">Description</h5>
                  {jewelleryDetailData.Descriptions.map((item, index) => {
                    if (!item?.Description) return null;

                    const unescapedHtmlContent = item.Description.replace(
                      /\\n/g,
                      ''
                    ).replace(/\\"/g, '"');
                    const sanitizedHtmlContent = DOMPurify.sanitize(
                      unescapedHtmlContent
                    );

                    return (
                      <div
                        key={`description_${index}`}
                        dangerouslySetInnerHTML={{
                          __html: sanitizedHtmlContent,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Col>

      {/* Similar Jewellery Section */}
      {jewellerySimillarProducts?.length > 0 && (
        <div className="pt20 pb10">
          <SimilarJewellery
            addToWatchLoading={addToWatchLoading}
            addToCartJewelleryList={addToCartJewelleryList}
            jewellerySimillarProducts={jewellerySimillarProducts}
            onClickJewelleryDetail={onClickJewelleryDetail}
            addToWatchListJewellery={toggleWishlist}
            addToCartJewelleryLoading={addToCartJewelleryLoading}
          />
        </div>
      )}
    </>
  );
};

export default memo(JewelleryInfo);