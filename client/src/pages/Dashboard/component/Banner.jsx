import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from '../../..//assets/images/b1.jpeg';
import Image2 from "../../../assets/images/int6.jpeg";
import Image3 from "../../../assets/images/b5.png";
import Image4 from "../../../assets/images/int5.jpeg";

export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 300,
                settings: "unslick",
            },
        ],
    };
    // data for mapping 
    const slides = [
        {
            img: Image1,
            caption: "Online mock interviews : The missing step in your Tech Prep. start today with us ",
        },
        {
            img: Image2,
            caption: "Complete 3 mock interviews this month and unlock a free resume review!",
        },
        {
            img: Image3,
            caption: "Turn potential into performance.",
        },
        {
            img: Image4,
            caption: "Don't fear the interview. Master it.",
        }
    ];

    return (
        <Slider {...settings}>
            {slides.map((slide, index) => (
                <div key={index} className="w-full relative md:h-[400px] lg:h-[450px]">
                    <img
                        src={slide.img}
                        alt={`slide-${index}`}
                        className="h-[450px] w-full px-8 object-container rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-end justify-center p-4 md:items-start md:pt-[38%] lg:pt-[26%]">
                        <div className="bg-black/50 px-4 py-1.5 rounded-md max-w-2xl">
                            <h2 className="text-white text-lg md:text-2xl lg:text-3xl font-bold text-center">
                                {slide.caption}
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}                    