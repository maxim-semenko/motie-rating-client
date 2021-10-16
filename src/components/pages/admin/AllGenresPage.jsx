import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Jumbotron, Row, Table} from "react-bootstrap"
import CSSTransition from "react-transition-group/CSSTransition"
import NavigationBar from "../../NavigationBar"
import Footer from "../../Footer"
import {useHistory} from "react-router-dom";
import GenreService from "../../../service/GenreService";

function AllGenresPage() {
    const history = useHistory('');
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const [loading, setLoading] = useState(false)
    const [genreList, setGenreList] = useState([])
    // const [usernameValue, setUsernameValue] = useState('')
    // const [firstnameValue, setFirstnameValue] = useState('')
    // const [lastnameValue, setLastnameValue] = useState('')
    // const [emailValue, setEmailValue] = useState('')
    // const [rolesValue, setRolesValue] = useState('')
    // const filterUserList = userList.filter(user => {
    //     return user.username.toLowerCase().includes(usernameValue.toLowerCase())
    //         && user.firstname.toLowerCase().includes(firstnameValue.toLowerCase())
    //         && user.lastname.toLowerCase().includes(lastnameValue.toLowerCase())
    //         && user.email.toLowerCase().includes(emailValue.toLowerCase())
    //         && (rolesValue !== "" ?
    //             user.roles.length === 1 ? user.roles[0].name.includes(rolesValue) :
    //                 user.roles[1].name.includes(rolesValue) : true)
    // })


    useEffect(() => {
            if (genreList.length === 0) {
                setLoading(true)
                GenreService.findAll()
                    .then(response => {
                        setGenreList(response.data)
                        setLoading(false)
                    }).catch(error => {
                        console.log(error)
                    }
                )
            }
        }, [genreList.length]
    )

    return (
        <div>
            <NavigationBar/>
            <Container fluid>
                <Col lg={12} style={{marginTop: "20px"}}>
                    <Jumbotron className="bg-dark text-white">
                        <Row>
                            <div style={{margin: "0 auto"}}>
                                <Button href="/profile/admin/controllers" variant="outline-danger"
                                        style={{marginBottom: "20px"}}>
                                    <b>Back to controllers</b>
                                </Button>{' '}
                                <Button variant="outline-success"
                                        style={{marginBottom: "20px"}}>
                                    <b>Add genre</b>
                                </Button>
                            </div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th style={{minWidth: "15rem"}}>Action</th>
                                </tr>
                                </thead>
                                <CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>
                                    <tbody>
                                    {
                                        genreList.map(genre =>
                                            <tr key={genre.id}>
                                                <td><b>{genre.id}</b></td>
                                                <td><b>{genre.name}</b></td>
                                                <td>
                                                    <Button variant="outline-success">
                                                        <b>Edit</b>
                                                    </Button>{' '}
                                                    <Button variant="outline-danger">
                                                        <b>Remove</b>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </CSSTransition>
                            </Table>
                        </Row>
                    </Jumbotron>
                </Col>
            </Container>
            <Footer/>
        </div>
    )
}

export default AllGenresPage