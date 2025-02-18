import React from 'react';
import './About.scss'
const About = () => {
    return (
        <div className={'container'}>

            <div className="about-first-section">
                <div className={'about-first-section-text'}>
                    <h1>Контакты для связи</h1>
                    <h2 className={'mt-5'}>amakiller229@gmail.com</h2>
                    <h2 className={'mt-5'}>+79682647409</h2>
                </div>
                <div>
                    <img className={'about-first-section-img'} src={'https://images.hdqwalls.com/download/cyberpunk-cityscape-4k-hf-2048x2048.jpg'}/>
                </div>
            </div>

        </div>
    );
};

export default About;