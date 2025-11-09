import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import NoImageAvailable from '../../Assets/Images/notfound2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { FreeMode, Thumbs } from 'swiper/modules';
import styled from 'styled-components';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
const videoExtensions = ['.mp4', '.webm', '.avi', '.mov', '.mkv'];
import { Pagination } from 'swiper/modules';
import { OptimizedImage } from 'utils/performanceUtils';
const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 15px;
`;

const Image = styled.img.attrs(props => ({
  src: props.source,
}))``;

const Target = styled(Image)`
  position: absolute;
  left: ${props => props.offset.left}px;
  top: ${props => props.offset.top}px;
  opacity: ${props => props.opacity};
`;

const JewelleryImgSlider = ({ jewelleryDetailData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (...props) => {
    if (props?.length > 0) {
      const e = props[0];
      const targetRefValue = props[1];
      const sourceRefValue = props[2];
      const containerRefValue = props[3];
      const targetRect = targetRefValue.current.getBoundingClientRect();
      const sourceRect = sourceRefValue.current.getBoundingClientRect();
      const containerRect = containerRefValue.current.getBoundingClientRect();
      const xRatio =
        (targetRect.width - containerRect.width) / sourceRect.width;
      const yRatio =
        (targetRect.height - containerRect.height) / sourceRect.height;

      const left = Math.max(
        Math.min(e.pageX - sourceRect.left, sourceRect.width),
        0,
      );
      const top = Math.max(
        Math.min(e.pageY - sourceRect.top, sourceRect.height),
        0,
      );

      setOffset({
        left: left * -xRatio,
        top: top * -yRatio,
      });
    }
  };

  const imageSliderData = useMemo(() => {
    let jewelleryDetailDataList =
      jewelleryDetailData?.ImagesAndVideos?.length > 0
        ? [...jewelleryDetailData.ImagesAndVideos]
        : [
            {
              Img_Video_Url: NoImageAvailable,
            },
          ];
    if (jewelleryDetailData?.ImagesAndVideos?.length > 0) {
      const firstImage = jewelleryDetailDataList?.find(item => {
        const extension =
          item?.Img_Video_Url?.split('.').pop().toLowerCase() || '';
        if (imageExtensions.includes(`.${extension}`)) {
          return { ...item };
        }
      });
      jewelleryDetailDataList = jewelleryDetailDataList?.map(item => {
        const extension =
          item?.Img_Video_Url?.split('.').pop().toLowerCase() || '';
        if (videoExtensions.includes(`.${extension}`)) {
          return {
            ...item,
            isVideo: true,
            posterImage: firstImage
              ? firstImage?.Img_Video_Url
              : NoImageAvailable,
          };
        }
        return item;
      });
    }
    return jewelleryDetailDataList;
  }, [jewelleryDetailData]);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);
  const handleImageTargetError = useCallback(event => {
    event.target.src = NoImageAvailable;
    event.target.className = 'no_image';
  }, []);

  const pagination = {
    clickable: true,
  };

  const handleImageRightClick = e => {
    e.preventDefault();
  };

  return (
    <div className="jewellery_detail_img_wrapper">
      <Swiper
        spaceBetween={0}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="jewellery_detail_slider"
      >
        {imageSliderData.map((jewellerySlide, index) => {
          return (
            <SwiperSlide key={`top_slider_${index}`}>
              <ImageSliderJewellery
                onError={handleImageError}
                handleImageTargetError={handleImageTargetError}
                Container={Container}
                index={index}
                offset={offset}
                Target={Target}
                Image={Image}
                opacity={opacity}
                jewellerySlide={jewellerySlide}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleMouseMove={handleMouseMove}
                targetRef={targetRef}
                sourceRef={sourceRef}
                containerRef={containerRef}
                handleImageRightClick={handleImageRightClick}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        // freeMode={true}
        // watchSlidesProgress={true}
        pagination={pagination}
        modules={[FreeMode, Thumbs, Pagination]}
        className="jewellery_thumn_slider"
      >
        {imageSliderData.map((jewellerySlide, subIndex) => {
          return (
            <SwiperSlide key={`bottom_slider_${subIndex}`}>
              <div
                className={
                  jewellerySlide.isVideo
                    ? 'jewellery_thumb_img video_thumnail'
                    : 'jewellery_thumb_img'
                }
              >
                <img
                  src={
                    !jewellerySlide.isVideo
                      ? jewellerySlide.Img_Video_Url
                      : jewellerySlide.posterImage
                  }
                  alt=""
                  onError={handleImageError}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

const ImageSliderJewellery = ({
  index,
  offset,
  Target,
  Image,
  onError,
  opacity,
  Container,
  jewellerySlide,
  handleMouseMove,
  handleMouseEnter,
  handleMouseLeave,
  handleImageTargetError,
  handleImageRightClick,
}) => {
  const targetRef_index = useRef(null);
  const sourceRef_index = useRef(null);
  const containerRef_index = useRef(null);

  const renderRow = useMemo(() => {
    return (
      <Container
        key={`jewellery_img_${index}`}
        className="jewellery_img"
        ref={containerRef_index}
        onMouseEnter={e => jewellerySlide?.Stock_ID && handleMouseEnter(e)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={e =>
          jewellerySlide?.Stock_ID &&
          handleMouseMove(
            e,
            targetRef_index,
            sourceRef_index,
            containerRef_index,
          )
        }
      >
        {jewellerySlide.isVideo ? (
          <>
            <video
              src={jewellerySlide.Img_Video_Url}
              autoPlay
              muted
              loop
              playsInline
              controls={true}
              controlsList="nodownload"
              className="video_wrap"
              ref={sourceRef_index}
              poster={jewellerySlide.posterImage}
              onContextMenu={handleImageRightClick}
            >
              <source
                src={`${jewellerySlide.Img_Video_Url}`}
                type="video/mp4"
              />
            </video>

            <Target
              ref={targetRef_index}
              alt="target"
              opacity={opacity}
              offset={offset}
              source={jewellerySlide.Img_Video_Url}
              className="zoom_image"
            />
          </>
        ) : (
          <>
            <Image
              ref={jewellerySlide?.Stock_ID && sourceRef_index}
              alt="source"
              source={jewellerySlide.Img_Video_Url}
              className="Main_image"
              onError={handleImageTargetError}
            />
            <Target
              ref={jewellerySlide?.Stock_ID && targetRef_index}
              alt="target"
              opacity={opacity}
              offset={offset}
              source={jewellerySlide.Img_Video_Url}
              className="zoom_image"
              onError={onError}
            />
          </>
        )}
      </Container>
    );
  }, [
    index,
    offset,
    onError,
    opacity,
    jewellerySlide,
    handleMouseMove,
    sourceRef_index,
    targetRef_index,
    handleMouseEnter,
    handleMouseLeave,
    containerRef_index,
    handleImageTargetError,
    handleImageRightClick,
  ]);
  return <>{renderRow}</>;
};
export default memo(JewelleryImgSlider);
