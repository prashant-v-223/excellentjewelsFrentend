import { memo, useCallback, useMemo, useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FullScreenIcon from '../../Assets/Images/fullscreen.svg';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import { OptimizedImage } from 'utils/performanceUtils';

const DiamondImgSlider = ({ stockDetailDnaList, stockDetailDnaLoading }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const sliderData = useMemo(() => {
    let arr = [];
    if (stockDetailDnaList?.Stone_Img_url) {
      arr.push({ title: 'image', path: stockDetailDnaList?.Stone_Img_url });
    }
    if (stockDetailDnaList?.Video_url) {
      arr.push({
        title: 'video',
        path: stockDetailDnaList?.Video_url,
        imagePath: stockDetailDnaList?.Stone_Img_url,
      });
    }
    if (stockDetailDnaList?.Certificate_file_url) {
      arr.push({
        title: 'certificate',
        path: stockDetailDnaList?.Certificate_file_url,
        imagePath: stockDetailDnaList?.Stone_Img_url,
      });
    }
    return arr;
  }, [stockDetailDnaList]);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
    event.target.className = 'no_img_diamond_detail';
  }, []);
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
                      <Tooltip id="AddtoWishlist" className="ff_Mulish">
                        View in Fullscreen
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="rounded-circle btn_round p0"
                      onClick={() => window.open(item.path, '_blank')}
                    >
                      <img src={FullScreenIcon} className="mr0 w-auto" alt="" />
                    </Button>
                  </OverlayTrigger>
                  <img
                    src={item.path}
                    alt={item.title}
                    onError={handleImageError}
                    onDoubleClick={() => window.open(item.path, '_blank')}
                  />
                </div>
              ) : (
                <div
                  className={
                    item.title === 'video'
                      ? 'slide_wrapper iframe_wrapper'
                      : 'slide_wrapper iframe_wrapper certificate_iframe'
                  }
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
                        <Tooltip id="AddtoWishlist" className="ff_Muslish">
                          View in Fullscreen
                        </Tooltip>
                      }
                    >
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="rounded-circle btn_round p0"
                        onClick={() =>
                          window.open(`${item.path}&navpanes=0`, '_blank')
                        }
                      >
                        <img
                          src={FullScreenIcon}
                          className="mr0 w-auto"
                          alt=""
                        />
                      </Button>
                    </OverlayTrigger>
                    {item.path && (
                      <>
                        <iframe
                          width="100%"
                          height="100%"
                          // src={`${item.path}&navpanes=0`}
                          src={`${item.path}`}
                          id="myIframe"
                          onError={error => console.log('error', error)}
                          title="video"
                          allow="autoplay"
                          controls={true}
                          controlsList="nodownload"
                          oncontextmenu={false}
                        ></iframe>
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
              ) : item.title === 'certificate' ? (
                <div className="certificate_thumnail">
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
export default memo(DiamondImgSlider);
