import React from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../common/Footer"
import springLogo from "../../../img/spring.png"
import reactLogo from "../../../img/react.png"

function AboutPage() {

    const SpringAboutComponent = () => {
        return (
            <Row style={{marginTop: "3%"}}>
                <Col lg="3"><img alt="" src={springLogo} height="200px"/></Col>
                <Col style={{textAlign: "justify"}}>
                    <h4 style={{paddingTop: "15px"}}><span
                        style={{color: "#2dd635"}}><b>Spring Boot </b></span>
                        is an open source Java-based framework used to create a micro Service. It is
                        developed by Pivotal Team and is used to build stand-alone and production ready
                        spring applications. This chapter will give you an introduction to Spring Boot and
                        familiarizes you with its basic concepts.
                    </h4>
                </Col>
            </Row>
        )
    }

    const ReactAboutComponent = () => {
        return (
            <Row style={{marginTop: "3%"}}>
                <Col lg="3"><img alt="" src={reactLogo} height="200px"/></Col>
                <Col style={{textAlign: "justify"}}>
                    <h4 style={{paddingTop: "15px"}}><span
                        style={{color: "#01d5fa"}}><b>React JS </b></span>
                        is a JavaScript library used in web development to build interactive elements on
                        websites. But if you’re not familiar with JavaScript or JavaScript libraries, that’s
                        not a helpful definition. So let’s take a step back and deal with those terms first.
                    </h4>
                </Col>
            </Row>
        )
    }

    return (
        <main>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{textAlign: "center", marginLeft: "12px", marginBottom: "15px"}}>
                        <b>ABOUT</b>
                    </h1>
                    <Container>
                        <div style={{marginLeft: "3%", textAlign: "justify"}}>
                            <h3><b>MovieRating</b> - commercial streaming service that allows our members to watch
                                movies without advertising on an internet-connected device.</h3>
                        </div>
                        <SpringAboutComponent/>
                        <ReactAboutComponent/>
                    </Container>
                </Jumbotron>
            </Container>
            <Footer/>
        </main>
    );

}

export default AboutPage