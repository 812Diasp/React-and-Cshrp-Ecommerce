import React, {useState} from 'react';
import './registerStyle.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {loginUser, registerUser} from '/src/store/actions/authActions.js'
const Register = () => {
    const [LOGINED, setLOGINED] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
                            <h2>Log in</h2>
                            <p>Enter your details below</p>
                            <form method={"POST"} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="usernameField" className="form-label">Email address</label>
                                    <input type="text" className="form-control" id="usernameField"
                                           aria-describedby="userHelp" name={'username'} required={true}/>
                                    <div id="userHelp" className="form-text">Your username is required</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name={'password'} className="form-control" required={true}
                                           id="exampleInputPassword1"/>
                                </div>
                                <button type="submit" className="button-form-submit">Log in</button>
                                <button type={"button"} onClick={() => {
                                    setLOGINED(false)
                                }} className="button-form-submit-switch">Switch to registration
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className={'register-forma'}>
                            <h2>Create an account</h2>
                            <p>Enter your details below</p>
                            <form method={"POST"} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="usernameField" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="usernameField"
                                           aria-describedby="userHelp" name={'username'} required={true}/>
                                    <div id="userHelp" className="form-text">Your username is required</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name={'email'} id="exampleInputEmail1"
                                           aria-describedby="emailHelp" required={true}/>
                                    <div id="emailHelp" className="form-text">We never share your email with anyone
                                        else.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name={'password'} className="form-control" required={true}
                                           id="exampleInputPassword1"/>
                                </div>
                                <button type="submit" className="button-form-submit">Create account</button>
                                <button type={"button"} onClick={() => {
                                    setLOGINED(true)
                                }} className="button-form-submit-switch">Switch to login
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


