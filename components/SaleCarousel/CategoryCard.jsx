
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CategoryCard = ({categoryImage,categoryName}) => {
    const { t } = useTranslation();
    return (
        <div>
            <Link to={`/products/category/${encodeURIComponent(categoryName)}`}>
            <div className={"categoryCard"}>
                <img loading="lazy" className={'categoryCard-image'} src={`category/${categoryImage}`} alt="img"/>
                <h3 className={'categoryCard-label'}>{t(categoryName)}</h3>
            </div>
            </Link>
        </div>
    );
};

export default CategoryCard;