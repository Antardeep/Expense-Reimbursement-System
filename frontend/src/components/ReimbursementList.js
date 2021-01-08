import React, {Component} from 'react';
import ReimbursementItem from '../common/ReimbursementItem';

class ReimbusrmentList extends Component{

    constructor(props){
        super(props);
        this.state ={
            update: false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.update !== prevState.update) {
            this.props.handleStatusUpdate(true);
            this.setState({update: false})
        }
    }

    onClickItem(){

    }

    handleUpdate(){
       this.setState({update:true})
    }

    render() {
        let reversedList = this.props.reimbList.sort( function ( a, b ) { return b.rID - a.rID; } );
        const reimbursementItem = reversedList.map((item, i) => {
            return <ReimbursementItem key={i} item={item} handleUpdate = {this.handleUpdate}/>
        })
        return (
            <div style={{padding: '3rem'}}>
                    {reimbursementItem}
            </div>
        );
    }
}

export default ReimbusrmentList;