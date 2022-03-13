import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Jumbotron, Table} from "react-bootstrap"
import NavigationBar from "../../../common/NavigationBar"
import Footer from "../../../common/Footer"
import {getUsers, setCurrentPage, setSizePage} from "../../../../redux/user/UserAction";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import PaginationComponent from "../../../common/PaginationComponent";
import BackControlsButtonComponent from "../../../common/BackControlsButtonComponent";
import UserService from "../../../../service/UserService";

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
        const request = {
            isNonLocked: isNonLocked
        }
        UserService.updateUserIsNonLockedById(request, id)
            .then(resp => {
                console.log(resp);
                dispatch(getUsers(currentPage, sizePage))
            }).catch(error => {
            console.log(error);
        })
    }

    const updateUserRoles = (user) => {
        let roles = []
        if (!user.isAdmin) {
            roles.push({id: 1, name: "ROLE_ADMIN"})
        }
        roles.push({id: 2, name: "ROLE_USER"})

        const request = {
            roles: roles
        }
        UserService.updateUserRolesById(request, user.id)
            .then(resp => {
                console.log(resp);
                dispatch(getUsers(currentPage, sizePage))
            }).catch(error => {
            console.log(error);
        })
    }

    const getRole = (isAdmin) => {
        return isAdmin ? "Admin" : "User"
    }

    const getVariantButtonRole = (isAdmin) => {
        return isAdmin ? "outline-danger" : "outline-success"
    }

    const getTextButtonRole = (isAdmin) => {
        return isAdmin ? "Set user" : "Set admin"
    }

    const showContent = () => {
        if (loading && users.length === 0) {
            return <h1 className={"text-center"}><Spinner animation="border"/></h1>
        } else {
            return (
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th width={"19%"}>Username</th>
                        <th width={"19%"}>Firstname</th>
                        <th width={"19%"}>Lastname</th>
                        <th width={"20%"}>Email</th>
                        <th width={"5%"}>Role</th>
                        <th width={"18%"}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td><b>{user.username}</b></td>
                                <td><b>{user.firstname}</b></td>
                                <td><b>{user.lastname}</b></td>
                                <td><b>{user.email}</b></td>
                                <td><b>{getRole(user.isAdmin)}</b></td>
                                <td>
                                    <div>
                                        <Button variant={getVariantButtonRole(user.isAdmin)}
                                                disabled={user.id === userId}
                                                onClick={() => updateUserRoles(user)}>
                                            <b>{getTextButtonRole(user.isAdmin)}</b>
                                        </Button>{' '}
                                        <Button
                                            variant={user.isAccountNonLocked ? "outline-danger" : "outline-warning"}
                                            disabled={user.id === userId}
                                            onClick={() => updateUserIsNonLocked(user.id, !user.isAccountNonLocked)}>
                                            <b>{user.isAccountNonLocked ? "Ban" : "No ban"}</b>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            )
        }
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
                        <BackControlsButtonComponent/>
                        <div>
                            <PaginationComponent
                                sizePage={sizePage}
                                totalElements={totalElements}
                                currentPage={currentPage}
                                changeSizePage={changeSizePage}
                                changeCurrentPage={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
                            />
                            {showContent()}
                        </div>
                    </Jumbotron>
                </Col>
            </Container>
            <Footer/>
        </div>
    )
}

export default AllUsersPage
