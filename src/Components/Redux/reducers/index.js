import { combineReducers } from 'redux';
import auth from '../reducers/auth.slice.js';
import common from '../reducers/common.slice.js';
import dashboard from '../reducers/dashboard.slice.js';
import myAccount from '../reducers/myAccount.slice.js';
import offlineList from '../reducers/offlineList.slice.js';
import order from '../reducers/order.slice.js';
import jewellery from '../reducers/jewellery.slice.js';
import setting from '../reducers/setting.slice.js';

const rootReducer = combineReducers({
  auth,
  common,
  dashboard,
  myAccount,
  offlineList,
  order,
  jewellery,
  setting,
});

export default rootReducer;
