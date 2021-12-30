import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Jumbotron, Row, Table} from "react-bootstrap"
import {Link} from "react-router-dom";
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../../Footer"
import {getUsers, setCurrentPage, setSizePage} from "../../../../redux/user/UserAction";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import AdminService from "../../../../service/AdminService";
import PaginationComponent from "../PaginationComponent";

function AllUsersPage() {
    const dispatch = useDispatch()
    const {users, loading, currentPage, sizePage, totalElements} = useSelector(state => state.dataUsers)
    const [userId, setUserId] = useState(0);

    useEffect(() => {
            dispatch(getUsers(currentPage, sizePage))
            setUserId(JSON.parse(localStorage.getItem("user")).id)
            if (totalElements !== 0 && sizePage > totalElements) {
                dispatch(setSizePage(totalElements))
            }
        }, [currentPage, dispatch, sizePage, totalElements]
    )

    const updateUserIsNonLocked = (id, isNonLocked) => {
        AdminService.updateUserIsNonLockedById(id, {value: isNonLocked})
            .then(resp => {
                console.log(resp);
                dispatch(getUsers(currentPage, sizePage))
            }).catch(error => {
            console.log(error);
        })
    }

    const showContent = () => {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th style={{minWidth: "12rem"}}>Username</th>
                    <th style={{minWidth: "12rem"}}>Firstname</th>
                    <th style={{minWidth: "12rem"}}>Lastname</th>
                    <th style={{minWidth: "14rem"}}>Email</th>
                    <th style={{minWidth: "8rem"}}>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                {
                    loading && users.length === 0 ?
                        <div>
                            <span style={{paddingTop: "2%", paddingLeft: "40%", position: "absolute"}}>
                                <Spinner animation="border"/>
                            </span>
                        </div>
                        :
                        <tbody>
                        {
                            users.map(user =>
                                <tr key={user.id}>
                                    <td><b>{user.username}</b></td>
                                    <td><b>{user.firstname}</b></td>
                                    <td><b>{user.lastname}</b></td>
                                    <td><b>{user.email}</b></td>
                                    <td>
                                        {user.roles.map(role => <b>{role.name}, </b>)}
                                    </td>
                                    <td>
                                        <div>
                                            <Button variant="outline-success"
                                                    disabled={user.id === userId}>
                                                <b>Set admin</b>
                                            </Button>{' '}
                                            {
                                                user.isAccountNonLocked ?
                                                    <Button variant="outline-danger"
                                                            disabled={user.id === userId}
                                                            onClick={() => updateUserIsNonLocked(user.id, false)}>
                                                        <b>Ban</b>
                                                    </Button>
                                                    :
                                                    <Button variant="outline-warning"
                                                            disabled={user.id === userId}
                                                            onClick={() => updateUserIsNonLocked(user.id, true)}>
                                                        <b>No Ban</b>
                                                    </Button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                }
            </Table>
        )
    }

    /**
     *
     * @param event
     */
    const changeSizePage = (event) => {
        dispatch(setSizePage(event.target.value));
        dispatch(setCurrentPage(1))
    }

    return (
        <div>
            <NavigationBar/>
            <Container fluid>
                <Col lg={12} style={{marginTop: "20px"}}>
                    <Jumbotron className="bg-dark text-white">
                        <div style={{margin: "0 auto"}}>
                            <Link to="/profile/admin/controllers">
                                <Button variant="outline-danger"
                                        style={{marginBottom: "20px"}}>
                                    <b>Back to controllers</b>
                                </Button>
                            </Link>
                        </div>
                        <Row>
                            <PaginationComponent
                                sizePage={sizePage}
                                totalElements={totalElements}
                                currentPage={currentPage}
                                changeSizePage={changeSizePage}
                                changeCurrentPage={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
                            />
                            {showContent()}
                        </Row>
                    </Jumbotron>
                </Col>
            </Container>
            <Footer/>
        </div>
    )
}

export default AllUsersPage