import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

class FeedbackPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <h1>FEEDBACK PAGE</h1>
                <Footer/>
            </div>
        );
    }
}

export default FeedbackPage;