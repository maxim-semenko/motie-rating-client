import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Form, Jumbotron, Row, Table} from "react-bootstrap"
import NavigationBar from "../../NavigationBar"
import CSSTransition from "react-transition-group/CSSTransition"
import Footer from "../../Footer"
import UserService from "../../../service/UserService"
import {useHistory} from "react-router-dom";

function AllUsersPage() {
    const history = useHistory('');
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const [loading, setLoading] = useState(false)
    const [userList, setUserList] = useState([])
    const [usernameValue, setUsernameValue] = useState('')
    const [firstnameValue, setFirstnameValue] = useState('')
    const [lastnameValue, setLastnameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [rolesValue, setRolesValue] = useState('')
    const filterUserList = userList.filter(user => {
        return user.username.toLowerCase().includes(usernameValue.toLowerCase())
            && user.firstname.toLowerCase().includes(firstnameValue.toLowerCase())
            && user.lastname.toLowerCase().includes(lastnameValue.toLowerCase())
            && user.email.toLowerCase().includes(emailValue.toLowerCase())
            && (rolesValue !== "" ? user.roles[0].name.includes(rolesValue) : true)
    })


    useEffect(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            const object = {id: 1, name: "ROLE_ADMIN"}
            console.log(user.roles.some(r => r.name === object.name))
            if (params.toString() !== "") {
                if (params.get("username") !== null) {
                    setUsernameValue(params.get("username"))
                }
                if (params.get("firstname") !== null) {
                    setFirstnameValue(params.get("firstname"))
                }
                if (params.get("lastname") !== null) {
                    setLastnameValue(params.get("lastname"))
                }
                if (params.get("email") !== null) {
                    setEmailValue(params.get("email"))
                }
                if (params.get("roles") !== null) {
                    setRolesValue(params.get("roles"))
                }
            }
            if (userList.length === 0) {
                setLoading(true)
                UserService.findAll()
                    .then(response => {
                        setUserList(response.data)
                        setLoading(false)
                    }).catch(error => {
                        console.log(error)
                    }
                )
            }
        }, [firstnameValue, userList.length]
    )

    const updateUrl = (event) => {
        const {name, value} = event?.target
        value === "" ? params.delete(name) : params.set(name, value)
        history.push({
            pathname: window.location.pathname,
            search: params.toString()
        });
    }

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
                                </Button>
                            </div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>
                                        <Form.Control as={"input"} placeholder={"Enter username"}
                                                      name={"username"}
                                                      value={usernameValue}
                                                      onChange={event => {
                                                          setUsernameValue(event.target.value);
                                                          updateUrl(event)
                                                      }}>
                                        </Form.Control>
                                    </th>
                                    <th>
                                        <Form.Control as={"input"} placeholder={"Enter firstname"}
                                                      name={"firstname"}
                                                      value={firstnameValue}
                                                      onChange={event => {
                                                          setFirstnameValue(event.target.value);
                                                          updateUrl(event)
                                                      }}>
                                        </Form.Control>
                                    </th>
                                    <th>
                                        <Form.Control as={"input"} placeholder={"Enter lastname"}
                                                      name={"lastname"}
                                                      value={lastnameValue}
                                                      onChange={event => {
                                                          setLastnameValue(event.target.value);
                                                          updateUrl(event)
                                                      }}>
                                        </Form.Control>
                                    </th>
                                    <th>
                                        <Form.Control as={"input"} placeholder={"Enter email"}
                                                      style={{minWidth: "13rem"}}
                                                      name={"email"}
                                                      value={emailValue}
                                                      onChange={event => {
                                                          setEmailValue(event.target.value);
                                                          updateUrl(event)
                                                      }}>
                                        </Form.Control>
                                    </th>
                                    <th>
                                        <Form.Control as="select" aria-label="Default select example" name={"roles"}
                                                      style={{minWidth: "15rem"}}
                                                      onChange={event => {
                                                          setRolesValue(event.target.value);
                                                          updateUrl(event)
                                                      }}>
                                            <option value="">Everyone</option>
                                            <option value="ROLE_ADMIN">Admin</option>
                                            <option value="ROLE_USER">User</option>
                                        </Form.Control>
                                    </th>
                                    <th>
                                        <Button variant="outline-warning" style={{minWidth: "13rem"}}>Clear all</Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th style={{minWidth: "15rem"}}>Action</th>
                                </tr>
                                </thead>
                                <CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>
                                    <tbody>
                                    {
                                        filterUserList.map(user =>
                                            <tr key={user.id}>
                                                <td><b>{user.username}</b></td>
                                                <td><b>{user.firstname}</b></td>
                                                <td><b>{user.lastname}</b></td>
                                                <td><b>{user.email}</b></td>
                                                <td>
                                                    {user.roles.map(role => <b>{role.name}, </b>)}
                                                </td>
                                                <td>
                                                    <Button variant="outline-success">
                                                        <b>Give admin</b>
                                                    </Button>{' '}
                                                    <Button variant="outline-danger">
                                                        <b>Ban</b>
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

export default AllUsersPage