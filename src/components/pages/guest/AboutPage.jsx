import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../common/Footer"
import CountryService from "../../../service/CountryService";

function AboutPage() {

    const [countryList, setCountryList] = useState([])
    const [country, setCountry] = useState(null)
    const [myList, setMyList] = useState([])

    useEffect(() => {
        CountryService.getAll()
            .then(response => {
                setCountryList(response.data.content)
            }).catch(error => {
                console.log(error)
            }
        )
    }, [])

    const changeCountryHandler = (event) => {
        setCountry(JSON.parse(event.target.value))
    }

    const add = () => {
        console.log(country)
        setMyList([...myList, country]);
    }

    const send = () => {
        let request = {
            countries: myList,
        }
        console.log(request)
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px"}}>
                        <Jumbotron className="bg-dark text-white">
                            ABOUT PAGE
                            <Row>
                                <Col sm={8}>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{marginBottom: "0px"}}><b>COUNTRY</b></Form.Label>
                                        <Form.Control className="my-input"
                                                      as="select" aria-label="Default select example"
                                                      onChange={changeCountryHandler}>
                                            <option key={0} value={"null"}>Select...</option>
                                            {countryList.map((item, index) =>
                                                <option
                                                    key={index}
                                                    value={JSON.stringify(item)}>
                                                    {item.name}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <div >
                                        <Button variant="outline-primary"
                                                onClick={add}>
                                            <b>Add</b>
                                        </Button>{' '}
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={10}>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{marginBottom: "0px"}}><b>COUNTRY</b></Form.Label>
                                        <Form.Control className="my-input"
                                                      as="select" aria-label="Default select example"
                                                      onChange={changeCountryHandler}>
                                            <option key={0} value={"null"}>Select...</option>
                                            {countryList.map((item, index) =>
                                                <option
                                                    key={index}
                                                    value={JSON.stringify(item)}>
                                                    {item.name}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <div style={{paddingTop: "22%" , textAlign: "left"}}>
                                        <Button onClick={add}>Add</Button>
                                    </div>
                                </Col>
                            </Row>


                            <Button onClick={send}>Send</Button>
                            {
                                myList.map((item, index) =>
                                    <div key={index}>
                                        {item.name}
                                    </div>
                                )
                            }
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );

}

export default AboutPage