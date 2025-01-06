import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './navbar.scss';
import { useTranslation } from 'react-i18next';

const TopStripe = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const language = useSelector((state) => state.app.language);
    const [CURRENT_LANG, setCURRENT_LANG] = useState('english');

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        dispatch(lng)
    };

    return (

        <div className={'app-navbar-top'}>

            <div className="stripe-text">
                <p>{t('top-sale')} <b className={'shopnow'}>{t('shopnow')} </b></p>
            </div>
            {/*<div className="stripe-lang">*/}
            {/*    <p id={'lang-change'}>English <img id={'lang-control'} alt={'>'} src={'DropDown.png'}/></p>*/}
            {/*</div>*/}
            <div className="dropdown">
                <a class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    {t("chooseLang")}
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li className="dropdown-item">
                        <button className="btn btn-info" onClick={() => handleChangeLanguage('en')}>English</button>
                    </li>
                    <li className="dropdown-item">
                        <button className="btn btn-info" onClick={() => handleChangeLanguage('ru')}>Русский</button>
                    </li>
                    <li className="dropdown-item">
                        <button className="btn btn-info" onClick={() => handleChangeLanguage('de')}>Deutch</button>
                    </li>
                    <li className="dropdown-item">
                        <button className="btn btn-info" onClick={() => handleChangeLanguage('kz')}>Казах</button>
                    </li>
                </ul>
            </div>

        </div>

    );
};

export default TopStripe;