import React, { Component } from "react";
import { TextField, Select, Grid, InputLabel, MenuItem, Snackbar, InputAdornment, Button } from '@material-ui/core';
// import AttachmentIcon from '@material-ui/icons/Attachment';
import { withStyles } from '@material-ui/core/styles';
import {  main_color } from '../styles';

class AddReimbursement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            desc: '',
            amount: '',
            type: '',
            file: null,
            reciept: [],
        }
        this.baseState = this.state
    }


    onImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                reciept: reader.result
            });
        }
        reader.readAsDataURL(file)

    }

    async onSubmit(e) {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const newReimbData = {
            amount: parseFloat(this.state.amount),
            desc: this.state.desc,
            recipt: this.state.reciept,
            type: this.state.type,
            author: currentUser,
        }
        try {
            const url = "http://localhost:8080/ERsystem/addReimbursement";
            let res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newReimbData),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let added = await res.json();
            if (added === true) {
                this.setState(this.baseState);
                this.props.handleUpdate(1);
            } else {
                console.log('Failed')
            }

        } catch (e) {
            console.log(e); 
            console.log('Failed')
        }
    }

    render() {

        let { reciept } = this.state;
        let $recieptPreview = null;
        if (reciept) {
            $recieptPreview = (<img src={reciept} alt="Please upload the reciept" />);
        } else {
            $recieptPreview = (<div>Please select an reciept for Preview</div>);
        }

        const handleChange = (prop) => (event) => {
            this.setState({ [prop]: event.target.value });
        };
        

        const { classes } = this.props;
        return (
            <div id="newReimbursementContainer">
                <h4 style={{ marginTop: 20 }}>Fill the details to file a new Reimbursement Request</h4>
                <form className="form" noValidate>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <InputLabel shrink style={{ marginBottom: 0 }}> Type </InputLabel>
                            <Select
                                value={this.state.type}
                                onChange={handleChange('type')}
                                style={{ width: '100%' }}
                            >
                                <MenuItem value={'Other'}>Other</MenuItem>
                                <MenuItem value={'Lodging'}>Lodging</MenuItem>
                                <MenuItem value={'Food'}>Food</MenuItem>
                                <MenuItem value={'Travel'}>Travel</MenuItem>
                            </Select>
                            {/* <FormHelperText>Label + placeholder</FormHelperText> */}
                        </Grid>
                        <Grid item xs={6}>
                            <input
                                style={{ width: '100%', color: main_color, paddingLeft: '5rem' }}
                                type="file"
                                onChange={(e) => this.onImageChange(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel shrink > Provide the details of expenses </InputLabel>
                            <TextField
                                label="Description"
                                multiline
                                rows={10}
                                value={this.state.desc}
                                onChange={handleChange('desc')}
                                variant="outlined"
                                style={{ width: '100%' }}
                                InputLabelProps={{ style: { color: main_color }, }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div className="recptPreview">
                                {$recieptPreview}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel shrink >Amount</InputLabel>
                            <TextField
                                value={this.state.amount}
                                onChange={handleChange('amount')}
                                variant='outlined'
                                style={{ width: '100%' }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        notchedOutline: classes.notchedOutline,
                                        focused: classes.focused,
                                    },
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
                            <Button
                                type="button"
                                variant="contained"
                                className="submit"
                                onClick={(e) => this.onSubmit(e)} 
                                classes={{
                                    root: classes.rootButton,
                                }}
                            > SUBMIT</Button>
                        </Grid>
                    </Grid>
                </form>
            </div >
        );
    }
}

const mStyles = theme => ({

    cssOutlinedInput: {
        '&$focused $notchedOutline': {
            borderColor: main_color,
        },
    },
    notchedOutline: {
        borderColor: main_color,
    },
    focused: {
        borderColor: main_color
    },
    rootButton: {
        '&:hover': {
            backgroundColor: '#F4845F',
        },
        background: main_color,
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: '50%',
        height: '50%',
        marginLeft: '5rem',
        // fontWeight: 'bold',
        // height: 40,
        boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',

    },
});

export default withStyles(mStyles)(AddReimbursement);