import LocationStripe from "./LocationStripe.jsx";
import {useState} from "react";

const ProfilePage = () => {
    var _AccountSelectedCategory = "profile"

    const handleCatrgoryChange = (e) => {
        // let category = e.currentTarget.getAttribute("data-value");
        _AccountSelectedCategory = e.currentTarget.getAttribute("data-value");
        console.log(_AccountSelectedCategory);
    }
    return (<div className={'profile-container'}>
        <div className={'app-container'}>
            <LocationStripe location={"Home/My Account"} isGreet={true}></LocationStripe>

            <div className="account-section">
                <div className="column-account">
                    <ul>
                        <li>
                            <p className={'account-category'}>Manage My Account</p>
                            <ul>
                                <li data-value={'profile'} onClick={handleCatrgoryChange}
                                    className={'location-active'}>My Profile
                                </li>
                                <li data-value={'adressbook'} onClick={handleCatrgoryChange}
                                    className={'location-notactive'}>Address Book
                                </li>
                                <li data-value={'payment'} onClick={handleCatrgoryChange}
                                    className={'location-notactive'}>My Payment Options
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <p className={'account-category'}>My Orders</p>
                        <li>
                            <ul>
                                <li data-value={'returns'} onClick={handleCatrgoryChange}
                                    className={'location-notactive'}>My Returns
                                </li>
                                <li data-value={'canceledorders'} onClick={handleCatrgoryChange}
                                    className={'location-notactive'}>My Cancellations
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li className={'account-category'}>
                            <p className={'account-category'} data-value={'wishlist'}
                               onClick={handleCatrgoryChange}>My Wishlist</p>
                        </li>
                    </ul>
                </div>
                <div className="edit-profile">
                    <h5 className={"greet text-editprofile"}>Edit Your Profile</h5>
                    <form>
                        <div className="account-info-fields">
                            <div className="account-field">
                                <p>First Name</p>
                                <input className="account-edit-field password-field navbar-search" type="text"
                                       placeholder="Denis"/>
                            </div>
                            <div className="account-field">
                                <p>Last Name</p>
                                <input className="account-edit-field password-field navbar-search" type="text"
                                       placeholder="Tkachenko"/>
                            </div>
                            <div className="account-field">
                                <p>Email</p>
                                <input className="account-edit-field password-field navbar-search" type="text"
                                       placeholder="asoffoto1@gmail.com"/>
                            </div>
                            <div className="account-field">
                                <p>Address</p>
                                <input className="account-edit-field password-field navbar-search" type="text"
                                       placeholder="Stavropol"/>
                            </div>
                        </div>
                        <div className="password-section">
                            <p>Password Changes</p>
                            <input className="account-edit-field password-field navbar-search" type="Password"
                                   placeholder="Current Password"/>

                            <input className="account-edit-field password-field navbar-search" type="Password"
                                   placeholder="New Password"/>

                            <input className="account-edit-field password-field navbar-search" type="Password"
                                   placeholder="Confirm New Password"/>
                        </div>
                        <button className={' mt-3 btn btn-danger btn-confirm-changes'} type={'submit'}>Confirm Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>);
};

export default ProfilePage;