import React from 'react';
import {Form} from "react-bootstrap";
import {setCurrentPage, setSizePage} from "../../../redux/country/CountryAction";
import Pagination from "react-js-pagination";

function PaginationComponent(props) {
    return (
        <div style={{margin: "0"}}>
            <Form style={{textAlign: "left"}}>
                <Form.Group className="mb-4">
                    <Form.Label> Size of elements:</Form.Label>
                    <Form.Control as={"input"} type={"number"} style={{width: "120px"}}
                                  placeholder={"Count of elements of page"}
                                  value={props.sizePage}
                                  onChange={props.changeSizePage}
                                  min={"1"}
                                  max={props.totalElements}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Pagination itemClass="page-item"
                                linkClass="page-link"
                                activePage={props.currentPage}
                                itemsCountPerPage={props.sizePage}
                                totalItemsCount={props.totalElements}
                                pageRangeDisplayed={10}
                                onChange={props.changeCurrentPage}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}

export default PaginationComponent;