import './StarRating.scss';

// eslint-disable-next-line react/prop-types
const StarRatingSaleCard = ({ rating, quantity }) => {
    // Определяем количество полных звезд, дробной звезды и пустых звезд
    const fullStars = Math.floor(rating);
    const fractionalStar = rating - fullStars;

    const stars = [];

    // Добавляем полные звезды
    for (let i = 0; i < fullStars; i++) {
        stars.push(<span className="star filled" key={`full-${i}`}>&#9733;</span>);
    }

    // Добавляем дробную звезду, если есть
    if (fractionalStar > 0) {
        stars.push(
            <span
                className="star half"
                key="fractional"
                style={{ '--fraction': fractionalStar }}
            >
                &#9733;
            </span>
        );
    }

    // Добавляем пустые звезды
    for (let i = fullStars + (fractionalStar > 0 ? 1 : 0); i < 5; i++) {
        stars.push(<span className="star empty" key={`empty-${i}`}>&#9734;</span>);
    }

    return (
        <div className="star-rating">
            {stars}
            <span className="gray">({quantity})</span>
        </div>
    );
};

export default StarRatingSaleCard;