import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autoplay, EffectFade, Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import BannerOne from '../Assets/Images/img2.png';
// import BannerTwo from '../Assets/Images/banner2.jpg';
import BannerThree from '../Assets/Images/Home/about-1.png';
import BannerFour from '../Assets/Images/Home/about-2.png';
// import BannerOne from '../Assets/Images/banner-video.mp4';
// import BannerThree from '../Assets/Images/banner3.jpg';
// import BannerFour from '../Assets/Images/banner4.jpg';
// import VideoPoster from '../Assets/Images/video-poster.jpeg';
import AboutVideo from '../Assets/Images/Home/about-video.mp4';
import Diamond1 from '../Assets/Images/diamond-1.png';
import Diamond2 from '../Assets/Images/diamond-2.png';
import Diamond3 from '../Assets/Images/diamond-3.png';
import Diamond4 from '../Assets/Images/diamond-4.png';
import Diamond5 from '../Assets/Images/diamond-5.png';
import Diamond6 from '../Assets/Images/diamond-6.png';
import HipHopJewellery1 from '../Assets/Images/hiphop-jewellery/hiphop-1.png';
import HipHopJewellery2 from '../Assets/Images/hiphop-jewellery/hiphop-2.png';
import HipHopJewellery3 from '../Assets/Images/hiphop-jewellery/hiphop-3.png';
import HipHopJewellery4 from '../Assets/Images/hiphop-jewellery/hiphop-4.png';
import HipHopJewellery5 from '../Assets/Images/hiphop-jewellery/hiphop-5.png';
import HipHopJewellery6 from '../Assets/Images/hiphop-jewellery/hiphop-6.png';
import ArrowDown from '../Assets/Images/accordian-arrow.svg';
import Slider1 from '../Assets/Images/slider-1.png';
import Slider2 from '../Assets/Images/slider-2.png';
import Slider3 from '../Assets/Images/slider-3.png';
// import About1 from '../Assets/Images/about1.jpeg';
import DiamondBtn from '../Assets/Images/diamond-btn.svg';
import WeddingRing from '../Assets/Images/rings-wedding.svg';
// import Pear from '../Assets/Images/Home/shape/pear.png';
// import Round from '../Assets/Images/Home/shape/round.png';
// import Heart from '../Assets/Images/Home/shape/heart.png';
// import Oval from '../Assets/Images/Home/shape/oval.png';
// import Cushion from '../Assets/Images/Home/shape/cushion.png';
// import Princess from '../Assets/Images/Home/shape/princess.png';
// import Emerald from '../Assets/Images/Home/shape/emerald.png';
// import Marquise from '../Assets/Images/Home/shape/marquise.png';
// import Radiant from '../Assets/Images/Home/shape/radient.png';
// import Asscher from '../Assets/Images/Home/shape/asscher.png';
// import Baguette from '../Assets/Images/Home/shape/buggite.png';
// import Hexagonal from '../Assets/Images/Home/shape/hexagon.png';
// import Jewelary1 from '../Assets/Images/jewelary1.jpg';
// import Jewelary2 from '../Assets/Images/jewelary2.jpeg';
import Jewelary3 from '../Assets/Images/jewelary3.jpeg';
// import Jewelary4 from '../Assets/Images/jewelary4.jpeg';
// import Jewelary5 from '../Assets/Images/jewelary5.jpeg';
// import Jewelary6 from '../Assets/Images/jewelary6.jpg';
import {
  default as WhyEcImg4,
  default as WhyEcImg8,
} from '../Assets/Images/icon-2.svg';
import {
  default as WhyEcImg3,
  default as WhyEcImg7,
} from '../Assets/Images/icon-3.svg';
import {
  default as WhyEcImg10,
  default as WhyEcImg2,
  default as WhyEcImg6,
} from '../Assets/Images/icon-4.svg';
import {
  default as WhyEcImg1,
  default as WhyEcImg5,
  default as WhyEcImg9,
} from '../Assets/Images/icon-5.svg';
// import WhyEcImg1 from '../Assets/Images/why-ec-img1.png';
// import WhyEcImg2 from '../Assets/Images/why-ec-img2.png';
// import WhyEcImg3 from '../Assets/Images/why-ec-img3.png';
// import WhyEcImg4 from '../Assets/Images/why-ec-img4.png';
// import WhyEcImg5 from '../Assets/Images/why-ec-img5.png';
// import WhyEcImg6 from '../Assets/Images/why-ec-img6.png';
// import WhyEcImg7 from '../Assets/Images/why-ec-img7.png';
// import WhyEcImg8 from '../Assets/Images/why-ec-img8.png';
// import WhyEcImg9 from '../Assets/Images/why-ec-img9.png';
// import WhyEcImg10 from '../Assets/Images/why-ec-img10.png';
import DiamondProcess1 from '../Assets/Images/icon-1.svg';
import DiamondProcess8 from '../Assets/Images/icon-2.svg';
import DiamondProcess7 from '../Assets/Images/icon-3.svg';
import DiamondProcess6 from '../Assets/Images/icon-4.svg';
import DiamondProcess5 from '../Assets/Images/icon-5.svg';
import DiamondProcess4 from '../Assets/Images/icon-6.svg';
import DiamondProcess3 from '../Assets/Images/icon-7.svg';
import DiamondProcess2 from '../Assets/Images/icon-8.svg';
import DiamondProcess9 from '../Assets/Images/diamond-7.png';
// import JewelaryProcess1 from '../Assets/Images/icon-1.svg';
// import JewelaryProcess2 from '../Assets/Images/icon-2.svg';
// import JewelaryProcess3 from '../Assets/Images/icon-3.svg';
// import JewelaryProcess4 from '../Assets/Images/icon-4.svg';
// import JewelaryProcess5 from '../Assets/Images/icon-5.svg';
// import JewelaryProcess6 from '../Assets/Images/icon-1.svg';
// import JewelaryProcess7 from '../Assets/Images/icon-1.svg';
// import JewelaryProcess8 from '../Assets/Images/icon-1.svg';
// import JewelaryProcess9 from '../Assets/Images/icon-1.svg';
// import JewelaryProcess10 from '../Assets/Images/icon-1.svg';
// import JewelaryProcess11 from '../Assets/Images/icon-1.svg';
// import JewelaryProcess12 from '../Assets/Images/icon-1.svg';
import Diamond from '../Assets/Images/diamond.svg';
import ExcellentDiamondVideo from '../Assets/Images/banner-section.mp4';
import Find from '../Assets/Images/find.svg';
import Globe from '../Assets/Images/globe.svg';
import Money from '../Assets/Images/money.svg';
import VideoBg from '../Assets/Images/video-img.png';
import VideoUrl from '../Assets/Images/video-1.mp4';
import VideoBtn from '../Assets/Images/video-btn.svg';
import {
  default as Charity2,
  default as Charity4,
} from '../Assets/Images/work-1.png';
import {
  default as Charity1,
  default as Charity3,
} from '../Assets/Images/work-2.png';
// import Charity1 from '../Assets/Images/charity1.jpg';
// import Charity2 from '../Assets/Images/charity2.jpg';
// import Charity3 from '../Assets/Images/charity3.jpg';
// import Charity4 from '../Assets/Images/charity4.jpg';
import SVGInject from '@iconfu/svg-inject';
import { Button, Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import AppStore from '../Assets/Images/app-store.png';
import GooglePlay from '../Assets/Images/google-play.png';
import AppSS from '../Assets/Images/mobile-app.png';
import Start from '../Assets/Images/star.svg';
import Christopher from '../Assets/Images/testimonial/Christopher.png';
import ChristopherDiamond from '../Assets/Images/testimonial/ChristopherDiamond.png';
import DavinHasser from '../Assets/Images/testimonial/DavinHasser.png';
import DavinHasserDiamonds from '../Assets/Images/testimonial/DavinHasserDiamonds.png';
import Emily from '../Assets/Images/testimonial/Emily.png';
import EmilyDiamond from '../Assets/Images/testimonial/EmilyDiamond.png';
import jason from '../Assets/Images/testimonial/jason.png';
import JasonDiamond from '../Assets/Images/testimonial/JasonDiamond.png';
import Jessica from '../Assets/Images/testimonial/Jessica.png';
import JessicaJewellery from '../Assets/Images/testimonial/JessicaJewellery.png';
import JohnRogers from '../Assets/Images/testimonial/JohnRogers.png';
import JohnRogersRings from '../Assets/Images/testimonial/JohnRogersRings.png';
import Natalia from '../Assets/Images/testimonial/Natalia.png';
import NataliaJ from '../Assets/Images/testimonial/NataliaJ.png';
import Riyana from '../Assets/Images/testimonial/Riyana.png';
import RiyanaRing from '../Assets/Images/testimonial/RiyanaRing.png';
import SimonHong from '../Assets/Images/testimonial/SimonHong.png';
import SimonHongJewellery from '../Assets/Images/testimonial/SimonHongJewellery.png';
import Sophia from '../Assets/Images/testimonial/Sophia.png';
import SophiaEarrings from '../Assets/Images/testimonial/SophiaEarrings.png';
import Stewart from '../Assets/Images/testimonial/Stewart.png';
import StewartRing from '../Assets/Images/testimonial/StewartRing.png';
import StuartParodi from '../Assets/Images/testimonial/StuartParodi.png';
import StuartParodiJewellery from '../Assets/Images/testimonial/StuartParodiJewellery.png';
import Unaiza from '../Assets/Images/testimonial/Unaiza.png';
import UnaizaEarrings from '../Assets/Images/testimonial/UnaizaEarrings.png';
import QuickSearchDiamond from './QuickSearchDiamond';
import {
  setIsModifySearchForJewellery,
  setJewelleryFilterDetailByHeader,
} from './Redux/reducers/jewellery.slice';
import {
  getWebConfigurationTypeDetail,
  setBannerList,
  setGetDynamicDataLoader,
  setInstagramList,
  setSubBannerList,
} from './Redux/reducers/common.slice';
import Loader from './Global/Loader';
import InstagramReelSlider from './InstagramReelSlider';
import BannerSlider, { EnhancedBannerSlider } from './BannerSlider';
import { OptimizedImage } from 'utils/performanceUtils';

const DescriptionToggle = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Calculate the number of characters to show for the preview
  const previewLength = 60; // Adjust this to fit the 2-line preview
  const isLongDescription = description.length > previewLength;
  const preview =
    description.slice(0, previewLength) + (isLongDescription ? '...' : '');

  return (
    <div>
      <p
        className={
          isExpanded || !isLongDescription ? 'description' : 'description'
        }
      >
        {isExpanded || !isLongDescription ? description : preview}
        {isLongDescription && (
          <button
            className="bg-transparent border-0 text_primary ps-1"
            onClick={handleToggle}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
    </div>
  );
};

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getDynamicDataLoader, instagramList, bannerList, subBannerList } =
    useSelector(({ common }) => common);

  const { diamondFilterDetail, webConfigurationType } = useSelector(
    ({ common }) => common,
  );
  const { jewelleryCategoryDetail } = useSelector(({ jewellery }) => jewellery);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [minimize, setMinimize] = useState(true);

  const getWebConfigurationTypeData = useCallback(
    async webConfigurationData => {
      const bannerConfigId = webConfigurationData.find(
        item =>
          item?.Type_Code?.trim()?.toLowerCase() &&
          item?.Type_Code?.trim()?.toLowerCase() === 'banner',
      )?.Type_ID;

      if (bannerConfigId) {
        const { payload: bannerList } = await dispatch(
          getWebConfigurationTypeDetail(bannerConfigId),
        );

        if (bannerList?.data?.length > 0) {
          dispatch(setBannerList(bannerList.data));
        }
      }
      const subBannerConfigId = webConfigurationData.find(
        item =>
          item?.Type_Code?.trim()?.toLowerCase() &&
          item?.Type_Code?.trim()?.toLowerCase() === 'subbanner',
      )?.Type_ID;

      if (subBannerConfigId) {
        const { payload: subBannerList } = await dispatch(
          getWebConfigurationTypeDetail(subBannerConfigId),
        );

        if (subBannerList?.data?.length > 0) {
          dispatch(setSubBannerList(subBannerList.data));
        }
      }

      const instagramConfigId = webConfigurationData.find(
        item =>
          item?.Type_Code?.trim()?.toLowerCase() &&
          item?.Type_Code?.trim()?.toLowerCase() === 'instagram',
      )?.Type_ID;

      if (instagramConfigId) {
        const { payload: instagramPost } = await dispatch(
          getWebConfigurationTypeDetail(instagramConfigId),
        );

        if (instagramPost?.data?.length > 0) {
          dispatch(setInstagramList(instagramPost.data));
        }
      }

      dispatch(setGetDynamicDataLoader(false));
    },
    [dispatch],
  );

  useEffect(() => {
    if (getDynamicDataLoader && webConfigurationType?.length > 0) {
      getWebConfigurationTypeData(webConfigurationType);
    }
  }, [
    dispatch,
    webConfigurationType,
    getWebConfigurationTypeData,
    getDynamicDataLoader,
  ]);

  useEffect(() => {
    SVGInject(document.querySelectorAll('img.injectable'));
  }, []);

  const onSelectCategorySearch = useCallback(
    (type, jewelleryType) => {
      if (jewelleryCategoryDetail?.length > 0) {
        const jewelleryCategoryData = [...jewelleryCategoryDetail] || [];
        const isAvailableCategory = jewelleryCategoryData?.find(
          item => item?.MasterTypeValue?.toLowerCase() === type.toLowerCase(),
        );
        if (isAvailableCategory) {
          dispatch(
            setJewelleryFilterDetailByHeader({
              type: isAvailableCategory.MasterTypeValue_Code,
              subType: [],
            }),
          );
          dispatch(setIsModifySearchForJewellery(true));
          navigate(
            jewelleryType === 'fineJewellery'
              ? '/jewellery'
              : '/hip-hop-jewellery',
          );
        }
      }
    },
    [dispatch, navigate, jewelleryCategoryDetail],
  );

  // Testimonal
  const testimonials = [
    {
      user: 'Christopher',
      date: '6 days ago',
      userImg: Christopher,
      testimonialImg: ChristopherDiamond,
      rating: 5,
      comment: 'Got best deal, really excellent, trusted company',
    },
    {
      user: 'Davin Hasser',
      date: '6 days ago',
      userImg: DavinHasser,
      testimonialImg: DavinHasserDiamonds,
      rating: 5,
      comment:
        'My search for Best quality certified diamond ended here, thanks for your help',
    },
    {
      user: 'Emily',
      date: '6 days ago',
      userImg: Emily,
      testimonialImg: EmilyDiamond,
      rating: 5,
      comment:
        'I just received my beautiful diamond. It is very beautiful and very well packaged! I must say I’m very impressed with how fast the delivery was and the wonderful customer service. I’ll definitely buy from you from now on! Thank you',
    },
    {
      user: 'Jason',
      date: '6 days ago',
      userImg: jason,
      testimonialImg: JasonDiamond,
      rating: 5,
      comment:
        'Diamond I have purchased from you is really beautiful, thank you',
    },
    {
      user: 'Jessica',
      date: '6 days ago',
      userImg: Jessica,
      testimonialImg: JessicaJewellery,
      rating: 5,
      comment:
        'Thanks for timely delivery of my diamond necklace, you made my wedding more beautiful and special, amazing company',
    },
    {
      user: 'John Rogers',
      date: '6 days ago',
      userImg: JohnRogers,
      testimonialImg: JohnRogersRings,
      rating: 5,
      comment: 'Best certified diamond supplier I have ever found, blessed!',
    },
    {
      user: 'Natalia',
      date: '6 days ago',
      userImg: Natalia,
      testimonialImg: NataliaJ,
      rating: 5,
      comment:
        'They are helpful, honest and communication throughout the entire buying process. I will definitely be a return customer. Thank you',
    },
    {
      user: 'Riyana',
      date: '6 days ago',
      userImg: Riyana,
      testimonialImg: RiyanaRing,
      rating: 5,
      comment:
        'Ring you made for me really mesmerized me when I got it, excellent quality',
    },
    {
      user: 'Simon Hong',
      date: '6 days ago',
      userImg: SimonHong,
      testimonialImg: SimonHongJewellery,
      rating: 5,
      comment: 'Pleasure to do business with you guys',
    },
    {
      user: 'Sophia',
      date: '6 days ago',
      userImg: Sophia,
      testimonialImg: SophiaEarrings,
      rating: 5,
      comment:
        'They are so honest about everything, they made my jewellery so beautifully, many repeat orders on the way',
    },
    {
      user: 'Stewart',
      date: '6 days ago',
      userImg: Stewart,
      testimonialImg: StewartRing,
      rating: 5,
      comment: 'I like your lab grown diamond',
    },
    {
      user: 'Stuart Parodi',
      date: '6 days ago',
      userImg: StuartParodi,
      testimonialImg: StuartParodiJewellery,
      rating: 5,
      comment: 'Delivered so fast, thank you',
    },
    {
      user: 'Unaiza',
      date: '6 days ago',
      userImg: Unaiza,
      testimonialImg: UnaizaEarrings,
      rating: 5,
      comment:
        'Thanks for making beautiful earrings under my budget, would like to do business with you in future',
    },
  ];

  const handleImageRightClick = e => {
    e.preventDefault();
  };

  return (
    <main>
      {getDynamicDataLoader && <Loader />}
      <EnhancedBannerSlider bannerList={bannerList}/>
      <section className="home_two_wrapper pt80 pb60 pt40-md pb40-md pt25-xs pb0-xs">
        <Container>
          <Row className="align-items-center">
            <Col lg={subBannerList === subBannerList.lenght > 1 ? 7 : 6}>
              <div
                className={
                  subBannerList === subBannerList.lenght > 1
                    ? 'home_two_img'
                    : 'home_two_img justify-content-center'
                }
              >
                {subBannerList?.map((item,i) => {
                  return (
                    <>
                      <Col xs={6} key={i}>
                        <div className="about_img">
                          <img src={item?.Img_Url} alt="" loading="lazy" />
                        </div>
                      </Col>
                    </>
                  );
                })}
              </div>
            </Col>
            <Col lg={5}>
              <div className="home_two_text">
                <h2 className="mb35 ff_Title text-uppercase pr30 pr0-lg">
                  <span className="text_colorC">One stop solution</span> for all
                  your lab grown diamonds needs
                </h2>
                <div className="button_group diamond_button_group d-flex">
                  <Dropdown className="buy_jewellery_wrap">
                    <Dropdown.Toggle
                      className="small_padding mr5 border-btn dropdown--btn"
                      id="dropdown-basic"
                    >
                      <img src={DiamondBtn} alt="" loading="lazy" />
                      Buy Diamond
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="buy_jewellery_dropdown">
                      <Link to="/diamond" className="dropdown-item">
                        Certified Diamond
                      </Link>
                      <Link to="/parcel-goods" className="dropdown-item">
                        Parcel Goods
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="buy_jewellery_wrap">
                    <Dropdown.Toggle
                      className="btn border-btn small_padding mr5 dropdown--btn"
                      id="dropdown-basic"
                    >
                      <img src={WeddingRing} alt="" loading="lazy" />
                      Buy Jewellery
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="buy_jewellery_dropdown">
                      <Link to="/jewellery" className="dropdown-item">
                        Fine Jewellery
                      </Link>
                      <Link to="/hip-hop-jewellery" className="dropdown-item">
                        Hip Hop Jewellery
                      </Link>
                      <Link
                        to="/setting-jewellery-wise"
                        className="dropdown-item"
                      >
                        Buy Custom Jewellery
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="buy_jewellery_wrap">
                    <Dropdown.Toggle
                      className="btn small_padding mr5 dropdown--btn border-btn"
                      // variant="outline-primary"
                      id="dropdown-basic"
                    >
                      Share Demand
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="buy_jewellery_dropdown">
                      <Link
                        to="/share-demand?type=certifiedDiamond"
                        className="dropdown-item"
                      >
                        Certified Diamond
                      </Link>
                      <Link
                        to="/share-demand?type=parcelGoods"
                        className="dropdown-item"
                      >
                        Parcel Goods
                      </Link>
                      <Link
                        to="/share-demand?type=customiseJewellery"
                        className="dropdown-item"
                      >
                        Customise Jewellery
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="quick_search_diamond ">
        <Container>
          <div className="text-center">
            <h6 className="text-uppercase ff_Title">Quick search diamond</h6>
            <button
              type="button"
              className="btn-primary btn btn-primary btn-sm"
              onClick={() => setMinimize(!minimize)}
            >
              {!minimize
                ? 'Minimize Diamond Filter'
                : 'Maximise Diamond Filter'}
              <img
                src={ArrowDown}
                alt=""
                className={`filter-arrow ${!minimize ? 'arrow-reverse' : ''}`}
              />
            </button>
          </div>
          {!minimize && (
            <div className=" mt30 mt15-md">
              <div className="quick_search_box">
                <QuickSearchDiamond diamondFilterDetail={diamondFilterDetail} />
              </div>
            </div>
          )}
        </Container>
      </section>
      <section className="buy_diamond_jewelary">
        <Container>
          <h3 className="mb30 mb25-xl mb15-sm text-uppercase ff_Title">
            Buy <span className="text_colorC">Fine</span> Jewellery
          </h3>
          <div className="buy_jewellery_slider_wrapper">
            <Swiper
              navigation={true}
              modules={[Grid, Navigation]}
              slidesPerView={4}
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                  grid: {
                    rows: 2,
                  },
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  grid: {
                    rows: 1,
                  },
                },
                991: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                  grid: {
                    rows: 1,
                  },
                },
              }}
              className="buy_jewellery_slider"
            >
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() =>
                      onSelectCategorySearch('ring', 'fineJewellery')
                    }
                  >
                    <img
                      src={Diamond1}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span
                    onClick={() =>
                      onSelectCategorySearch('ring', 'fineJewellery')
                    }
                  >
                    Ring
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() =>
                      onSelectCategorySearch('necklace', 'fineJewellery')
                    }
                  >
                    <img
                      src={Diamond4}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span
                    onClick={() =>
                      onSelectCategorySearch('necklace', 'fineJewellery')
                    }
                  >
                    Necklace
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() =>
                      onSelectCategorySearch('earrings', 'fineJewellery')
                    }
                  >
                    <img
                      src={Diamond2}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span
                    onClick={() =>
                      onSelectCategorySearch('earrings', 'fineJewellery')
                    }
                  >
                    Earrings
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() =>
                      onSelectCategorySearch('bracelet', 'fineJewellery')
                    }
                  >
                    <img
                      src={Diamond3}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span
                    onClick={() =>
                      onSelectCategorySearch('bracelet', 'fineJewellery')
                    }
                  >
                    Bracelet
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() =>
                      onSelectCategorySearch('pendant', 'fineJewellery')
                    }
                  >
                    <img
                      src={Diamond5}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span
                    onClick={() =>
                      onSelectCategorySearch('pendant', 'fineJewellery')
                    }
                  >
                    Pendant
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() =>
                      onSelectCategorySearch('bands', 'fineJewellery')
                    }
                  >
                    <img
                      src={Diamond6}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span
                    onClick={() =>
                      onSelectCategorySearch('bands', 'fineJewellery')
                    }
                  >
                    Bands
                  </span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Container>
      </section>
      {/* Hip Hop Jewellery */}
      <section className="hip_hop_jewelary pt-md-0">
        <Container>
          <h3 className="mb30 mb25-xl mb15-sm text-uppercase ff_Title">
            Buy <span className="text_colorC">Hip Hop</span> Jewellery
          </h3>
          <div className="hip_hop_jewellery_slider_wrapper">
            <Swiper
              navigation={true}
              modules={[Grid, Navigation]}
              slidesPerView={4}
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                  grid: {
                    rows: 2,
                  },
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  grid: {
                    rows: 1,
                  },
                },
                991: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                  grid: {
                    rows: 1,
                  },
                },
              }}
              className="hip_hop_slider"
            >
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() => onSelectCategorySearch('chain')}
                  >
                    <img
                      src={HipHopJewellery1}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span onClick={() => onSelectCategorySearch('chain')}>
                    Chain
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() => onSelectCategorySearch('bracelet')}
                  >
                    <img
                      src={HipHopJewellery2}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span onClick={() => onSelectCategorySearch('bracelet')}>
                    Bracelet
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() => onSelectCategorySearch('ring')}
                  >
                    <img
                      src={HipHopJewellery3}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span onClick={() => onSelectCategorySearch('ring')}>
                    Ring
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() => onSelectCategorySearch('pendant')}
                  >
                    <img
                      src={HipHopJewellery4}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span onClick={() => onSelectCategorySearch('pendant')}>
                    Pendant
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() => onSelectCategorySearch('earrings')}
                  >
                    <img
                      src={HipHopJewellery5}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span onClick={() => onSelectCategorySearch('earrings')}>
                    Earrings
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="jewellery_category_wrapper text-center">
                  <div
                    className="jewellery_cat_img_wrap"
                    onClick={() => onSelectCategorySearch('watches')}
                  >
                    <img
                      src={HipHopJewellery6}
                      alt=""
                      loading="lazy"
                      className="object-fit-cover"
                    />
                  </div>
                  <span onClick={() => onSelectCategorySearch('watches')}>
                    Watches
                  </span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Container>
      </section>
      {/* Reels Section */}
      <section className="reels_section_wrapper">
        <Container>
          <h3 className="mb30 mb25-xl mb15-sm text-uppercase ff_Title">
            <span className="text_colorC">Reels</span>
          </h3>
          {/* Reels Swiper */}
          <div className="reels_slider_wrapper">
            <InstagramReelSlider
              instagramList={instagramList}
              handleImageRightClick={handleImageRightClick}
            />
          </div>
        </Container>
      </section>
      <section className="why_choose_us pt80 pt50-xl pt20-lg mt0 mt20-lg pb0-sm pb30-xs">
        <Container>
          <h3 className="mb30 mb25-xl mb15-sm ff_Title text-uppercase">
            Why Choose{' '}
            <span className="text_colorC">
              EXCELLENT JEWELS PRIVATE LIMITED?
            </span>
          </h3>
          <div className="why_choose_slider_wrapper">
            <Swiper
              navigation={true}
              modules={[Grid, Navigation]}
              slidesPerView={4}
              spaceBetween={15}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                  grid: {
                    rows: 2,
                  },
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  grid: {
                    rows: 1,
                  },
                },
                991: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                  grid: {
                    rows: 1,
                  },
                },
              }}
              className="why_choose_slider pb100 pb50-lg pb20-md"
            >
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg1}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb15-xl ">Extensive Inventory</h4>
                  </div>
                  <ul>
                    <li>9,00,000+ IGI and GIA certified Lab Grown Diamonds.</li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide most_trusted">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg2}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb15-xl ">Exceptional Quality</h4>
                  </div>
                  <ul>
                    <li>
                      Committed to delivering diamonds of unparalleled quality.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg3}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb15-xl ">Competitive Pricing</h4>
                  </div>
                  <ul>
                    <li>
                      Offering competitive prices to ensure value for our
                      clients.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg4}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb15-xl ">Fast Delivery Gloabally</h4>
                  </div>
                  <ul>
                    <li>Ensuring fast and efficient delivery services.</li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg5}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb15-xl ">Excellent Customer Support</h4>
                  </div>
                  <ul>
                    <li>
                      Providing dedicated and exceptional customer service.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg6}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb30 mb15-xl">Expert Team</h4>
                  </div>
                  <ul>
                    <li>
                      A highly skilled team of experts across all departments.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg7}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb30 mb15-xl">Diamond Growing Lab</h4>
                  </div>
                  <ul>
                    <li>
                      Boasting our own CVD Type 2A growing/manufacturing unit
                      and a cutting-edge R&D center.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg8}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb30 mb15-xl">Multiple Payment Methods </h4>
                  </div>
                  <ul>
                    <li>Offering flexibility with various payment options.</li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg9}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb30 mb15-xl">Global Stock</h4>
                  </div>
                  <ul>
                    <li>
                      Maintaining stock in Hong Kong, India, Thailand, USA and
                      More.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="why_choose_slide">
                  <div className="text-center">
                    <img
                      className="mb20"
                      src={WhyEcImg10}
                      alt=""
                      loading="lazy"
                    />
                    <h4 className="mb30 mb15-xl">
                      Customization Possibilities
                    </h4>
                  </div>
                  <ul>
                    <li>
                      Offering tailored options for both diamonds and jewelry.
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Container>
      </section>
      <section className="about_video_Wrapper">
        <Container>
          <Row className="justify-content-between">
            <Col xl={5} lg={6}>
              <div className="about_text_wrapper pr30 p0-lg">
                <h3 className="mb20 mb10-lg ff_Title text-uppercase">
                  All About
                  <span className="text_colorC">
                    {' '}
                    EXCELLENT JEWELS PRIVATE LIMITED
                  </span>
                </h3>
                <div className="description">
                  <h6 className="fw-semibold ff_Mulish">
                    Crafting Brilliance, Shaping Dreams
                  </h6>
                  <p className="mb15 mb10-lg fs_16 ">
                    Immerse yourself in our narrative—where precision meets
                    passion with Perfection and Excellency. Experience the
                    essence of our journey, from exquisite diamonds to timeless
                    jewelry.
                  </p>
                  <h6 className="fw-semibold ff_Mulish">
                    Our profile video unveils the heart of our craftsmanship,
                  </h6>
                  <p className="mb15 mb10-lg fs_16 ">
                    Inviting you into a world where every creation tells a story
                    of brilliance, innovation, and elegance, Check it now and
                    know more about us,
                  </p>
                </div>
                <Button
                  className="btn-primary text-uppercase"
                  size="sm"
                  onClick={() => navigate('/about-us')}
                >
                  Know More
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="video_img">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/jITIXYquex8?si=kWIWVUdKzAZWsCNF"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                {/*  <video
                  loop=""
                  autoplay=""
                  playsinline=""
                  width="100%"
                  height="500"
                >
                  <source src={AboutVideo} type="video/mp4" />
                </video> */}
                {/* <img src={VideoBg} alt="" loading="lazy" /> */}
                {/*  <Button variant="link" onClick={handleShow}>
                  <img src={VideoBtn} alt="" loading="lazy" />
                </Button> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="diamond_process bg-colorF pt70 pt50-xl pt20-lg">
        <Container>
          <h3 className="mb30 mb25-xl mb15-sm ff_Title text-uppercase">
            Diamond <span className="text_colorC">Buying</span> process
          </h3>
          <div className="diamond_process_wrapper">
            <Swiper
              navigation={true}
              modules={[Grid, Navigation]}
              slidesPerView={4}
              spaceBetween={15}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                  grid: {
                    rows: 2,
                  },
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  grid: {
                    rows: 1,
                  },
                },
                991: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                  grid: {
                    rows: 1,
                  },
                },
              }}
              className="diamond_process_slider  pb70 pb50-lg pb20-md"
            >
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">1</div>
                  <div className="process_img">
                    <img
                      className="mb20"
                      src={DiamondProcess1}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div className="process_text text-center">
                    <h3>Filter Diamond</h3>
                    <p>
                      Explore our extensive inventory with over 10,000 diamonds
                      and effortlessly filter the perfect stone to meet your
                      preferences
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">2</div>
                  <div className="process_img">
                    <img src={DiamondProcess2} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>Select Diamond</h3>
                    <p>
                      Finalize the perfect diamond that meets your criteria and
                      captures your desired brilliance.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">3</div>
                  <div className="process_img">
                    <img src={DiamondProcess3} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>Add To Cart</h3>
                    <p>
                      Seamlessly add your selected diamonds to the cart for a
                      straightforward ordering process.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">4</div>
                  <div className="process_img">
                    <img src={DiamondProcess4} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Confirm Availability</h3>
                    <p>
                      Our team ensures the availability of your chosen diamonds,
                      confirming a smooth order process.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">5</div>
                  <div className="process_img">
                    <img src={DiamondProcess5} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Accept Order</h3>
                    <p>
                      Your order is warmly accepted, marking the beginning of
                      our meticulous manufacturing process.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">6</div>
                  <div className="process_img">
                    <img src={DiamondProcess6} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>You Get Invoice</h3>
                    <p>
                      Receive a detailed invoice for your selected diamonds,
                      simplifying the payment process.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">7</div>
                  <div className="process_img">
                    <img src={DiamondProcess7} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>You Pay</h3>
                    <p>
                      Complete your order effortlessly by submitting payment
                      through the provided invoice.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">8</div>
                  <div className="process_img">
                    <img src={DiamondProcess8} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Ship and Provide Tracking</h3>
                    <p>
                      Your diamonds are shipped promptly, and tracking details
                      are shared for a transparent delivery experience.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Container>
      </section>
      <section className="diamond_process jewelary_process">
        <Container>
          <h3 className="mb30 mb25-xl mb15-sm ff_Title text-uppercase">
            Jewelery <span className="text_colorC">Buying</span> process
          </h3>
          <div className="diamond_process_slider_wrapper">
            <Swiper
              navigation={true}
              modules={[Grid, Navigation]}
              slidesPerView={4}
              spaceBetween={15}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                  grid: {
                    rows: 2,
                  },
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  grid: {
                    rows: 1,
                  },
                },
                991: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                  grid: {
                    rows: 1,
                  },
                },
              }}
              className="diamond_process_slider"
            >
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">1</div>
                  <div className="process_img">
                    <img src={DiamondProcess1} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>Choose Diamond</h3>
                    <p>
                      Explore our dazzling diamond collection to find the
                      perfect match for your preferences.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">2</div>
                  <div className="process_img">
                    <img src={DiamondProcess9} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>Choose Setting</h3>
                    <p>
                      Select a setting that complements and enhances the beauty
                      of your chosen diamond.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">3</div>
                  <div className="process_img">
                    <img src={DiamondProcess3} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>Add To Cart</h3>
                    <p>
                      Easily add your selected items to the cart for a seamless
                      ordering experience.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">4</div>
                  <div className="process_img">
                    <img src={DiamondProcess4} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Accept Order</h3>
                    <p>
                      Your order is gladly accepted, marking the beginning of
                      the personalized jewelry creation process.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">5</div>
                  <div className="process_img">
                    <img src={DiamondProcess8} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Send Invoice</h3>
                    <p>
                      An invoice is promptly sent to you for convenient and
                      secure payment processing.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">6</div>
                  <div className="process_img">
                    <img src={DiamondProcess7} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>You Pay Invoice</h3>
                    <p>
                      Complete your order by submitting payment through the
                      provided invoice.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">7</div>
                  <div className="process_img">
                    <img src={DiamondProcess6} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Prepare Design</h3>
                    <p>
                      Our skilled team begins crafting and preparing your unique
                      jewelry design.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">8</div>
                  <div className="process_img">
                    <img src={DiamondProcess5} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>You Confirm Design</h3>
                    <p>
                      Review and confirm the design before our artisans proceed
                      with production.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">9</div>
                  <div className="process_img">
                    <img src={DiamondProcess4} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Finish Jewellery</h3>
                    <p>
                      Expert artisans bring your approved design to life with
                      meticulous craftsmanship.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">10</div>
                  <div className="process_img">
                    <img src={DiamondProcess3} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>Quality Check and Video</h3>
                    <p>
                      A comprehensive quality check is performed, and we share a
                      video for your approval.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">11</div>
                  <div className="process_img">
                    <img src={DiamondProcess2} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>You Confirm Jewellery</h3>
                    <p>
                      Confirm your satisfaction with the finished jewelry,
                      ensuring it meets your expectations.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="process_slide">
                  <div className="process_count ">12</div>
                  <div className="process_img">
                    <img src={DiamondProcess1} alt="" loading="lazy" />
                  </div>
                  <div className="process_text text-center">
                    <h3>We Ship and Provide Tracking</h3>
                    <p>
                      Your bespoke jewelry is shipped, and we provide tracking
                      details for a smooth and transparent delivery process.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Container>
      </section>
      <section className="number_wrapper">
        <Container>
          <h3 className="text-center mb30 mb25-xl mb15-sm ff_Title text-uppercase">
            Your <span className="text_colorC"> Search </span> Ends Here
          </h3>
          <Row className="align-items-center">
            <Col lg={5}>
              <div className="number_slider_Wrapper">
                <Row className="number_slider_inner d-flex flex-wrap">
                  <Col xs={6} className="p-0">
                    <div className="number_slide text-center">
                      <div className="number_slide_inner">
                        <img
                          src={Globe}
                          className="mb10"
                          alt=""
                          loading="lazy"
                        />
                        <h3>100+</h3>
                        <p>Countries</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} className="p-0">
                    <div className="number_slide text-center">
                      <div className="number_slide_inner">
                        <img
                          src={Diamond}
                          className="mb10"
                          alt=""
                          loading="lazy"
                        />
                        <h3>1,547,87</h3>
                        <p>Diamonds & Jewellery pieces</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} className="p-0">
                    <div className="number_slide text-center">
                      <div className="number_slide_inner">
                        <img
                          src={Money}
                          className="mb10"
                          alt=""
                          loading="lazy"
                        />
                        <h3>$7,987,124</h3>
                        <p>Value of Listing</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} className="p-0">
                    <div className="number_slide text-center">
                      <div className="number_slide_inner">
                        <img
                          src={Find}
                          className="mb10"
                          alt=""
                          loading="lazy"
                        />
                        <h3>98K</h3>
                        <p>Daily Searches</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={7}>
              <div className="video_main_wrapper w-100">
                {/*  <video
                  loop
                  autoPlay
                  muted
                  playsInline
                  preload="none"
                  width="100%"
                  height="100%"
                >
                  <source src={ExcellentDiamondVideo} type="video/mp4" />
                </video> */}
                <video
                  loop
                  muted
                  autoPlay
                  playsInline
                  preload="none"
                  onContextMenu={handleImageRightClick}
                >
                  <source src={VideoUrl} type="video/mp4" />
                </video>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="app_wrapper pt80 pb30 pt30-md pb30-md pb0-sm">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-2 order-lg-1 px-p-0">
              <div className="app_text_wrapper">
                <div className="app_text_wrapper_inner">
                  <h3 className="text-white ff_Title text-uppercase">
                    Excellent Mobile App <br />
                    <span className="text_colorC">
                      {' '}
                      Diamonds and Jewellery{' '}
                    </span>
                    at Your Fingertips
                  </h3>
                  <ul className="mb30">
                    <li>
                      Elevate your Diamond and jewelry Buying experience with
                      our Powerful mobile app!
                    </li>
                    <li>
                      Unleash the power of exquisite diamonds and jewelry.
                    </li>
                    <li>
                      Right at your fingertips. Seamlessly browse, customize,
                      and discover exclusive features.
                    </li>
                    <li>Elevate your style effortlessly.</li>
                    <li>
                      Download now to embark on a journey of unparalleled
                      brilliance and sophistication.
                    </li>
                  </ul>
                  <div className="app_button">
                    <Button variant="link" className="p0">
                      <img src={GooglePlay} alt="" loading="lazy" />
                    </Button>
                    <Button variant="link" className="p0">
                      <img src={AppStore} alt="" loading="lazy" />
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="order-1 order-lg-2">
              <div className="app_img_wrapper">
                <img src={AppSS} alt="" loading="lazy" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="testimonial_Wrapper pb40 pt0 pt20-lg">
        <Container>
          <h3 className="mb30 mb25-xl mb15-sm ff_Title text-uppercase">
            Customer <span className="text_colorC"> Testimonials </span>
          </h3>
          <div className="testimonial_slider_wrapepr">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              slidesPerView={4}
              autoHeight={true}
              spaceBetween={20}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                524: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1442: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
              className="testimonial_slider"
            >
              {/* <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Christopher}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Christopher</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={ChristopherDiamond}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    Got best deal, really excellent, trusted company
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={DavinHasser}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Davin Hasser</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={DavinHasserDiamonds}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    My search for Best quality certified diamond ended here,
                    thanks for your help
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Emily}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Emily</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={EmilyDiamond}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    I just received my beautiful diamond. It is very beautiful
                    and very well packaged! I must say I’m very impressed with
                    how fast the delivery was and the wonderful customer
                    service. I’ll definitely buy from you from now on! Thank you
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={jason}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Jason</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={JasonDiamond}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    Diamond i have purchased from you is really beautiful, thank
                    you
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Jessica}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Jessica</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={JessicaJewellery}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    thanks for timely delivery of my diamond necklace, you made
                    my wedding more beautiful and special, amazing company
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={JohnRogers}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>John Rogers</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={JohnRogersRings}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    Best certified diamond supplier I have ever found, blessed!
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Natalia}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Natalia</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={NataliaJ}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    They are helpful, honest and communication throughout the
                    entire buying process. I will definitely be a return
                    customer. Thank you
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Riyana}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Riyana</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={RiyanaRing}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    Ring you made for me really mesmerized me when i got it,
                    excellent quality
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={SimonHong}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Simon Hong</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={SimonHongJewellery}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">Pleasure to do business with you guys</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Sophia}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Sophia</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={SophiaEarrings}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    They are so honest about everything, they made my jewellery
                    so beautifully , many repeat order on the way
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Stewart}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Stewart</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={StewartRing}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">I like your lab grown diamond</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={StuartParodi}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Stuart Parodi</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={StuartParodiJewellery}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">delivered sp fast, thank you</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex  justify-content-between">
                    <div className="user_top">
                      <div className="user_img">
                        <img
                          src={Unaiza}
                          alt=""
                          width={45}
                          height={45}
                          loading="lazy"
                        />
                      </div>
                      <div className="user_name">
                        <h6>Unaiza</h6>
                        <p>6 days ago</p>
                      </div>
                    </div>
                    <div className="testi_img">
                      <img
                        src={UnaizaEarrings}
                        alt=""
                        width={60}
                        height={60}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="rating_Wrap">
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                    <img src={Start} alt="" />
                  </div>
                  <p className="m0">
                    thanks for making beautiful earring under my budget, would
                    like to do business with you in future
                  </p>
                </div>
              </SwiperSlide> */}

              {testimonials.map((slide,i) => (
                <SwiperSlide>
                  <div className="testimonail_slide" key={i}>
                    <div className="testi_top_heaer d-flex justify-content-between">
                      <div className="user_top">
                        <div className="user_img">
                          <img
                            src={slide.userImg}
                            alt={slide.name}
                            width={45}
                            height={45}
                            loading="lazy"
                          />
                        </div>
                        <div className="user_name">
                          <h6>{slide.user}</h6>
                          <p>{slide.date}</p>
                        </div>
                      </div>
                      <div className="testi_img">
                        <img
                          src={slide.testimonialImg}
                          alt={slide.name + ' diamond'}
                          width={60}
                          height={60}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="rating_Wrap">
                      <img src={Start} alt="" />
                      <img src={Start} alt="" />
                      <img src={Start} alt="" />
                      <img src={Start} alt="" />
                      <img src={Start} alt="" />
                    </div>
                    <DescriptionToggle description={slide.comment} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>
      </section>
      <section className="charity_wrapper pb35 pt20 pb30-sm">
        <Container>
          <Row className="flex-lg-row flex-column-reverse align-items-lg-center">
            <Col lg={7}>
              <div className="charity_slider_wrapper">
                <Swiper
                  navigation={true}
                  loop={true}
                  modules={[Navigation]}
                  slidesPerView={2}
                  spaceBetween={10}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    575: {
                      slidesPerView: 2,
                    },
                  }}
                  className="charity_slider"
                >
                  <SwiperSlide>
                    <div className="charity_slide">
                      <img src={Charity1} alt="" loading="lazy" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="charity_slide">
                      <img src={Charity2} alt="" loading="lazy" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="charity_slide">
                      <img src={Charity3} alt="" loading="lazy" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="charity_slide">
                      <img src={Charity4} alt="" loading="lazy" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </Col>
            <Col lg={5}>
              <div className="charty_text_wrapper">
                <h3 className="mb10 ff_Title text-uppercase">
                  We Do <span className="text_colorC"> Charity </span>Work
                </h3>
                <p>
                  <i>"Sparkling Acts of Compassion"</i>
                </p>
                <p className="mb20 mb10-lg description">
                  In the intricate tapestry of business, success is interwoven
                  with the golden strands of charity. Beyond crafting diamonds,
                  we sculpt a compassionate world, embodying meaningful
                  philanthropy. Every organization wields the power to create
                  positive ripples, and we're dedicated to embracing our
                  responsibility. Through our initiative, we extend a helping
                  hand to the poor and needy, contributing to a brighter, more
                  compassionate society
                </p>
                <input
                  type="checkbox"
                  className="check text-uppercase btn btn-sm"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
export default memo(Home);
