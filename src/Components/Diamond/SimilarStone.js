import React, { memo, useCallback } from 'react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import { Button } from 'react-bootstrap';
import LikeImage from '../../Assets/Images/heart-red.svg';
import HeartIcon from '../../Assets/Images/heart.svg';

const SimilarStone = ({
  diamondSimilarProducts,
  addToWatchLoading,
  addToCartDaimondLoading,
  onAddToCartHandler,
  onAddToWishHandler,
  onClickToDiamondDetail,
}) => {
  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  return (
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
      className="recommended_slider_wrap pb80 navigation_center_bottom"
    >
      {diamondSimilarProducts?.map((diamondProduct, index) => (
        <SwiperSlide>
          <div className="product_box" key={`diamond_list_view_${index}`}>
            <div className="product_img">
              <img
                src={
                  diamondProduct.Stone_Img_url
                    ? diamondProduct.Stone_Img_url
                    : NoImageAvailable
                }
                onClick={() =>
                  onClickToDiamondDetail(
                    diamondProduct.Stone_No,
                    diamondProduct.Diamond_Type,
                  )
                }
                onError={handleImageError}
                className={
                  diamondProduct.Stone_Img_url
                    ? 'cursor_pointer'
                    : 'no_img cursor_pointer'
                }
                alt="diamondImg"
                loading="lazy"
              />
              <div className="wishlist_icon">
                <Button
                  variant="link"
                  disabled={addToWatchLoading}
                  onClick={() => onAddToWishHandler(diamondProduct, 'similar')}
                >
                  <img
                    src={diamondProduct.Is_Like ? LikeImage : HeartIcon}
                    alt="like"
                  />
                </Button>
              </div>
              <div className="good_fair_price">
                <span
                  className={
                    diamondProduct.StockStatus === 'AVAILABLE'
                      ? 'available ff_Mulish'
                      : diamondProduct.StockStatus === 'ONHOLD'
                      ? 'on_hold ff_Mulish'
                      : diamondProduct.StockStatus === 'ONMEMO'
                      ? 'on_memo ff_Mulish'
                      : ''
                  }
                >
                  {diamondProduct.StockStatus === 'AVAILABLE'
                    ? 'A'
                    : diamondProduct.StockStatus === 'ONHOLD'
                    ? 'H'
                    : diamondProduct.StockStatus === 'ONMEMO'
                    ? 'M'
                    : ''}
                </span>
              </div>
            </div>
            <div className="product_info">
              <div className="product_title">
                <h6 className="ff_Mulish">
                  <span
                    onClick={() =>
                      onClickToDiamondDetail(
                        diamondProduct.Stone_No,
                        diamondProduct.Diamond_Type,
                      )
                    }
                  >
                    {diamondProduct.Weight
                      ? `${diamondProduct.Weight} carat`
                      : ''}
                    {diamondProduct.Color ? ` - ${diamondProduct.Color}` : ''}
                    {diamondProduct.Clarity
                      ? ` - ${diamondProduct.Clarity}`
                      : ''}
                    {diamondProduct.Cut ? ` ${diamondProduct.Cut} Cut` : ''}
                    {diamondProduct.Shape ? `- ${diamondProduct.Shape}` : ''}
                  </span>
                </h6>
              </div>
              <div className="button_botttom_wrap">
                <div className="price">
                  <h6 className="mb0 ff_Mulish fw-bold text_colorC">
                    ${diamondProduct.Cost_Amt}
                  </h6>
                </div>
                <ul>
                  <li>
                    <div className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        disabled={addToCartDaimondLoading}
                        className="ff_Mulish fs_14"
                        onClick={onAddToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default memo(SimilarStone);
