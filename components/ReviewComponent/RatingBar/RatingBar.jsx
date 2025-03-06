import './RatingBar.scss';

// eslint-disable-next-line react/prop-types
const RatingBar = ({ rating, count }) => {
    // Создаем массив звезд на основе рейтинга
    const stars = Array.from({ length: rating }, (_, i) => (
        <span
            key={i}
            className={`star ${i < rating ? 'filled' : 'empty'}`}
        >
            &#9733;
        </span>
    ));

    return (
        <div className="rating-bar">
            <div className="stars">{stars}</div>
            <span className="count">{count}</span>
        </div>
    );
};

export default RatingBar;