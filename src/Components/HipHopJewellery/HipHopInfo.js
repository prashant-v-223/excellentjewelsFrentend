import Loader from 'Components/Global/Loader';
import { getJewelleryCopytoClipboardString } from 'Components/Redux/reducers/dashboard.slice';
import { addToCartJewellery } from 'Components/Redux/reducers/jewellery.slice';
import { setJewellerySearchStock } from 'Components/Redux/reducers/jewellery.slice';
import { setIsAddToWatchList } from 'Components/Redux/reducers/myAccount.slice';
import { addToWatchList } from 'Components/Redux/reducers/myAccount.slice';
import { getWatchStockListCount } from 'Components/Redux/reducers/myAccount.slice';
import { addToWatchListInLocalJewelery } from 'Components/Redux/reducers/offlineList.slice';
import { addToCartListInLocalJewelery } from 'Components/Redux/reducers/offlineList.slice';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PhoneIcon from '../../Assets/Images/call-expert.svg';
import CartIcon from '../../Assets/Images/cart.svg';
import Composition from '../../Assets/Images/Jewellery/composition.svg';
import Composition2 from '../../Assets/Images/Jewellery/composition2.svg';
import WhatsappIcon from '../../Assets/Images/whatsapp.svg';
import HeartIcon from '../../Assets/Images/wishliat.svg';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { getJewelleryCategoryId } from 'Helper/CommonHelper';
import { getJewellerySimillarProducts } from 'Components/Redux/reducers/jewellery.slice';
import { removeToWatchList } from 'Components/Redux/reducers/myAccount.slice';
import { removeFromWishListInLocalJewelery } from 'Components/Redux/reducers/offlineList.slice';
import HipHopSimilarJewellery from './HipHopSimilarJewellery';
import { OptimizedImage } from 'utils/performanceUtils';

const HipHopInfo = ({
  stockId,
  userData,
  jewelleryDetailData,
  jewellerySearchStock,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAddToWatchList, addToWatchLoading } = useSelector(
    ({ myAccount }) => myAccount,
  );
  const { jewelleryWatchListData } = useSelector(
    ({ offlineList }) => offlineList,
  );
  const {
    addToCartJewelleryLoading,
    jewelleryDetailLoader,
    jewelleryCategory,
  } = useSelector(({ jewellery }) => jewellery);

  const [hiphopjewellerySimillarProducts, setHipHopJewellerySimillarProducts] =
    useState([]);
  const [isSelectSimilarProduct, setIsSelectSimilarProduct] = useState(false);
  const updateRowWatch = useCallback(
    (row, value) => {
      const newJewellerySearchStock = new Map(jewellerySearchStock);
      newJewellerySearchStock.set(row.Stock_ID, {
        ...row,
        Is_Like: value,
      });
      dispatch(setJewellerySearchStock(newJewellerySearchStock));
    },
    [dispatch, jewellerySearchStock],
  );

  const updateRowWatchSimilar = useCallback(
    (row, value) => {
      const newJewellerySearchStock = hiphopjewellerySimillarProducts.map(
        item => {
          if (item.Stock_ID === row.Stock_ID) {
            return { ...item, Is_Like: value };
          }
          return item;
        },
      );
      setHipHopJewellerySimillarProducts(newJewellerySearchStock);
    },
    [hiphopjewellerySimillarProducts],
  );
  const fetchJewellerySimillarProducts = async () => {
    if (jewelleryCategory?.length > 0) {
      const Category_ID = getJewelleryCategoryId(
        jewelleryCategory,
        'hiphopjewellery',
      );
      const { payload } = await dispatch(
        getJewellerySimillarProducts({ Stock_ID: stockId, Category_ID }),
      );

      if (payload?.data?.length > 0) {
        const stockList = jewelleryWatchListData.map(item => item.Stock_ID);
        const data = payload?.data?.map(item => {
          if (stockList.includes(item.Stock_ID)) {
            return { ...item, Is_Like: true };
          }
          return item;
        });

        setHipHopJewellerySimillarProducts(data);
      }
    }
  };

  useEffect(() => {
    if (isAddToWatchList && userData?.UserID) {
      dispatch(getWatchStockListCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToWatchList(false));
    }
    if (isSelectSimilarProduct) {
      fetchJewellerySimillarProducts(stockId);
      setIsSelectSimilarProduct(false);
    }
  }, [dispatch, userData, isAddToWatchList]);

  useEffect(() => {
    if (stockId && jewelleryCategory?.length > 0) {
      fetchJewellerySimillarProducts(stockId);
    }
  }, [dispatch, stockId, jewelleryCategory]);

  const isMobile = window.innerWidth < 991;
  const [whatsAppHref, setWhatsAppHref] = useState('#');
  const handleShareToWhatsApp = useCallback(
    async jewelleryNo => {
      const { payload } = await dispatch(
        getJewelleryCopytoClipboardString({
          JewelleryNo: jewelleryNo,
        }),
      );
      if (payload?.data) {
        const message = encodeURIComponent(payload?.data);
        const phoneNumber = '+919586971689';
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        setWhatsAppHref(whatsappLink);
      }
    },
    [dispatch],
  );
  useEffect(() => {
    if (jewelleryDetailData?.JewelleryDetail?.Jewellery_No) {
      handleShareToWhatsApp(jewelleryDetailData.JewelleryDetail.Jewellery_No);
    }
  }, [jewelleryDetailData, handleShareToWhatsApp]);

  const getParamForApi = useCallback(
    jewelleryItem => {
      const obj = {
        StockStatus: jewelleryItem?.JewelleryDetail?.StockStatus
          ? jewelleryItem?.JewelleryDetail.StockStatus
          : '',
        Stock_ID: jewelleryItem?.JewelleryDetail?.Stock_ID
          ? jewelleryItem.JewelleryDetail.Stock_ID
          : '',
        userId: userData?.UserID ? userData.UserID : 0,
        Diamond_Type: jewelleryItem?.DiamondDetail?.Diamond_Type
          ? jewelleryItem.DiamondDetail.Diamond_Type
          : '',
        Jewellery_Stock_ID: jewelleryItem?.JewelleryDetail?.Stock_ID
          ? jewelleryItem.JewelleryDetail.Stock_ID
          : 0,
        Metal_ID: jewelleryItem?.JewelleryDetail?.Metal_ID
          ? jewelleryItem.JewelleryDetail.Metal_ID
          : 0,
        Sale_Rate: jewelleryItem?.JewelleryDetail?.Sale_Rate
          ? jewelleryItem.JewelleryDetail.Sale_Rate
          : '',
        Amount: jewelleryItem?.JewelleryDetail?.Sale_Rate
          ? jewelleryItem.JewelleryDetail.Sale_Rate
          : '',
        WithStone: jewelleryItem?.JewelleryDetail?.WithStone
          ? jewelleryItem.JewelleryDetail.WithStone
          : 0,
        Total_Metal_Weight: jewelleryItem?.JewelleryDetail?.Total_Metal_Weight
          ? jewelleryItem.JewelleryDetail.Total_Metal_Weight
          : 0,
        Jewellery_No: jewelleryDetailData?.JewelleryDetail?.Jewellery_No || '',
        Jewellery_Name:
          jewelleryDetailData?.JewelleryDetail?.Jewellery_Name || '',
        Img_Video_Url:
          jewelleryItem?.ImagesAndVideos?.length > 0
            ? jewelleryItem?.ImagesAndVideos[0]?.Img_Video_Url || ''
            : '',
        Shape: jewelleryItem?.DiamondDetail?.Shape || '',
        Metal_PurityColor:
          jewelleryItem?.JewelleryDetail?.Metal_PurityColor || '',
        Type: jewelleryItem?.JewelleryDetail?.Type || '',
        isOnlyJewellery: true,
      };
      return obj;
    },
    [jewelleryDetailData, userData],
  );

  const getParamForApiSimilar = useCallback(
    jewelleryItem => {
      const obj = {
        StockStatus: jewelleryItem?.StockStatus
          ? jewelleryItem?.StockStatus
          : '',
        Stock_ID: jewelleryItem?.Stock_ID ? jewelleryItem.Stock_ID : '',
        userId: userData?.UserID ? userData.UserID : 0,
        Diamond_Type: jewelleryItem?.Diamond_Type
          ? jewelleryItem.Diamond_Type
          : '',
        Jewellery_Stock_ID: jewelleryItem?.Stock_ID
          ? jewelleryItem.Stock_ID
          : 0,
        Metal_ID: jewelleryItem?.Metal_ID ? jewelleryItem.Metal_ID : 0,
        Sale_Rate: jewelleryItem?.Sale_Rate ? jewelleryItem.Sale_Rate : '',
        Amount: jewelleryItem?.Sale_Rate ? jewelleryItem.Sale_Rate : '',
        WithStone: jewelleryItem?.WithStone ? jewelleryItem.WithStone : 0,
        Total_Metal_Weight: jewelleryItem?.Total_Metal_Weight
          ? jewelleryItem.Total_Metal_Weight
          : 0,
        Jewellery_No: jewelleryItem?.Jewellery_No || '',
        Jewellery_Name: jewelleryItem?.Jewellery_Name || '',
        Img_Video_Url: jewelleryItem?.Img_Video_Url
          ? jewelleryItem.Img_Video_Url || ''
          : '',
        Shape: jewelleryItem?.DiamondDetail?.Shape || '',
        Metal_PurityColor: jewelleryItem?.Metal_PurityColor || '',
        Type: jewelleryItem?.Type || '',
        isOnlyJewellery: true,
      };
      return obj;
    },
    [userData],
  );
  const addToCartJewelleryList = useCallback(
    (jewelleryItem, type) => {
      const obj =
        type === 'similar'
          ? getParamForApiSimilar(jewelleryItem)
          : getParamForApi(jewelleryItem);
      if (userData?.UserID) {
        dispatch(
          addToCartJewellery({
            ...obj,
            userId: userData?.UserID,
          }),
        );
      } else {
        dispatch(
          addToCartListInLocalJewelery({
            jeweleryList: { ...obj, Category: 'HipHop Jewellery' },
          }),
        );
      }
    },
    [dispatch, userData, getParamForApi],
  );

  const addToWatchListJewellery = useCallback(
    async (jewelleryItem, type) => {
      if (type === 'similar') {
        if (jewelleryItem?.Is_Like) {
          if (userData?.UserID) {
            dispatch(
              removeToWatchList({
                StockIDs: jewelleryItem.Stock_ID.toString(),
                CustomerID: userData?.UserID,
              }),
            );
            setIsSelectSimilarProduct(true);
          } else {
            const obj = getParamForApiSimilar(jewelleryItem);
            dispatch(
              removeFromWishListInLocalJewelery({
                jeweleryList: [
                  {
                    ...obj,
                    Category: 'HipHop Jewellery',
                    Amount: obj?.Sale_Rate ? obj.Sale_Rate : 0,
                    Jewellery_Stock_ID: obj?.Stock_ID ? obj.Stock_ID : 0,
                    isOnlyJewellery: true,
                    Is_Like: !obj.Is_Like,
                    Location: jewelleryItem?.Location
                      ? jewelleryItem.Location
                      : '',
                  },
                ],
              }),
            );
            jewelleryItem?.Is_Like && updateRowWatchSimilar(obj, false);
          }
        } else {
          if (userData?.UserID) {
            dispatch(
              addToWatchList({
                StockIDs: jewelleryItem.Stock_ID.toString(),
                CustomerID: userData?.UserID,
              }),
            );
            setIsSelectSimilarProduct(true);
          } else {
            const obj = getParamForApiSimilar(jewelleryItem);
            dispatch(
              addToWatchListInLocalJewelery({
                jeweleryList: {
                  ...obj,
                  Category: 'HipHop Jewellery',
                  Jewellery_Size: jewelleryItem?.Jewellery_Size
                    ? jewelleryItem.Jewellery_Size
                    : '',
                  Sub_Type: jewelleryItem?.Sub_Type
                    ? jewelleryItem.Sub_Type
                    : 0,
                  Total_Stone_Weight: jewelleryItem?.Total_Stone_Weight
                    ? jewelleryItem.Total_Stone_Weight
                    : '',
                  Is_Like: true,
                  Location: jewelleryItem?.Location
                    ? jewelleryItem.Location
                    : '',
                },
              }),
            );
            !jewelleryItem?.Is_Like && updateRowWatchSimilar(obj, true);
          }
        }
      } else {
        const obj = getParamForApi(jewelleryItem);
        if (userData?.UserID) {
          dispatch(
            addToWatchList({
              StockIDs: jewelleryItem?.JewelleryDetail?.Stock_ID
                ? jewelleryItem?.JewelleryDetail?.Stock_ID.toString()
                : '',
              CustomerID: userData?.UserID,
            }),
          );
        } else {
          dispatch(
            addToWatchListInLocalJewelery({
              jeweleryList: {
                ...obj,
                StockStatus: jewelleryItem?.JewelleryDetail?.StockStatus
                  ? jewelleryItem?.JewelleryDetail.StockStatus
                  : '',
                Jewellery_Size: jewelleryItem?.JewelleryDetail?.Jewellery_Size
                  ? jewelleryItem?.JewelleryDetail.Jewellery_Size
                  : '',
                Sub_Type: jewelleryItem?.JewelleryDetail?.Sub_Type
                  ? jewelleryItem?.JewelleryDetail.Sub_Type
                  : 0,
                Total_Stone_Weight: jewelleryItem?.JewelleryDetail
                  ?.Total_Stone_Weight
                  ? jewelleryItem?.JewelleryDetail.Total_Stone_Weight
                  : '',
                Is_Like: true,
              },
            }),
          );
        }
        !jewelleryItem?.Is_Like && updateRowWatch(obj, true);
      }
    },

    [
      userData?.UserID,
      dispatch,
      getParamForApiSimilar,
      updateRowWatchSimilar,
      getParamForApi,
      updateRowWatch,
    ],
  );

  const onClickJewelleryDetail = useCallback(
    stockId => {
      navigate(`/hip-hop-jewellery-detail?stockId=${stockId}`);
    },
    [navigate],
  );

  return (
    <>
      <Col xl={8} lg={7}>
        <Row>
          {jewelleryDetailLoader && <Loader />}

          <Col xl={12}>
            <div className="jewellery_price_wrapper jewellery_detail_right">
              <div className="d-flex justify-content-between border-bottom-color">
                <h6 className="fs_20 text_dark ff_Mulish m-0">
                  {jewelleryDetailData?.JewelleryDetail?.Jewellery_Name
                    ? jewelleryDetailData.JewelleryDetail.Jewellery_Name
                    : ''}{' '}
                  {jewelleryDetailData?.JewelleryDetail?.Metal_PurityColor
                    ? jewelleryDetailData.JewelleryDetail.Metal_PurityColor
                    : ''}{' '}
                  Gold (
                  {jewelleryDetailData?.JewelleryDetail?.Total_Stone_Weight
                    ? `${jewelleryDetailData?.JewelleryDetail.Total_Stone_Weight}ct`
                    : 0}{' '}
                  )
                </h6>
                <div className="jewellery_badge_wrap">
                  <span
                    className={
                      jewelleryDetailData?.JewelleryDetail?.StockStatus ===
                      'AVAILABLE'
                        ? 'available ff_Mulish'
                        : jewelleryDetailData?.JewelleryDetail?.StockStatus ===
                          'ONHOLD'
                        ? ' on_hold ff_Mulish'
                        : jewelleryDetailData?.JewelleryDetail?.StockStatus ===
                          'ONMEMO'
                        ? 'on_memo ff_Mulish'
                        : ''
                    }
                  >
                    {jewelleryDetailData?.JewelleryDetail?.StockStatus
                      ? jewelleryDetailData?.JewelleryDetail?.StockStatus
                      : ''}
                  </span>
                </div>
              </div>
              <div className="jewellery_price d-lg-flex align-items-center mb-md-3 mb-2">
                <h4 className="fw_700 m-0 text_colorC ff_Mulish me-4">
                  $
                  {window.location.pathname === '/hip-hop-jewellery-detail'
                    ? jewelleryDetailData?.JewelleryDetail?.Sale_Rate
                      ? jewelleryDetailData.JewelleryDetail.Sale_Rate?.toFixed(
                          2,
                        )
                      : 0
                    : jewelleryDetailData?.JewelleryDetail?.Setting_Rate
                    ? jewelleryDetailData.JewelleryDetail.Setting_Rate?.toFixed(
                        2,
                      )
                    : 0}
                </h4>
                <ul className="action_button_wrap d-flex flex-wrap align-items-center mt5-lg">
                  <li className="mr10">
                    <Button
                      variant="primary"
                      className="px20 px10-lg btn_shadow"
                      disabled={addToCartJewelleryLoading}
                      onClick={() =>
                        addToCartJewelleryList(jewelleryDetailData)
                      }
                    >
                      <img src={CartIcon} className="white_img" alt="" />
                      Add To Cart
                    </Button>
                  </li>
                  <OverlayTrigger
                    key="wishlist"
                    placement="bottom"
                    overlay={
                      isMobile ? (
                        <></>
                      ) : (
                        <Tooltip id="AddtoWishlist">Add to Wishlist</Tooltip>
                      )
                    }
                  >
                    <li>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="rounded-circle btn_round p0"
                        disabled={addToWatchLoading}
                        onClick={() =>
                          addToWatchListJewellery(jewelleryDetailData)
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
                        className="btn btn-outline-primary rounded-circle btn_round btn-sm p0 "
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
                        className="btn btn-outline-primary rounded-circle btn_round btn-sm p0 "
                      >
                        <img src={PhoneIcon} className="mr0" alt="" />
                      </a>
                    </li>
                  </OverlayTrigger>
                </ul>
              </div>
              <div className="mb20 detail_wrap">
                <h6 className="mb10 ff_Mulish">
                  <img src={Composition} className="mr5" alt="" />
                  Product Details
                </h6>
                <ul>
                  <li className="ff_Mulish">
                    Sku Number :
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Jewellery_No
                        ? jewelleryDetailData.JewelleryDetail.Jewellery_No
                        : ''}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Metal :
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Metal_PurityColor
                        ? jewelleryDetailData.JewelleryDetail.Metal_PurityColor
                        : ''}{' '}
                      Gold
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Category :
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Category
                        ? jewelleryDetailData.JewelleryDetail.Category
                        : ''}
                    </span>
                  </li>
                  {jewelleryDetailData?.JewelleryDetail?.Jewellery_Size && (
                    <li className="ff_Mulish">
                      Size/Length :
                      <span>
                        {jewelleryDetailData.JewelleryDetail.Jewellery_Size}
                      </span>
                    </li>
                  )}
                  <li className="ff_Mulish">
                    Gross Weight :
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.GrossWeight
                        ? `${jewelleryDetailData.JewelleryDetail.GrossWeight}gm`
                        : '-'}{' '}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Metal Weight :
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Total_Metal_Weight
                        ? `${jewelleryDetailData.JewelleryDetail.Total_Metal_Weight}gm`
                        : '-'}{' '}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Total Diamond Weight :
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Total_Stone_Weight
                        ? `${jewelleryDetailData.JewelleryDetail.Total_Stone_Weight}ct`
                        : '-'}{' '}
                    </span>
                  </li>
                  <li className="ff_Mulish">
                    Location :
                    <span>
                      {jewelleryDetailData?.JewelleryDetail?.Location
                        ? jewelleryDetailData.JewelleryDetail.Location
                        : '-'}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mb20 detail_wrap">
                <h6 className="mb10 ff_Mulish">
                  <img src={Composition2} className="mr5" alt="" />
                  Diamond Information
                </h6>
                {jewelleryDetailData?.DiamondDetail?.length > 0 && (
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
                          {jewelleryDetailData?.DiamondDetail?.map(item => {
                            return (
                              <tr className="center_all_td">
                                <td>{item?.Shape ? item.Shape : '-'}</td>
                                <td>{item?.Color ? item.Color : '-'}</td>
                                <td>{item?.Clarity ? item.Clarity : '-'}</td>
                                <td>{item?.Pcs ? item.Pcs : '-'}</td>
                                <td>
                                  {item?.Weight ? `${item.Weight}ct` : '-'}
                                </td>
                                <td>
                                  {item?.Diamond_Type ? item.Diamond_Type : '-'}
                                </td>
                                <td>{item?.Lab ? item.Lab : '-'}</td>
                                <td>
                                  {item?.Lab_Report_No
                                    ? item.Lab_Report_No
                                    : '-'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              <div className="description_wrapper">
                <h5 className="ff_Mulish">Description</h5>
                {jewelleryDetailData?.Descriptions?.map((item, index) => {
                  const unescapedHtmlContent = item?.Description?.replace(
                    /\\n/g,
                    '',
                  ).replace(/\\"/g, '"');
                  const sanitizedHtmlContent = item?.Description
                    ? DOMPurify.sanitize(unescapedHtmlContent)
                    : '';
                  return (
                    item?.Description && (
                      <div
                        key={`description_${index}`}
                        dangerouslySetInnerHTML={{
                          __html: sanitizedHtmlContent,
                        }}
                      />
                    )
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      {hiphopjewellerySimillarProducts?.length > 0 && (
        <div className="pt20 pb10 ">
          <HipHopSimilarJewellery
            addToWatchLoading={addToWatchLoading}
            addToCartJewelleryList={addToCartJewelleryList}
            hiphopjewellerySimillarProducts={hiphopjewellerySimillarProducts}
            onClickJewelleryDetail={onClickJewelleryDetail}
            addToWatchListJewellery={addToWatchListJewellery}
            addToCartJewelleryLoading={addToCartJewelleryLoading}
          />
        </div>
      )}
    </>
  );
};
export default memo(HipHopInfo);
