import React, { Component } from 'react';

class ListGroup extends Component {
    render() { 
        debugger;
        const {items, textProperty, valueProperty, selectedItem } = this.props;
        return <ul className="list-group">
            {items.map(item => (
                <li 
                onClick={() => this.props.onItemSelected(item)}
                style={{ cursor: "pointer" }} 
                className= {item._id === selectedItem?._id ? "list-group-item active" : "list-group-item" } 
                key={item[valueProperty]}>
                    {item[textProperty]}
                </li>
            ))}
            
        </ul>;
    }
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}
 
export default ListGroup;