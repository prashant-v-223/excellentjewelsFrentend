import React, { memo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoBackToEducation from './GoBackToEducation';

const AdvantagesofLabGrown = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <section className="education_diamond_wrap pt40-lg pt50 pb80 pb30-md pb80-lg">
        <Container>
          <GoBackToEducation />
          <div className="diamond_detial_box">
            <h4 className="text_colorC ff_Mulish">
              Advantages of Lab Grown Diamonds
            </h4>
            <p className="ff_Mulish">
              lab-grown diamonds offer a sustainable, ethical, and
              cost-effective alternative without compromising on beauty or
              quality. Whether you’re passionate about environmental
              conservation or seeking an exquisite gem, lab-grown diamonds are a
              brilliant choice! Certainly! Let’s explore the major advantages of
              lab-grown diamonds in more detailed information:
            </p>
            <h6 className="ff_Mulish">Environmental Benefits</h6>
            <ul>
              <li>
                Reduced Carbon Footprint: Lab-grown diamonds have a
                significantly lower environmental impact compared to mined
                diamonds. Traditional diamond mining involves extensive land
                excavation, energy consumption, and transportation. In contrast,
                lab-grown diamonds are created in controlled environments,
                minimizing ecological disruption.
              </li>
            </ul>
            <h6 className="ff_Mulish">Water Conservation</h6>
            <ul>
              <li>
                Diamond mining requires substantial water usage. By opting for
                lab-grown diamonds, we conserve precious water resources.
              </li>
            </ul>
            <h6 className="ff_Mulish">Ethical Considerations</h6>
            <ul>
              <li>
                Conflict-Free Origins: Lab-grown diamonds are inherently
                conflict-free. Unlike natural diamonds, which may come from
                regions with civil unrest or unethical practices, lab-grown
                diamonds are traceable and transparent.
              </li>
            </ul>
            <h6 className="ff_Mulish">Human Rights</h6>
            <ul>
              <li>
                Choosing lab-grown diamonds supports fair labor practices and
                ensures that workers are not subjected to hazardous conditions.
              </li>
            </ul>
            <h6 className="ff_Mulish">Affordability</h6>
            <ul>
              <li>
                Lab-grown diamonds are generally more affordable than their
                natural counterparts. The reduced production costs and shorter
                supply chain contribute to this advantage.
              </li>
            </ul>
            <h6 className="ff_Mulish">Access to Larger Stones</h6>
            <ul>
              <li>
                Customers can afford larger carat weights or higher-quality
                diamonds within their budget when opting for lab-grown options.
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(AdvantagesofLabGrown);
