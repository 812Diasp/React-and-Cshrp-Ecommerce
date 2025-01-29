import React, {useEffect} from 'react';
import RatingBar from "./RatingBar/RatingBar.jsx";
import PropTypes from 'prop-types';
import './ReviewContainer.scss'
import {useTranslation} from "react-i18next";
const ReviewContainer = ({ Reviews,averageRating }) => {
    const getRatingCount = (ratingValue) => {
        return Reviews ? Reviews.filter(review => review.rating === ratingValue).length : 0;
    }
    const { t } = useTranslation();



    return (
        <div className="reviews-container">
            <div className={'reviews-star-side'}>
                <h2>Reviews</h2>
                <div className="average-rating">
                    {t("avgrating")} {averageRating}
                </div>
                <div className="rating-bars">
                    <RatingBar rating={5} count={getRatingCount(5)}/>
                    <RatingBar rating={4} count={getRatingCount(4)}/>
                    <RatingBar rating={3} count={getRatingCount(3)}/>
                    <RatingBar rating={2} count={getRatingCount(2)}/>
                    <RatingBar rating={1} count={getRatingCount(1)}/>
                </div>
            </div>
            <div className={'reviews-text'}>
                {Reviews && Reviews.map((review,index) => (
                    <div key={index} className="review">
                        <div className="review-header">
                            <span className="review-title">{review.title}</span>
                            <div className="review-rating">
                                <RatingBar rating={review.rating} count={""}/>
                            </div>
                        </div>
                        <div className="review-content">
                            <p className="review-comment">&#34;{review.comment}&#34;</p>
                            {review.pros && <p><strong>Плюсы:</strong> {review.pros}</p>}
                            {review.cons && <p><strong>Минусы:</strong> {review.cons}</p>}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


ReviewContainer.propTypes = {
    Reviews: PropTypes.arrayOf(
        PropTypes.shape({
            productId: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            pros: PropTypes.string,
            cons: PropTypes.string,
            comment: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,

        })
    ),
    Product: PropTypes.shape({
        id: PropTypes.string.isRequired
    })
};


export default ReviewContainer;