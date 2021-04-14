import React, { useRef, useState } from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, message, Space, Divider, Input, Form, Checkbox, Card } from 'antd';

const { Meta } = Card;

export default function Goods(props) {
    return (
        <div>
            <Link href={{
                pathname: "/product/detail/[id]",
                query: { data: JSON.stringify(props) },
            }}
                as={`/product/detail/${props.id}`}>
                <a>
                    <Card
                        hoverable
                        style={{ width: 240, height: 360, margin: '1rem' }}
                        cover={<img width='240px' height='240px' src={props.imagePath} alt='배경이미지'></img>}>
                        <Meta title={props.title} description={props.description} />
                    </Card>
                </a>
            </Link>
        </div>)
}


