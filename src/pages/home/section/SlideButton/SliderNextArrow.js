import React from 'react'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styled from 'styled-components';


export default function SliderNextArrow(props) {
    const { className, onClick, style } = props;
    return (
        <RightCircleOutlined
            className={className}
            onClick={onClick}
            style={{
                ...style,
                display: "block",
                color: 'white',
                filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, 0.7))',
                width: '50px',
                height: '50px',
            }} />
    )
}
