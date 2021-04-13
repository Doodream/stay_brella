import React from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, Card, Carousel, Divider } from 'antd';

import { useRouter, withRouter } from 'next/router';
import Layout from '../../../components/Layout/Layout';
import Container from '../../../components/Container/Container';
import Goods from '../../../components/Goods/Goods';
import Cart from '../detail/Cart/Cart';
import VideoCard from '../../../components/VideoCard/VideoCard';

const Content = () => {
    return (
        <div style={{ margin: '0 1rem' }}>
            <div>
                <span>Item #20125656</span>
            </div>
            <div>
            </div>
            <div>
                From business &amp; pleasure, this umbrella features:
        <br />
                <ul>
                    <li>Marine Grade&nbsp; - Hand polished aluminum fittings</li>
                    <li>Premium Canvas - UV and water resistant canvas cotton bullion fringe</li>
                    <li>Reclaimed Timber - Eco friendly, world forestripes approved laminated timber poles</li>
                </ul>
        Dimensions:
        <br />
                <ul>
                    <li>In Use = approx. 7.5” H x 6’ W&nbsp;</li>
                    <li>In Carry Bag = approx. 48” L x 4” W x 4” D</li>
                    <li>Weight = approx. 10lbs</li>
                    <li>Set up time less than 1 minute</li>
                </ul>
            Imported.
            <br />
                <br />
            An oversize shipping charge of $10.00 will be applied to your total for each umbrella ordered. Expedited shipping is not available. We are unable to ship this item to P.O. boxes, military facilities or outside the continental United States.
    </div>
            <div>
                <span>DMS: 0715 090 BPU-P</span>
            </div>
        </div>)
}

function Detail({ router }) {
    const [data, setData] = React.useState(JSON.parse(router.query.data));

    React.useEffect(() => {
        console.log(data, "detail page");
    }, [])

    return (
        <Layout>
            <Container title={"Choice your Brella"}>
                <Section>
                    <ProductSection>
                        <ProductMain>
                            <ProductImage><img src={data.imagePath} alt="상품이미지"></img></ProductImage>
                            <Divider style={{ margin: '0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ProductTitle>{data.title}</ProductTitle>
                                <ProductPrice>{data.price}원</ProductPrice>
                            </div>
                            <ProductDescription>{data.description}</ProductDescription>
                            <Divider />
                            <Content />
                            <Divider />
                            <div style={{ display: 'flex', marginBottom: '2rem' }}>
                                <Video>
                                    <VideoCard videoId="001nQnpYxJg" thumbnail={"https://img.youtube.com/vi/001nQnpYxJg/maxresdefault.jpg"} />
                                </Video>
                                <VideoMessage>
                                    <span>Watch this video 😀</span>
                                    <img src="/product/arrow.png" alt='watch-arrow'></img>
                                </VideoMessage>
                            </div>
                        </ProductMain>
                    </ProductSection>
                    <CartMain>
                        <Cart data={data} />
                    </CartMain>
                </Section>
            </Container>
        </Layout >
    )
}
export default withRouter(Detail);

const VideoMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin:auto;
    > span{
        font-size: 1rem;
    }
    > img{
        width: 5rem;
        height: 5rem;
        margin-top: 1rem;
    }
`
const Video = styled.div`
   width: 20rem;
   :hover{
    box-shadow: 0 0 15px 0 rgb(2 59 109 / 20%);
   }
`
const Section = styled.div`
    position: relative;
    width: 80%;
    
`

const ProductSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    
`
const ProductMain = styled.div`
    width: 55%;
    display: flex;
    flex-direction: column;
`

const ProductTitle = styled.div`
    font-size: 2rem;
    color: rgba(0,0,0,0.6);
    margin: 1rem 0;
`
const ProductPrice = styled.div`
    font-size: 1.2rem;
    margin: auto 0 auto 0;
`
const ProductDescription = styled.div`
    font-size: 1.3rem;
`

const ProductImage = styled.div`
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    justify-content: center;
    >img{
                            width: 38rem;
        height: 38rem;
        

    }
`

const CartMain = styled.div`
    width :35%;
    z-index: 100;
    padding: 0px;
    position: fixed;
    top: 150px;
    right: 100px;
`

