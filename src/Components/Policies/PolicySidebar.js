import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PolicySidebar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="sidebar_wrapper education_sidebar_wrapper">
      <ul>
        <li
          className={
            window.location.pathname === '/return-and-refund-policy'
              ? 'active'
              : ''
          }
        >
          <Link to="/return-and-refund-policy" className="ff_Mulish">
            Return & Refund Policy
          </Link>
        </li>
        <li
          className={
            window.location.pathname === '/privacy-policy' ? 'active' : ''
          }
        >
          <Link to="/privacy-policy" className="ff_Mulish">
            Privacy Policy
          </Link>
        </li>
        <li
          className={
            window.location.pathname === '/shipping-policy' ? 'active' : ''
          }
        >
          <Link to="/shipping-policy" className="ff_Mulish">
            Shipping Policy
          </Link>
        </li>
        <li
          className={
            window.location.pathname === '/terms-and-conditions' ? 'active' : ''
          }
        >
          <Link to="/terms-and-conditions" className="ff_Mulish">
            Terms & Condition
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default memo(PolicySidebar);
