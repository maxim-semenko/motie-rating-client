import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AiFillHome, AiFillShopping, FaShoppingCart, ImExit, MdAccountBalance} from "react-icons/all";
import {Jumbotron} from "react-bootstrap";
import '../css/ProfileMenu.css'

class ProfileMenu extends Component {
    render() {
        return (
            <div>
                <Jumbotron className="bg-dark text-white"
                           style={{padding: "20px 20px 20px 20px", textAlign: "left"}}>
                    <h1 className="text-center">MENU</h1>
                    <hr/>
                    <Link to="/profile/cabinet" className="my-link">
                        <h5>
                            <span className="menu-icon"><AiFillHome size={24}/></span>CABINET
                        </h5>
                    </Link>
                    <hr/>
                    <Link to="/profile/purchases" className="my-link">
                        <h5>
                            <span className="menu-icon"><AiFillShopping size={24}/></span>PURCHASES
                        </h5>
                    </Link>
                    <hr/>
                    <Link to="/profile/basket" className="my-link">
                        <h5>
                            <span className="menu-icon"><FaShoppingCart size={24}/></span>BASKET
                        </h5>
                    </Link>
                    <hr/>
                    <Link to="/profile/balance" className="my-link">
                        <h5>
                            <span className="menu-icon"><MdAccountBalance size={24}/></span>BALANCE
                        </h5>
                    </Link>
                    <hr/>
                    <Link to="/" className="my-link">
                        <h5>
                            <span className="menu-icon"><ImExit size={24}/></span>LOGOUT
                        </h5>
                    </Link>
                </Jumbotron>
            </div>
        );
    }
}

export default ProfileMenu;