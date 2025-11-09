import React, { memo, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import GoBackToEducation from './GoBackToEducation';

const NaturalvsLabGrown = () => {
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
              Natural Diamond V/S Lab Grown Diamond
            </h4>
            <p className="ff_Mulish">
              Certainly! Let’s explore the differences between lab-grown
              diamonds and natural diamonds:
            </p>
            <p className="ff_Mulish">
              LAB GROWN DIAMONDS and NATURAL DIAMONDS{' '}
              <b>
                identical, optical and chemical characteristics same, Lab grown
                diamonds are created in lab,
              </b>
              we can say that grown in lab and{' '}
              <b>natural diamonds are formed in the earth.</b>
            </p>
            <h6 className="ff_Mulish">Ethical and Cost Considerations</h6>
            <ul>
              <li>
                Natural Diamond: Mined with environmental and ethical concerns;
                may be costlier.
              </li>
              <li>
                Lab-Grown Diamond: Ethically produced, potentially more
                cost-effective.
              </li>
            </ul>
            <h6 className="ff_Mulish">Formation method</h6>
            <ul>
              <li>
                Natural Diamond: Formed deep in the earth over billions of years
                in kimberlite pipes.
              </li>
              <li>
                Lab-Grown Diamond: Created in a controlled laboratory
                environment since the 1950s.
              </li>
            </ul>
            <h6 className="ff_Mulish">Appearance and Properties</h6>
            <ul>
              <li>
                Natural Diamond: Mined from the earth, may have microscopic
                impurities like nitrogen.
              </li>
              <li>
                Lab-Grown Diamond: Produced without impurities, virtually
                identical appearance and properties.
              </li>
            </ul>
            <h6 className="ff_Mulish">Identification</h6>
            <ul>
              <li>
                Natural Diamond: Gemologists may detect tiny amounts of
                nitrogen.
              </li>
              <li>
                Lab-Grown Diamond: Lacks nitrogen, distinguishing it from
                natural diamonds under microscopic examination.
              </li>
            </ul>
            <ul className="mt20">
              <li>
                Lab Grown diamonds and Natural diamonds, both have same internal
                properties
              </li>
              <li>Both have same Chemical Composition which is CARBON.</li>
              <li>Both have same Crystal System which is ISOMETRIC/CUBIC.</li>
              <li>
                Both have same optic character, both are SINGLE REFRACTIVE.
              </li>
              <li>Hardness of both is also same, which is 10</li>
              <li>Specific Gravity is 3.52, same for both</li>
              <li>RI, Means Refractive Index for both which is same 2.417.</li>
              <li>Dispersion for both which is same 0.044.</li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};
export default memo(NaturalvsLabGrown);
