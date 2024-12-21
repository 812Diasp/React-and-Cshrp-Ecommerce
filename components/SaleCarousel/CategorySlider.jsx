import React from 'react';
import Slider from "react-slick";
import CategoryCard from "./CategoryCard.jsx";

// eslint-disable-next-line react/prop-types
const CategorySlider = ({categories}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay: false,
    };
    //сдесь будут fetch даные для карточек

    return (
        <div className="category-slider">
            <Slider {...settings}>
                {/* eslint-disable-next-line react/prop-types */}
                {categories.map((item,key) =>
                    <CategoryCard key={key} categoryImage={item.image} categoryName={item.name}></CategoryCard>
                )}

            </Slider>
        </div>

    );
};

export default CategorySlider;