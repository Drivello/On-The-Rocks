import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import UpdateProductForm from './updateProductForm';
import { deleteProduct, updateProduct } from '../../Redux/Products/productsActions.js';
import swal from "sweetalert";

const UpdateProduct = ({ match }) => {

    const dispatch = useDispatch();
    const { updateState } = useSelector(state => state.productReducer);
    const { Products } = useSelector(state => state.productReducer);
    const id = match.params.id

    var wipedInput = {
        name: "",
        description: "",
        size: "",
        category: "",
        brand: "",
        sku: "",
        price: "",
        image: ""
    }

    const [input, setInput] = useState(wipedInput);

    const handleSubmit = async (e) => {
        const updated = {};
        for (const prop in input) {
            if (input[prop] !== '') {
                updated[prop] = input[prop];
            }
        };
        dispatch(updateProduct(id, updated))
    };
    useEffect(() => {
        async function setProduct() {
            let product = Products.filter(e => e.id === Number(id))
            await setInput(product[0])
        }
        if (Products) setProduct();
    }, [Products, id])


    const handleDelete = async e => {
        dispatch(deleteProduct(id));
        alert('Product has been deleted!')
    }

    useEffect(() => {
        if (updateState && updateState[0] === 'invalid inputs') {
            swal('Error', 'invalid inputs', 'error')
        } else if (updateState && updateState[0] === '0 product/s updated') {
            swal('Error', 'invalid inputs', 'error')
        } else if (updateState && updateState !== undefined) {
            setInput(wipedInput);
            swal('Congratulations!', 'Product successfully created', 'success')
        }
    },
        // eslint-disable-next-line
        [updateState]);

    return (
        <>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Update Product</h1>
            <UpdateProductForm input={input} setInput={setInput} id={id} handleSubmit={handleSubmit} handleDelete={handleDelete} />
        </>
    );
};

export default UpdateProduct;