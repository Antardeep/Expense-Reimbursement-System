import React, { Component } from "react";
import { Paper } from '@material-ui/core';
import { main_color_dark } from "../styles";

class UserInfo extends Component {

    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div id="newReimbursementContainer">
                <Paper style={{ marginTop: 20, padding: 20, width: 'fit-content', color: main_color_dark, fontSize: 25}}>
                    <p style={{margin: 10}}> {currentUser.userRole} ID : {currentUser.userID}</p>
                    <p style={{margin: 10}}> First Name : {currentUser.firstName}</p>
                    <p style={{margin: 10}}> Last Name : {currentUser.lastName}</p>
                    <p style={{margin: 10}}> Email Address : {currentUser.email}</p>
                </Paper>
            </div>
        );
    }
}

export default UserInfo;