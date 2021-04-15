import React, { useEffect } from 'react';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Pagination } from 'antd';

import Layout from 'components/Layout/Layout';
import Container from 'components/Container/Container';
import Goods from 'components/Goods/Goods';

const products = [
    {
        image: '/home/umbrella1.png',
        title: 'Patricia Nash',
        description: "Peruvian Painting Collection Magliano Umbrella",
        price: 28500,
        quantity: 0,
    },
    {
        image: '/home/umbrella2.png',
        title: 'kate spade new york',
        description: "Candy Stripe Travel Umbrella",
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella3.png',
        title: 'Patricia Nash2',
        description: 'Vintage Botanical Collection Magliano Umbrella',
        price: 38000,
        quantity: 0,
    },
    {
        image: '/home/umbrella4.png',
        title: 'Lilly Pulitzer',
        description: 'Shell of a Party Umbrella',
        price: 29950,
        quantity: 0,
    },
    {
        image: '/home/umbrella5.png',
        title: 'kate spade new york2',
        description: 'Polka Dot Umbrella',
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella6.png',
        title: 'business & pleasure',
        description: 'Antique White Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella7.png',
        title: 'business & pleasure2',
        description: "70's Panel Santorini Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella8.png',
        title: 'business & pleasure3',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella9.png',
        title: 'business & pleasure4',
        description: 'Vintage Yellow Stripe Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella10.png',
        title: 'business & pleasure',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella11.png',
        title: 'Steve Madden',
        description: 'Fashion Umbrella',
        price: 18000,
        quantity: 0,
    },
    {
        image: '/home/umbrella12.png',
        title: 'Roundtree & Yorke',
        description: 'Manual Doorman 60" Umbrella',
        price: 35000,
        quantity: 0,
    },
    {
        image: '/home/umbrella1.png',
        title: 'Patricia Nash',
        description: "Peruvian Painting Collection Magliano Umbrella",
        price: 28500,
        quantity: 0,
    },
    {
        image: '/home/umbrella2.png',
        title: 'kate spade new york',
        description: "Candy Stripe Travel Umbrella",
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella3.png',
        title: 'Patricia Nash2',
        description: 'Vintage Botanical Collection Magliano Umbrella',
        price: 38000,
        quantity: 0,
    },
    {
        image: '/home/umbrella4.png',
        title: 'Lilly Pulitzer',
        description: 'Shell of a Party Umbrella',
        price: 29950,
        quantity: 0,
    },
    {
        image: '/home/umbrella5.png',
        title: 'kate spade new york2',
        description: 'Polka Dot Umbrella',
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella6.png',
        title: 'business & pleasure',
        description: 'Antique White Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella7.png',
        title: 'business & pleasure2',
        description: "70's Panel Santorini Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella8.png',
        title: 'business & pleasure3',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella9.png',
        title: 'business & pleasure4',
        description: 'Vintage Yellow Stripe Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella10.png',
        title: 'business & pleasure',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella11.png',
        title: 'Steve Madden',
        description: 'Fashion Umbrella',
        price: 18000,
        quantity: 0,
    },
    {
        image: '/home/umbrella12.png',
        title: 'Roundtree & Yorke',
        description: 'Manual Doorman 60" Umbrella',
        price: 35000,
        quantity: 0,
    },
    {
        image: '/home/umbrella1.png',
        title: 'Patricia Nash',
        description: "Peruvian Painting Collection Magliano Umbrella",
        price: 28500,
        quantity: 0,
    },
    {
        image: '/home/umbrella2.png',
        title: 'kate spade new york',
        description: "Candy Stripe Travel Umbrella",
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella3.png',
        title: 'Patricia Nash2',
        description: 'Vintage Botanical Collection Magliano Umbrella',
        price: 38000,
        quantity: 0,
    },
    {
        image: '/home/umbrella4.png',
        title: 'Lilly Pulitzer',
        description: 'Shell of a Party Umbrella',
        price: 29950,
        quantity: 0,
    },
    {
        image: '/home/umbrella5.png',
        title: 'kate spade new york2',
        description: 'Polka Dot Umbrella',
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella6.png',
        title: 'business & pleasure',
        description: 'Antique White Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella7.png',
        title: 'business & pleasure2',
        description: "70's Panel Santorini Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella8.png',
        title: 'business & pleasure3',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella9.png',
        title: 'business & pleasure4',
        description: 'Vintage Yellow Stripe Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella10.png',
        title: 'business & pleasure',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella11.png',
        title: 'Steve Madden',
        description: 'Fashion Umbrella',
        price: 18000,
        quantity: 0,
    },
    {
        image: '/home/umbrella12.png',
        title: 'Roundtree & Yorke',
        description: 'Manual Doorman 60" Umbrella',
        price: 35000,
        quantity: 0,
    },
    {
        image: '/home/umbrella1.png',
        title: 'Patricia Nash',
        description: "Peruvian Painting Collection Magliano Umbrella",
        price: 28500,
        quantity: 0,
    },
    {
        image: '/home/umbrella2.png',
        title: 'kate spade new york',
        description: "Candy Stripe Travel Umbrella",
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella3.png',
        title: 'Patricia Nash2',
        description: 'Vintage Botanical Collection Magliano Umbrella',
        price: 38000,
        quantity: 0,
    },
    {
        image: '/home/umbrella4.png',
        title: 'Lilly Pulitzer',
        description: 'Shell of a Party Umbrella',
        price: 29950,
        quantity: 0,
    },
    {
        image: '/home/umbrella5.png',
        title: 'kate spade new york2',
        description: 'Polka Dot Umbrella',
        price: 48950,
        quantity: 0,
    },
    {
        image: '/home/umbrella6.png',
        title: 'business & pleasure',
        description: 'Antique White Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella7.png',
        title: 'business & pleasure2',
        description: "70's Panel Santorini Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella8.png',
        title: 'business & pleasure3',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella9.png',
        title: 'business & pleasure4',
        description: 'Vintage Yellow Stripe Premium Beach Umbrella',
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella10.png',
        title: 'business & pleasure',
        description: "Lauren's Navy Stripe Premium Beach Umbrella",
        price: 299000,
        quantity: 0,
    },
    {
        image: '/home/umbrella11.png',
        title: 'Steve Madden',
        description: 'Fashion Umbrella',
        price: 18000,
        quantity: 0,
    },
    {
        image: '/home/umbrella12.png',
        title: 'Roundtree & Yorke',
        description: 'Manual Doorman 60" Umbrella',
        price: 35000,
        quantity: 0,
    }
]
const pageSize = 10;
export default function Product() {
    const [state, setState] = React.useState({
        data: [],
        totalPage: products.length / pageSize,
        current: 1,
        minIndex: pageSize,
        maxIndex: products.length
    });

    useEffect(() => {
        handleChange(1);
    }, [])


    const handleChange = (page) => {
        setState({
            state,
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };

    return (
        <Layout>
            <Container title={"Choice your Brella"}>
                <Section>
                    <div className="productCount">
                        <span>{products.length} products</span>
                    </div>
                    <InnerBox>
                        <Inner>
                            {
                                products.map((product, index) => {
                                    return index >= state.minIndex &&
                                        index < state.maxIndex && (
                                            <Item key={index} id={index} imagePath={product.image} title={product.title} description={product.description} price={product.price} quantity={product.quantity} />
                                        )
                                })
                            }
                        </Inner>
                    </InnerBox>
                    <Pagination
                        pageSize={pageSize}
                        current={state.current}
                        total={products.length}
                        onChange={handleChange}
                        style={{ bottom: "0px", margin: '20px auto' }} />
                </Section>
            </Container>
        </Layout>
    )
}

const Section = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    .productCount{
        margin: 10px 0;
        > span{
        font-size: 1.2rem;
        }
    }
`
const InnerBox = styled.div`
    height: calc(100vh - 20);
    width: calc(100vw - 20);
    display: flex;
    justify-content: center;
`
const Inner = styled.div`
    justify-content: flex-start;
    flex-wrap: wrap;
    display: flex;
`
const Item = styled(Goods)`
    width: auto;
`