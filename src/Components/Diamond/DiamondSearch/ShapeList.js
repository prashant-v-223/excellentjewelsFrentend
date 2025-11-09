import { memo, useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NoImageAvailable from '../../../Assets/Images/diamond-not-found.svg';

const ShapeList = ({
  values,
  dispatch,
  setFieldValue,
  diamondFilterData,
  setDiamondFilterData,
  searchDiamondSavedData,
  serchDiamondFinalValue,
  diamondDetailListLoading,
  setSearchDiamondSavedData,
}) => {
  const [shapeShow, setShapeShow] = useState(false);
  const handleShapeToggle = useCallback(
    id => {
      setDiamondFilterData({
        ...diamondFilterData,
        shapeList: diamondFilterData?.shapeList?.map(item2 => {
          if (item2.MasterTypeValue_Id === id) {
            return {
              ...item2,
              classToggle: !item2.classToggle,
            };
          }
          return item2;
        }),
      });
    },
    [diamondFilterData, setDiamondFilterData],
  );
  const handleImageError = useCallback(event => {
    event.target.src = NoImageAvailable;
    event.target.className = 'no_image_in_diamond_search';
  }, []);
  return (
    <div className="search_inner_wrap align-items-start">
      <div className="search_label mt10">
        <h6>Shape</h6>
      </div>
      <div className="search_content">
        <div className="shape_select">
          <ul className={shapeShow ? 'expand' : ''}>
            {diamondFilterData?.shapeList?.map((item, index) => {
              return (
                <li key={`shape_${index}`}>
                  <div className="custom_checkbox_shape">
                    <input
                      type="checkbox"
                      id={item.DisplayName}
                      name={item.DisplayName}
                      checked={values?.shape?.includes(
                        item.MasterTypeValue_Code,
                      )}
                      disabled={
                        window.location.pathname === '/setting-jewellery-wise'
                      }
                      readOnly
                      onClick={e => {
                        handleShapeToggle(item.MasterTypeValue_Id);
                        const { checked } = e.target;
                        if (checked) {
                          if (
                            values.shape.includes(item.MasterTypeValue_Code)
                          ) {
                            const newarr = values.shape.filter(
                              item2 => item2 !== item.MasterTypeValue_Code,
                            );

                            setFieldValue('shape', newarr);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                shape: newarr?.toString(),
                              }),
                            );
                          } else {
                            setFieldValue('shape', [
                              ...values.shape,
                              item.MasterTypeValue_Code,
                            ]);
                            dispatch(
                              setSearchDiamondSavedData({
                                ...searchDiamondSavedData,
                                shape: [
                                  ...values.shape,
                                  item.MasterTypeValue_Code,
                                ].toString(),
                              }),
                            );
                          }
                        } else {
                          setFieldValue(
                            'shape',
                            values.shape.filter(
                              v => v !== item.MasterTypeValue_Code,
                            ),
                          );
                          dispatch(
                            setSearchDiamondSavedData({
                              ...searchDiamondSavedData,
                              shape: values.shape
                                .filter(v => v !== item.MasterTypeValue_Code)
                                .toString(),
                            }),
                          );
                        }
                      }}
                    />
                    <label htmlFor={item.DisplayName}>
                      <span>
                        <img
                          src={`http://72.61.170.111:8088/uploads/Diamonds/${item.DisplayName}.svg`}
                          alt={item.DisplayName}
                          // className="injectable"
                          onError={handleImageError}
                        />
                        <h5>{item.DisplayName}</h5>
                      </span>
                    </label>
                  </div>
                </li>
              );
            })}
            {diamondDetailListLoading && (
              <div className="skelleton_Wrapper">
                <Skeleton height={60} style={{ width: '100%' }} />
              </div>
            )}
          </ul>
          <div className="more_button">
            <Button
              variant="secondary"
              onClick={() => setShapeShow(!shapeShow)}
            >
              {shapeShow ? '-' : '+'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ShapeList);
