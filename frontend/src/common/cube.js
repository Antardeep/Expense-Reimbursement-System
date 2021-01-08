import React, { Component } from 'react';


class Cube extends Component {
    render() {
        return (
            <>
            <div className="wrap">
                <div className="cube">
                    <div className="front"/>
                    <div className="back"/>
                    <div className="top"/>
                    <div className="bottom"/>
                    <div className="left"/>
                    <div className="right"/>
                </div>
            </div>
            </>
        )
    }
}

export default Cube;