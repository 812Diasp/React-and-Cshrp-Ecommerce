import {useEffect, useState} from 'react';

import PropTypes from "prop-types";
// eslint-disable-next-line react/prop-types
const Carousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Change to adjust auto-slide interval (milliseconds)

        return () => clearInterval(interval);
    }, [images.length]);
    //валидация пропов
    Carousel.propTypes = {
        images: PropTypes.array.isRequired,
    };
    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="main-content">
            <img loading="lazy" src={images[activeIndex]} className={'banner-slide'} alt={`Slide ${activeIndex + 1}`} />

            <div className="pagination">
                {/* eslint-disable-next-line react/prop-types */}
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );

};

export default Carousel;
