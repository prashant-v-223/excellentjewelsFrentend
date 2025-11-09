import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import PhoneIcon from '../Assets/Images/call-expert.svg';
import recordsNotFound from '../Assets/Images/records-not-found1.png';
import WhatsappIcon from '../Assets/Images/whatsapp.svg';
import ParcelGoodsTable from './ParcelGoodsTable';
import { showMessage } from './Redux/reducers/common.slice';
import {
  confirmOrder,
  getCartStockCount,
  setIsOrderConfirm,
} from './Redux/reducers/dashboard.slice';
import {
  getJewelleryCartList,
  removeJewelleryFromCart,
  setIsAddToCartJewellery,
  setIsRefreshGetJewelleryCartApi,
  setOnlineJewelleryCartList,
} from './Redux/reducers/jewellery.slice';
import {
  removeFromCartListInLocal,
  removeFromCartListInLocalJewelery,
  removeFromCartMixListInLocal,
} from './Redux/reducers/offlineList.slice';
import {
  getCountryWiseShippingChargeList,
  getGeneralSetting,
} from './Redux/reducers/order.slice';
import ShoppingCartTable from './ShoppingCartTable';
import PayPalModal from '../Components/PayPalModal';
import StripePaymentForm from './StripePaymentForm';
import axios from 'axios';

const ShoppingCart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const [shopPupUp, setShopPupUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shopPopup, setShopPopup] = useState(false);
  const isMobile = window.innerWidth < 991;
  const [whatsAppHref, setWhatsAppHref] = useState('#');
  const [customerRemark, setCustomerRemark] = useState('');
  const { userData } = useSelector(({ auth }) => auth);
  const { cartDiamondList, cartMixDiamondList, jewelleryCartListData } =
    useSelector(({ offlineList }) => offlineList);
  const {
    jewelleryCartList,
    jewelleryDetailLoader,
    isAddToCartJewellery,
    jewelleryCartListDetail,
    addToCartJewelleryLoading,
    isRefreshGetJewelleryCartApi,
  } = useSelector(({ jewellery }) => jewellery);
  const { isOrderConfirm, confirmOrderLoading } = useSelector(
    ({ dashboard }) => dashboard,
  );
  const { countryWiseShippingCharge } = useSelector(({ order }) => order);

  const countryWiseShippingChargeOptions = useMemo(() => {
    const countryList =
      countryWiseShippingCharge?.map(item => {
        return {
          label: item.Country_Name,
          value: item.Country_Id,
        };
      }) || [];

    return countryList;
  }, [countryWiseShippingCharge]);

  const [placeOrderDetail, setPlaceOrderDetail] = useState({});

  const [selectCountry, setSelectCountry] = useState(null);

  const cartDetailObj = useMemo(() => {
    if (userData?.UserID) {
      let settingPriceTotal = 0;
      let diamondPriceTotal = 0;
      let mixDiamondPriceTotal = 0;
      let jewelleryPriceTotal = 0;
      let shippingCharge = 0;
      if (selectCountry) {
        countryWiseShippingCharge?.forEach(element => {
          if (element.Country_Id === selectCountry.value) {
            shippingCharge = Number(element.Charge) || 0;
          }
        });
      }
      const { cartList = [], mixCartList = [] } = jewelleryCartList;
      if (cartList?.length > 0) {
        cartList?.forEach(item => {
          if (item?.Setting_ID) {
            settingPriceTotal += Number(item.Cost_Amt + item.Setting_Rate);
          } else if (item?.Stock_ID) {
            diamondPriceTotal += Number(item.Cost_Amt);
          } else if (item?.Jewellery_Stock_ID) {
            jewelleryPriceTotal += Number(item.Sale_Rate);
          }
        });
      }
      if (mixCartList?.length > 0) {
        mixCartList?.forEach(item => {
          mixDiamondPriceTotal += item.Rate ? Number(item.Rate) : 0;
        });
      }
      return {
        subTotalAmtCostInCart:
          diamondPriceTotal +
          jewelleryPriceTotal +
          settingPriceTotal +
          mixDiamondPriceTotal,
        totalAmtCostInCart:
          diamondPriceTotal +
          jewelleryPriceTotal +
          settingPriceTotal +
          mixDiamondPriceTotal +
          shippingCharge,
        totalItemInCart: [...cartList],
        mixCartList: [...mixCartList],
        diamondPriceTotal,
        shippingCharge,
        jewelleryPriceTotal,
        mixDiamondPriceTotal,
        settingPriceTotal,
        UserID: userData?.UserID,
      };
    } else {
      let settingPriceTotal = 0;
      let diamondPriceTotal = 0;
      let mixDiamondPriceTotal = 0;
      let jewelleryPriceTotal = 0;
      let shippingCharge = 0;
      let naturalDiamondArr =
        cartDiamondList?.naturalDiamond?.length > 0
          ? [...cartDiamondList?.naturalDiamond]
          : [];
      let labGrownDiamondArr =
        cartDiamondList?.labGrownDiamond?.length > 0
          ? [...cartDiamondList?.labGrownDiamond]
          : [];
      let mixNaturalDiamondArr =
        cartMixDiamondList?.naturalDiamond?.length > 0
          ? [...cartMixDiamondList?.naturalDiamond]
          : [];
      let mixLabGrownDiamondArr =
        cartMixDiamondList?.labGrownDiamond?.length > 0
          ? [...cartMixDiamondList?.labGrownDiamond]
          : [];
      [...mixNaturalDiamondArr, ...mixLabGrownDiamondArr]?.forEach(item => {
        mixDiamondPriceTotal += Number(item.Running_Price);
      });
      if (selectCountry) {
        countryWiseShippingCharge?.forEach(element => {
          if (element.Country_Id === selectCountry.value) {
            shippingCharge = Number(element.Charge) || 0;
          }
        });
      }
      let jewelleryArr =
        jewelleryCartListData?.length > 0 ? [...jewelleryCartListData] : [];
      jewelleryArr = jewelleryArr?.map(item => {
        if (item?.Setting_ID) {
          return { ...item };
        }
        return {
          ...item,
          Stone_Img_url: item.Stone_Img_url,
          JWL_Image_URL: item.Img_Video_Url,
          JWL_DM_Shape: item.Shape,
          Gold_Type: item.Metal_PurityColor,
          Jewell_Cart_ID: 1,
          JWL_StockStatus: item.StockStatus,
        };
      });
      naturalDiamondArr = _.map(naturalDiamondArr, o =>
        _.extend({ Diamond_Type: 'NATURAL', Cart_ID: 1 }, o),
      );
      labGrownDiamondArr = _.map(labGrownDiamondArr, o =>
        _.extend({ Diamond_Type: 'LABGROWN', Cart_ID: 1 }, o),
      );
      [...naturalDiamondArr, ...labGrownDiamondArr]?.forEach(item => {
        diamondPriceTotal += Number(item.Cost_Amt);
      });
      jewelleryArr?.forEach(item => {
        if (item?.Setting_ID) {
          settingPriceTotal += Number(item.Amount);
        } else {
          jewelleryPriceTotal += Number(item.Sale_Rate);
        }
      });
      const totalItemCart = [
        ...naturalDiamondArr,
        ...labGrownDiamondArr,
        ...jewelleryArr,
      ];
      return {
        subTotalAmtCostInCart:
          diamondPriceTotal +
          jewelleryPriceTotal +
          settingPriceTotal +
          mixDiamondPriceTotal,
        totalAmtCostInCart:
          diamondPriceTotal +
          jewelleryPriceTotal +
          settingPriceTotal +
          mixDiamondPriceTotal +
          shippingCharge,
        totalItemInCart: totalItemCart,
        shippingCharge,
        mixDiamondPriceTotal,
        mixCartList: [...mixNaturalDiamondArr, ...mixLabGrownDiamondArr],
        jewelleryPriceTotal,
        settingPriceTotal,
        diamondPriceTotal,
      };
    }
  }, [
    userData?.UserID,
    cartDiamondList,
    cartMixDiamondList,
    jewelleryCartList,
    jewelleryCartListData,
    selectCountry,
  ]);

  useEffect(() => {
    if (isRefreshGetJewelleryCartApi && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(getJewelleryCartList(userData.UserID));
    }
    return () => {
      window.location.pathname !== '/diamond-detail' &&
        window.location.pathname !== '/jewellery-detail' &&
        !isRefreshGetJewelleryCartApi &&
        dispatch(setIsRefreshGetJewelleryCartApi(true));
    };
  }, [dispatch, userData, isRefreshGetJewelleryCartApi]);

  useEffect(() => {
    if (isAddToCartJewellery && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(getJewelleryCartList(userData.UserID));
      dispatch(setIsAddToCartJewellery(false));
    }
  }, [dispatch, isAddToCartJewellery, userData]);

  useEffect(() => {
    if (isOrderConfirm && userData?.UserID) {
      setShopPupUp(false);
      setPlaceOrderDetail({});
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(getJewelleryCartList(userData.UserID));
      dispatch(setIsOrderConfirm(false));
    }
  }, [dispatch, isOrderConfirm, userData]);

  const deleteFromCartHandler = useCallback(
    (item, type) => {
      if (userData?.UserID) {
        dispatch(
          removeJewelleryFromCart({
            cartIDs: item.Cart_ID,
            Jewellery_Stock_ID: item?.Jewell_Cart_ID,
            packetCartID: item?.Mix_Cart_ID,
            Type: '',
            UserID: userData?.UserID,
          }),
        );
      } else {
        if (type === 'diamond') {
          dispatch(
            removeFromCartListInLocal({
              diamondCartObj: item,
              diamondType: item?.Diamond_Type,
            }),
          );
        } else if (type === 'mixDiamond') {
          dispatch(
            removeFromCartMixListInLocal({
              mixDiamondCartObj: item,
              diamondType: item?.Diamond_Type,
            }),
          );
        } else {
          dispatch(removeFromCartListInLocalJewelery({ jeweleryObj: item }));
        }
      }
    },
    [dispatch, userData],
  );

  const handleToHidePopUp = useCallback(() => {
    setShopPupUp(false);
  }, []);


  const onClickPlaceOrder = useCallback(async () => {
    try {
      // Step 1: Validate cart has items
      const hasCartItems = cartDetailObj?.totalItemInCart?.length > 0 ||
        cartDetailObj?.mixCartList?.length > 0;

      if (!hasCartItems) {
        dispatch(
          showMessage({
            message: 'Your cart is empty. Please add items before placing an order.',
            varient: 'warning',
          })
        );
        return;
      }

      // Step 2: Check user authentication
      if (!userData?.UserID) {
        dispatch(
          showMessage({
            message: 'Please login to place an order.',
            varient: 'info',
          })
        );
        navigate('/login');
        return;
      }

      // Step 3: Extract cart IDs dynamically
      const diamondId = cartDetailObj.totalItemInCart
        ?.map(item => item.Stock_ID)
        .filter(Boolean) || [];

      const jewelleryId = cartDetailObj.totalItemInCart
        ?.map(item => item.Jewell_Cart_ID)
        .filter(Boolean) || [];

      const mixDiamondId = cartDetailObj.mixCartList
        ?.map(item => item.Mix_Cart_ID)
        .filter(Boolean) || [];

      // Step 4: Validate addresses
      const billingValid = jewelleryCartListDetail?.Billing_AddressLine1 &&
        jewelleryCartListDetail?.Billing_City &&
        jewelleryCartListDetail?.Billing_State &&
        jewelleryCartListDetail?.Billing_Country_ID;

      const shippingValid = jewelleryCartListDetail?.Shipping_AddressLine1 &&
        jewelleryCartListDetail?.Shipping_City &&
        jewelleryCartListDetail?.Shipping_State &&
        (selectCountry?.value || jewelleryCartListDetail?.Shipping_Country_ID);

      // if (!billingValid || !shippingValid) {
      //   dispatch(
      //     showMessage({
      //       message: 'Please provide complete billing and shipping address.',
      //       varient: 'warning',
      //     })
      //   );
      //   return;
      // }

      // Step 5: Build order payload
      const orderPayload = {
        cart: {
          // Cart IDs
          Stone_CartID: diamondId,
          Jewellery_CartID: jewelleryId,
          Packet_CartID: mixDiamondId,

          // Customer Information
          Customer_ID: userData.UserID,
          Customer_Remark: customerRemark || '',
          DeviceType: 'web',

          // Billing Address
          Billing_AddressLine1: jewelleryCartListDetail.Billing_AddressLine1 || 'we',
          Billing_AddressLine2: jewelleryCartListDetail.Billing_AddressLine2 || '22',
          Billing_City: jewelleryCartListDetail.Billing_City || '33',
          Billing_State: jewelleryCartListDetail.Billing_State || '33',
          Billing_Country_ID: jewelleryCartListDetail.Billing_Country_ID || 'ee',
          Billing_Zip_Code: jewelleryCartListDetail.Billing_Zip_Code || '222',

          // Shipping Address
          Shipping_AddressLine1: jewelleryCartListDetail.Shipping_AddressLine1 || 'e33',
          Shipping_AddressLine2: jewelleryCartListDetail.Shipping_AddressLine2 || '221',
          Shipping_City: jewelleryCartListDetail.Shipping_City || '322',
          Shipping_State: jewelleryCartListDetail.Shipping_State || '321',
          Shipping_Country_ID: selectCountry?.value || jewelleryCartListDetail.Shipping_Country_ID || '212',
          Shipping_Zip_Code: jewelleryCartListDetail.Shipping_Zip_Code || '234',

          // Diamond Type
          Diamond_Type: cartDetailObj.totalItemInCart?.[0]?.Diamond_Type || '',

          // Payment Details
          ShippingAmt: parseFloat(cartDetailObj.shippingCharge) || 0,
          PayAmt: parseFloat(cartDetailObj.subTotalAmtCostInCart) || 0,
          FinalAmt: parseFloat(cartDetailObj.totalAmtCostInCart) || 0,
          Tax_Amount: parseFloat(cartDetailObj.taxAmount) || 0,
          Discount_Amount: parseFloat(cartDetailObj.discountAmount) || 0,

          // Payment Information
          Payment_Status: 'pending',
          Payment_Method: 'Credit Card',
          Payment_Trn_ID: `TRN${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        }
      };

      // Step 6: Validate payment amount
      if (orderPayload.cart.FinalAmt <= 0) {
        dispatch(
          showMessage({
            message: 'Invalid order amount. Please check your cart.',
            varient: 'error',
          })
        );
        return;
      }

      // Step 7: Make API call
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://72.61.170.111:8088';
      const response = await axios.post(
        `${API_BASE_URL}/mobile-api/order/api/v1/orders/create`,
        orderPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': userData.token ? `Bearer ${userData.token}` : '',
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      // Step 8: Handle response
      if (response.data.success) {
        dispatch(
          showMessage({
            message: 'Order placed successfully!',
            varient: 'success',
          })
        );

        // Clear cart or navigate to confirmation
        if (response.data.data?.orderId) {
          navigate(`/order-confirmation/${response.data.data.orderId}`);
        } else {
          navigate('/orders');
        }
      } else {
        dispatch(
          showMessage({
            message: response.data.message || 'Order placement failed!',
            varient: 'error',
          })
        );
      }

    } catch (err) {
      console.error('Order API Error:', err);

      // Handle different error types
      let errorMessage = 'Failed to place order. Please try again.';

      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.message ||
          err.response.data?.errors?.join(', ') ||
          `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request made but no response
        errorMessage = 'Network error. Please check your connection.';
      } else if (err.code === 'ECONNABORTED') {
        // Timeout
        errorMessage = 'Request timeout. Please try again.';
      }

      dispatch(
        showMessage({
          message: errorMessage,
          varient: 'error',
        })
      );
    }
  }, [userData, cartDetailObj, customerRemark, selectCountry, jewelleryCartListDetail, navigate, dispatch]);

{
  shopPopup && (
    <PayPalModal
      orderDetail={placeOrderDetail}
      onSuccess={(result) => {
        // After payment is captured
        dispatch(confirmOrder({
          ...placeOrderDetail,
          Payment_Status: 'Success',
          Payment_Method: 'PAYPAL',
          Payment_Trn_ID: result?.id || `PAYPAL_${Date.now()}`,
        }));
        setShopPopup(false);
        dispatch(showMessage({ message: 'Payment Successful!' }));
      }}
      onCancel={() => {
        setShopPopup(false);
        dispatch(showMessage({ message: 'Payment Cancelled.' }));
      }}
      onError={(err) => {
        console.error('PayPal error', err);
        setShopPopup(false);
        dispatch(showMessage({ message: 'Payment Failed. Try again.' }));
      }}
    />
  )
}


const loadingCartDetail = useMemo(() => {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(
      <div className="diamond_cart_box" key={`skeleton_${i}`}>
        <Skeleton height={100} style={{ width: '100%' }} />
      </div>,
    );
  }
  return arr;
}, []);

useEffect(() => {
  dispatch(getCountryWiseShippingChargeList());
  const message = encodeURIComponent('Hello, Team Excellent Jewels');
  const phoneNumber = '+919586971689';
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  setWhatsAppHref(whatsappLink);
}, []);

const onClickToDiamondDetail = useCallback(
  (Stone_No, Diamond_Type) => {
    if (Stone_No && Diamond_Type) {
      navigate(
        `/diamond-detail?stoneNo=${Stone_No}&diamondType=${Diamond_Type}`,
        {
          state: {
            callbackUrl: `${location.pathname}${location.search}`,
          },
        },
      );
    }
    dispatch(setIsRefreshGetJewelleryCartApi(false));
  },
  [dispatch, location, navigate],
);

const onClickToMixDiamondDetail = useCallback(
  Packet_Id => {
    if (Packet_Id) {
      navigate(`/parcel-goods-detail?packetId=${Packet_Id}`);
    }
    dispatch(setIsRefreshGetJewelleryCartApi(false));
  },
  [dispatch, navigate],
);

const onClickToJewelleryDetail = useCallback(
  Jewellery_Stock_ID => {
    if (Jewellery_Stock_ID) {
      navigate(`/jewellery-detail?stockId=${Jewellery_Stock_ID}`);
    }
    dispatch(setIsRefreshGetJewelleryCartApi(false));
  },
  [dispatch, navigate],
);

return (
  <main>
    <section className="cart_wrapper  pt100 pt40-lg pb50 pb80-lg pb30-md">
      <Container>
        <h3 className="mb25 mb0-lg text-center ff_Title">My Cart</h3>
        {(jewelleryDetailLoader ||
          cartDetailObj?.totalItemInCart?.length > 0 ||
          cartDetailObj?.mixCartList?.length > 0) && (
            <Row>
              <Col xxl={6} xl={7}>
                <div className="cart_product_list_wrapper">
                  {jewelleryDetailLoader && loadingCartDetail}
                  {cartDetailObj?.totalItemInCart?.length > 0 && (
                    <div className="diamond_cart_items">
                      {cartDetailObj?.totalItemInCart?.length > 0 && (
                        <ShoppingCartTable
                          cartList={
                            cartDetailObj?.totalItemInCart?.length > 0
                              ? [...cartDetailObj.totalItemInCart]
                              : []
                          }
                          userData={userData}
                          deleteFromCartHandler={deleteFromCartHandler}
                          onClickToDiamondDetail={onClickToDiamondDetail}
                          onClickToJewelleryDetail={onClickToJewelleryDetail}
                          addToCartJewelleryLoading={addToCartJewelleryLoading}
                        />
                      )}
                    </div>
                  )}
                  {cartDetailObj?.mixCartList?.length > 0 && (
                    <>
                      <h6>Parcel Goods</h6>
                      <div className="diamond_cart_items">
                        {cartDetailObj?.mixCartList?.length > 0 && (
                          <ParcelGoodsTable
                            cartList={
                              cartDetailObj?.mixCartList?.length > 0
                                ? [...cartDetailObj.mixCartList]
                                : []
                            }
                            userData={userData}
                            deleteFromCartHandler={deleteFromCartHandler}
                            onClickToMixDiamondDetail={
                              onClickToMixDiamondDetail
                            }
                            addToCartJewelleryLoading={
                              addToCartJewelleryLoading
                            }
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Col>
              <Col xxl={6} xl={5} className="border_left">
                <div className="cart_total_wrapper">
                  {jewelleryDetailLoader && (
                    <div className="diamond_cart_box">
                      <Skeleton height={150} style={{ width: '100%' }} />
                    </div>
                  )}
                  {(cartDetailObj?.totalItemInCart?.length > 0 ||
                    cartDetailObj?.mixCartList?.length > 0) && (
                      <>
                        <div className="subTotal_wrapper bg_light mb25 mb10-md">
                          <div className="subTotal_inner p25 p10-md">
                            <h2 className="h5 ">Product Info</h2>
                            <ul>
                              <li>
                                Diamond :
                                <span>
                                  $
                                  {Number(
                                    cartDetailObj.diamondPriceTotal || 0,
                                  )?.toFixed(2)}
                                </span>
                              </li>
                              <li>
                                Jewellery :
                                <span>
                                  $
                                  {Number(
                                    cartDetailObj.jewelleryPriceTotal || 0,
                                  )?.toFixed(2)}
                                </span>
                              </li>
                              <li>
                                Customize jewellery :
                                <span>
                                  $
                                  {Number(
                                    cartDetailObj.settingPriceTotal || 0,
                                  )?.toFixed(2)}
                                </span>
                              </li>
                              <li>
                                Parcel Goods :
                                <span>
                                  $
                                  {Number(
                                    cartDetailObj.mixDiamondPriceTotal || 0,
                                  )?.toFixed(2)}
                                </span>
                              </li>
                              <hr />
                              <li>
                                Subtotal :
                                <span>
                                  $
                                  {Number(
                                    cartDetailObj.subTotalAmtCostInCart || 0,
                                  )?.toFixed(2)}
                                </span>
                              </li>
                              <li>
                                <div className="d-flex align-items-center">
                                  <span className="mr10">Shipping</span>
                                  <Select
                                    aria-label="Default select example"
                                    className="react_custom_select_Wrapper square ff_Mulish country_select"
                                    value={selectCountry}
                                    options={countryWiseShippingChargeOptions}
                                    styles={{
                                      option: (base, { isSelected }) => {
                                        return {
                                          ...base,
                                          backgroundColor: isSelected
                                            ? '#be8d28'
                                            : '#fff',
                                          ':hover': {
                                            backgroundColor: 'rgb(200, 200, 200)',
                                          },
                                          color: '#000',
                                        };
                                      },
                                    }}
                                    onChange={e => setSelectCountry(e)}
                                    placeholder="Select Country"
                                  />
                                </div>
                                <span>
                                  $
                                  {Number(
                                    cartDetailObj.shippingCharge || 0,
                                  )?.toFixed(2)}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="total_wrapper p25 p10-md">
                            <ul>
                              <li className="fs_16 fw_600 ">
                                Total
                                <span className="fs_22">
                                  $
                                  {Number(
                                    cartDetailObj.totalAmtCostInCart || 0,
                                  )?.toFixed(2)}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-transparent p25 pt0 p10-md">
                          <div className="d-flex w-100 remark_input">
                            <div className="remark_label">Remark</div>
                            <textarea
                              rows="3"
                              placeholder="Enter Here..."
                              name="Message"
                              value={customerRemark}
                              onChange={e => setCustomerRemark(e.target.value)}
                              id="exampleForm.ControlTextarea1"
                              className="form-control remark_textarea"
                            ></textarea>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          className="btn_shadow w-100"
                          onClick={onClickPlaceOrder}
                          disabled={confirmOrderLoading || !selectCountry}
                        >
                          {confirmOrderLoading ? 'Processing...' : 'Place Order'}
                        </Button>
                        <div className="py-3">
                          <h6 className=" mb0 fw_500 ff_Mulish pb-2">
                            ANY QUESTION ?
                          </h6>
                          <ul className="d-flex">
                            <OverlayTrigger
                              key="whatsapp"
                              placement="bottom"
                              overlay={
                                isMobile ? (
                                  <></>
                                ) : (
                                  <Tooltip id="ChatonWhatsapp">
                                    Chat on Whatsapp
                                  </Tooltip>
                                )
                              }
                            >
                              <li className="pe-2">
                                <a
                                  href={whatsAppHref}
                                  className="btn btn-outline-primary rounded-circle btn_round btn-sm p0 "
                                  target={
                                    whatsAppHref === '#' ? '_self' : '_blank'
                                  }
                                  rel="noreferrer"
                                >
                                  <img
                                    src={WhatsappIcon}
                                    className="mr0"
                                    alt=""
                                  />
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
                                  <Tooltip id="callToExpert">
                                    Call to Expert
                                  </Tooltip>
                                )
                              }
                            >
                              <li className="pe-2">
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
                      </>
                    )}
                </div>
              </Col>
            </Row>
          )}
        {!jewelleryDetailLoader &&
          cartDetailObj?.totalItemInCart?.length === 0 &&
          cartDetailObj?.mixCartList?.length === 0 && (
            <div className="empty_cart">
              <div className="d-flex justify-content-center flex-column align-items-center data_not_found">
                <img src={recordsNotFound} alt="Records Not Found" />
                <h4 className="ff_Mulish">Your cart is empty!</h4>
              </div>
            </div>
          )}
      </Container>
    </section>

    {shopPopup && (
      <div className="paypal-modal-wrapper">
        <div className="paypal-modal-backdrop" onClick={() => setShopPopup(false)} />
        <div className="paypal-modal-content">
          <PayPalModal
            orderDetail={placeOrderDetail}
            onSuccess={(result) => {
              // After payment is captured
              dispatch(confirmOrder({
                ...placeOrderDetail,
                Payment_Status: 'Success',
                Payment_Method: 'PAYPAL',
                Payment_Trn_ID: result?.id || '',
              }));
              setShopPopup(false);
              showMessage({ message: 'Payment Successful!' });
            }}
            onCancel={() => {
              setShopPopup(false);
              showMessage({ message: 'Payment Cancelled.' });
            }}
            onError={(err) => {
              console.error('PayPal error', err);
              setShopPopup(false);
              showMessage({ message: 'Payment Failed. Try again.' });
            }}
          />
        </div>
      </div>
    )}
    <Modal
      show={shopPupUp}
      onHide={handleToHidePopUp}
      centered
      className="payment_modal"
    >
      <Modal.Header closeButton>
        <h6 className="ff_Mulish mb-0">Payment</h6>
      </Modal.Header>
      <Modal.Body>
        <StripePaymentForm placeOrderDetail={placeOrderDetail} />
      </Modal.Body>
    </Modal>
  </main>
);
};
export default memo(ShoppingCart);
