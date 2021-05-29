import React, { Component } from 'react';
import ProductList from './components/products';
import { paginate } from './components/paginate';
import ListGroup from './components/listGroup';
import { getCategories } from './services/categoryService';
import { getProducts, deleteProduct } from './services/productsService';
import _ from 'lodash';
import { toast } from "react-toastify";

class App extends Component {
  state = { 
    products: [],
    /*
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
    */
    pageSize: 4,
    currentPage: 1,
    categories:[],
    sortColumn: { path: 'Title', order: 'asc' },
    searchQuery: "", 
    selectedCategory: null
   };

  constructor() {
    super();
    console.log("App- contructor");
  }

  async componentDidMount() {
    const { data } = await getCategories();
    const categories = [ {_id: -1, name: "All Categories"}, ...data ];
    debugger;
    const { data: products } = await getProducts();
    this.setState({ categories: categories, products: products });
  }

  handleDelete = async productId => {
    debugger;
    console.log("Delete called at products", productId);
    const originalProducts = this.state.products;
    const newProducts = originalProducts.filter(item => item._id != productId);
    this.setState({ products : newProducts });

    try {
      await deleteProduct(productId);
    }
    catch (ex) {
      if(ex.response && ex.response.status === 404) {
        toast.error("this product has already been deleted.");
        //console.log("this product has already been deleted.");
        this.setState({ products : originalProducts });
      }
    }
    
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
    debugger;
    console.log(category);
    this.setState({ selectedCategory: category, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedCategory: null, currentPage: 1 });
  };

  handleSort = sortedColumn => {
    this.setState({ sortColumn: sortedColumn });
  };

  render() { 
    const { currentPage, pageSize, products: allProducts, selectedCategory, sortColumn, searchQuery } = this.state;
    debugger;
    let filtered = allProducts;
    debugger;
    if(searchQuery) {
      filtered = allProducts.filter(m => 
        m.Title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    else if (selectedCategory && selectedCategory._id.length > 0) {
      debugger;
      filtered = allProducts.filter(x => x.Category._id === selectedCategory._id);       
    }

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
              searchQuery={searchQuery}
              handleSearch={this.handleSearch}
              >
            </ProductList>
          </div>
        </div>
    );
  }
}
 
export default App;