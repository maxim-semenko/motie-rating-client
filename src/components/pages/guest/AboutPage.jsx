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
                            <Button onClick={add}>Add</Button>
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