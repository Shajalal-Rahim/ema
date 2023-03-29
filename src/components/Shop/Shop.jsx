import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([])
    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect(()=>{
        const stordCart = getShoppingCart();
        const saveCart = [];
        // step 1: get id of the addedProduct
       for(const id in stordCart){
        // step 2 get product from products state by using id
        const addedProduct = products.find(product => product.id === id);
        if(addedProduct){
            // step 3: add quantity
           const quantity = stordCart[id];
            addedProduct.quantity = quantity; 
            // step 4: add the added product to the saved cart 
            saveCart.push(addedProduct);
        }
        // step 5: set the cart
        setCart(saveCart)
       
       } 
    } , [products])

    const handleAddToCart = (product) =>{
        const newcart = [...cart, product];
        setCart(newcart);
        addToDb(product.id)
     }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        handleAddToCart = {handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart= {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;