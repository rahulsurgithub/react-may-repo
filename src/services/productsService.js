import http from './httpService';
import { apiUrl } from '../config.json'; //destructuring

const apiEndpoint = apiUrl + '/products';

export function getProducts() {
    return http.get(apiEndpoint);
}

export function getProduct(productId) {
    return http.get(apiEndpoint + "/" + productId);
}

export function saveProduct(product) {
    debugger;
    if (product.Id && product.Id != "-1") {
        const body = {...product};
        delete body.Id;
        return http.put(apiEndpoint + "/" + product.Id, body);
    }
    const newProduct = {...product};
    delete newProduct.Id;
    return http.post(apiEndpoint, newProduct);
}

export function deleteProduct(productId) {
    return http.delete(apiEndpoint + "/" + productId);
}