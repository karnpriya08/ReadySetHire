import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from '../../..//assets/images/b3.jpeg';
import Image2 from "../../../assets/images/int3.jpeg";
import Image3 from "../../../assets/images/int2.png";

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
            caption: "Practice makes perfect. We make practice easy.",
        },
        {
            img: Image2,
            caption: "Practice with purpose. Interview with confidence.",
        },
        {
            img: Image3,
            caption: "Sharpen your skills. Schedule your future.",
        },
    ];

    return (
        <Slider {...settings}>
            {slides.map((slide, index) => (
                <div key={index} className="w-full relative md:h-[500px] lg:h-[650px]">
                    {/* image */}
                    <img src={slide.img} alt={`slide-${index}`}
                        className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 flex items-end justify-center p-4 md:items-start md:pt-[55%] lg:pt-[40%]">
                        {/* message */}
                        <div className="bg-black/50 px-4 py-2 rounded-md max-w-2xl">
                            <h2 className="text-white text-lg md:text-2xl lg:text-4xl font-bold text-center">
                                {slide.caption}
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}                    