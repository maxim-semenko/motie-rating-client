import React, {useEffect, useState} from 'react'
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../common/Footer"
import {Card, Container, Jumbotron} from "react-bootstrap";
import 'react-slideshow-image/dist/styles.css'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function TopPage() {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const isContainUser = localStorage.getItem("user") !== null
        setIsLogin(isContainUser)
    }, [])

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

    const showContent = () => {
        return (
            <div>
                <br/>
                <h2><b>TOP 9 ACTION FILMS</b></h2>
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
            </div>
        )
    }

    return (
        <div>
            <NavigationBar setIsLoginMethod={setIsLogin}/>
            <Container>
                <Jumbotron className="bg-dark text-white"
                           style={{marginTop: "20px", paddingTop: "20px", textAlign: "left"}}>
                    <h1 style={{textAlign: "center", marginLeft: "12px", marginBottom: "15px"}}>
                        <div>
                            <b>THE BEST FILMS IN EVERY GENRE</b>
                        </div>
                    </h1>
                    <Container>
                        <div>
                            {showContent()}
                        </div>
                    </Container>
                </Jumbotron>
            </Container>
            <Footer/>
        </div>
    );
}

export default TopPage