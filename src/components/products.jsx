import React, { Component } from 'react';
import Pagination from '../components/pagination';
import Like from '../components/like'

class ProductList extends Component {

    raiseSortEvent = (columnName) => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === columnName) {
          sortColumn.order = (sortColumn.order === "asc") ? "desc" : "asc";
        }
        else {
          sortColumn.path = columnName;
          sortColumn.order = "asc";
        }

        this.props.onSort(sortColumn);
    };

    render() { 
        const { length: count } = this.props.allProducts;
        //const { onSort } = this.props;

        if(count === 0) 
            return <p>There are no products in database.</p>

        return (
            <React.Fragment>
                <p>There are {count} products.</p>
                <table className="table">
                    <thead>
                        <tr style={{ cursor: "pointer" }}>
                            <th onClick={() => this.raiseSortEvent('Title')}>Title</th>
                            <th onClick={() => this.raiseSortEvent('Category')}>Category</th>
                            <th onClick={() => this.raiseSortEvent('Quantity')}>Quantity</th>
                            <th onClick={() => this.raiseSortEvent('Price')}>Price</th>
                            <th>Like</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.products.map(product => (
                            <tr scope="row" key={product.Id}>
                                <td><a>{product.Title}</a></td>
                                <td>{product.Category}</td>
                                <td>{product.Quantity}</td>
                                <td>{product.Price}</td>
                                <td>
                                    <Like liked={product.liked} onLike={() => this.props.onLike(product)} />
                                </td>
                                <td>
                                    <button type="button" 
                                    onClick={() => this.props.onDelete(product.Id)} 
                                    className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
                <Pagination 
                    itemsCount={count} 
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage} 
                    onPageChange={this.props.handlePageChange}
                />
            </React.Fragment>
        );
    }
}
 
export default ProductList;