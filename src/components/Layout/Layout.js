import React from 'react';
import Header from 'components/Header/Header';
import 'antd/dist/antd.css';
import Footer from 'components/Footer/Footer';
import Head from 'next/head';


export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Staybrella</title>
                <link rel="icon" href="https://staybrella.com/img/imgfile1618410549390.png" />
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    )
}