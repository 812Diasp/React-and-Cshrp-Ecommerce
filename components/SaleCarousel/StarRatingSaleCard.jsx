
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// eslint-disable-next-line react/prop-types
const StarRatingSaleCard = ({rating,quantity}) => {
    library.add(fab, fas, far)

    // Добавляем стили 'solid'
    const fullStars = Math.floor(rating);
    const fractionalStar = rating - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon className={'star'} icon={['fas', 'star']} key={i} fill={'gold'}/>);
    }

    if (fractionalStar > 0) {
        stars.push(
            <FontAwesomeIcon icon={['fas','star-half-alt']} className={'star'} key={'fract'} fill={'gold'}/>);
    }

    for (let i = fullStars + (fractionalStar > 0 ? 1 : 0); i < 5; i++) {
        stars.push(<FontAwesomeIcon className={'star'} icon={['far', 'star']} key={i} fill={'gold'}/>);
    }

    return (
        <div className="star-rating ">{stars} <span className={'gray'}>({quantity})</span></div>
    );
};

export default StarRatingSaleCard;