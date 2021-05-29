import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getProduct, saveProduct } from "../services/productsService";
import { getCategories } from "../services/categoryService";

class ProductDetailForm extends Form {
  state = {
    data: {
      Id: "-1",
      Title: "",
      CategoryId: undefined,
      Quantity: "",
      Price: "",
      IsDeleted: false, 
      liked: false
    },
    categories: [],
    errors: {}
  };

  schema = {
    Id: Joi.string(),
    Title: Joi.string()
      .required()
      .label("Title"),
    CategoryId: Joi.string()
      .required()
      .label("Category"),
    Quantity: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Quantity"),
    Price: Joi.number()
      .required()
      .min(0)
      .max(100000)
      .label("Price"),
    IsDeleted: Joi.boolean(),
    liked: Joi.boolean()
  };

  async componentDidMount() {
    debugger;
    const { data : categories } = await getCategories();
    this.setState({ categories });

    const productId = this.props.match.params.Id;
    if (productId === "new") return;

    try {
      const { data : product }  = await getProduct(productId);
      this.setState({ data : this.mapToViewModel(product) });
    }
    catch(ex) {
      if(ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    } 
  }

  mapToViewModel(product) {
    return {
      Id: product._id,
      Title: product.Title,
      CategoryId: product.Category._id,
      Quantity: product.Quantity,
      Price: product.Price
    };
  }

  doSubmit = async () => {
    debugger;
     await saveProduct(this.state.data);

    this.props.history.push("/app");
  };

  render() {
    debugger;
    return (
      <div>
        <h1>Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "Title")}
          {this.renderSelect("CategoryId", "Category", this.state.categories)}
          {this.renderInput("Quantity", "Quantity", "number")}
          {this.renderInput("Price", "Price", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductDetailForm;
