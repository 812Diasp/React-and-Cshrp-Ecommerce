import {useState} from 'react';
import './registerStyle.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {loginUser, registerUser} from '/src/store/actions/authActions.js'
import {useTranslation} from "react-i18next";
const Register = () => {
    const [LOGINED, setLOGINED] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());


        try {
            setError(null);
            if (LOGINED) {
                dispatch(loginUser(data.username, data.password)).then(() => navigate('/'))
            } else {
                dispatch(registerUser(data.username, data.email, data.password)).then(() => setLOGINED(true))

            }


        } catch (err) {
            console.error('Ошибка при отправке запроса:', err);
            setError('Произошла ошибка при отправке запроса');
        }
    };

    return (
        <div className={'container'}>
            <div className={'register-container'}>
                <div>
                    <img src={'/loginSideImage.png'}/>
                </div>
                <div>
                    {error && <div className="error-message">{error}</div>}
                    {LOGINED ? (
                        <div className={'register-forma'}>
                            <h2>{t("login")}</h2>

                            <form method={"POST"} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="usernameField" className="form-label">{t("username")}</label>
                                    <input type="text" className="form-control" id="usernameField"
                                           aria-describedby="userHelp" name={'username'} required={true}/>
                                    <div id="userHelp" className="form-text">{t("usernamerequire")}</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">{t("password")}</label>
                                    <input type="password" name={'password'} className="form-control" required={true}
                                           id="exampleInputPassword1"/>
                                </div>
                                <button type="submit" className="button-form-submit">{t("login")}</button>
                                <button type={"button"} onClick={() => {
                                    setLOGINED(false)
                                }} className="btn btn-info mt-5">{t("toRegister")}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className={'register-forma'}>
                            <h2>{t("createaccount")}</h2>

                            <form method={"POST"} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="usernameField" className="form-label">{t("username")}</label>
                                    <input type="text" className="form-control" id="usernameField"
                                           aria-describedby="userHelp" name={'username'} required={true}/>
                                    <div id="userHelp" className="form-text">{t("usernamerequire")}</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">{t("email")}</label>
                                    <input type="email" className="form-control" name={'email'} id="exampleInputEmail1"
                                           aria-describedby="emailHelp" required={true}/>
                                    <div id="emailHelp" className="form-text">{t("nevershareemail")}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">{t("password")}</label>
                                    <input type="password" name={'password'} className="form-control" required={true}
                                           id="exampleInputPassword1"/>
                                </div>
                                <button type="submit" className="button-form-submit">{t("createaccount")}</button>
                                <button type={"button"} onClick={() => {
                                    setLOGINED(true)
                                }} className="btn btn-info mt-5">{t("toLogin")}
                                </button>

                            </form>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Register;


