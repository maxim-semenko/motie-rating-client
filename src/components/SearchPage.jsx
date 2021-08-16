import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import CSSTransition from "react-transition-group/CSSTransition";
import Alert from "react-bootstrap/Alert";
import '../css/Example.css'

class SearchPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <h1>SEARCH PAGE</h1>

                <h1 onClick={() => this.setState({show: !this.state.show})}>{this.state.show ? 'скрыть' : 'показать'}</h1>
                <CSSTransition in={this.state.show} classNames="my-node" timeout={500} unmountOnExit>
                    <Alert variant="danger" dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            Profile was not founded! Please, check your input username and password
                        </p>
                    </Alert>
                </CSSTransition>
                <Footer/>
            </div>
        );
    }
}

export default SearchPage;