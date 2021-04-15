import Layout from '../components/Layout/Layout';
import SlideSection from '../pages/home/section/SlideSection'
import Banner from '../pages/home/section/Banner';

export default function Home() {
    return (
        <Layout>
            <SlideSection />
            <Banner />
        </Layout>
    )
}