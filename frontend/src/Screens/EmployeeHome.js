import React, { Component } from "react";
import { Grid, IconButton, Paper, Tabs, Tab, Tooltip } from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';
import DnsIcon from '@material-ui/icons/Dns';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { withStyles } from '@material-ui/core/styles';
import ReimbursementList from '../components/ReimbursementList';
import AddReimbursement from '../components/AddReimbursement';
import UserInfo from '../components/UserInfo';
import { main_color } from '../styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



class EmployeeHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewList: false,
            reimbList: [],
            activeTab: 1,
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        try {
            const url = "http://localhost:8080/ERsystem/employeeHome/reimbursementList";
            let res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(currentUser),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let list = await res.json();
            this.setState({ reimbList: list });
            //    console.log(this.state.reimbList);
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.activeTab !== prevState.activeTab) {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            try {
                const url = "http://localhost:8080/ERsystem/employeeHome/reimbursementList";
                let res = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(currentUser),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                let list = await res.json();
                this.setState({ reimbList: list });
                //    console.log(this.state.reimbList);
            } catch (e) {
                console.log(e);
            }
        }
    }

    handleUpdate(value){
        this.setState({activeTab : value});
    }

    renderSwitch() {
        switch (this.state.activeTab) {
            case 0:
                return <UserInfo />;
            case 1:
                return <ReimbursementList reimbList={this.state.reimbList} />;
            case 2:
                return <AddReimbursement handleUpdate = {this.handleUpdate}/>;
            default:
                return 'list';
        }
    }

    onLogOut(){
        localStorage.clear();
        this.props.history.push('./');
    }

    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const { classes } = this.props;
        const handleChange = (event, newValue) => {
            // setValue(newValue);
            this.setState({ activeTab: newValue });
        };

        return (
            <div className="homePage">
                <div>
                    <h2 id="title" >EMPLOYEE</h2>
                    <Tooltip title="Log Out">
                    <IconButton
                        className='float-right'
                        onClick={() => this.onLogOut()}
                        classes={{
                            root: classes.rootButton,
                        }}>
                        <ExitToAppIcon style={{fontSize: 40}}/>
                    </IconButton>
                    </Tooltip>
                    <Paper elevation={3} classes={{ root: classes.root }}>
                        <Tabs
                            value={this.state.activeTab}
                            onChange={handleChange}
                            variant="fullWidth"
                            centered
                            aria-label="icon label tabs example"
                            classes={{
                                indicator: classes.indicator,
                            }}
                        >
                            <Tab icon={<ContactsIcon />} label="PERSONAL INFO" classes={{ textColorInherit: classes.tabFocused }} />
                            <Tab icon={<DnsIcon />} label="VIEW PAST TICKETS" classes={{ textColorInherit: classes.tabFocused }} />
                            <Tab icon={<AddToPhotosIcon />} label="NEW REQUEST" classes={{ textColorInherit: classes.tabFocused }} />
                        </Tabs>
                    </Paper>
                </div>

                <Paper elevation={3} id="tabPanel">
                    {this.renderSwitch()}
                </Paper>

            </div>
        );
    }

}


const mStyles = theme => ({
    root: {
        marginLeft: '8%',
        marginRight: '8%',
        width: '84%',
        position: 'relative'
    },

    indicator: {
        backgroundColor: '#D5590B',
        color: '#D5590B'
    },

    tabFocused: {
        color: 'grey',
        '&:focus': {
            color: '#D5590B',
            outline: 'none'
        },
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
})

export default withStyles(mStyles)(EmployeeHome);