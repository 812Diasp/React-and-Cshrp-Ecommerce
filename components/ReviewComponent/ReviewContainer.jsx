// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import RatingBar from "./RatingBar/RatingBar.jsx";
import PropTypes from 'prop-types';
import './ReviewContainer.scss';
import { useTranslation } from "react-i18next";
import addReview from "./addReview.js"
import { useSelector } from 'react-redux';
const ReviewContainer = ({ Reviews, averageRating, ProductId }) => {
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({
        title: "",
        pros: "",
        cons: "",
        comment: "",
        rating: 0,
    });
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [updatedReviews, setUpdatedReviews] = useState(Reviews || []);
    const { t } = useTranslation();

    const getRatingCount = (ratingValue) => {
        return updatedReviews ? updatedReviews.filter(review => review.rating === ratingValue).length : 0;
    };

    const handleAddReviewClick = () => {
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setNewReview({
            title: "",
            pros: "",
            cons: "",
            comment: "",
            rating: 0,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
    };

    const handleRatingChange = (rating) => {
        setNewReview((prevReview) => ({ ...prevReview, rating: rating }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addReview(ProductId,newReview);
            setUpdatedReviews([...updatedReviews, response])
            alert('Отзыв успешно добавлен!')
            handleFormClose();
        } catch (error) {
            let errorMessage = 'Ошибка при добавлении отзыва!'
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message
            }
            alert(errorMessage);
        }
    };

    useEffect(() => {
        setUpdatedReviews(Reviews || []);
    }, [Reviews]);

    return (
        <div className="reviews-container">
            <div className={'reviews-star-side'}>
                <h2>{t("reviews")}</h2>
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
                {isAuthenticated ?
                    <button onClick={handleAddReviewClick} className={"add-review-button"}>{t("addreview")}</button> :
                    <p></p>}

            </div>
            <div className={'reviews-text'}>
                {updatedReviews.length > 0 ? (
                    updatedReviews.map((review, index) => (
                        <div key={index} className="review">
                            <div className="review-header">
                                <span className="review-title">{review.title}</span>
                                <div className="review-rating">
                                    <RatingBar rating={review.rating} count={""}/>
                                </div>
                            </div>
                            <div className="review-content">
                                <p className="review-comment">&#34;{review.comment}&#34;</p>
                                {review.pros && <p><strong>{t("pros")}</strong> {review.pros}</p>}
                                {review.cons && <p><strong>{t("cons")}</strong> {review.cons}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-reviews-message">{t("noReviews")}</p>
                )}
            </div>

            {showForm && (
                <div className="review-form-overlay">
                    <div className="review-form">
                        <button className={'close-form-button'} onClick={handleFormClose}>X</button>
                        <h2>{t("addreview")}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">{t("title")}</label>
                                <input type="text" id="title" name="title" value={newReview.title}
                                       onChange={handleInputChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pros">{t("pros")}</label>
                                <input type="text" id="pros" name="pros" value={newReview.pros}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cons">{t("cons")}</label>
                                <input type="text" id="cons" name="cons" value={newReview.cons}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment">{t("comment")}</label>
                                <textarea id="comment" name="comment" value={newReview.comment}
                                          onChange={handleInputChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">{t("rating")}</label>
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= newReview.rating ? 'active' : ''}`}
                                            onClick={() => handleRatingChange(star)}
                                        >
                              &#9733;
                            </span>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className={"submit-review-button"}>{t("submit")}</button>
                        </form>
                    </div>
                </div>
            )}
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
    ProductId: PropTypes.string.isRequired,
    averageRating: PropTypes.number.isRequired,
};

export default ReviewContainer;