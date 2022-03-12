import React from 'react';
import CardFilm from "./CardFilm";
import Carousel from "react-multi-carousel";

function CarouselComponent(props) {

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024}, items: 3, slidesToSlide: 3
        },
        tablet: {
            breakpoint: {max: 1024, min: 464}, items: 1, slidesToSlide: 1
        },
        mobile: {
            breakpoint: {max: 464, min: 0}, items: 1, slidesToSlide: 1
        }
    };

    return (
        <div>
            <h2><b>{props.text}</b></h2>
            <hr/>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                infinite={false}
                keyBoardControl={true}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    props.films.map((film, index) =>
                        <div key={index} style={{marginRight: "5px"}}>
                            <CardFilm film={film}/>
                        </div>
                    )
                }
            </Carousel>
            <br/>
        </div>
    );
}

export default CarouselComponent;
