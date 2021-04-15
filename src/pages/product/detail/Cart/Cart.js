import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, Divider, message } from 'antd';
import { ConsoleSqlOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter, withRouter } from 'next/router';
import AddToCart from '../Cart/AddToCart';


export default function Cart({ data }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [product, setProduct] = useState(data);
    const [cart, setCart] = useState(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('cart')) : null);
    const removeToCart = (id) => {
        var index = cart.findIndex(item => item.id === id);
        setProduct(data);
        if (cart.length <= 1) {
            setCart(null);
            window.localStorage.removeItem('cart');
            return
        }
        var newCart = JSON.parse(JSON.stringify(cart));
        newCart.splice(index, 1)
        setCart(newCart);
    }

    const addToCart = () => {
        var newCart = JSON.parse(JSON.stringify(cart));
        var newProduct = { ...product };
        newProduct.quantity += 1;
        // useState에서 setter 함수는 비동기 처리가 되며 렌더링을 유발 시킬때 해당값을 반영할 수 있다. 
        // 함수 진행동안에는 리 랜더링이 안되기 때문에 newProduct, newCart 생성
        // 객체 불변성
        setProduct(newProduct);

        // 카트가 비었는지 비어있지 않은지 
        if (cart !== null) {
            //카트가 비어있지 않다면 product가 있는지 없는지
            const itemIndex = cart.findIndex(item => item.id === product.id);
            if (itemIndex === -1) {
                setCart(cart.concat(product));
                message.success("Add to Cart Success! 🧺")
            } else {
                newCart[itemIndex] = newProduct;
                setCart(newCart);
            }
        } else {
            setCart([newProduct]);
            message.success("Add to Cart Success! 🧺")
        }
    }

    const reduceToCart = () => {
        var newCart = JSON.parse(JSON.stringify(cart));
        var newProduct = { ...product }
        newProduct.quantity -= 1;
        // 카트가 비었는지 비어있지 않은지 
        if (cart !== null) {
            //카트가 비어있지 않다면 product가 있는지 없는지
            const itemIndex = cart.findIndex(item => item.id === product.id);
            if (itemIndex !== -1 && product.quantity > 0) {
                setProduct(newProduct);
                newCart[itemIndex] = newProduct;
                setCart(newCart);
            }
        }
    }

    const getTotalPrice = () => {
        var count = 0;
        if (cart !== null) {
            cart.map(product => {
                count += product.quantity * product.price
            })
        }
        setTotalPrice(count);
    }

    useEffect(() => {
        if (cart === null) return;
        getTotalPrice();
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return (
        <Container>
            <Title><div>Your Cart 🧺 </div></Title>
            <Divider style={{ margin: '0' }} />
            <Section>
                <CartBox>
                    {
                        cart === null ?
                            <EmptyCart>
                                <ShoppingCartOutlined />
                                <span > Cart is empty.</span>
                            </EmptyCart>
                            :
                            cart.length !== 0 ?
                                cart.map((product, index) => {
                                    return <AddToCart
                                        addToCart={addToCart}
                                        reduceToCart={reduceToCart}
                                        removeToCart={removeToCart}
                                        id={product.id}
                                        price={product.price}
                                        quantity={product.quantity}
                                        title={product.title}
                                        imagePath={product.imagePath}
                                        key={index}
                                    />
                                }) :
                                <EmptyCart >
                                    <ShoppingCartOutlined />
                                    <span > Cart is empty.</span>
                                </EmptyCart>
                    }
                </CartBox>
                <Divider style={{ margin: '0px' }} />
                <PaymentBox>
                    <TotalPriceBox>
                        <p>{totalPrice}원</p>
                    </TotalPriceBox>
                    <CartButton onClick={(e) => addToCart()}>Add to Cart</CartButton>
                    <CartButton style={{ margin: '20px 0' }}
                        onClick={(e) => {
                            isAuthenticated ? message.loading("Waiting for payment window 💸", 2) : message.warning("Please Log in 🙏")
                        }}>
                        Payment
                    </CartButton>
                </PaymentBox>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    box-shadow: 0 0 15px 0 rgb(2 59 109 / 10%);
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    :hover{
        box-shadow: 0 0 15px 0 rgb(2 59 109 / 30%);
    }
`

const Title = styled.div`
    margin: 1.5rem auto 1.5rem auto;
    width: 80%;
    display: flex;
    >div{
        font-size: 1.5rem; 
        background: #EEEFF2;
        padding: 0.2rem 1rem ;
    }
    
`
const Section = styled.div`
    width: 100%;
    height: 25rem;
    overflow: auto;
    padding: 10px 0px;
`
const CartBox = styled.div`
    overflow: auto;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const EmptyCart = styled.div`
    height: 10rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > span {
        font-size: 15px;
    }
    > svg {
        color: rgba(0,0,0,0.4);
        font-size: 80px;
        margin-bottom: 20px;
    }
`

const PaymentBox = styled.div`
    margin: 0 auto;
    width: 80%;
    display: flex;
    flex-direction: column;
`

const TotalPriceBox = styled.div`
    margin: 1rem 0 1rem auto; 
    display: flex;
    justify-content: left;
    > p {
        display: flex;
        margin: 0px;
        font-size: 1.3rem;
    }
`
const CartButton = styled(Button)`
    background: #34495e;
    color: white;
`