import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import jwt from "jsonwebtoken";
import "./wheelOfCoupons.css";
import audio from "./Wheel_of_cupons.mp3";
import { getCoins, removeCoin } from "../../Redux/Users/userActions";

export const WheelOfCoupons = () => {
    const currentUser = JSON.parse(localStorage.getItem("token"))
        ? jwt.verify(
            JSON.parse(localStorage.getItem("token")),
            process.env.REACT_APP_SECRET_KEY
        )
        : null;

    const dispatch = useDispatch();
    const {coins} = useSelector((state) => state.userReducer)
    const [idle, setIdle] = React.useState(true);
    const [state, setState] = React.useState();
    const [degrees, setDegrees] = React.useState(0);
    const cycles = 15 * 360;

    React.useEffect(() => {
        dispatch(getCoins(currentUser?.id));
    },[idle,dispatch]);

    const variants = {
        idle: {},
        start: {
            pointerEvents: "none",
            transform: `rotate(${degrees + cycles}deg)`,
        },
        end: {
            pointerEvents: "auto",
            transform: `rotate(${degrees}deg)`,
        },
    };
    const generateAward = () => {
        const percent = Math.ceil(Math.random() * 100);
        let discount;
        console.log(percent);
        switch (true) {
            case percent <= 1:
                discount = 50;
                // 180 = 160 ~ 200
                setDegrees(Math.floor(Math.random() * (200 - 160 + 1)) + 160);
                break;
            case percent <= 5:
                discount = 25;
                // 45 = 25 ~ 65
                setDegrees(Math.floor(Math.random() * (65 - 25 + 1)) + 25);
                break;
            case percent <= 15:
                discount = 20;
                // 225 = 205 ~ 245
                setDegrees(Math.floor(Math.random() * (245 - 205 + 1)) + 205);
                break;
            case percent <= 30:
                discount = 15;
                // 135 = 115 ~ 155
                setDegrees(Math.floor(Math.random() * (155 - 115 + 1)) + 115);
                break;
            case percent <= 40:
                discount = 10;
                // 315 = 295 ~ 335
                setDegrees(Math.floor(Math.random() * (335 - 295 + 1)) + 295);
                break;
            case percent <= 75:
                discount = 5;
                // 270 = 250 ~ 290
                setDegrees(Math.floor(Math.random() * (290 - 250 + 1)) + 250);
                break;
            case percent <= 95:
                discount = 2;
                // 90 = 70 ~ 110
                setDegrees(Math.floor(Math.random() * (110 - 70 + 1)) + 70);
                break;
            default:
                discount = 0;
                // 360 = 340 ~ 20
                if (Math.random() < 0.5) {
                    setDegrees(Math.floor(Math.random() * (20 - 0 + 1)) + 0);
                } else {
                    setDegrees(
                        Math.floor(Math.random() * (360 - 340 + 1)) + 340
                    );
                }
                break;
        }
        return discount;
    };

    const playAudio = () => {
        new Audio(audio).play();
    };


    const addCoupon = () => {
        //Here is where i would add a coupon to user but we dont have any coupon system yet
    };

    const spin = () => {
        dispatch(removeCoin(currentUser?.id))
        playAudio();
        const discount = generateAward();
        setState(true);
        setIdle(false);
        setTimeout(async () => {
            if(discount){
                alert(`Congratulations! You got a %${discount} discount!`)
                addCoupon()
            }else{
                alert("Thats so sad! Maybe you ll get it another time c:");
            }
            setState(false);
            setIdle(true);
        }, 10000);
    };

    return (
        <div className="game-container">
            <div>
                <h2>How to play</h2>
                <p>Just press Spin and close ur eyes!</p>
                <h2>How to get more coins</h2>
                <p>You will get coins every $1000 spent.</p>
                <p>¿Cool right?</p>
            </div>
            <div className="roulette-container">
                <h1>Cupon Roulette</h1>
                <div >
                    <motion.img
                        variants={variants}
                        animate={idle ? "idle" : state ? "start" : "end"}
                        transition={
                            state
                                ? { duration: 8.897, ease: "easeOut" }
                                : { duration: 2, ease: "easeOut" }
                        }
                        className="roulette"
                        src="https://res.cloudinary.com/dpw5docvm/image/upload/v1629446175/Roulette_cuwthy.png"
                        alt="roulette"
                    />
                    <img
                        className="marker"
                        src="https://res.cloudinary.com/dpw5docvm/image/upload/v1629446169/Roulette_Arrow_xnecnv.png"
                        alt="roulette_arrow"
                    />
                </div>
                <span>remaining coins: {coins}</span>
                <input
                    type="button"
                    onClick={spin}
                    className="button"
                    value="Spin"
                />
            </div>
        </div>
    );
};
export default WheelOfCoupons;
