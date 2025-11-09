import { setDiamondType } from 'Components/Redux/reducers/offlineList.slice';
import { memo } from 'react';
import { Form } from 'react-bootstrap';
function DiamondType({
  values,
  dispatch,
  submitRef,
  handleChange,
  initialValues,
  setCurrentPage,
  changeDiamondType,
  setIsClearSelection,
  diamondFilterDetail,
  setDiamondFilterData,
  setSerchDiamondFinalValue,
  setSearchDiamondSavedData,
  setSearchDiamondFilterList2,
}) {
  return (
    <div className="search_inner_wrap">
      <div className="check_input_wraper scroll_wrapper">
        <ul>
          <li>
            <div className="checkbox_wrapper radio_wrapper">
              <Form.Check
                type="radio"
                name="diamondType"
                id="LabGrownDiamond"
                readOnly
                label="Lab Grown Diamond"
                checked={values.diamondType === 'LABGROWN'}
                onClick={() => {
                  if (values.diamondType !== 'LABGROWN') {
                    dispatch(setSearchDiamondFilterList2([]));
                    // submitRef && submitRef.current.resetForm();
                    // setDiamondFilterData(diamondFilterDetail);
                    // setSerchDiamondFinalValue(initialValues);
                    // dispatch(setSearchDiamondSavedData(''));
                    // dispatch(setIsClearSelection(true));
                    handleChange('diamondType')('LABGROWN');
                    // changeDiamondType('LABGROWN');
                    dispatch(setDiamondType('LABGROWN'));
                    setCurrentPage(0);
                  }
                }}
              />
            </div>
          </li>
          <li>
            <div className="checkbox_wrapper radio_wrapper">
              <Form.Check
                type="radio"
                name="diamondType"
                id="NaturalDiamond"
                readOnly
                label="Natural Diamond"
                checked={values.diamondType === 'NATURAL'}
                onClick={() => {
                  if (values.diamondType !== 'NATURAL') {
                    dispatch(setSearchDiamondFilterList2([]));
                    // submitRef && submitRef.current.resetForm();
                    // setDiamondFilterData(diamondFilterDetail);
                    // setSerchDiamondFinalValue(initialValues);
                    // dispatch(setSearchDiamondSavedData(''));
                    // dispatch(setIsClearSelection(true));
                    handleChange('diamondType')('NATURAL');
                    // changeDiamondType('NATURAL');
                    dispatch(setDiamondType('NATURAL'));
                    setCurrentPage(0);
                  }
                }}
              />
            </div>
          </li>
          {/* <li>
            <div className="checkbox_wrapper radio_wrapper">
              <Form.Check
                type="radio"
                readOnly
                name="diamondType"
                id="GemStone"
                label="Gem Stone"
                checked={values.diamondType === '2'}
                onClick={() => {
                  if (values.diamondType !== '2') {
                    setDiamondTypeState('2');
                    submitRef && submitRef.current.resetForm();
                    setDiamondFilterData(diamondFilterDetail);
                    setSerchDiamondFinalValue(initialValues);
                    dispatch(setSearchDiamondSavedData(''));
                    dispatch(setIsClearSelection(true));
                    handleChange('diamondType')('2');
                  }
                }}
              />
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default memo(DiamondType);
