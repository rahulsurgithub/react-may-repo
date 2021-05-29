import { getCategories } from "./fakeProductCategoryService";

const products = [
  { Id: 1, Title: 'TV', Category: { _id: "1", name: "Electronic" }, Quantity: 5, Price: 100000, IsDeleted: false, liked: false },
  { Id: 2, Title: 'Bed', Category: {_id: "3", name: "Furniture"}, Quantity: 2, Price: 50000, IsDeleted: false, liked: false },
  { Id: 3, Title: 'Sofa', Category: {_id: "3", name: "Furniture"}, Quantity: 1, Price: 20000, IsDeleted: false, liked: false },
  { Id: 4, Title: 'Radio', Category: { _id: "1", name: "Electronic" }, Quantity: 4, Price: 30000, IsDeleted: false, liked: true },
  { Id: 5, Title: 'Option 1', Category: { _id: "1", name: "Electronic" }, Quantity: 5, Price: 30000, IsDeleted: false, liked: false },
  { Id: 6, Title: 'Option 2', Category: { _id: "1", name: "Electronic" }, Quantity: 4, Price: 30000, IsDeleted: false, liked: false },
  { Id: 7, Title: 'Option 3', Category: { _id: "1", name: "Electronic" }, Quantity: 10, Price: 30000, IsDeleted: false, liked: false },
  { Id: 8, Title: 'Option 4', Category: { _id: "1", name: "Electronic" }, Quantity: 11, Price: 30000, IsDeleted: false, liked: false },
  { Id: 9, Title: 'Option 5', Category: { _id: "1", name: "Electronic" }, Quantity: 12, Price: 30000, IsDeleted: false, liked: false },
  { Id: 10, Title: 'Option 6', Category: { _id: "1", name: "Electronic" }, Quantity: 13, Price: 30000, IsDeleted: false, liked: false }
];


export function getProducts() {
  return products;
}

export function getProduct(id) {
  debugger;
  return products.find(m => m.Id == id);
}

export function saveProduct(product) {
  debugger;
  let productInDb = products.find(m => m.Id === product.Id) || {};
  productInDb.Title = product.Title;
  let myCategories = getCategories();
  productInDb.Category = myCategories.find(g => g._id === product.CategoryId)
  productInDb.Quantity = product.Quantity;
  productInDb.Price = product.Price;

  if (!productInDb.Id) {
    productInDb.Id = Date.now().toString();
    products.push(productInDb);
  }

  return productInDb;
}

export function deleteProduct(id) {
  let productInDb = products.find(m => m.Id === id);
  products.splice(products.indexOf(productInDb), 1);
  return productInDb;
}
