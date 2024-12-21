import React from 'react';

// eslint-disable-next-line react/prop-types
const CategoryCard = ({categoryImage,categoryName}) => {
    return (
        <div>

            <div className={"categoryCard"}>
                <img className={'categoryCard-image'} src={`category/${categoryImage}`} alt="img"/>
                <h3 className={'categoryCard-label'}>{categoryName}</h3>
            </div>
        </div>
    );
};

export default CategoryCard;