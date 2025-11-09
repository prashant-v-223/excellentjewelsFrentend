import { memo } from 'react';
import { Link } from 'react-router-dom';

const AccountSidebar = () => {
  return (
    <div className="sidebar_wrapper">
      <ul>
        <li
          className={
            window.location.pathname === '/edit-profile' ? 'active' : ''
          }
        >
          <Link to="/edit-profile" className="ff_Mulish">
            Edit Profile
          </Link>
        </li>
        <li
          className={
            window.location.pathname === '/my-orders' ||
            window.location.pathname === '/order-detail'
              ? 'active'
              : ''
          }
        >
          <Link to="/my-orders" className="ff_Mulish">
            My Orders
          </Link>
        </li>
        <li
          className={
            window.location.pathname === '/purchase-history' ? 'active' : ''
          }
        >
          <Link to="/purchase-history" className="ff_Mulish">
            Purchase History
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default memo(AccountSidebar);
