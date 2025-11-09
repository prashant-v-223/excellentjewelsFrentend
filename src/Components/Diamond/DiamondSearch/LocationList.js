import { memo, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LocationList = ({
  dispatch,
  values,
  setFieldValue,
  diamondFilterData,
  setDiamondFilterData,
  setSearchDiamondSavedData,
  searchDiamondSavedData,
  diamondDetailListLoading,
}) => {
  const handleLocationToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        locationList: diamondFilterData.locationList.map(item => {
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
        <h6>Location</h6>
      </div>
      <div className="search_content">
        <div className="check_input_wraper">
          <ul className="flex-nowrap scroll_wrapper6">
            {diamondFilterData?.locationList?.map((item, index) => {
              return (
                <li key={`location_${index}`}>
                  <div className="checkbox_wrapper">
                    <Form.Check
                      type="checkbox"
                      id={`location_${item.MasterTypeValue_Code}`}
                      name={item.MasterTypeValue_Code}
                      label={item.MasterTypeValue_Code}
                      checked={item.classToggle ? true : false}
                      readOnly
                      onChange={e => {
                        handleLocationToggle(item.Display_Order);
                        const { checked } = e.target;
                        if (checked) {
                          if (
                            values.location.includes(item.MasterTypeValue_Code)
                          ) {
                            const newarr = values.location.filter(
                              item2 => item2 !== item.MasterTypeValue_Code,
                            );
                            setFieldValue('location', newarr);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                location: newarr?.toString(),
                              }),
                            );
                          } else {
                            setFieldValue('location', [
                              ...values.location,
                              item.MasterTypeValue_Code,
                            ]);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                location: [
                                  ...values.location,
                                  item.MasterTypeValue_Code,
                                ].toString(),
                              }),
                            );
                          }
                        } else {
                          setFieldValue(
                            'location',
                            values.location.filter(
                              v => v !== item.MasterTypeValue_Code,
                            ),
                          );
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              location: values.location
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
export default memo(LocationList);
