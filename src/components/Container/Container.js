import React from 'react';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Divider } from 'antd';

export default function Container({ title, children }) {

    return (
        <Outline>
            <PageTitle>
                <span>{title}</span>
                <Divider style={{ boxShadow: '0 0 15px 0 rgb(2 59 109 / 10%)', margin: '10px 0 0 0' }} />
            </PageTitle>
            {children}
        </Outline>
    )

}

const Outline = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    background: white;
`

const PageTitle = styled.div`
    width: 90%;
    > span {
        font-size: 2rem;
        color: #34495e;
    }
`