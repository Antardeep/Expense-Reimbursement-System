import React, { Component } from "react";
import { Select, Modal, IconButton, Paper, Tooltip, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { main_color, main_color_dark } from '../styles';
import ReimbursementList from '../components/ReimbursementList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactsIcon from '@material-ui/icons/Contacts';
import UserInfo from "../components/UserInfo";

class ManagerHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            reimbList: [],
            status: 'All',
            open: false
        }
        this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    }

    async componentDidMount() {
        // const currentUser =  JSON.parse(localStorage.getItem('user'));
        const status = this.state.status;
        console.log(status);
        try {
            const url = "http://localhost:8080/ERsystem/managereHome/reimbursementList";
            let res = await fetch(url, {
                method: "POST",
                body: status,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let list = await res.json();
            this.setState({ reimbList: list });
            console.log(this.state.reimbList);
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        if (this.state.status !== prevState.status || this.state.update !== prevState.update) {
            const status = this.state.status;
            try {
                let url = "http://localhost:8080/ERsystem";
                if (status === "All") {
                    url += "/managereHome/reimbursementList";
                } else {
                    url += "/managereHome/reimbursementListbyStatus";
                }
                let res = await fetch(url, {
                    method: "POST",
                    body: status,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                let list = await res.json();
                this.setState({ reimbList: list });
                this.setState({ update: false });
            } catch (e) {
                console.log(e);
            }
        }
    }
    handleStatusUpdate(value) {
        this.setState({ update: value });
    }

    onLogOut() {
        localStorage.clear();
        this.props.history.push('./');
    }


    render() {
        const { classes } = this.props;
        const handleChange = (prop) => (event) => {
            this.setState({ [prop]: event.target.value });
        };
        return (
            <div>
                <IconButton
                    className='float-left'
                    onClick={() => this.setState({open: true})}
                    classes={{
                        root: classes.rootButtonInfo,
                    }}>
                    <ContactsIcon style={{ fontSize: 30 }} />
                </IconButton>
                <h1 id="title">FINANCE MANAGER</h1>
                <Tooltip title="Log Out">
                    <IconButton
                        className='float-right'
                        onClick={() => this.onLogOut()}
                        classes={{
                            root: classes.rootButton,
                        }}>
                        <ExitToAppIcon style={{ fontSize: 40 }} />
                    </IconButton>
                </Tooltip>
                <Paper elevation={3} classes={{ root: classes.root }}>
                    <h5 style={{ color: 'white', fontWeight: 'bolder' }}>Reimbursement Request List</h5>
                    <Select
                        value={this.state.status}
                        onChange={handleChange('status')}
                        style={{ marginLeft: 10, width: 100, textAlignLast: 'right', color: 'white' }}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Pending'}>Pending</MenuItem>
                        <MenuItem value={'Approved'}>Approved</MenuItem>
                        <MenuItem value={'Denied'}>Denied</MenuItem>
                    </Select>
                </Paper>

                <Paper elevation={1} id="tabPanel">
                    <ReimbursementList reimbList={this.state.reimbList} handleStatusUpdate={this.handleStatusUpdate} />
                </Paper>
                <Modal
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                        <UserInfo />
                </Modal>

            </div >

        );
    }
}


const mStyles = theme => ({
    root: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: '8%',
        marginRight: '8%',
        width: '84%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: main_color_dark
    },

    rootButton: {
        '&:hover': {
            color: '#F4845F',
        },
        color: main_color,
        position: 'absolute',
        top: 5,
        right: 5,
    },
    rootButtonInfo: {
        '&:hover': {
            color: '#F4845F',
        },
        color: main_color,
        position: 'absolute',
        top: 5,
        left: 5,
    },
})

export default withStyles(mStyles)(ManagerHome);