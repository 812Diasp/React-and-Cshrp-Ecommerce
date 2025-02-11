import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
const FlashSaleCounter = ({targetDate}) => {
    const { t } = useTranslation();
    const calculateTimeLeft = (target) => {
        let difference = +new Date(target) - +new Date();
        if (difference < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        let timeLeft = {};

        timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
        difference -= timeLeft.days * (1000 * 60 * 60 * 24);

        timeLeft.hours = Math.floor(difference / (1000 * 60 * 60));
        difference -= timeLeft.hours * (1000 * 60 * 60);

        timeLeft.minutes = Math.floor(difference / (1000 * 60));
        difference -= timeLeft.minutes * (1000 * 60);

        timeLeft.seconds = Math.floor(difference / 1000);

        return timeLeft;
    };

    const formatTime = (timeLeft) => { // Accept timeLeft as an argument
        return {
            days: String(timeLeft.days).padStart(2, '0'),
            hours: String(timeLeft.hours).padStart(2, '0'),
            minutes: String(timeLeft.minutes).padStart(2, '0'),
            seconds: String(timeLeft.seconds).padStart(2, '0'),
        };
    };

    // eslint-disable-next-line react/prop-types

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
        const [formattedTimeLeft, setFormattedTimeLeft] = useState(formatTime(timeLeft)); // Pass timeLeft here

        useEffect(() => {
            const intervalId = setInterval(() => {
                const newTimeLeft = calculateTimeLeft(targetDate);
                setTimeLeft(newTimeLeft);
                setFormattedTimeLeft(formatTime(newTimeLeft)); // Update formattedTimeLeft using the new timeLeft
            }, 1000);

            return () => clearInterval(intervalId);
        }, [targetDate]);

        return (
            <div className="flash-sale-counter">
                <h2 className={'bold sale-title'}>{t("flashSales")}</h2>
                <div className="timer-sale">
                    {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
                        <p>Sale finished! New sale will be tomorrow!</p>
                    ) : (
                        <div className={'DHMS-VAL'}>
                            <div className="time-digit">
                                <p>{t("days")}</p>
                                <span>{formattedTimeLeft.days}</span>
                            </div>
                            <div className="twodotclock">
                                <span className={'twodotclock'}>:</span>
                            </div>
                            <div className="time-digit">
                                <p>{t("hours")}</p>
                                <span>{formattedTimeLeft.hours}</span>
                            </div>
                            <div className="twodotclock">
                                <span className={'twodotclock'}>:</span>
                            </div>
                            <div className="time-digit">
                                <p>{t("minutes")}</p>
                                <span>{formattedTimeLeft.minutes}</span>
                            </div>
                            <div className="twodotclock">
                                <span className={'twodotclock'}>:</span>
                            </div>
                            <div className="time-digit">
                                <p>{t("seconds")}</p>
                                <span>{formattedTimeLeft.seconds}</span>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        );
    };
export default FlashSaleCounter;