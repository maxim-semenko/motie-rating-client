import React from 'react';

function TransactionItem(props) {

    const getStatus = (status) => {
        switch (status.id) {
            case 1:
                return (<span style={{color: "green"}}>{status.name}</span>)
            case 2:
                return (<span style={{color: "yellow"}}>{status.name}</span>)
            case 3:
                return (<span style={{color: "red"}}>{status.name}</span>)
            default:
                console.log("error")
        }
    }

    const getList = (list) => {
        let purchases = '';
        list.map((film, index) => (
            purchases += index + 1 === list.length ? "«" + film.name + "»" : "«" + film.name + "», "
        ))
        return purchases
    }

    return (
        <div>
            <p><b>Summa:</b> {props.transaction.summa.toFixed(2)}$</p>
            <p><b>Purchases list: </b>{getList(props.transaction.filmList)}</p>
            <p><b>Status: </b>{getStatus(props.transaction.transactionStatus)}</p>
            <p><b>Date: </b>{props.transaction.date}</p>
            <hr/>
        </div>
    );
}

export default TransactionItem;
