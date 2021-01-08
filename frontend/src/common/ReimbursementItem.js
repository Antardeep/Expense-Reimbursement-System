import React, { Component } from 'react';
import { Paper, Grid, Chip, Avatar, InputLabel, Button  } from '@material-ui/core';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import { main_color } from '../styles';
import { withStyles } from '@material-ui/core/styles';

class ReimbursementItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            manager: false,
            resolverFirst: '',
            resolverLast: ''
        }
        if(this.props.item.rResolver){
        this.getUserByReimbID(this.props.item.rResolver)
        }
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser.userRole === "Finance Manager") {
            this.setState({ manager: true })
        }
    }

    async onSubmit(rID, status) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const statusUpdate = {
            rID: rID,
            status: status,
            resolverID: currentUser.userID,
        }
        try {
            const url = "http://localhost:8080/ERsystem/managerHome/statusUpdate";
            let res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(statusUpdate),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let added = await res.json();
            if (added === true) {
                this.setState(this.baseState);
                console.log("updated")
                this.props.handleUpdate();
            } else {
                console.log('Failed')
            }

        } catch (e) {
            console.log(e); 
            console.log('Failed')
        }
    }

    async getUserByReimbID(rID){
        const reimbID = rID;
        try {
            
            const url = "http://localhost:8080/ERsystem/getUserByReimbID";
            let res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(reimbID),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let user = await res.json();
            this.setState({resolverFirst : user.firstName})
            this.setState({resolverLast : user.lastName})
        } catch (e) {
            console.log(e); 
            console.log('Failed')
        }
    }

    chooseType(tID) {
        switch (tID) {
            case 1:
                return "Lodging";
            case 2:
                return "Food";
            case 3:
                return "Travel";
            case 4:
                return "Other";
        }
    }
    chooseStatus(sID) {
        switch (sID) {
            case 1:
                return <Chip style={{ backgroundColor: '#4BB543', color: 'white', width: '5rem' }} label='Approved' />;
            case 2:
                return <Chip style={{ backgroundColor: '#DC143C', color: 'white', width: '5rem' }} label='Denied' />;
            case 3:
                return <Chip style={{ backgroundColor: main_color, color: 'white', width: '5rem' }} label='Pending' />;
        }
    }


    render() {
        const item = this.props.item;
        const { classes } = this.props;

        return (
            <>
                <Paper elevation={1} style={{ marginTop: 10, height: 'auto', padding: 5, fontSize: 20 }} onClick={() => this.setState({ expand: !this.state.expand })} >
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Chip avatar={<Avatar style={{ backgroundColor: main_color, color: 'white' }}>ID</Avatar>} label={item.rID} style={{ borderRadius: 0, width: 100, fontSize: 15 }} />
                        </Grid>
                        {(this.state.manager) ?
                            <Grid item xs>
                                <InputLabel shrink Component='span'> Employee ID </InputLabel>
                                {item.rAuthor}
                            </Grid> :
                            null
                        }
                        <Grid item xs>
                            <InputLabel shrink Component='span'> Type </InputLabel>
                            {this.chooseType(item.rType)}
                        </Grid>
                        <Grid item xs>
                            <InputLabel shrink Component='span'> Amount </InputLabel>
                            <AttachMoneyOutlinedIcon style={{ color: main_color }} />
                            {item.rAmount}
                        </Grid>
                        <Grid item xs style={{ textAlign: 'right' }} >
                            {this.chooseStatus(item.rStatus)}
                        </Grid>
                    </Grid>
                </Paper>

                { this.state.expand ?
                    <Paper style={{ height: 'auto', padding: 5, fontSize: 20 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={9} >
                                <div style={{ padding: 10 }}>
                                    <div className="labelChip">Submitted</div>
                                    {new Date(item.rSubmitted).toString()}
                                </div>
                                <div style={{ padding: 10 }} >
                                    <div className="labelChip">Resolved</div>
                                    {item.rResolver ? new Date(item.rResolved).toString() : "....."}
                                </div>
                                <div style={{ padding: 10 }} >
                                    <div className="labelChip">Resolved By</div>
                                    {item.rResolver ?  this.state.resolverFirst + " " + this.state.resolverLast : "....."}
                                </div>
                                <div style={{ padding: 10 }} >
                                    <div className="labelChip">Description</div>
                                    {item.rDesc}
                                </div>
                                {(this.state.manager) ?
                                    <div style={{ marginTop: 10, marginBottom: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                                        <Button
                                            type="button"
                                            variant="contained"
                                            className="submit"
                                            onClick={() => this.onSubmit(item.rID ,"Approved")}
                                            classes={{
                                                root: classes.rootApproveButton,
                                            }}
                                        > APPROVE</Button>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            className="submit"
                                            onClick={() => this.onSubmit(item.rID, "Denied")}
                                            classes={{
                                                root: classes.rootDenyButton,
                                            }}
                                        > DENY</Button>
                                    </div> :
                                    null
                                }


                            </Grid>

                            <Grid item xs={3}>
                                <div className="labelChip">Expense Reciept</div>
                                <div style={{ margin: 0, widht: '100%',height: '20rem', borderStyle: 'ridge' }}>
                                    <img className="imageHover" src={item.rRecipt} alt="Reciept not available" />
                                </div>
                            </Grid>
                        </Grid>
                    </Paper> :
                    null
                }

            </>
        );
    }
}

const mStyles = theme => ({

    rootApproveButton: {
        '&:hover': {
            backgroundColor: '#F4845F',
        },
        background: main_color,
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: '30%',
        height: 30,
        boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',

    },
    rootDenyButton: {
        '&:hover': {
            backgroundColor: '#F4845F',
        },
        background: main_color,
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: '30%',
        height: 30,
        boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',

    },
});

export default withStyles(mStyles)(ReimbursementItem);