import {
  getWebConfigurationTypeDetail,
  setEducationList,
  setGetDynamicDataLoader,
} from 'Components/Redux/reducers/common.slice';
import { memo, useCallback, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Education1 from '../../Assets/Images/education/1.jpg';
// import Education10 from '../../Assets/Images/education/10.jpg';
// import Education11 from '../../Assets/Images/education/11.jpg';
// import Education2 from '../../Assets/Images/education/2.jpg';
// import Education3 from '../../Assets/Images/education/3.jpg';
// import Education4 from '../../Assets/Images/education/4.jpg';
// import Education5 from '../../Assets/Images/education/5.jpg';
// import Education6 from '../../Assets/Images/education/6.jpg';
// import Education7 from '../../Assets/Images/education/7.jpg';
// import Education8 from '../../Assets/Images/education/8.jpg';
// import Education9 from '../../Assets/Images/education/9.jpg';

const Education = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { educationList, webConfigurationType } = useSelector(
    ({ common }) => common,
  );

  const getWebConfigurationTypeData = useCallback(
    async webConfigurationData => {
      const educationConfigId = webConfigurationData.find(
        item =>
          item?.Type_Code?.trim()?.toLowerCase() &&
          item?.Type_Code?.trim()?.toLowerCase() === 'education',
      )?.Type_ID;

      if (educationConfigId) {
        const { payload: educationList } = await dispatch(
          getWebConfigurationTypeDetail(educationConfigId),
        );

        if (educationList?.data?.length > 0) {
          dispatch(setEducationList(educationList.data));
          console.log('educationList.data: ', educationList.data);
        }
      }
      dispatch(setGetDynamicDataLoader(false));
    },
    [dispatch],
  );

  useEffect(() => {
    if (webConfigurationType?.length > 0) {
      getWebConfigurationTypeData(webConfigurationType);
    }
  }, [dispatch, webConfigurationType, getWebConfigurationTypeData]);

  return (
    <main>
      <section className="education_sec pt40 pt20-lg pb40-md pb80">
        <Container>
          <h3 className="text-center  mb30 ff_Title text-uppercase">
            Education <span className="text_colorC"> Center</span>
          </h3>
          <Row className="g-2 g-sm-4 rowX">
            {educationList.map(item => {
              return (
                <Col lg={6}>
                  <div className="education_box">
                    {item.Img_Url && (
                      <div className="eduaction_left_img">
                        <img src={item.Img_Url} alt="DiamondImg" />
                      </div>
                    )}
                    <div className="eduaction_content">
                      {item.Heading && (
                        <h5 className="ff_Mulish">{item.Heading}</h5>
                      )}
                      {item.Description && <p>{item.Description}</p>}
                      <Button
                        className=""
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          navigate(`/education/${item.Configuration_ID}`)
                        }
                      >
                        {item.Button}
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
            {/* <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education2} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">What Are Lab-Grown Diamonds?</h5>
                  <p>
                    Diamonds have long been admired for their timeless beauty
                    and rarity. However, a new chapter in the world of diamonds
                    has emerged with the advent of lab-grown diamonds, providing
                    consumers with a sustainable and ethical alternative to
                    traditional mined diamonds in attractive price. Lab-grown
                    diamonds, also known man made diamonds, cultured diamonds,
                    created diamonds. lab grown diamonds are created in
                    controlled laboratory environments with ecofriendly method
                    rather than being mined from the Earth.
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/education/what-are-lab-grown-diamonds')
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education3} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    How are lab-grown diamonds created?
                  </h5>
                  <p>
                    Certainly! Let’s delve into the fascinating process of
                    creating lab-grown diamonds. These remarkable Lab Grown
                    Diamonds are produced in controlled laboratory environments,
                    using advanced technological methods that replicate and
                    mimicking the same natural conditions under the earth which
                    natural diamonds form deep within the Earth. Here are the
                    two primary methods used: High Pressure High Temperature
                    (HPHT) Chemical Vapor Deposition (CVD)
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/education/how-are-lab-grown-diamonds-created')
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education4} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    All About Chemical Vapor Deposition (CVD) LGDs
                  </h5>
                  <p>
                    Certainly! Lets get in to the method of producing lab grown
                    diamond through Chemical Vapor Deposition (CVD)
                    method:1.Carbon Source: Begin with a carbon source, often
                    methane gas, in the CVD process. 2.Reaction
                    Chamber:Introduce the carbon source into a controlled
                    chamber.3.High-Temperature Environment:at the chamber to
                    around 800°C (1,472°F), breaking down the gas into carbon
                    atoms.
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/education/chemical-vapor-deposition')
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education5} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    All About High Pressure High Temperature (HPHT) LGDs
                  </h5>
                  <p>
                    Certainly! Let’s explore the fascinating process of creating
                    lab-grown diamonds using the High Pressure High Temperature
                    (HPHT) method.1.Seed Diamond or Carbon Source:Begin with a
                    small natural diamond (seed diamond) or carbon source like
                    graphite.2.High-Pressure Chamber:Place the seed diamond or
                    carbon source in a high-pressure chamber.3.Application of
                    High Pressure:Seal the chamber and apply pressures up to
                    725,000 psi, simulating Earth's mantle conditions
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/education/high-pressure-high-temperature')
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education6} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">CVD Diamond V/S HPHT Diamond</h5>
                  <p>
                    while both CVD and HPHT methods result in high-quality
                    lab-grown diamonds, understanding their unique processes and
                    characteristics can help consumers make informed choices
                    based on their preferences and values. Whether it's the
                    controlled precision of CVD or the Earth-mimicking
                    conditions of HPHT, the world of lab-grown diamonds offers a
                    dazzling array of sustainable and ethical options for the
                    modern consumer.
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/education/cvd-diamond-vs-hpht-diamond')
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education7} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    Natural Diamond V/S Lab Grown Diamond
                  </h5>
                  <p>
                    Certainly! Let’s explore the differences between lab-grown
                    diamonds and natural diamonds: LAB GROWN DIAMONDS and
                    NATURAL DIAMONDS identical, optical and chemical
                    characteristics same, Lab grown diamonds are created in lab,
                    we can say that grown in lab and natural diamonds are formed
                    in the earth.
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate(
                        '/education/natural-diamond-vs-lab-grown-diamond',
                      )
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education8} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    Diamond MM to Carat Weight Chats
                  </h5>
                  <p>
                    Millimeters (MM) and carats are fundamental units used to
                    describe a diamond's size. Delving into the MM to Carat
                    conversion chart allows you to translate these measurements,
                    providing clarity on the physical dimensions and weight of
                    the diamond. This understanding is pivotal in selecting a
                    diamond that suits your taste and fits perfectly into your
                    jewelry design.
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/education/diamond-mm-to-carat-weight-chats')
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education9} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    Advantages of Lab Grown Diamonds
                  </h5>
                  <p>
                    lab-grown diamonds offer a sustainable, ethical, and
                    cost-effective alternative without compromising on beauty or
                    quality. Whether you’re passionate about environmental
                    conservation or seeking an exquisite gem, lab-grown diamonds
                    are a brilliant choice! Certainly! Let’s explore the major
                    advantages of lab-grown diamonds in more detailed
                    information:
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate('/education/advantages-of-lab-grown-diamonds')
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education10} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    Choosing the Perfect Engagement Ring
                  </h5>
                  <p>
                    journey to find the perfect engagement ring is an exciting
                    and momentous step in the path to forever. In this guide,
                    we'll navigate through the key considerations and essential
                    tips to help you choose an engagement ring that not only
                    symbolizes your love but also reflects the unique style and
                    personality of your partner. Choosing an engagement ring is
                    a heartfelt journey that involves careful consideration and
                    attention to detail.
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate(
                        '/education/choosing-the-perfect-engagement-ring',
                      )
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="education_box">
                <div className="eduaction_left_img">
                  <img src={Education11} alt="DiamondImg" />
                </div>
                <div className="eduaction_content">
                  <h5 className="ff_Mulish">
                    Caring for Your Lab-Grown Diamond Jewelry
                  </h5>
                  <p>
                    Caring for your lab-grown diamond jewelry ensures that its
                    brilliance and beauty endure for a lifetime. By
                    incorporating these tips into your routine, you'll not only
                    maintain the luster of your precious pieces but also create
                    a legacy of timeless elegance. Cherish your lab-grown
                    diamonds, and they will continue to sparkle as brightly as
                    your enduring love.
                  </p>
                  <Button
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      navigate(
                        '/education/caring-for-your-lab-grown-diamond-jewelry',
                      )
                    }
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default memo(Education);
