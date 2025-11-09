import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import NoImageAvailable from '../Assets/Images/notfound2.png';
import InstaIcon from '../Assets/Images/Home/insta-icon.svg';
import PlayIcon from '../Assets/Images/Home/play-icon.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
// import 'swiper/swiper-bundle.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Modal } from 'react-bootstrap';
import { OptimizedImage } from 'utils/performanceUtils';

const InstagramReelSlider = ({ instagramList, handleImageRightClick }) => {
  const [reelsModal, setReelsModal] = useState(false);
  const [hoverdFrame, setHoverdFrame] = useState('');
  const [selectedFrame, setSelectedFrame] = useState('');

  useEffect(() => {
    window.addEventListener('error', e => {
      if (
        e.message ===
        'ResizeObserver loop completed with undelivered notifications.'
      ) {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div',
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay',
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);

  const initialSlideIndex = instagramList.findIndex(
    item => selectedFrame?.Configuration_ID === item.Configuration_ID,
  );

  return (
    <>
      <div className="jewellery_reels_wreper">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          freeMode={true}
          loop={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 4,
            },
            1442: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          className="reels_slider"
        >
          {instagramList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <InstagramSlider
                  onError={handleImageError}
                  hoverdFrame={hoverdFrame}
                  selectedFrame={selectedFrame}
                  setSelectedFrame={setSelectedFrame}
                  setHoverdFrame={setHoverdFrame}
                  setReelsModal={setReelsModal}
                  index={index}
                  item={item}
                  handleImageRightClick={handleImageRightClick}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <Modal
        show={reelsModal}
        fullscreen={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="reel_modal"
      >
        <Modal.Body className="modal_body position-relative h-100vh">
          <div className="position-absolute close_btn">
            <button
              onClick={() => setReelsModal(false)}
              type="button"
              aria-label="Close"
              className="bg-transparent  border-0 d-flex align-items-center"
            >
              <i className="fa-solid fa-close close-icone text_primary"></i>
            </button>
          </div>

          <Swiper
            className="reel_swiper_slider h-100"
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            simulateTouch={false}
            initialSlide={initialSlideIndex}
          >
            {instagramList.map(item => {
              return (
                <SwiperSlide key={item.Configuration_ID}>
                  <div className="reels_list_wrapper mx-auto h-100 text-center">
                    <div className="reels_video_wrap h-100 position-relative overflow-hidden">
                      <div className="video_reel h-100 w-100">
                        {item?.Img_Url && (
                          <video
                            className="landing-video modal_reel_video h-100 w-100 object-fit-cover"
                            src={item.Img_Url}
                            autoPlay
                            loop
                            data-lpignore="true"
                            controlsList="nodownload"
                            onContextMenu={handleImageRightClick}
                            muted
                            type="video/mp4"
                            controls
                          />
                        )}
                      </div>
                    </div>
                    <div className="reel_header w-100 d-flex justify-content-between align-items-center">
                      <div className="video_title d-flex justify-content-between  align-items-center">
                        <h3 className="reel_heading m-0 ff_Mulish">
                          {item?.Name && item.Name}
                        </h3>
                        <div className="insta_icon d-flex align-items-center">
                          {item?.Button_Link && (
                            <a
                              href={item.Button_Link}
                              target="_blank"
                              className="insta_link h-100 w-100 d-flex"
                              rel="noreferrer"
                            >
                              <img
                                src={InstaIcon}
                                alt="InstaIcon"
                                className="h-100 w-100 object-fit-cover"
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(InstagramReelSlider);

const InstagramSlider = ({
  item,
  onError,
  hoverdFrame,
  setHoverdFrame,
  setSelectedFrame,
  setReelsModal,
  handleImageRightClick,
}) => {
  const sourceRef_index = useRef(null);
  const renderRow = useMemo(() => {
    return (
      <div
        className="jewellery_img"
        onClick={() => {
          if (item?.Configuration_ID) {
            setSelectedFrame(item);
          }
        }}
        onMouseEnter={() => {
          if (item?.Configuration_ID) {
            setHoverdFrame(item.Configuration_ID);
            sourceRef_index.current.play();
          }
        }}
        onMouseLeave={() => {
          if (item?.Configuration_ID) {
            setHoverdFrame();
            sourceRef_index.current.pause();
            sourceRef_index.current.currentTime = 0;
          }
        }}
      >
        {item?.Img_Url && (
          <div className="reels_list_wrapper text-center">
            <div className="insta_icon position-absolute">
              {item?.Button_Link && (
                <a href={item.Button_Link} target="_blank" rel="noreferrer">
                  <img
                    src={InstaIcon}
                    alt="InstaIcon"
                    className="h-100 w-100 object-fit-cover"
                  />
                </a>
              )}
            </div>
            <div
              className="reels_img_wrap position-relative overflow-hidden"
              onClick={() => setReelsModal(true)}
            >
              <video
                ref={sourceRef_index}
                className="landing-video w-100 h-100 object-fit-cover"
                muted
                loop
                playsInline
                type="video/mp4"
                onError={onError}
                controlsList="nodownload"
                onContextMenu={handleImageRightClick}
              >
                <source src={item.Img_Url} type="video/mp4" />
              </video>
              {hoverdFrame !== item.Configuration_ID && (
                <div className="play_icon position-absolute">
                  <img
                    src={PlayIcon}
                    className="h-100 w-100 object-fit-cover"
                    alt="PlayIcon"
                  />
                </div>
              )}

              <div className="position-absolute reel_title">
                <p className="m-0 reel_content ff_Mulish">
                  {item?.Name && item.Name}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }, [
    item,
    onError,
    hoverdFrame,
    setSelectedFrame,
    setHoverdFrame,
    setReelsModal,
    handleImageRightClick,
  ]);

  return <>{renderRow}</>;
};
