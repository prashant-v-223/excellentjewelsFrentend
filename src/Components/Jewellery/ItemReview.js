import React, { memo } from 'react';
import { Button, Container, Form, Pagination } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import userImg from '../../Assets/Images/user.jpg';
import Star from '../../Assets/Images/star.svg';
import Share from '../../Assets/Images/share.svg';
import { OptimizedImage } from 'utils/performanceUtils';

const ItemReview = () => {
  return (
    <Container>
      <h5 className="mb25">Item Reviews</h5>
      <div className="review_form_wrap mb40 mb20-sm">
        <Form>
          <div className="rating_wrapper mb20">
            <h6 className="fs_16 text_extra_light mb10">Rating</h6>
            <Rating
              fillColorArray={[
                '#f17a45',
                '#f19745',
                '#f1a545',
                '#f1b345',
                '#f1d045',
              ]}
            />
          </div>
          <Form.Group
            className="form_group mb25"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control type="email" placeholder="Email address" />
          </Form.Group>
          <Form.Group
            className="form_group mb25"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control as="textarea" rows={3} placeholder="Review" />
          </Form.Group>
          <Form.Group
            className="form_group mb25"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>How old are you</Form.Label>
            <div className="d-flex flex-wrap">
              <Form.Check
                type="radio"
                name="age"
                className="mr20"
                label="18-24"
                id="18-24"
              />
              <Form.Check
                type="radio"
                name="age"
                className="mr20"
                label="25-34"
                id="25-34"
              />
              <Form.Check
                type="radio"
                name="age"
                className="mr20"
                label="35-44"
                id="35-44"
              />
              <Form.Check
                type="radio"
                name="age"
                className="mr20"
                label="45-54"
                id="45-54"
              />
              <Form.Check
                type="radio"
                name="age"
                className="mr20"
                label="55+"
                id="55+"
              />
            </div>
          </Form.Group>
          <Button variant="primary" className="rounded-pill btn_shadow px40">
            Submit
          </Button>
        </Form>
      </div>
      <div className="user_review_wrapper">
        <div className="user_review_box pt30 pb30">
          <div className="user_review_head d-flex align-items-center justify-content-between mb15">
            <div className="user_info d-flex align-items-center">
              <div className="user_img">
                <img src={userImg} alt="" />
              </div>
              <div className="userName">
                <h6 className="mb5">James H.</h6>
                <div className="rating d-flex">
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                </div>
              </div>
            </div>
            <div className="date">
              <p className="m0 fs_16">04/03/2023</p>
            </div>
          </div>
          <h6>Excellent corporation is the best way to buy your ring</h6>
          <p>
            This buying experience was above my expectations. Buying anything
            online can be daunting, especially for something like an engagement
            ring. The website made the process easy within the comfort of my
            home. Ioriginally placed my order for a smaller sized diamond, and
            had second guessed my decision a day after placing my order, I
            called and spoke toRead more about review stating Excellent
            ServiceThis buying experience was above my expectations. Buying
            anything online can be daunting, especially for
          </p>
          <div className="share_button">
            <Button variant="link">
              <img src={Share} alt="" /> Share
            </Button>
          </div>
        </div>
        <div className="user_review_box pt30 pb30">
          <div className="user_review_head d-flex align-items-center justify-content-between mb15">
            <div className="user_info d-flex align-items-center">
              <div className="user_img">
                <img src={userImg} alt="" />
              </div>
              <div className="userName">
                <h6 className="mb5">James H.</h6>
                <div className="rating d-flex">
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                </div>
              </div>
            </div>
            <div className="date">
              <p className="m0 fs_16">04/03/2023</p>
            </div>
          </div>
          <h6>Excellent corporation is the best way to buy your ring</h6>
          <p>
            This buying experience was above my expectations. Buying anything
            online can be daunting, especially for something like an engagement
            ring. The website made the process easy within the comfort of my
            home. Ioriginally placed my order for a smaller sized diamond, and
            had second guessed my decision a day after placing my order, I
            called and spoke toRead more about review stating Excellent
            ServiceThis buying experience was above my expectations. Buying
            anything online can be daunting, especially for
          </p>
          <div className="share_button">
            <Button variant="link">
              <img src={Share} alt="" /> Share
            </Button>
          </div>
        </div>
        <div className="user_review_box pt30 pb30">
          <div className="user_review_head d-flex align-items-center justify-content-between mb15">
            <div className="user_info d-flex align-items-center">
              <div className="user_img">
                <img src={userImg} alt="" />
              </div>
              <div className="userName">
                <h6 className="mb5">James H.</h6>
                <div className="rating d-flex">
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                  <img src={Star} alt="" className="mr5" />
                </div>
              </div>
            </div>
            <div className="date">
              <p className="m0 fs_16">04/03/2023</p>
            </div>
          </div>
          <h6>Excellent corporation is the best way to buy your ring</h6>
          <p>
            This buying experience was above my expectations. Buying anything
            online can be daunting, especially for something like an engagement
            ring. The website made the process easy within the comfort of my
            home. Ioriginally placed my order for a smaller sized diamond, and
            had second guessed my decision a day after placing my order, I
            called and spoke toRead more about review stating Excellent
            ServiceThis buying experience was above my expectations. Buying
            anything online can be daunting, especially for
          </p>
          <div className="share_button">
            <Button variant="link">
              <img src={Share} alt="" /> Share
            </Button>
          </div>
        </div>
        <div className="review_pagination_wrap mt50">
          <Pagination>
            <Pagination.Prev className="pravButton" />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next className="nextButton" />
          </Pagination>
        </div>
      </div>
    </Container>
  );
};
export default memo(ItemReview);
