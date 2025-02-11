
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RatingBar.scss';

// eslint-disable-next-line react/prop-types
const RatingBar = ({ rating, count }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon key={i} className={'star'} icon={['fas', 'star']}  fill={'gold'}/>);
        }
        return stars;
    };

    return (
        <div className="rating-bar">
            <div className={"stars"}>{renderStars()}</div>
            <span className="count">{count}</span>
        </div>
    );
};

export default RatingBar;