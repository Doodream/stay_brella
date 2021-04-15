import React from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Carousel } from 'antd';
import ProductCard from 'components/ProductCard/ProductCard';

const images = [
    '/home/umbrella1.png',
    '/home/umbrella2.png',
    '/home/umbrella3.png',
    '/home/umbrella4.png',
    '/home/umbrella5.png',
    '/home/umbrella6.png',
    '/home/umbrella7.png',
    '/home/umbrella8.png',
    '/home/umbrella9.png',
    '/home/umbrella10.png',
    '/home/umbrella11.png',
    '/home/umbrella12.png',
];

const ImageCard = (props) => {
    return (
        <ProductCard
            href="/product"
            style={{ width: 240 }}
            cover={<img width='240px' height='240px' src={images[props.index]} alt='배경이미지'></img>}
        />
    )
}

export default function SlideSection() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SectionTitle>
                <span>Brooklyn, NY</span>
                <p variant='h4'>Umbrella is a work carefully crafted by a craftsman from high-quality materials.
A quality guarantee is enclosed and a refund or exchange is possible.</p>
            </SectionTitle>
            <div style={{ padding: '24px' }}>
                <Carousel autoplay style={{ width: '900px' }}>
                    {
                        images.map((image, index) => {
                            return (
                                <div key={index}>
                                    <SlideBox>
                                        <ImageCard index={index} />
                                        <ImageCard index={(index + 2) % images.length} />
                                        <ImageCard index={(index + 4) % images.length} />
                                    </SlideBox>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>
    )
}


const SectionTitle = styled.div`
    display: flex;
    justify-content: start;
    text-align: center;
    flex-direction: column;
    color: black;
    > span {
        font-size: 40px;
        font-weight: 900;
    };
    > p {
        font-weight: 600;
        margin-top: 30px;
    };
`

const SlideBox = styled.div`
    display: flex;
    justify-content: space-between;
`
