import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

class SearchPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <h1>SEARCH PAGE</h1>
                <Footer/>
            </div>
        );
    }
}

export default SearchPage;