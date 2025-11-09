import React, { memo, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="faq_wrapper pt20 pb100 pb80-xl  pb50-md">
        <Container>
          <h2 className="pb60 text-center pb40-xl">
            Frequently Asked Questions <span>(FAQs)</span>
          </h2>
          <Accordion defaultActiveKey="0" className="accordian_design_one">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Where are you based?</Accordion.Header>
              <Accordion.Body>
                <p>
                  Our head office is located in Hong Kong, with our
                  manufacturing unit and other offices situated in India.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What goods do you deal in?</Accordion.Header>
              <Accordion.Body>
                <p>
                  IGI/GIA Certified Lab-Grown Diamonds with over 100,000 stones
                </p>
                <p>parcel goods and layouts in white and fancy color Both.</p>
                <p>customized diamond jewelry of the highest quality,</p>
                <p>personalized cut diamonds as per demand on make to order.</p>
                <p>
                  We are one stop solution for all type of lab grown diamond
                  requirements.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Are you a manufacturer or trader?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  We are a leading manufacturer and grower of CVD Type 2A
                  diamonds. Additionally, we specialize in crafting customized
                  jewelry.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                All your Lab grown Diamonds are certified?
              </Accordion.Header>
              <Accordion.Body>
                Yes, if you are accessing our Certified Diamonds inventory,
                there all diamonds are certified by IGI or GIA.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                Are all the diamonds on this website are available?
              </Accordion.Header>
              <Accordion.Body>
                <p>Yes,</p>
                <p>all diamonds are available.</p>
                <p>
                  However, we recommend confirming availability with us, as the
                  same diamond may be selected by multiple people during the
                  same time period
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                How can I check authenticity of Certified diamonds?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  You can always check diamond girdle where you will find laser
                  inscription of IGI report number, you can check same number on
                  IGI/GIA official website and fetch the grading report and
                  match them together.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                Are these lab grown diamonds same as natural diamonds?
              </Accordion.Header>
              <Accordion.Body>
                <p>Yes, same as natural diamonds,</p>
                <p>
                  Look, Shinning and internal properties everything same. Just
                  difference is about origin, one grown under earth and another
                  in lab,
                </p>
                <p>
                  Lab Grown Diamonds remain same as natural diamond life long.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>
                What is Minimum Order Quantity ?
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>For Certified Diamonds : 1 stone</li>
                  <li>
                    For Non Certified Small Goods : Total Carat Weight - 10ct
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>
                can you please introduce Lab Grown Diamonds in Brief ?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Lab Grown Diamonds Also known as Man Made Diamonds, Created
                  Diamonds or cultured diamonds,
                </p>
                <p>
                  There are Two Formation Methods to Produce Lab Grown Diamonds
                </p>
                <p>
                  One is HPHT (High Pressure High Temperature) and Other is CVD
                  (Chemical Vapor Deposition)
                </p>
                <p>
                  Click here <Link to="">For More Detailed information.</Link>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>
                Different between lab grown diamond and natural diamond
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Lab-grown diamonds are created in a controlled lab environment
                  over weeks to months, while natural diamonds form naturally in
                  the Earth over millions of years.
                </p>
                <p>
                  Lab-grown diamonds are generally more affordable,
                  environmentally friendly, and may have fewer inclusions.
                </p>
                <p>
                  Natural diamonds, though often pricier, carry unique
                  characteristics from their natural formation and can be
                  identified by specific features.
                </p>
                <p>
                  Click here <Link to="">For More Detailed information.</Link>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>
                4Cs of Diamond Quality | what are 4Cs of Diamond | All about 4Cs
                in Diamond
              </Accordion.Header>
              <Accordion.Body>
                <p>These 4cs are Carat, Color, clarity and Cut</p>
                <h6>CARAT</h6>
                <p>Diamond Carat : We have from 0.004ct to 20ct+</p>
                <h6>COLOR</h6>
                <p>Diamond Color : DEF GHI JKL MNO...........Z</p>
                <h6>CLARITY</h6>
                <p>
                  Diamond Clarity: IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2,
                  I3
                </p>
                <h6>CUT</h6>
                <p>
                  Diamond Cut (Shapes) : Round, Oval, Heart, Princess, Emerald,
                  Marquise, Cushion, Radiant, Baguettes, Asscher, Trapezoids,
                  Hexagonal, Kites, Customized Cut, Pie Cut and More
                </p>
                <p>
                  Click here{' '}
                  <Link>For More Detailed information about all 4Cs.</Link>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="11">
              <Accordion.Header>
                In what metal do you produce your jewelry?
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Make Jewellery in Gold and Platinum</li>
                  <li>Gold Type :10K,14K,18K,22K</li>
                  <li>Gold Color : Rose, White, Yellow</li>
                  <li>Platinum : 950</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="12">
              <Accordion.Header>
                What are diamond cut, polish and symmetry
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Diamond cut refers to the precision of shaping, influencing
                  brilliance; polish is the smoothness of the diamond's surface,
                  and symmetry pertains to the alignment of facets, collectively
                  impacting a diamond's visual appeal.
                </p>
                <p>
                  It can be as IDEAL/EXCELLENT - VERY GOOD - GOOD - FAIR/POOR
                  Where IDEAL/EXCELLENT is the best and Poor is the lowest grade
                  in the same
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="13">
              <Accordion.Header>
                How Many Days you take to Customize Jewellery?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Depend On Design and type of jewellery, we create within 7-15
                  Business days
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="14">
              <Accordion.Header>
                If I don't find the diamond which I want in your inventory list
                ?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  You can always emails us your or just hit chat icon and our
                  expert will connected with you, Your can submit your
                  requirement and we will make that diamond available for you,
                  we will do our best to make it available for you. You can
                  directly put your requirement here, Click here to Submit.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="15">
              <Accordion.Header>Order preparation time ?</Accordion.Header>
              <Accordion.Body>
                <p>For Small Diamonds order -3 Business days</p>
                <p>
                  For Certified Diamonds - Can dispatch as soon as payment
                  received as its always ready to ship For Jewellery - 7-15
                  Business days, vary according to the jewellery design
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="16">
              <Accordion.Header>
                Which Shipping methods you use ?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  We Ship through FEDEX/UPS/MALCA AMIT Etc According to the
                  value of shipment and destination country.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="17">
              <Accordion.Header>
                How much time to deliver the goods ?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Depend on Destination Country, it can be 4-7 Business days for
                  Some countries there overnight or second day delivery also
                  possible, shipping charges can be vary depend on service type
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>
    </main>
  );
};
export default memo(Faq);
