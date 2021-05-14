// import './App.css';
import React, { Component } from 'react';
import ProductList from './components/products';
import { paginate } from './components/paginate';
import ListGroup from './components/listGroup';
import { getCategories } from './services/fakeProductCategoryService';
import _ from 'lodash';

class App extends Component {
  state = { 
    products: [
      { Id: 1, Title: 'TV', Category: 'Electronic', Quantity: 5, Price: 100000, IsDeleted: false, liked: false },
      { Id: 2, Title: 'Bed', Category: 'Furniture', Quantity: 2, Price: 50000, IsDeleted: false, liked: false },
      { Id: 3, Title: 'Sofa', Category: 'Furniture', Quantity: 1, Price: 20000, IsDeleted: false, liked: false },
      { Id: 4, Title: 'Radio', Category: 'Electronic', Quantity: 4, Price: 30000, IsDeleted: false, liked: true },
      { Id: 5, Title: 'Option 1', Category: 'Electronic', Quantity: 5, Price: 30000, IsDeleted: false, liked: false },
      { Id: 6, Title: 'Option 2', Category: 'Electronic', Quantity: 4, Price: 30000, IsDeleted: false, liked: false },
      { Id: 7, Title: 'Option 3', Category: 'Electronic', Quantity: 10, Price: 30000, IsDeleted: false, liked: false },
      { Id: 8, Title: 'Option 4', Category: 'Electronic', Quantity: 11, Price: 30000, IsDeleted: false, liked: false },
      { Id: 9, Title: 'Option 5', Category: 'Electronic', Quantity: 12, Price: 30000, IsDeleted: false, liked: false },
      { Id: 10, Title: 'Option 6', Category: 'Electronic', Quantity: 13, Price: 30000, IsDeleted: false, liked: false }
    ],
    pageSize: 4,
    currentPage: 1,
    categories:[],
    sortColumn: { path: 'Title', order: 'asc' }
   };

  constructor() {
    super();
    console.log("App- contructor");
  }

  componentDidMount() {
    const categories = [ {_id: -1, name: "All Categories"}, ...getCategories() ];
    this.setState({ categories: categories });
  }

  handleDelete = (productId) => {
    console.log("Delete called at products", productId);
    let newProducts = this.state.products.filter(item => item.Id !== productId);
    this.setState({ products : newProducts });
  };

  handleLike = (product) => {
    //clone
    const prods = [...this.state.products];
    const index = prods.indexOf(product);
    prods[index] = { ...prods[index] };
    prods[index].liked = !prods[index].liked;
    this.setState( { products: prods} );
  };

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleItemSelected = (category) => {
    console.log(category);
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  handleSort = sortedColumn => {
    /*
    console.log(path);
    const sortColumn = {...this.state.sortColumn};
    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === "asc") ? "desc" : "asc";
    }
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    */
    this.setState({ sortColumn: sortedColumn });
  };


  render() { 
    const { currentPage, pageSize, products: allProducts, selectedCategory, sortColumn } = this.state;
    const filtered = selectedCategory && selectedCategory._id > 0 ? 
    allProducts.filter(x => x.Category === selectedCategory.name) : 
    allProducts;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const products = paginate(sorted, currentPage, pageSize);

    return (
        <div className="row">
          <div className="col-3">
            <ListGroup 
              items={this.state.categories} 
              selectedItem={this.state.selectedCategory}
              onItemSelected={this.handleItemSelected} 
            />
          </div>
          <div className="col">
            <ProductList 
              onDelete={this.handleDelete} 
              products={products} 
              allProducts={filtered}
              onLike={this.handleLike}
              pageSize={pageSize}
              currentPage={currentPage}
              handlePageChange={this.handlePageChange}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              >
            </ProductList>
          </div>
        </div>
    );
  }
}
 
export default App;