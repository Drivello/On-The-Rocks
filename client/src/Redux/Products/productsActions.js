import axios from 'axios';
import { CREATE_PRODUCT, GET_PRODUCTS, CLEAR_PRODUCT, DELETE_PRODUCT, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from "../../Utils/constants"


export function clearProductDetail() {
    return async function (dispatch) {
        dispatch({ type: CLEAR_PRODUCT, payload: null });
    };
}

export function createProduct(product) {
    return async function (dispatch) {
        const { data } = await axios.post(`/product/add`, product);
        dispatch({ type: CREATE_PRODUCT, payload: data });
    };
}

export function getProducts() {
    return async function (dispatch) {
        const products = await axios.get(`http://localhost:3001/product`);
        dispatch({ type: GET_PRODUCTS, payload: products.data });
    };
}

export function getProductById(id) {
    return async function (dispatch) {
      const product = await axios.get(`http://localhost:3001/product/${id}`);
        dispatch({ type: "GET_PRODUCT_BY_ID", payload: product.data,
        });
    };
}

export function deleteProduct(id) {
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/product/${id}`);
        dispatch({ type: DELETE_PRODUCT, payload: id});
    };
}


export function filterByCategory(type){
    return async function(dispatch){        
        dispatch({type: FILTER_BY_CATEGORY ,payload: type})
    }
}

export function filterByPrice(type){
    return async function(dispatch){        
        dispatch({type: FILTER_BY_PRICE ,payload: type})
    }
}