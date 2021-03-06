import React, { Component } from 'react';
import './like.css';

class Like extends Component {
    render() { 
        let classes = "fontcolor fa fa-heart";
        if(!this.props.liked) classes += "-o";
        return (<i onClick={this.props.onLike} style={{ cursor: "pointer" }} className={classes} aria-hidden="true"></i>);
    }
}
 
export default Like;