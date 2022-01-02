import React from 'react'
import {AiFillHome, AiFillShopping, AiOutlineHistory, FaShoppingCart, ImExit} from "react-icons/all"
import {Jumbotron} from "react-bootstrap"
import {Link} from "react-router-dom"
import {Cookies} from "react-cookie"
import '../../styles/ProfileMenu.css'
import AuthService from "../../service/AuthService";

function ProfileMenu() {
    return (
        <div>
            <Jumbotron className="bg-dark text-white" style={{padding: "20px 20px 20px 20px", textAlign: "left"}}>
                <h1 className="text-center">MENU</h1>
                <hr/>
                <Link to="/profile/cabinet" className="my-link">
                    <h5><span className="menu-icon"><AiFillHome size={24}/></span>CABINET</h5>
                </Link>
                <hr/>
                <Link to="/profile/purchases" className="my-link">
                    <h5><span className="menu-icon"><AiFillShopping size={24}/></span>PURCHASES</h5>
                </Link>
                <hr/>
                <Link to="/profile/basket" className="my-link">
                    <h5><span className="menu-icon"><FaShoppingCart size={24}/></span>BASKET</h5>
                </Link>
                <hr/>
                <Link to="/profile/balance" className="my-link">
                    <h5><span className="menu-icon"><AiOutlineHistory size={24}/></span>HISTORY</h5>
                </Link>
                <hr/>
                <Link to="/" className="my-link" onClick={() => AuthService.logout(new Cookies())}>
                    <h5>
                        <span className="menu-icon"><ImExit size={24}/></span>LOGOUT
                    </h5>
                </Link>
            </Jumbotron>
        </div>
    );
}

export default ProfileMenu