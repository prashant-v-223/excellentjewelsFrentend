import { memo, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CertificateList = ({
  dispatch,
  values,
  setFieldValue,
  diamondFilterData,
  setDiamondFilterData,
  setSearchDiamondSavedData,
  searchDiamondSavedData,
  diamondDetailListLoading,
}) => {
  const handleLabToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        labList: diamondFilterData.labList.map(item => {
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
        <h6>Certificate</h6>
      </div>
      <div className="search_content">
        <div className="check_input_wraper">
          <ul>
            {diamondFilterData?.labList?.map((item, index) => {
              return (
                <li key={`certificate_${index}`}>
                  <div className="checkbox_wrapper">
                    <Form.Check
                      type="checkbox"
                      id={item.MasterTypeValue_Code}
                      name={item.MasterTypeValue_Code}
                      label={item.MasterTypeValue_Code}
                      checked={item.classToggle ? true : false}
                      readOnly
                      onChange={e => {
                        handleLabToggle(item.Display_Order);
                        const { checked } = e.target;
                        if (checked) {
                          if (values.lab.includes(item.MasterTypeValue_Code)) {
                            const newarr = values.lab.filter(
                              item2 => item2 !== item.MasterTypeValue_Code,
                            );
                            setFieldValue('lab', newarr);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                lab: newarr?.toString(),
                              }),
                            );
                          } else {
                            setFieldValue('lab', [
                              ...values.lab,
                              item.MasterTypeValue_Code,
                            ]);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                lab: [
                                  ...values.lab,
                                  item.MasterTypeValue_Code,
                                ].toString(),
                              }),
                            );
                          }
                        } else {
                          setFieldValue(
                            'lab',
                            values.lab.filter(
                              v => v !== item.MasterTypeValue_Code,
                            ),
                          );
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              lab: values.lab
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
                <Skeleton height={40} style={{ width: '20%' }} />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default memo(CertificateList);
