import React from "react";
import { Link } from "react-router-dom";
import "../../assets/index.css";

const NotFound = () => {
    return (
        <>
            <div className="bg-purple">
                <div className="stars">
                    <div className="central-body">
                        <img
                            className="image-404"
                            alt="404"
                            src="http://salehriaz.com/404Page/img/404.svg"
                            width="300px"
                        />
                        <Link className="btn-go-home" to="/">GO BACK HOME</Link>
                    </div>
                    <div className="objects">
                        <img
                            className="object_rocket"
                            alt="rocket"
                            src="http://salehriaz.com/404Page/img/rocket.svg"
                            width="40px"
                        />
                        <div className="earth-moon">
                            <img
                                className="object_earth"
                                alt="earth"
                                src="http://salehriaz.com/404Page/img/earth.svg"
                                width="100px"
                            />
                            <img
                                className="object_moon"
                                alt="moon"
                                src="http://salehriaz.com/404Page/img/moon.svg"
                                width="80px"
                            />
                        </div>
                        <div className="box_astronaut">
                            <img
                                className="object_astronaut"
                                alt="astronaut"
                                src="http://salehriaz.com/404Page/img/astronaut.svg"
                                width="140px"
                            />
                        </div>
                    </div>
                    <div className="glowing_stars">
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
