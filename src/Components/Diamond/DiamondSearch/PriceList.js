import _ from 'lodash';
import { memo, useCallback } from 'react';
import { Form } from 'react-bootstrap';
function PriceList({
  dispatch,
  values,
  handleChange,
  disableCalcuSymbol,
  searchDiamondSavedData,
  setSearchDiamondSavedData,
}) {
  const handleChangePriceTo = useCallback(
    value => {
      dispatch(
        setSearchDiamondSavedData({
          ...searchDiamondSavedData,
          priceTo: value,
        }),
      );
    },
    [dispatch, searchDiamondSavedData, setSearchDiamondSavedData],
  );
  const priceToTextChange = useCallback(_.debounce(handleChangePriceTo, 800));
  const handleChangePriceFrom = useCallback(
    value => {
      dispatch(
        setSearchDiamondSavedData({
          ...searchDiamondSavedData,
          priceFrom: value,
        }),
      );
    },
    [dispatch, searchDiamondSavedData, setSearchDiamondSavedData],
  );
  const priceFromTextChange = useCallback(
    _.debounce(handleChangePriceFrom, 800),
  );
  return (
    <div className="search_inner_wrap">
      <div className="search_label">
        <h6 className="ff_Mulish">Price</h6>
      </div>
      <div className="search_content w-100">
        <div className="input_box_wrapper">
          <ul>
            <li>
              <Form.Group
                className="form_group"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="number"
                  onWheel={e => e.target.blur()}
                  name="priceFrom"
                  onKeyDown={disableCalcuSymbol}
                  value={values.priceFrom}
                  onChange={e => {
                    if (Number(e.target.value) >= 0) {
                      handleChange('priceFrom')(e.target.value);
                      priceFromTextChange(e.target.value);
                    }
                  }}
                  placeholder="$ From"
                />
              </Form.Group>
            </li>
            <li>
              <Form.Group
                className="form_group"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="number"
                  onWheel={e => e.target.blur()}
                  name="priceTo"
                  value={values.priceTo}
                  onKeyDown={disableCalcuSymbol}
                  onChange={e => {
                    if (Number(e.target.value) >= 0) {
                      handleChange('priceTo')(e.target.value);
                      priceToTextChange(e.target.value);
                    }
                  }}
                  placeholder="$ To"
                />
              </Form.Group>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default memo(PriceList);
