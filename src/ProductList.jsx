import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5276/Shop');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);


    // function display(texts,...strings){
    //     console.log(texts, strings);
    // }
    // display("Бла бла лаал", "Март","апрель")


    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (

                    <li key={product.id.timestamp.toString()}>

                        <p>{product.productModel}</p>
                        <p>{product.description}</p>
                        <p>Price: {product.price} руб.</p>

                    </li>
                ))}
            </ul>
        </div>
    );
}




export default ProductList;