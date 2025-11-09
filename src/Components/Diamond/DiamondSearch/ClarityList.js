import { memo, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ClarityList = ({
  dispatch,
  values,
  setFieldValue,
  diamondFilterData,
  setDiamondFilterData,
  setSearchDiamondSavedData,
  searchDiamondSavedData,
  diamondDetailListLoading,
}) => {
  const handleCarityToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        clarityList: diamondFilterData.clarityList.map(item => {
          if (item.Display_Order === id) {
            return { ...item, classToggle: !item.classToggle };
          }
          return item;
        }),
      });
    },
    [diamondFilterData, setDiamondFilterData],
  );
  return (
    <div className="search_inner_wrap">
      <div className="search_label">
        <h6>Clarity</h6>
      </div>
      <div className="search_content">
        <div className="check_input_wraper">
          <ul className="scroll_wrapper2 flex-nowrap">
            {diamondFilterData?.clarityList?.map((item, index) => {
              return (
                <li key={`clarity_${index}`}>
                  <div className="checkbox_wrapper">
                    <Form.Check
                      type="checkbox"
                      id={item.MasterTypeValue_Code}
                      name={item.MasterTypeValue_Code}
                      label={item.MasterTypeValue_Code}
                      checked={item.classToggle ? true : false}
                      readOnly
                      onChange={e => {
                        handleCarityToggle(item.Display_Order);
                        const { checked } = e.target;
                        if (checked) {
                          if (
                            values.clarity.includes(item.MasterTypeValue_Code)
                          ) {
                            const newarr = values.clarity.filter(
                              item2 => item2 !== item.MasterTypeValue_Code,
                            );
                            setFieldValue('clarity', newarr);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                clarity: newarr.toString(),
                              }),
                            );
                          } else {
                            setFieldValue('clarity', [
                              ...values.clarity,
                              item.MasterTypeValue_Code,
                            ]);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                clarity: [
                                  ...values.clarity,
                                  item.MasterTypeValue_Code,
                                ].toString(),
                              }),
                            );
                          }
                        } else {
                          setFieldValue(
                            'clarity',
                            values.clarity.filter(
                              v => v !== item.MasterTypeValue_Code,
                            ),
                          );
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              clarity: values.clarity
                                .filter(v => v !== item.MasterTypeValue_Code)
                                .toString(),
                            }),
                          );
                        }
                      }}
                    />
                  </div>
                </li>
              );
            })}
            {diamondDetailListLoading && (
              <div className="skelleton_Wrapper">
                <Skeleton height={40} style={{ width: '80%' }} />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default memo(ClarityList);
