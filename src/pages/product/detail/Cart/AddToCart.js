import React from 'react';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';

export default function AddToCart({ image, title, price, quantity, removeToCart, setCart, cart, id }) {
    const [count, setCount] = React.useState(quantity);
    //const cart = typeof window === "undefined" ? [] : JSON.parse(window.localStorage.getItem('cart'));
    const index = cart.findIndex(item => item.id === id);

    React.useEffect(() => {
        setCount(quantity);
    }, [quantity])

    const addProduct = () => {
        var newCart = JSON.parse(JSON.stringify(cart));
        newCart[index].quantity += 1;
        setCount(newCart[index].quantity);
        setCart(newCart);
    }

    const reduceProduct = () => {
        if (cart[index].quantity <= 0) return
        var newCart = JSON.parse(JSON.stringify(cart));
        newCart[index].quantity -= 1;
        setCount(newCart[index].quantity);
        setCart(newCart);
    }

    return (
        <CartItem >
            <ProductImage>
                <img src={image} alt="상품이미지" />
            </ProductImage>
            <ProductTitle >
                <h4>{title}</h4>
            </ProductTitle>
            <ProductCount>
                <h4>수량 {count}개</h4>
                <ProductCountButton>
                    <div onClick={addProduct}><UpOutlined /></div>
                    <div onClick={reduceProduct}><DownOutlined /></div>
                </ProductCountButton>
            </ProductCount>
            <ProductPrice>
                <h4>{count * price} 원</h4>
            </ProductPrice>
            <ProductRemoveButton>
                <button onClick={removeToCart}><DeleteOutlined /></button>
            </ProductRemoveButton>
        </CartItem>
    )
}

AddToCart.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
}

const CartItem = styled.ul`
    width: 100%;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > li {
        margin: 0 5px;
    }
`
const ProductImage = styled.div`
     width: 15%;
        > img {
            width: 3rem;
            height: 3rem;
            border-radius: 2px;
        }
`
const ProductTitle = styled.div`
    width: 30%;
`
const ProductCount = styled.div`
    display: flex;
    width: 25%;
`
const ProductCountButton = styled.div`
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    > div {
        color: white;
        cursor: pointer;
        margin: 0;
        padding: 0;
        width: 20;
        height: 15;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: #34495e;
        :hover{
            background: black;
        }
        > svg {
            width: 1rem;
            height: 1rem;
        }
    }    
`

const ProductPrice = styled.div`
     width: 20%;
`
const ProductRemoveButton = styled.div`
    width: 5%;
    > button  {
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: white;
        > svg {
            color: #34495e;
            width: 1rem;
            height: 1rem;
        }
    }
`