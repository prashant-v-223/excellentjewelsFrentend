import React, { memo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';
import LikeImage from '../../Assets/Images/heart-red.svg';
import HeartIcon from '../../Assets/Images/heart.svg';
import NoImageAvailable from 'Assets/Images/notfound2.png';
import { Button, Container } from 'react-bootstrap';

const HipHopSimilarJewellery = ({
  addToWatchLoading,
  hiphopjewellerySimillarProducts,
  addToCartJewelleryLoading,
  onClickJewelleryDetail,
  addToCartJewelleryList,
  addToWatchListJewellery,
}) => {
  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);
  return (
    <>
      {hiphopjewellerySimillarProducts.length > 0 && (
        <Container>
          <h3 class="text-center mb40 mb10-md ff_Title text-uppercase">
            Similar <span class="text_colorC">Items</span>
          </h3>
          <Swiper
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              620: {
                slidesPerView: 2,
              },
              920: {
                slidesPerView: 3,
              },
              1081: {
                slidesPerView: 3,
              },
              1399: {
                slidesPerView: 4,
              },
            }}
            className="jewellery_thumn_slider"
          >
            {hiphopjewellerySimillarProducts.map((jewelleryProduct, index) => (
              <SwiperSlide>
                <div
                  key={`jewellery_stock_list_${index}`}
                  className="jewellery_item_col"
                >
                  <div className="jewellery_box_wrapper">
                    <div className="jewellery_img_wrapper">
                      <div
                        className="jewellery_image"
                        onClick={() =>
                          onClickJewelleryDetail(jewelleryProduct.Stock_ID)
                        }
                      >
                        <img
                          src={jewelleryProduct.Img_Video_Url}
                          alt="Jewellery"
                          loading="lazy"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="jewellery_status_inner">
                        <span
                          className={
                            jewelleryProduct.StockStatus === 'AVAILABLE'
                              ? 'available ff_Mulish'
                              : jewelleryProduct.StockStatus === 'ONHOLD'
                              ? ' on_hold ff_Mulish'
                              : jewelleryProduct.StockStatus === 'ONMEMO'
                              ? 'on_memo ff_Mulish'
                              : ''
                          }
                        >
                          {jewelleryProduct.StockStatus === 'AVAILABLE'
                            ? 'A'
                            : jewelleryProduct.StockStatus === 'ONHOLD'
                            ? ' H'
                            : jewelleryProduct.StockStatus === 'ONMEMO'
                            ? 'M'
                            : ''}
                        </span>
                      </div>
                      <div className="wishlist_icon">
                        <Button
                          variant="link"
                          disabled={addToWatchLoading}
                          onClick={() =>
                            addToWatchListJewellery(jewelleryProduct, 'similar')
                          }
                        >
                          <img
                            src={
                              jewelleryProduct.Is_Like ? LikeImage : HeartIcon
                            }
                            alt="like"
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="jewellery_detail_text">
                      <div className="jewellery_title">
                        <h5>
                          <span
                            onClick={() =>
                              onClickJewelleryDetail(jewelleryProduct.Stock_ID)
                            }
                          >
                            {jewelleryProduct.Jewellery_Name}
                            {jewelleryProduct.Metal_PurityColor} Gold(
                            {jewelleryProduct.Total_Metal_Weight
                              ? `${jewelleryProduct.Total_Metal_Weight}ct`
                              : 0}
                            )
                          </span>
                        </h5>
                        {/* {checkBoxTab} */}
                      </div>
                      <div className="jewellery_status_wrap">
                        <div className="row g-2 align-items-center">
                          <div className="button_botttom_wrap">
                            <div className="price ">
                              <h6 className="m-0 ff_Mulish">
                                $
                                {jewelleryProduct?.Sale_Rate
                                  ? jewelleryProduct.Sale_Rate
                                  : jewelleryProduct?.Setting_Rate
                                  ? jewelleryProduct.Setting_Rate
                                  : '0.0'}
                              </h6>
                            </div>
                            <div className="text-end jewellery_btn">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="fs_14"
                                disabled={addToCartJewelleryLoading}
                                onClick={() =>
                                  addToCartJewelleryList(
                                    jewelleryProduct,
                                    'similar',
                                  )
                                }
                              >
                                Add To Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}
    </>
  );
};
export default memo(HipHopSimilarJewellery);
