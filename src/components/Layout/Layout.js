import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import 'antd/dist/antd.css';
import Footer from '../Footer/Footer';
import Head from 'next/head';


export default function Layout({ children }) {
    //const { isAuthenticated } = React.useContext(AuthContext)
    return (
        <div className="container">
            <Head>
                <title>Staybrella</title>
                <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAADOzs6SkpL19fXn5+f39/f8/PzLy8t8fHzd3d35+fnr6+tYWFjR0dHj4+Ourq7CwsJISEiMjIy8vLycnJxwcHC1tbWioqKDg4Ovr69SUlIkJCSKiopDQ0NoaGgSEhJgYGA5OTktLS0yMjImJiYbGxs2NjYWFhZ1dXVsbGxMTEwzMvZKAAAG2ElEQVR4nO2da3eiMBBA14IvlIcWfHYtamu37f//fysPJUAIEwSS8cz9uD2ucwWSkEwyf/70yssxHCzX/X5nr7wOYuyx6kC6wh+kbFVH0hHm281w8KI6lm6Y3AUHr6pj6YaXzNBQHUs3kCF+nt/QyQwD1bG0zNzx154xtTPDpeGtF85cdWAPM5ovNtvDQMRhGvjDkepAm2Ba660tdGPZT3eWqTpkGRzv+Am2u3GxA0d14CDM9bu0XIbtaf5suoH4qYNwMixdXz3cze/DendJ1TIc/H1Leqmkp9eFdLet6iWs9LmQk2MHfhG//ky1W8Tu1JFfxHmj3NF7qw/zIcJA6QPpdayXECi7jv5XL4LX4Y6ahtV5vHOH87Ho3c9c9egXYQ/7Fdz07Bdh9HirWksFgtdbddKXoKHEL+K7Fz/rrExw0MtkuYonkKXr2fLRUbHgYHDo9B3ZCVX7RfjdCaq+Q290daeOv1Wb3bE7mZgz1XSCfM5u+4LWRbVVnta7jUn9d/ZMy/kOfv039s6mTcGdahsuLS7R6dJLFJm2JRioNqmkJUVdr2BEK4k5Ogu2oqhnI5PxcHOzUG1Qi/eYoFP/Dcp56FVjqDp6EA8sHY+7nrJviebvxEfVoQM5NJ1nVDenJstPM8G16rglaJRjNVcdtRRNWpsuFz7bJ5RfgetiZb5LjrKC+o9likiObUwkPSGL3PJb36uDbbCUEcR3j0ZITNzMNJs5hAIfvf1VHWpD3qGClupIGwPNZ2grxbB/PmFDcJzNTAKssUHazCRABm96z63VAZhBNbVY5m1O/bKbvhPcMGov4uif6hAfpW54iv0S1mYVjVXH1wLisVs/KbHdIs7UkN/MoyGigQ3m4UyGaGAD322mM6dqQRzLFPVUTy3imeQWU9lhjJVmjrZJVVKYfllBTdlVGOqTmfcovxWGquNqEf5t+hydYQJ/Arx8k74bO8eau5YfTMGDnfM2WFjD+dBZGz/ggPav3sSaD63J5i88x3MVrB33+iF/My01kfzZ4fx70yXIb3A0PcB3/3r528MyAC9j3/ltFOMFYML9M8i/6c53hT1KvOF3Lu3C5s3LWVPx105579cL8e7Zs8eZWTE34rkim7e1xM1Fx0vQYLr7U9XmFFfw866q5g8WH9Uf2lSMkkeC99RDZXTMPvkV5+/Zby1aMq5sjgSTsePXis/Ygle5YdXWOFh05/JJFNmitniDscm96/bioy34iUc1i+/c3+UiXs6e3aMr31G3AU39hg3O01g7/TPk3Km1U/CcVIlTbZL+LbryK1T6GC4B54yUFm7+1n9mXtpvCsgtKD0SkMSZNLry6Dt5NfwALfgXriIoj9UsBAvKtS9cxQ/QMS9Jv34p/nM6BQVcgcu9Kduwz7i5YKvGxgVyE/AhMLojVyVZUYNuYWQnxi/Q/Stsvj84iYk9KAUcXZyEUOwR40RZwPOUspD/3tywEJz3OpJ8GGLiVrPYUkcNzZtEAty96+d1rRU4DQyzKx9KRPfNeXiWnOsq4t59SmQ+NjvN7LZeK7NHJm7WCv8WXUKJ/+KeMwW/sZsaph21YAKNQ9Rl5LuFSBrYvKWkTaPMHrKGJ9IlCXZyKU/RLZYfm0WPiGQaatxjSGWTNTSMVxpCyR2HP8Ux00J+/4nPa5KFNDSMHypwIkkWXX7ctoFnatyIxwhSZ8k1PTfxIPtTXjF3bj624dqQ3nh6HWl+SX2gqWH0rqjkvDpDdsNKU8Pr50KpL2qLyc+P3EEVTQ1n76tWd1N2x/OfX0qG+CFD/JAhfsgQP2SIHzLEDxnihwzxQ4b4IUP8kCF+yBA/ZIgfMsQPGeKHDPFDhvghQ/yQIX7IED9kiB8yxA8Z4ocM8UOG+CFD/JAhfsgQP2SIHzLEDxnihwzxQ4b4IUP8kCF+yBA/ZIgfMsQPGeKHDPFDhvghQ/yQIX7IED9kiB8yxM9zGA6nh9O+4lTjpzBMzxc/cE/ffQbDe71rbq2eZzDMzvnnnU77BIZMDYst58/PZcgrevEEhrNMgfcgMrX5aoroaAtj+Mn5M1NwRO6UfH0YM9XZOCUFmHojgDI6enIUXSW2dEtdaWltYSublf7I3KRfoJJEOsK0lqWLyJZDAhfS0Y6kSk9KoboZW0FJttKBRuRqXeUU2ap7oVTRCL2wWEOm+I2bq0fHG/CgIV/3+uDHTYpTKGMmUV9IP0qFr8NTqYQp1iFbSlU1x4xPtF1Fwriq9uQdUNU8nakr0I6k3IgISyiIuh29wa86miBTxUxj3FJJzhtY35pKjLdcv7O4TC0uHLvk9/YEbUwOJ1/J/NdDPBitYvYSvH/8G4Rv+9e1uoHaf+xoZobR422iAAAAAElFTkSuQmCC" />
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    )
}