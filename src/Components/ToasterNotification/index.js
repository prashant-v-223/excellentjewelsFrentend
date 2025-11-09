import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from '../Redux/reducers/common.slice';
import {
  CheckCircle,
  AlertCircle,
  Info,
  X
} from 'lucide-react';
function ToastMessage() {
  const { showMessage, message, varient } = useSelector(({ common }) => common);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (showMessage === true) {
      setTimeout(s => {
        dispatch(hideMessage());
      }, 5000);
    }
  }, [dispatch, showMessage]);
  console.log("varient", varient);

  return (
    <React.Fragment>
      <React.Fragment>
        <div className={showMessage === true ? 'show' : ''} id="toast_custom">
          <div
            className={
              varient === 'success' ? 'toast_wrap success' : varient === undefined ? "toast_wrap success" : 'toast_wrap danger'
            }
          >
            <div className="flex justify-center items-center " id="img">
              {varient === 'success' ? (
                <CheckCircle />
              ) : (
                <Info />
              )}
            </div>
            <div id="desc">{message !== undefined && message.toString()}</div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}
export default ToastMessage;
