import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {addToBasket, removeFromBasket} from "../../redux/basket/BasketAction";

function AddRemoveFilmBasket(props) {
    const dispatch = useDispatch()
    const {basketFilmList} = useSelector(state => state.dataBaskets)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        setIsLogin(localStorage.getItem("user") !== null)
    }, [dispatch])


    const checkContain = (filmId) => {
        for (let key in basketFilmList) {
            if (basketFilmList[key].id === filmId) {
                return true
            }
        }
        return false
    }

    const displayActionWithBasket = () => {
        const isContainInBasket = checkContain(props.film.id);
        return (
            <Button variant={isContainInBasket ? 'outline-danger' : 'outline-primary'}
                    onClick={isContainInBasket ?
                        () => dispatch(removeFromBasket(props.film.id)) :
                        () => dispatch(addToBasket(props.film))}
                    disabled={!isLogin}>
                <b>{isContainInBasket ? 'From basket' : 'To basket'}</b>
            </Button>
        )
    }

    return (
        <div>
            <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                <Button variant="outline-success" disabled={!isLogin}>
                    <b>Buy film({props.film.price}$)</b>
                </Button>{' '}
                {displayActionWithBasket()}
            </div>
        </div>
    )
}

export default AddRemoveFilmBasket