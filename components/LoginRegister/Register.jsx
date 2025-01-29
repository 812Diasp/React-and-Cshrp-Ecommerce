import {useState} from 'react';
import './registerStyle.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {loginUser, registerUser} from '/src/store/actions/authActions.js'
import {useTranslation} from "react-i18next";
import {setAuth} from "../../src/store/features/auth/authSlice.js";
import {reset} from "../../src/store/features/auth/authSlice";
import axios from "axios";
const Register = () => {
    const [LOGINED, setLOGINED] = useState(false);
    const [error, setError] = useState(null);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirmCodeInput, setShowConfirmCodeInput] = useState(false);
    const [showResetCodeInput, setShowResetCodeInput] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null)
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            if (LOGINED) {
                // Login Logic
                if(forgotPasswordMode) {
                    if(!showResetCodeInput) {
                        await handleForgotPasswordRequest(data.email);
                        setLoading(false);
                        return;
                    } else {
                        await handleResetPassword(data.email, data.resetCode, data.newPassword);
                        setLoading(false);
                        return;
                    }
                }
                await handleLogin(data.email, data.password);
                setLoading(false);

            } else {
                await handleRegister(data.username, data.email, data.password);
                setLoading(false);
            }
        } catch (err) {
            console.error('Ошибка при отправке запроса:', err);
            setError('Произошла ошибка при отправке запроса');
            setLoading(false);
        }
    };
    const handleLogin = async (email, password) => {
        try{
            await  dispatch(loginUser(email, password))
                .then(async () => {
                    setError(null);
                    setConfirmationCode(null);
                    setShowConfirmCodeInput(true);
                    setLoginEmail(email);
                    setLoginPassword(password)
                    alert('Confirmation code was sent to your email');
                })
                .catch((err) => {
                    setError('Login failed, try again.');
                    console.error('Login failed:', err);
                })
        } catch(err) {
            console.error('Login error:', err);
            setError('Login failed, try again.');
        }
    }
    const handleRegister = async (username, email, password) => {
        try {
            await dispatch(registerUser(username, email, password))
                .then(async (user) => {
                    setConfirmationCode(null);
                    setShowConfirmCodeInput(true);
                    setLoginEmail(email);
                    setLoginPassword(password)
                    setLOGINED(true);
                    alert('Confirmation code was sent to your email');
                })
                .catch((err) => {
                    setError("Registration failed, try again")
                    console.error('Register failed:', err);
                })
        }
        catch(err) {
            setError("Registration failed, try again");
            console.error('Register error:', err);
        }
    };


    const handleConfirmLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const response =  await axios.post("http://localhost:5248/api/auth/login/confirm", {
                email: data.email,
                confirmationCode: data.confirmationCode
            });

            const token = response.data.token;
            const user = response.data.user;

            sessionStorage.setItem('token', token);
            dispatch(setAuth({ isAuthenticated: true }));
            dispatch(reset());
            navigate('/');
            setLoading(false);
        } catch (err) {
            setError('Login confirm failed, try again.');
            console.error("Login confirm error:", err);
            setLoading(false);
        }
    };
    const handleForgotPasswordRequest = async (email) => {
        try {
            const response =  await axios.post("http://localhost:5248/api/auth/forgot-password/request", {
                email: email
            });
            alert(response.data);
            setShowResetCodeInput(true);
            setResetEmail(email)

        } catch (err) {
            setError('Can`t find this email. Please, check your credentials');
            console.error("Forgot password error:", err)
        }
    };

    const handleResetPassword = async (email, resetCode, newPassword) =>
    {

        setLoading(true)
        setError(null);


        try {
            const response = await axios.post("http://localhost:5248/api/auth/forgot-password/reset", {
                email: email,
                resetCode: resetCode,
                newPassword: newPassword
            });
            alert(response.data);
            setForgotPasswordMode(false);
            setLOGINED(true)
            setLoading(false);
            setShowResetCodeInput(false)
        } catch (err)
        {
            setError('Reset failed, try again');
            console.error("Reset password failed:", err);
            setLoading(false);
        }
    };
    const handleToLogin = () => {
        setLOGINED(true);
        setForgotPasswordMode(false);
        setShowConfirmCodeInput(false);
        setShowResetCodeInput(false);
    };
    const handleToRegister = () => {
        setLOGINED(false);
        setForgotPasswordMode(false);
        setShowConfirmCodeInput(false);
        setShowResetCodeInput(false);
    };
    const handleToForgotPassword = () => {
        setForgotPasswordMode(true);
        setShowConfirmCodeInput(false);
        setShowResetCodeInput(false);
    }

    return (
        <div className={'container'}>
            <div className={'register-container'}>
                <div>
                    <img src={'/loginSideImage.png'} alt={"login"} />
                </div>
                <div>
                    {LOGINED ? (
                        <div className={'register-forma'}>
                            <h2>{t(forgotPasswordMode ? "resetPassword" : "login")}</h2>
                            {error && <div className="error-message">{error}</div>}

                            {forgotPasswordMode ? (
                                    !showResetCodeInput ? (
                                        <form method={"POST"} onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">{t("email")}</label>
                                                <input type="email" className="form-control" name={'email'} id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
                                            </div>

                                            <button type="submit" className="button-form-submit" disabled={loading}>Send reset code</button>
                                            <button type={"button"} onClick={handleToLogin} className="button-form-submit-1 mt-5">{t("toLogin")}
                                            </button>
                                        </form>
                                    ) : (
                                        <form method={"POST"} onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">{t("email")}</label>
                                                <input type="email" className="form-control" name={'email'} id="exampleInputEmail1" aria-describedby="emailHelp" required={true} value={resetEmail} readOnly/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="resetCode" className="form-label">Reset Code</label>
                                                <input type="text" className="form-control" name={'resetCode'}  required={true}  />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="newPassword" className="form-label">New password</label>
                                                <input type="password" className="form-control" name={'newPassword'}  required={true}  />
                                            </div>
                                            <button type="submit" className="button-form-submit" disabled={loading}>{t("resetPassword")}</button>
                                            <button type={"button"} onClick={handleToLogin} className="button-form-submit-1 mt-5">{t("toLogin")}
                                            </button>
                                        </form>
                                    )
                                ) :
                                (
                                    !showConfirmCodeInput && (
                                        <form method={"POST"} onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">{t("email")}</label>
                                                <input type="email" className="form-control" name={'email'} id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
                                                <div id="emailHelp" className="form-text">{t("nevershareemail")}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">{t("password")}</label>
                                                <input type="password" name={'password'} className="form-control" required={true} id="exampleInputPassword1" />
                                            </div>

                                            <button type="submit" className="button-form-submit" disabled={loading}>{t("login")}</button>
                                            <p onClick={handleToForgotPassword} className={"forgot-password"}>Forgot password?</p>
                                            <button type={"button"} onClick={handleToRegister} className="button-form-submit-1 mt-5">{t("toLogin")}
                                            </button>
                                        </form>
                                    )
                                )
                            }
                            {showConfirmCodeInput && !forgotPasswordMode && (
                                <form method={"POST"} onSubmit={handleConfirmLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">{t("email")}</label>
                                        <input type="email" className="form-control" name={'email'} id="exampleInputEmail1" aria-describedby="emailHelp" required={true} value={loginEmail} readOnly/>
                                        <input type="hidden" className="form-control" name={'password'}   value={loginPassword}   />
                                        <div id="emailHelp" className="form-text">{t("nevershareemail")}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmationCode" className="form-label">Confirmation Code</label>
                                        <input type="text" className="form-control" name={'confirmationCode'} required={true} />
                                    </div>
                                    <button type="submit" className="button-form-submit" disabled={loading}>Confirm</button>
                                </form>
                            )}
                        </div>
                    ) : (
                        <div className={'register-forma'}>
                            {error && <div className="error-message">{error}</div>}
                            <h2>{t("createaccount")}</h2>
                            {!showConfirmCodeInput ? (
                                    <form method={"POST"} onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="usernameField" className="form-label">{t("username")}</label>
                                            <input type="text" className="form-control" id="usernameField"
                                                   aria-describedby="userHelp" name={'username'} required={true} />
                                            <div id="userHelp" className="form-text">{t("usernamerequire")}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">{t("email")}</label><input type="email" className="form-control" name={'email'} id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
                                            <div id="emailHelp" className="form-text">{t("nevershareemail")}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1"
                                                   className="form-label">{t("password")}</label>
                                            <input type="password" name={'password'} className="form-control" required={true} id="exampleInputPassword1" />
                                        </div>
                                        <button type="submit" className="button-form-submit"  disabled={loading}>{t("createaccount")}</button>
                                        <button type={"button"} onClick={handleToLogin} className="button-form-submit-1 mt-5">{t("toLogin")}
                                        </button>
                                    </form>
                                ) :
                                (<form method={"POST"} onSubmit={handleConfirmLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">{t("email")}</label>
                                        <input type="email" className="form-control" name={'email'} id="exampleInputEmail1" aria-describedby="emailHelp" required={true} value={loginEmail} readOnly/>
                                        <input type="hidden" className="form-control" name={'password'}   value={loginPassword}   />
                                        <div id="emailHelp" className="form-text">{t("nevershareemail")}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmationCode" className="form-label">Confirmation Code</label>
                                        <input type="text" className="form-control" name={'confirmationCode'} required={true} />
                                    </div>
                                    <button type="submit" className="button-form-submit" disabled={loading}>Confirm</button>
                                </form>) }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;