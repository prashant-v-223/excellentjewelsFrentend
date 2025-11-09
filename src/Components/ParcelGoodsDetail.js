import { getUrlParam } from 'Helper/CommonHelper';
import { useCallback, useEffect, useState } from 'react';
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
import PhoneIcon from '../Assets/Images/call-expert.svg';
import CartIcon from '../Assets/Images/cart.svg';
import LeftAngel from '../Assets/Images/left-angle.svg';
import WhatsappIcon from '../Assets/Images/whatsapp.svg';
import HeartIcon from '../Assets/Images/wishliat.svg';
import ParcelGoodImgSlider from './ParcelGoodImgSlider';
import {
  addToWatchMixDimaondList,
  getMixDiamondDetailList,
  setMixDiamondStockList,
} from './Redux/reducers/common.slice';
import {
  getCartStockCount,
  getMixDiamondCopyToClipboardString,
} from './Redux/reducers/dashboard.slice';
import {
  addToCartJewellery,
  setIsAddToCartJewellery,
} from './Redux/reducers/jewellery.slice';
import {
  addToCartMixListInLocal,
  addToWishMixListInLocalList,
} from './Redux/reducers/offlineList.slice';
import CustomerReviews from './Common/CustomerReviews';
import { OptimizedImage } from 'utils/performanceUtils';

export default function ParcelGoodsDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(({ auth }) => auth);
  const packetId = getUrlParam(window.location.search, 'packetId');

  const {
    mixDiamondDetailObj,
    mixDiamondStockList = new Map(),
    addToWatchMixLoading,
  } = useSelector(({ common }) => common);
  const { addToCartJewelleryLoading, isAddToCartJewellery } = useSelector(
    ({ jewellery }) => jewellery,
  );

  useEffect(() => {
    if (packetId) {
      dispatch(getMixDiamondDetailList(packetId));
    }
  }, [dispatch, packetId]);

  useEffect(() => {
    if (isAddToCartJewellery && userData?.UserID) {
      dispatch(getCartStockCount({ UserID: userData?.UserID }));
      dispatch(setIsAddToCartJewellery(false));
    }
  }, [dispatch, isAddToCartJewellery, userData]);

  const [whatsAppHref, setWhatsAppHref] = useState('#');

  const handleShareToWhatsApp = useCallback(
    async packetName => {
      const { payload } = await dispatch(
        getMixDiamondCopyToClipboardString({
          PacketName: packetName,
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
    if (mixDiamondDetailObj?.Packet_Name) {
      handleShareToWhatsApp(mixDiamondDetailObj?.Packet_Name);
    }
  }, [mixDiamondDetailObj, handleShareToWhatsApp]);

  const isMobile = window.innerWidth < 991;

  const onAddToCartHandler = useCallback(() => {
    if (mixDiamondDetailObj?.Packet_Id && mixDiamondDetailObj?.Diamond_Type) {
      if (userData?.UserID) {
        dispatch(
          addToCartJewellery({
            packetId: mixDiamondDetailObj.Packet_Id?.toString(),
            userId: userData?.UserID,
          }),
        );
      } else {
        let cartListMixDiamond = {
          Cut: mixDiamondDetailObj?.Cut ? mixDiamondDetailObj.Cut : '',
          Cts: mixDiamondDetailObj?.Cts ? mixDiamondDetailObj.Cts : '',
          Rate: mixDiamondDetailObj?.Running_Price
            ? mixDiamondDetailObj.Running_Price
            : '',
          Size: mixDiamondDetailObj?.Size ? mixDiamondDetailObj.Size : '',
          Image: mixDiamondDetailObj?.Image ? mixDiamondDetailObj.Image : '',
          Shape: mixDiamondDetailObj?.Shape ? mixDiamondDetailObj.Shape : '',
          Color: mixDiamondDetailObj?.Color ? mixDiamondDetailObj.Color : '',
          Quality: mixDiamondDetailObj?.Quality
            ? mixDiamondDetailObj.Quality
            : '',
          Packet_Id: mixDiamondDetailObj.Packet_Id,
          Packet_Name: mixDiamondDetailObj?.Packet_Name
            ? mixDiamondDetailObj.Packet_Name
            : '',
          Diamond_Type: mixDiamondDetailObj.Diamond_Type,
        };
        dispatch(
          addToCartMixListInLocal({
            mixDiamondCartList: [cartListMixDiamond],
            diamondType: mixDiamondDetailObj.Diamond_Type,
          }),
        );
      }
    }
  }, [dispatch, userData, mixDiamondDetailObj]);

  const onAddToWishHandler = useCallback(async () => {
    if (mixDiamondDetailObj?.Packet_Id && mixDiamondDetailObj?.Diamond_Type) {
      if (userData?.UserID) {
        const { payload } = await dispatch(
          addToWatchMixDimaondList({
            userId: userData.UserID,
            packetId: mixDiamondDetailObj.Packet_Id?.toString(),
          }),
        );
        if (payload?.data?.IsSuccess) {
          const newMixDiamondStockList = new Map(mixDiamondStockList);
          let diamondObj = newMixDiamondStockList.get(
            mixDiamondDetailObj.Packet_Id,
          );
          newMixDiamondStockList.set(mixDiamondDetailObj.Packet_Id, {
            ...diamondObj,
            Is_Like: true,
          });
          dispatch(setMixDiamondStockList(newMixDiamondStockList));
        }
      } else {
        dispatch(
          addToWishMixListInLocalList({
            mixDiamondWishList: [{ ...mixDiamondDetailObj, Is_Like: true }],
            diamondType: mixDiamondDetailObj.Diamond_Type,
          }),
        );
        const newMixDiamondStockList = new Map(mixDiamondStockList);
        let diamondObj = newMixDiamondStockList.get(
          mixDiamondDetailObj.Packet_Id,
        );
        newMixDiamondStockList.set(mixDiamondDetailObj.Packet_Id, {
          ...diamondObj,
          Is_Like: true,
        });
        dispatch(setMixDiamondStockList(newMixDiamondStockList));
      }
    }
  }, [dispatch, userData, mixDiamondStockList, mixDiamondDetailObj]);

  return (
    <main>
      <section className="parcel_detail_wrapper pt40 pb10">
        <Container>
          <div className="back_arrow " onClick={() => navigate(-1)}>
            <img src={LeftAngel} alt="LeftAngel" />
            Back to Search
          </div>
          <Row>
            <Col xl={4} lg={6}>
              <div className="diamond_detail_img_wrapper">
                <ParcelGoodImgSlider
                  mixDiamondDetailObj={mixDiamondDetailObj}
                />
              </div>
            </Col>
            <Col xl={8} lg={6}>
              <div className="diamond_detail_contemt_wrap">
                <div className="border-bottom-color">
                  <h6 className="fs_18 mb0 fw_500 ff_Mulish ">
                    {mixDiamondDetailObj?.Cts &&
                      `${mixDiamondDetailObj.Cts}carat`}{' '}
                    {mixDiamondDetailObj?.Packet_Name &&
                      mixDiamondDetailObj.Packet_Name}{' '}
                  </h6>
                </div>
                <div className="d-md-flex align-items-center mb20">
                  <h4 className="fw_700 text_colorC  m-0 ff_Mulish me-4 ">
                    {mixDiamondDetailObj?.Running_Price
                      ? `$${mixDiamondDetailObj.Running_Price}`
                      : '$0'}
                  </h4>
                  <ul className="action_button_wrap d-flex flex-wrap align-items-center">
                    <li>
                      <Button
                        variant="primary"
                        size="sm"
                        className="pl20 pr20 btn_cart"
                        disabled={addToCartJewelleryLoading}
                        onClick={onAddToCartHandler}
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
                          className="rounded-circle btn_round"
                          disabled={addToWatchMixLoading}
                          onClick={onAddToWishHandler}
                        >
                          <img
                            src={HeartIcon}
                            className="mr0 heart_icon"
                            alt=""
                          />
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
                          <Tooltip id="ChatonWhatsapp">
                            Chat on Whatsapp
                          </Tooltip>
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
                    {/*  <OverlayTrigger
                      key="Email"
                      placement="bottom"
                      overlay={
                        !isMobile && (
                          <Tooltip id="ShareOnEmail">Share on email</Tooltip>
                        )
                      }
                    >
                      <li>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="rounded-circle btn_round p0"
                          // onClick={() => {
                          //   if (stoneNo && diamondType) {
                          //     if (userData?.UserID && userData.Login_Name) {
                          //       dispatch(
                          //         sendDiamondDetailMail({
                          //           StoneNumber: stoneNo,
                          //           UserID: userData?.UserID,
                          //           UserName: userData.Login_Name,
                          //           Diamond_Type: diamondType,
                          //         }),
                          //       );
                          //     } else {
                          //       navigate('/login');
                          //     }
                          //   }
                          // }}
                        >
                          <img src={MailIcon} className="mr0" alt="" />
                        </Button>
                      </li>
                    </OverlayTrigger> */}
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
                <div className="stone_detail_wrapper">
                  <h4 className="">Diamond Details</h4>
                  <div className="stone_detail_wrapper_inner">
                    <Row className="g-2">
                      <Col md={6}>
                        <div className="additional_detail_box">
                          <table>
                            <tbody>
                              <tr>
                                <td>Shape</td>
                                <td>
                                  {mixDiamondDetailObj?.Shape
                                    ? `${mixDiamondDetailObj.Shape}`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Size</td>
                                <td>
                                  {mixDiamondDetailObj?.Size
                                    ? `${mixDiamondDetailObj.Size}`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Color</td>
                                <td>
                                  {mixDiamondDetailObj?.Color
                                    ? `${mixDiamondDetailObj.Color}`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Quality</td>
                                <td>
                                  {mixDiamondDetailObj?.Quality
                                    ? `${mixDiamondDetailObj.Quality}`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Weight</td>
                                <td>
                                  {mixDiamondDetailObj?.Cts
                                    ? `${mixDiamondDetailObj.Cts} Cts`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Growth Type</td>
                                <td>
                                  {mixDiamondDetailObj?.CVDHPHT
                                    ? mixDiamondDetailObj.CVDHPHT
                                    : '-'}
                                </td>
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
                                <td>Pcs</td>
                                <td>
                                  {mixDiamondDetailObj?.Pcs
                                    ? `${mixDiamondDetailObj.Pcs}`
                                    : '0'}
                                </td>
                              </tr>
                              <tr>
                                <td>Cut</td>
                                <td>
                                  {mixDiamondDetailObj?.Cut
                                    ? `${mixDiamondDetailObj.Cut}`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Location</td>
                                <td>
                                  {mixDiamondDetailObj?.Location
                                    ? `${mixDiamondDetailObj.Location}`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Diamond Type</td>
                                <td>
                                  {mixDiamondDetailObj?.Diamond_Type
                                    ? `${mixDiamondDetailObj.Diamond_Type}`
                                    : '-'}
                                </td>
                              </tr>
                              <tr>
                                <td>Shade</td>
                                <td>
                                  {mixDiamondDetailObj?.Shade
                                    ? `${mixDiamondDetailObj.Shade}`
                                    : '-'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="description_wrapper">
                  <h5 className="">Description</h5>
                  <p>
                    {mixDiamondDetailObj?.Remark && mixDiamondDetailObj.Remark}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <CustomerReviews />
        </Container>
      </section>
    </main>
  );
}
