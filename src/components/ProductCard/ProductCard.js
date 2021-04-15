import React from 'react';
import Link from 'next/link'
import 'antd/dist/antd.css';
import { Card } from 'antd';

export default function ProductCard({ href, as, style, cover, children }) {
    return (
        <Link href={href} as={as}>
            <a>
                <Card
                    hoverable
                    style={style}
                    cover={cover}
                >
                    {children}
                </Card>
            </a>
        </Link>
    )
}
