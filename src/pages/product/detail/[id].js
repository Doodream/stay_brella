import React from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, Card, Carousel } from 'antd';

import { useRouter, withRouter } from 'next/router';
import Layout from '../../../components/Layout/Layout';
import Container from '../../../components/Container/Container';
import Goods from '../../../components/Goods/Goods';

function Detail({ router }) {
    const [data, setData] = React.useState(JSON.parse(router.query.data));

    return (
        <Layout>
            <Container title={"Choice your Brella"}>
                <img src={data.imagePath} alt="상품이미지"></img>
            </Container>
        </Layout>
    )
}
export default withRouter(Detail);