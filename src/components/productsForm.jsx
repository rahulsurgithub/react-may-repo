import React, { Component } from 'react';

class ProductsForm extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <h1>Products Form { this.props.match.params.Id }</h1>
                <button className="btn btn-primary" 
                    onClick={() => this.props.history.push('/app')}>
                        Save
                </button>
            </div>
            
            
            );
    }

    componentDidMount() {
        // call wev api pass id as param to fetch product details data
    }
}
 
export default ProductsForm;