import { memo, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FluorescenceList = ({
  dispatch,
  values,
  setFieldValue,
  diamondFilterData,
  setDiamondFilterData,
  setSearchDiamondSavedData,
  searchDiamondSavedData,
  diamondDetailListLoading,
}) => {
  const handleFluorescenceToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        fluorescenceList: diamondFilterData.fluorescenceList.map(item => {
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
        <h6>Fluorescence</h6>
      </div>
      <div className="search_content">
        <div className="check_input_wraper">
          <ul className="flex-nowrap scroll_wrapper6">
            {diamondFilterData?.fluorescenceList?.map((item, index) => {
              return (
                <li key={`fluorescence_${index}`}>
                  <div className="checkbox_wrapper">
                    <Form.Check
                      type="checkbox"
                      id={`fluorescence_${item.MasterTypeValue_Code}`}
                      name={item.MasterTypeValue_Code}
                      label={item.MasterTypeValue_Code}
                      checked={item.classToggle ? true : false}
                      readOnly
                      onChange={e => {
                        handleFluorescenceToggle(item.Display_Order);
                        const { checked } = e.target;
                        if (checked) {
                          if (
                            values.fluorescence.includes(
                              item.MasterTypeValue_Code,
                            )
                          ) {
                            const newarr = values.fluorescence.filter(
                              item2 => item2 !== item.MasterTypeValue_Code,
                            );
                            setFieldValue('fluorescence', newarr);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                fluorescence: newarr?.toString(),
                              }),
                            );
                          } else {
                            setFieldValue('fluorescence', [
                              ...values.fluorescence,
                              item.MasterTypeValue_Code,
                            ]);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                fluorescence: [
                                  ...values.fluorescence,
                                  item.MasterTypeValue_Code,
                                ].toString(),
                              }),
                            );
                          }
                        } else {
                          setFieldValue(
                            'fluorescence',
                            values.fluorescence.filter(
                              v => v !== item.MasterTypeValue_Code,
                            ),
                          );
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              fluorescence: values.fluorescence
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
                <Skeleton height={40} style={{ width: '70%' }} />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default memo(FluorescenceList);
