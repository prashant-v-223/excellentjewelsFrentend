import { memo, useCallback, useMemo, useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import NoImageAvailable from '../Assets/Images/notfound2.png';
import ZoomIcon from '../Assets/Images/zoom-icon.svg';
import { OptimizedImage } from 'utils/performanceUtils';

const ParcelGoodImgSlider = ({
  mixDiamondDetailObj,
  stockDetailDnaLoading,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const sliderData = useMemo(() => {
    let arr = [];
    if (mixDiamondDetailObj?.Image) {
      arr.push({ title: 'image', path: mixDiamondDetailObj?.Image });
    }
    if (mixDiamondDetailObj?.Video) {
      arr.push({
        title: 'video',
        path: mixDiamondDetailObj?.Video,
        imagePath: mixDiamondDetailObj?.Image,
      });
    }
    if (arr?.length === 0) {
      arr.push({
        title: 'image',
        path: mixDiamondDetailObj?.Image,
        notFoundImage: true,
      });
    }
    return arr;
  }, [mixDiamondDetailObj]);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
    event.target.className = 'no_img_diamond_detail';
  }, []);

  const handleImageRightClick = e => {
    e.preventDefault();
  };

  return (
    <div className="diamond_detail_img_wrapper">
      <Swiper
        spaceBetween={0}
        autoHeight={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="diamond_detail_slider"
      >
        {sliderData?.map((item, index) => {
          return (
            <SwiperSlide key={`top_header_img_${index}`}>
              {item.title === 'image' ? (
                <div className="slide_wrapper ">
                  <OverlayTrigger
                    key="wishlist"
                    placement="bottom"
                    overlay={
                      <Tooltip id="AddtoWishlist">View in Fullscreen</Tooltip>
                    }
                  >
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rounded-circle btn_round p0"
                      onClick={() => window.open(item.path, '_blank')}
                    >
                      <img src={ZoomIcon} className="mr0 w-auto" alt="" />
                    </Button>
                  </OverlayTrigger>
                  <img
                    src={item.path}
                    alt={item.title}
                    onError={handleImageError}
                    onDoubleClick={() =>
                      !item?.notFoundImage && window.open(item.path, '_blank')
                    }
                  />
                </div>
              ) : (
                <div
                  className="slide_wrapper iframe_wrapper"
                  onDoubleClick={() => {
                    window.open(`${item.path}&navpanes=0`, '_blank');
                  }}
                >
                  <a
                    href={item.path}
                    target="_blank"
                    className="h-100"
                    rel="noreferrer"
                  >
                    <OverlayTrigger
                      key="wishlist"
                      placement="bottom"
                      overlay={
                        <Tooltip id="AddtoWishlist">View in Fullscreen</Tooltip>
                      }
                    >
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="rounded-circle btn_round p0"
                        onClick={() => window.open(`${item.path}`, '_blank')}
                      >
                        <img src={ZoomIcon} className="mr0 w-auto" alt="" />
                      </Button>
                    </OverlayTrigger>
                    {item.path && (
                      <>
                        <video
                          src={item.path}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls={true}
                          controlsList="nodownload"
                          className="video_wrap"
                          height="100%"
                          width="100%"
                          onContextMenu={handleImageRightClick}
                        >
                          <source src={`${item.path}`} type="video/mp4" />
                        </video>
                      </>
                    )}
                  </a>
                </div>
              )}
            </SwiperSlide>
          );
        })}
        {stockDetailDnaLoading && (
          <div className="skelleton_Wrapper diamond_image">
            <Skeleton height={60} style={{ width: '100%' }} />
          </div>
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="diamond_thumn_slider"
      >
        {sliderData?.map((item, index) => {
          return (
            <SwiperSlide key={`bottom_header_img_${index}`}>
              {item.title === 'image' ? (
                <img
                  src={item.path}
                  alt={item.title}
                  onError={handleImageError}
                />
              ) : item.title === 'video' ? (
                <div className="video_thumnail">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    onError={handleImageError}
                  />
                </div>
              ) : (
                <img
                  src={item.path}
                  alt={item.title}
                  onError={handleImageError}
                />
              )}
            </SwiperSlide>
          );
        })}
        {stockDetailDnaLoading && (
          <div className="skelleton_Wrapper">
            <Skeleton height={100} style={{ width: '80%' }} />
          </div>
        )}
      </Swiper>
    </div>
  );
};
export default memo(ParcelGoodImgSlider);
