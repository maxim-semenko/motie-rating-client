import React from 'react'
import NavigationBar from "./NavigationBar"
import Footer from "../../Footer"
import {Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import 'react-slideshow-image/dist/styles.css'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function TopPage() {

    const slideImages = [
        {
            url: 'https://kinodrive.cc/uploads/posts/2015-12/1451013412_1.jpg',
            caption: 'Slide 1'
        },
        {
            url: 'https://i.pinimg.com/originals/e2/f2/5a/e2f25a10830bc3880a313f376399a8f0.jpg',
            caption: 'Slide 2'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/ru/f/fc/Thor_poster.jpg',
            caption: 'Slide 3'
        },
    ];

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px"}}>
                        <Jumbotron className="bg-dark text-white" style={{textAlign: "left"}}>
                            <h1>The best films in every genre by all time</h1>
                            <br/>
                            <h2>TOP 10 ACTION FILMS </h2>
                            <br/>
                            <h2>TOP 10 COMEDY FILMS</h2>
                            <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={true}
                                responsive={responsive}
                                infinite={true}
                                keyBoardControl={true}
                                containerClass="carousel-container"
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                <div style={{marginRight: "5px"}}>
                                    <Card className="customCard">
                                        <Card.Img variant="top" height="450rem"
                                                  src="https://kinodrive.cc/uploads/posts/2015-12/1451013412_1.jpg"/>
                                    </Card>
                                </div>
                                <div style={{marginRight: "5px"}}>
                                    <Card className="customCard">
                                        <Card.Img variant="top" height="450rem"
                                                  src="https://i.pinimg.com/originals/e2/f2/5a/e2f25a10830bc3880a313f376399a8f0.jpg"/>
                                    </Card>
                                </div>
                                <div style={{marginRight: "5px"}}>
                                    <Card.Img variant="top" height="450rem"
                                              src="https://upload.wikimedia.org/wikipedia/ru/f/fc/Thor_poster.jpg"/>
                                </div>
                                <div style={{marginRight: "5px"}}>
                                    <Card.Img variant="top" height="450rem"
                                              src="https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg"/>
                                </div>
                                <div style={{marginRight: "5px"}}>
                                    <Card.Img variant="top" height="450rem"
                                              src="https://www.timeout.ru/wp-content/uploads/films/666.jpg"/>
                                </div>
                            </Carousel>
                            <br/>
                            <h2>TOP 10 ADVENTURE FILMS</h2>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>

        </div>
    );
}

export default TopPage