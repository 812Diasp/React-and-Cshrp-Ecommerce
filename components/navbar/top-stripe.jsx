
import './navbar.scss'
const TopStripe = () => {
    return (

            <div className={'app-navbar-top'}>

                <div className="stripe-text">
                <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <b
                    className={'shopnow'}>ShopNow</b></p>
                </div>
                <div className="stripe-lang">
                    <p id={'lang-change'}>English <img id={'lang-control'} alt={'>'} src={'DropDown.png'}/></p>
                </div>

            </div>

    );
};

export default TopStripe;