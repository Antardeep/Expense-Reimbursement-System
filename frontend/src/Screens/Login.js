import React, { Component } from "react";
import { TextField, Grid, Button, IconButton, Card } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Cube from '../common/cube';
import { withStyles } from '@material-ui/core/styles';
import { styles, main_color } from '../styles';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hidden: true,
            errorStateUser: false,
            errorStatePassword: false,
            errorAuth: false,
            errorTextUser: '',
            errorTextPassword: '',
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.authentication = this.authentication.bind(this);
    }


    onChangeUsername(event) {
        this.setState({errorStateUser: false});
        this.setState({errorTextUser: ''})
        this.setState({ username: event.target.value });
    }

    passwordOnChange(event) {
        this.setState({errorStatePassword: false});
        this.setState({errorTextPassword: ''})
        this.setState({ password: event.target.value });
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    async onLogin() {
        const {username, password} = this.state;
        const credentials = {
            username: username,
            password: password
        }

        if(username && password){
        try{
            const url = "http://localhost:8080/ERsystem/login";
            let res = await fetch(url ,{
                method:"POST",
                body: JSON.stringify(credentials),
                headers:{
                    "Content-Type" : "application/json",
                }
            })
            let user = await res.json();
            localStorage.setItem('user', JSON.stringify(user));
            this.authentication(user);
        } catch(e) {
            this.setState({errorAuth: true})
            console.log(e);
        }
        }else{
            if(!password){
                this.setState({errorStatePassword: true});
                this.setState({errorTextPassword: 'Please enter password'})
            }
            if(!username){
                this.setState({errorStateUser: true});
                this.setState({errorTextUser: 'Please enter username'})
            }
        }
    }

    authentication(user){
        if(user.userRole === "Employee"){
             this.props.history.push({
            pathname: '/employeeHome', 
            user: {user}
        });
        }else{
            this.props.history.push({
                pathname: '/managerHome', 
                user: {user}
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                 <Cube />
                 <h1 id="title">Expense Reimbursement System</h1>
                 <Card style={styles.cardContainer} >
                    <form className="form" noValidate>
                        <label className="inputLabel">USERNAME</label>
                        <TextField
                            error={this.state.errorStateUser}
                            helperText={this.state.errorTextUser}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            style={{ marginBottom: 5, marginTop: 5}}
                            InputProps={{
                                classes: {
                                root: classes.cssOutlinedInput,
                                notchedOutline: classes.notchedOutline,
                                focused: classes.focused,
                            },
                        }}
                        />
                        <Grid container direction="row" justify="space-between" style={{marginTop: 10}}>
                            <label className="inputLabel">PASSWORD</label>
                            <IconButton 
                            onClick={this.toggleShow} 
                            classes= {{ root: classes.iconfocused }}
                            style={{ fontSize: 15, padding: 0, color: this.state.hidden ? main_color : '#7c7c7c'}}>
                                {this.state.hidden ? <Visibility /> : <VisibilityOff />}
                                {this.state.hidden ? "Show" : "Hide"}
                            </IconButton>
                        </Grid>

                        <TextField
                            error={this.state.errorStatePassword}
                            helperText={this.state.errorTextPassword}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            placeholder="Password"
                            type={this.state.hidden ? "password" : "text"}
                            value={this.state.password}
                            onChange={this.passwordOnChange}
                            style={{ marginTop: 5}}
                            InputProps={{
                                classes: {
                                root: classes.cssOutlinedInput,
                                notchedOutline: classes.notchedOutline,
                                focused: classes.focused,
                                },
                            }}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            className="submit"
                            onClick={() => this.onLogin()}
                            classes= {{
                                root: classes.rootButton,
                            }}
                        > LOG IN </Button>

                        {(this.state.errorAuth) ? <p style={styles.errorTextStyle}>User not Found</p> : null}


                    </form>

                </Card>
            </div>
        );
    }
}

const mStyles = theme => ({
    cssOutlinedInput: {
        '&$focused $notchedOutline': {
            borderColor: main_color,
        },
        height: 50,
        marginTop: 0,
        paddingTop: 0
    },

    notchedOutline: {
        borderWidth: '1px',
        borderColor: main_color
    },
    focused: {
        borderColor: main_color
    },

    iconfocused: {
        '&:focus': {
            outline: 'none',
        },
    },

    rootButton: {
        '&:hover': {
            backgroundColor: '#F4845F',
        },
        background: main_color,
        borderRadius: 3,
        border: 0,
        color: 'white',
        fontWeight: 'bold',
        height: 40,
        boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
        marginTop: 15
    },
});

export default withStyles(mStyles)(Login);