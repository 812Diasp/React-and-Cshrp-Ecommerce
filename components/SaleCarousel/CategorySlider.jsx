
import CategoryCard from "./CategoryCard.jsx";
import './Category.scss'
// eslint-disable-next-line react/prop-types
const CategorySlider = ({categories}) => {
    return (
        <div className="category-slider mb-5">
            {/* eslint-disable-next-line react/prop-types */}
                {categories.map((item,key) =>
                    <CategoryCard key={key} categoryImage={item.image} categoryName={item.name}></CategoryCard>
                )}
        </div>

    );
};

export default CategorySlider;