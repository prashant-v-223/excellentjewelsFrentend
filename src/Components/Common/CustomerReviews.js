import { getWebCustomerReview } from 'Components/Redux/reducers/jewellery.slice';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StartIcon from '../../Assets/Images/star.svg';
import ReviewImg from '../../Assets/Images/review_user.svg';
import _, { times } from 'lodash';

function CustomerReviews() {
  const dispatch = useDispatch();

  const { customerReviewList, customerReviewLoader } = useSelector(
    ({ jewellery }) => jewellery,
  );

  const onError = e => {
    e.target.src = ReviewImg;
  };

  const starIcon = (
    <li>
      <img src={StartIcon} alt="" className="w-100 h-100 object-fit-cover" />
    </li>
  );

  useEffect(() => {
    dispatch(getWebCustomerReview());
  }, [dispatch]);

  return (
    <>
      {!customerReviewLoader &&
        _.map(customerReviewList, data => {
          return (
            <div className="review_card_wrap">
              <div className="d-flex mb-2">
                <div className="review_img">
                  {data.ImgUrl.length !== 0 ? (
                    <img
                      src={data.ImgUrl}
                      alt="customerImage"
                      onError={onError}
                      className="w-100 h-100"
                    />
                  ) : (
                    <img
                      src={ReviewImg}
                      alt="customerImage"
                      className="w-100 h-100"
                    />
                  )}
                </div>
                <div className="user_info">
                  <h5 className="m-0 ff_Mulish">
                    {data?.User_Name ? data?.User_Name : ''}
                  </h5>
                  <ul className="rating_img">
                    {data?.Rating &&
                      times(data.Rating || 0, () => {
                        return starIcon;
                      })}
                  </ul>
                </div>
              </div>
              <h6 className="review_title ff_Mulish">
                {data?.Main_Header ? data?.Main_Header : ''}
              </h6>
              <p className="review_desc ff_Mulish">
                {data?.Description ? data?.Description : ''}
              </p>
            </div>
          );
        })}
    </>
  );
}

export default memo(CustomerReviews);
