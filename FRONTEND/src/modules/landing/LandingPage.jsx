import Navbar from '../../globals/components/organism/Navbar';
import HeroSection from './components/HeroSection';
import Footer from '../../globals/components/organism/Footer';
import NewsSection from '../../globals/components/organism/NewsSection';



function LandingPage() {
    return (
        <>
            <Navbar/>
            <HeroSection/>
            <NewsSection/>
            <Footer/>
        </>
    )
}

export default LandingPage