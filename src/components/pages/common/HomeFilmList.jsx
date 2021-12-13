import React, {useEffect, useState} from 'react';
import CardFilm from "./CardFilm";
import {Row} from "react-bootstrap";
import BasketService from "../../../service/BasketService";

function HomeFilmList(props) {
    const [basketList, setBasketList] = useState([])
    const [userId, setUserId] = useState(0);

    useEffect(() => {
            if (props.isLogin) {
                setUserId(JSON.parse(localStorage.getItem("user")).id)
                BasketService.getById(JSON.parse(localStorage.getItem("user")).id)
                    .then(response => {
                        setBasketList(response.data.filmList)
                    }).catch(error => {
                        console.log(error)
                    }
                )
            }
        }, [props.isLogin]
    )


    const addToBasket = (film) => {
        BasketService.add(userId, film.id)
            .then(response => {
                setBasketList([...basketList, film])
                console.log(response)
            })
            .catch(error => {
                    console.log(error)
                }
            )
    }

    const removeFromBasket = (filmId) => {
        BasketService.remove(userId, filmId)
            .then(response => {
                setBasketList(basketList.filter(item => item.id !== filmId))
                console.log(response)
            })
            .catch(error => {
                    console.log(error)
                }
            )
    }

    const checkContain = (filmId) => {
        for (let key in basketList) {
            if (basketList[key].id === filmId) {
                return true
            }
        }
        return false
    }

    return (
        <div>
            <Row>
                {
                    props.films.slice(0).map(film =>
                        <div className="col-md-6 col-xl-4" style={{marginTop: "30px"}}
                             key={film.id}>
                            <CardFilm
                                film={film}
                                isContain={checkContain(film.id)}
                                methodAdd={addToBasket}
                                methodRemove={removeFromBasket}
                            />
                        </div>
                    )
                }
            </Row>
        </div>
    );
}

export default HomeFilmList;