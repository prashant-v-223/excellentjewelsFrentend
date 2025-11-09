import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './EnhancedBanner.css'; // Import the CSS file
import { OptimizedImage } from 'utils/performanceUtils';

export const EnhancedBannerSlider = ({ bannerList }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!bannerList || bannerList.length === 0) {
        return null;
    }

    return (
        <section className="banner_wrapper mt_header_height">
            <Swiper
                className="swiper_slider"
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 9000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={bannerList.length > 1}
                modules={[Navigation, Autoplay, EffectFade, Pagination]}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                speed={1000}
            >
                {bannerList.map((item, index) => (
                    <SwiperSlide key={item.Configuration_ID || index}>
                        <div className="banner_slide">
                            {/* Image with Ken Burns effect */}
                            <div className="banner_img">
                                <img
                                    src={item?.Img_Url}
                                    srcSet={item?.Img_Url}
                                    alt={item?.Heading || `Banner ${index + 1}`}
                                    fetchpriority="high"
                                    className="w-100 h-100 object-fit-cover banner-image"
                                />
                            </div>

                            {/* Content with staggered animations */}
                            <div className="banner_content_wrapper">
                                <Container>
                                    <Row>
                                        <Col
                                            xl={6}
                                            lg={7}
                                            sm={8}
                                            xs={9}
                                            className="banner_details"
                                        >
                                            {/* Animated badge/name */}
                                            {item?.Name && (
                                                <div className="banner-badge animate-slide-up">
                                                    <span className="badge-dot"></span>
                                                    {item.Name}
                                                </div>
                                            )}

                                            {/* Animated heading with split text effect */}
                                            {item?.Heading && (
                                                <h1 className="banner-heading animate-slide-up delay-1">
                                                    {item.Heading.split(' ').map((word, i) => (
                                                        <span key={i} className="word" style={{ animationDelay: `${i * 0.1}s` }}>
                                                            {word}{' '}
                                                        </span>
                                                    ))}
                                                </h1>
                                            )}

                                            {/* Animated description */}
                                            {item?.Description && (
                                                <p className="banner-description animate-slide-up delay-2">
                                                    {item.Description}
                                                </p>
                                            )}

                                            {/* Animated button */}
                                            {item?.Button_Link && item?.Button && (
                                                <div className="banner-button-wrapper animate-slide-up delay-3">
                                                    <Link
                                                        to={item.Button_Link}
                                                        className="btn btn-primary banner-cta"
                                                    >
                                                        <span className="btn-text">{item.Button}</span>
                                                        <span className="btn-icon">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </span>
                                                    </Link>

                                                    {/* Decorative elements */}
                                                    <div className="floating-shapes">
                                                        <div className="shape shape-1"></div>
                                                        <div className="shape shape-2"></div>
                                                        <div className="shape shape-3"></div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Scroll indicator */}
                                            <div className="scroll-indicator animate-bounce">
                                                <div className="mouse">
                                                    <div className="wheel"></div>
                                                </div>
                                                <p>Scroll to explore</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                            {/* Decorative geometric shapes */}
                            <div className="geometric-bg">
                                <div className="geo-shape geo-circle"></div>
                                <div className="geo-shape geo-square"></div>
                                <div className="geo-shape geo-triangle"></div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom slide counter */}
            <div className="slide-counter">
                <span className="current">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="divider">/</span>
                <span className="total">{String(bannerList.length).padStart(2, '0')}</span>
            </div>
        </section>
    );
};