import { memo, useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import eventsNotAvailable from '../Assets/Images/stay-tuned.png';
import NoImageAvailable from '../Assets/Images/notfound2.png';

import DOMPurify from 'dompurify';

import {
  getCurrentEventsList,
  getPreviousEventsList,
} from './Redux/reducers/order.slice';
import { OptimizedImage } from 'utils/performanceUtils';

const Events = () => {
  const dispatch = useDispatch();
  const { currentEventsList, previousEventsList } = useSelector(
    ({ order }) => order,
  );
  const [displayEventType, setDisplayEventType] = useState('previous');
  useEffect(() => {
    dispatch(getCurrentEventsList());
    dispatch(getPreviousEventsList());
  }, [dispatch]);

  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
  }, []);
console.log("previousEventsList",previousEventsList);

  return (
    <main>
      <div className="contact_us_wrapper pt80 pt30-lg pb100 pb50-md pb80-lg">
        <Container>
          <h3 className="mb25 text-center ff_Title text-uppercase">Events</h3>
          <div className="tab_design_three mb-4">
            <div className="tab_button">
              <button
                className={
                  displayEventType === 'previous'
                    ? 'tab_inner_btn border-start-0 active'
                    : 'tab_inner_btn border-start-0'
                }
                onClick={() => setDisplayEventType('previous')}
              >
                Past Events
              </button>
              <button
                className={
                  displayEventType === 'current'
                    ? 'tab_inner_btn border-end-0 active'
                    : 'tab_inner_btn border-end-0'
                }
                onClick={() => setDisplayEventType('current')}
              >
                Current / Upcoming
              </button>
            </div>
          </div>
          <div className="event_slider_wrap p-0">
            {((displayEventType === 'current' &&
              currentEventsList?.length === 0) ||
              (displayEventType === 'previous' &&
                previousEventsList?.length === 0)) && (
              <div className="events-not-available text-center">
                <img src={eventsNotAvailable} alt="Events-Not-Available" />
                <h5 className="mt-3 ff_Mulish">
                  While we don't have any upcoming events scheduled at the
                  moment, take a look at some of our memorable past events!"
                </h5>
              </div>
            )}
            <div className="eventSlider_wrapepr">
              {displayEventType === 'current' &&
                currentEventsList?.length > 0 && (
                  <Swiper
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    slidesPerView={1}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    className="eventSlider "
                  >
                    {currentEventsList?.map(item => {
                      const unescapedHtmlContent =
                        item?.Event_Description?.replace(/\\n/g, '').replace(
                          /\\"/g,
                          '"',
                        );
                      const sanitizedHtmlContent =
                        DOMPurify.sanitize(unescapedHtmlContent);

                      return (
                        <SwiperSlide>
                          <div className="event_slider_wrapper">
                            <div className="shape_text text-center mt-4">
                              <h3 className="ff_Mulish">
                                {item?.Event_Name ? item.Event_Name : ''}
                              </h3>
                            </div>
                            <div
                              className="event_img"
                              onDoubleClick={() =>
                                item?.Img_Url &&
                                window.open(item.Img_Url, '_blank')
                              }
                            >
                              <img
                                src={
                                  item?.Img_Url
                                    ? item.Img_Url
                                    : NoImageAvailable
                                }
                                alt="event_iamge"
                                className="w-100 h-100 object-fit-cover"
                                onError={handleImageError}
                              />
                            </div>
                            <div className="shape_text text-center mt-4">
                              <p className="ff_Mulish">
                                {item?.Description}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              {displayEventType === 'previous' &&
                previousEventsList?.length > 0 && (
                  <Swiper
                    navigation={true}
                    loop={true}
                    preventInteractionOnTransition={true}
                    modules={[Navigation, Autoplay]}
                    allowTouchMove={false}
                    slidesPerView={1}
                    className="eventSlider navigation_center_bottom"
                  >
                    {previousEventsList?.map((item, index) => {
                      const unescapedHtmlContent =
                        item?.Event_Description?.replace(/\\n/g, '').replace(
                          /\\"/g,
                          '"',
                        );
                      const sanitizedHtmlContent =
                        DOMPurify.sanitize(unescapedHtmlContent);

                      return (
                        <SwiperSlide key={item.id}>
                          <div className="event_slider_wrapper">
                            <div className="shape_text text-center mt-4">
                              <h3><b>{item?.Heading ? item.Heading : ''}</b></h3>
                            </div>
                            <div
                              className="event_img mb-3"
                              onDoubleClick={() =>
                                item?.Img_Url &&
                                window.open(item?.Img_Url, '_blank')
                              }
                            >
                              <img
                                src={
                                  item?.Img_Url
                                    ? item?.Img_Url
                                    : NoImageAvailable
                                }
                                className="w-100 h-100 object-fit-cover"
                                alt={`main_event_image_${index}`}
                                onError={handleImageError}
                              />
                            </div>
                            <div>
                              <Swiper
                                navigation={false}
                                loop={true}
                                modules={[Navigation, Autoplay]}
                                slidesPerView={3}
                                spaceBetween={30}
                                autoplay={{
                                  delay: 3000,
                                  disableOnInteraction: false,
                                }}
                                className="subImageSlider"
                                breakpoints={{
                                  0: {
                                    slidesPerView: 1,
                                  },
                                  640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                  },
                                  991: {
                                    slidesPerView: 3,
                                  },
                                }}
                              >
                                {item?._EventDetailsList?.map(
                                  (subImage, subIndex) => (
                                    <SwiperSlide key={subImage._id}>
                                      <div
                                        className="sub_slider_img_wrap"
                                        onDoubleClick={() =>
                                          subImage?.Img_Url &&
                                          window.open(
                                            subImage.Img_Url,
                                            '_blank',
                                          )
                                        }
                                      >
                                        <img
                                          src={
                                            subImage?.Img_Url
                                              ? subImage.Img_Url
                                              : NoImageAvailable
                                          }
                                          alt={`event_image_${subIndex}`}
                                          onError={handleImageError}
                                        />
                                      </div>
                                    </SwiperSlide>
                                  ),
                                )}
                              </Swiper>
                            </div>
                            <div className="shape_text mt-4">
                              <p>
                                {item?.Event_Description ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: sanitizedHtmlContent,
                                    }}
                                  />
                                ) : (
                                  ''
                                )}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};
export default memo(Events);
