import { render } from "@testing-library/react";
import React, { Component } from "react";

class Error extends Component{
    render(){
        return(
            <div>
            <h1>Opps...  Page Not Foung</h1>
            </div>
        );
    }
}

export default Error;