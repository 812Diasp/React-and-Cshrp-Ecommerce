import {useEffect,useState} from 'react';
import './Profile.scss'
//location divided by / (f.example Home/Cart, Home/My Account, Account/My Account/Product/View Cart/Check Out
// eslint-disable-next-line react/prop-types
const LocationStripe = ({location,isGreet}) => {
    let locationstr = location;
    const [locationHtml,setLocationHtml] = useState("")
    function createLocationNodeText(){
        let textNode = '';
        // eslint-disable-next-line react/prop-types
        if (typeof location!=='string' || locationstr.indexOf('/')===undefined){
            return 'error'
        }else{
            const arr = locationstr.split("/");

            for (let i = 0; i < arr.length; i++) {
               if (arr.length-1===i){
                   textNode+=`<span class="location-active">${arr[i]}</span>`
               } else{
                   textNode+=`<span class="location-notactive">${arr[i]}</span><span class="location-slash">/</span>`
               }
            }

        }
        return textNode
    }

    useEffect(() => {
        setLocationHtml(createLocationNodeText())
    }, [locationHtml]);
    return (
        <div className={'location-stripe'}>
            <div className="location" dangerouslySetInnerHTML={{__html:locationHtml}}>

            </div>
            {isGreet ? <div className="greet">
                <p className={'greet'}>Hello Denis T.</p>
            </div> : <p></p>}


        </div>
    );
};

export default LocationStripe;