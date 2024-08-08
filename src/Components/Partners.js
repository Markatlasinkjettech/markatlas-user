import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from './Images/1.jpeg';
import image2 from './Images/2.jpg';
import image3 from './Images/3.jpeg';
import image5 from './Images/R.png';
import image6 from './Images/as.png';

const VendorCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-10 ">
      <div className="py-5">
        <div className="bg-white p-6 rounded-lg">
          <Slider {...settings}>
            <div className="p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  src={image1}
                  alt="Vendor 1"
                  className="max-h-32 w-auto mx-auto transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  src={image2}
                  alt="Vendor 2"
                  className="max-h-32 w-auto mx-auto transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  src={image3}
                  alt="Vendor 3"
                  className="max-h-32 w-auto mx-auto transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  src={image5}
                  alt="Vendor 5"
                  className="max-h-32 w-auto mx-auto transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="h-full flex items-center justify-center">
                <img
                  src={image6}
                  alt="Vendor 6"
                  className="max-h-32 w-auto mx-auto transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default VendorCarousel;
