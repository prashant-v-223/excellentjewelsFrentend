import React, { memo, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import VisionImg from '../Assets/Images/vision.jpg';
import MissionImg from '../Assets/Images/mission.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
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
          <a className="text-decoration-underline ps-1" onClick={handleToggle}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </a>
        )}
      </p>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  return (
    <main>
      <section className="about_banner">
        <Container>
          <h1 className="text-white mb15 ff_Title">
            About <span className="text_colorC">Us</span>
          </h1>
          <p className="text-white mb30 ff_Mulish">
            Crafting Brilliance: The Artistry and Legacy of EXCELLENT JEWELS
            PRIVATE LIMITED
          </p>
        </Container>
      </section>

      {/* Vision */}
      <section className="vision_wrapper">
        <Container className="h-100">
          <Row className="h-100">
            <Col md={6} className="vision_details">
              <div className="vision_text_wrapper">
                <h2 className="mb15 mb5-lg ff_Title text-uppercase pr30 pr0-lg">
                  Our <span className="text_colorC">Vision</span>
                </h2>
                <ul>
                  <li>
                    We envision a future where everyone can effortlessly embrace
                    the brilliance of lab-grown diamonds, characterized by
                    affordability, transparency, and unparalleled value.
                  </li>
                  <li>
                    Our commitment to democratizing access to exceptional
                    lab-grown diamond and jewelry.
                  </li>
                  <li>
                    Our streamlined buying and ordering processes redefine
                    convenience.
                  </li>
                  <li>
                    Beyond revolutionizing the jewelry landscape, we aspire to
                    be a catalyst for economic empowerment, creating thousands
                    of meaningful employment opportunities.{' '}
                  </li>
                  <li>
                    Our journey extends beyond business success; we aim to set
                    an exemplary standard in the corporate realm by fostering a
                    unique work culture and spearheading transformative
                    initiatives.
                  </li>
                  <li>
                    In doing so, we strive to inspire positive change, not just
                    in the jewelry industry but as a beacon of excellence for
                    the wider corporate world.
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={6} className="h-100">
              <div className="vision_img_wrapper h-100">
                <img src={VisionImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission */}
      <section className="mission_wrapper">
        <Container className="h-100">
          <Row className="h-100 flex-md-row flex-column flex-column-reverse">
            <Col md={6} className="h-100">
              <div className="vision_img_wrapper h-100">
                <img src={MissionImg} alt="" />
              </div>
            </Col>{' '}
            <Col md={6} className="vision_details">
              <div className="vision_text_wrapper">
                <h2 className="mb15 mb5-lg ff_Title text-uppercase pr30 pr0-lg">
                  Our <span className="text_colorC">Mission</span>
                </h2>
                <p className="mb15 mb5-lg  pr30 pr0-lg">
                  Luxury Product for All
                </p>
                <ul>
                  <li>it's our mission and unwavering commitment.</li>
                  <li>
                    We believe that the brilliance and beauty of lab-grown
                    diamonds should be accessible to everyone.{' '}
                  </li>
                  <li>
                    Our mission is to redefine luxury, breaking down barriers
                    and making high-quality, ethically sourced diamonds a
                    delightful and affordable indulgence for all.
                  </li>
                  <li>
                    With transparency, integrity, and exceptional craftsmanship
                    at our core, we are dedicated to ensuring that the joy of
                    owning a luxury product is a universal experience.
                  </li>
                  <li>
                    Elevate your style, celebrate your moments, and embrace the
                    era of lab-grown diamonds – because true luxury knows no
                    boundaries.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="value_wrapper pt40 pb40 pt20-lg pb20-lg">
        <Container>
          <div className="value_inner_Wrap">
            <h2 className="text-center mb15 mb5-lg ff_Title text-uppercase pr30 pr0-lg">
              Our <span>Core Values</span>
            </h2>
            <div className="text-center mb30 mb10-lg">
              <p className="mb15 mb5-lg">
                <i>Quality - Trust - Excellence</i>
              </p>
              <p>
                At the heart of our company, we uphold these three core values
                that define our essence and guide every facet of our operations
              </p>
            </div>
            <Row className="rowX">
              <Col md={4}>
                <div className="value_box">
                  <h3 className="text-center ff_Title fw-medium">Quality</h3>
                  <ul>
                    <li>
                      We are unwavering in our commitment to delivering
                      excellence in every lab-grown diamond and jewelry piece we
                      create.
                    </li>
                    <li>
                      Quality is not just a standard; it's a promise we keep to
                      ensure our customers receive nothing short of perfection.
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={4}>
                <div className="value_box">
                  <h3 className="text-center ff_Title fw-medium">Trust</h3>
                  <ul>
                    <li>
                      Building trust is the foundation of our relationships.
                    </li>
                    <li>
                      We prioritize transparency, integrity, and reliability,
                      fostering an environment where our customers, partners,
                      and employees have confidence in our products and
                      practices.
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={4}>
                <div className="value_box">
                  <h3 className="text-center ff_Title fw-medium">Excellence</h3>
                  <ul>
                    <li>
                      We strive for excellence in everything we do – from
                      innovative craftsmanship to unparalleled customer service.
                    </li>
                    <li>
                      It's our dedication to continuous improvement that propels
                      us forward, setting benchmarks in the industry and
                      exceeding expectations.
                    </li>
                    <li>
                      These core values are not just words; they are the guiding
                      principles that shape our identity and inspire us to
                      create an enduring legacy of quality, trust, and
                      excellence.
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="about_page_wrapper">
        <Container>
          <div className="text-center">
            <p>
              Welcome to ExcellentJewels Pvt Ltd (Excellent Corporation), a
              leading grower, manufacturer, and exporter of lab-grown diamonds,
              along with bespoke jewelry customization.
            </p>
            <p>
              Our state-of-the-art CVD growing and manufacturing unit in India
              stands as a testament to our commitment to innovation and quality.
            </p>
            <p>
              Headquartered in Hong Kong, with multiple offices strategically
              positioned across India, we boast a global presence.
            </p>
            <p>
              Our dedicated team of experts is the backbone of our success,
              ensuring precision and excellence in every facet of our
              operations.
            </p>
            <p>
              At ExcellentJewels, we take pride in being the one-stop solution
              for all lab-grown diamond requirements, offering a seamless and
              comprehensive experience for our valued clientele.
            </p>
          </div>
        </Container>
      </section>

      <section className="testimonial_Wrapper in_about pt60 pb40 pb20-xl">
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
                },
                631: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1442: {
                  slidesPerView: 4,
                },
              }}
              className="testimonial_slider navigation_center_bottom"
            >
              {testimonials.map(slide => (
                <SwiperSlide key={slide.id}>
                  <div className="testimonail_slide">
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
              {/* <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <p className={isExpanded ? 'expanded m0' : 'collapsed m0'}>
                    My search for Best quality certified diamond ended here,
                    thanks for your help
                  </p>
                  <button onClick={toggleReadMore} className="read-more-button">
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonail_slide">
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
                  <div className="testi_top_heaer d-flex">
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
            </Swiper>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(About);
