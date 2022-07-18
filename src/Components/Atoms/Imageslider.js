import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import img1 from "../../Assets/Images/img1.jpeg"
import img2 from "../../Assets/Images/img2.jpg"
import img3 from "../../Assets/Images/img3.jpg"

const Imageslider = () => {
    const images = [
        img1, img2, img3,
    ];

    return (
        <Zoom scale={1.4} indicators={false} duration={2000} arrows={false} canSwipe={true} infinite={true}>
            {images.map((each, index) => (
                <div key={index}>
                    <img style={{ objectFit: "cover", width: "120%", height:"509px" }} alt="Slide Image" src={each} />
                </div>
            ))}
        </Zoom>
    );
};

export default Imageslider;