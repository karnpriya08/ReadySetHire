import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from '../../../assets/images/person1.jpeg';
import Image2 from "../../../assets/images/person3.jpeg";
import Image3 from "../../../assets/images/person2.jpeg";
import Image4 from "../../../assets/images/person4.webp";
import Image5 from "../../../assets/images/person5.jpeg";

export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        adaptiveHeight: true,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
    // person  data for slide 
    const slides = [
        {
            img: Image1,
            name: "Daniel Brown ",
            designation: 'founder/CEO'
        },
        {
            img: Image2,
            name: "Miyang Chan ",
            designation: 'Software Engineer'
        },
        {
            img: Image3,
            name: "steven woford",
            designation: 'Sales Manager'
        },
        {
            img: Image4,
            name: "Yash Gupta ",
            designation: 'Project Manager'
        },
        {
            img: Image5,
            name: "nina lolawani",
            designation: 'HR Manager'
        },
    ];

    return (
        <Slider {...settings}>
            {slides.map((slide, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 " >
                    {/* image */}
                    <img src={slide.img} alt={`slide-${index}`}
                        className="rounded-lg h-52 w-40 object-cover mb-3" />
                    {/* name and designation */}
                    <h1 className="text-lg font-semibold">{slide.name}</h1>
                    <h3 className="text-sm text-gray-600">{slide.designation}</h3>
                </div>
            ))}
        </Slider>
    );
}